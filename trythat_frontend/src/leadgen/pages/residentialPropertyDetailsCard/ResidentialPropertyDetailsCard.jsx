import { Card, Col, Row, Space, Tag } from 'antd';
import ProspectImage from '../../components/prospectImage/ProspectImage';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import PhotoGallery from '../../components/photoGallery/PhotoGallery';
import Reviews from '../../components/reviews/Reviews';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailedPropertyInfo, getOccupantsFromProperty, setNavigateFrom } from '../../features/searchSlice';
import { isEmpty } from 'lodash';
import AmenitiesIconEnum from '../../../utils/referenceData/search/amenitiesIconEnum';
import { getPropertyReviews } from '../../features/contactBookSlice';
import question from '../../../assets/images/question.svg';
import properties from '../../../assets/images/properties.svg';

import './ResidentialPropertyDetailsCard.scss';
import Address from '../../components/address/Address';

const ResidentialPropertyDetailsCard = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { detailedResidentialPropertyData } = useSelector((store) => store.search);
  const { propertyReviews } = useSelector((store) => store.contactBook);

  const [propertyDetails, setPropertyDetails] = useState({});
  const [reviwesDetails, setReviewsDetails] = useState([]);

  const { selectedNav } = useSelector((store) => store.leadGenSideNav);

  useEffect(() => {
    dispatch(getDetailedPropertyInfo(id));
    dispatch(getOccupantsFromProperty(id));
    dispatch(getPropertyReviews(id));
  }, []);

  useEffect(() => {
    if (isEmpty(detailedResidentialPropertyData)) return;
    setPropertyDetails(detailedResidentialPropertyData);
  }, [detailedResidentialPropertyData]);

  useEffect(() => {
    if (isEmpty(propertyReviews)) return;
    setReviewsDetails(propertyReviews);
  }, [propertyReviews]);

  return (
    <section className="personalDtlsSection">
      <Card className="personalDtlsSection-card">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Title level={4} strong className="card__title">
            <span
              onClick={() => {
                if (selectedNav !== 'ContactBook') {
                  navigate('/leadgen/search');
                  return;
                }
                navigate('/leadgen/contactbook');
              }}
              className="card__title-pointer"
            >
              {'< '}
              <span style={{ fontSize: '16px', verticalAlign: 'middle', fontWeight: '600' }}>
                {propertyDetails?.buildingName}
              </span>
            </span>
          </Title>
          <div className="prospectImage">
            <ProspectImage imageUrl={propertyDetails?.featuredImage || properties} />
          </div>
          <Text style={{ fontWeight: '900' }}>Property Details</Text>
          <Text style={{ fontSize: '12px' }}>Developer Name : {propertyDetails?.developer}</Text>
          <Text style={{ fontSize: '12px' }}>E-Mail : {propertyDetails?.email}</Text>
          <Text style={{ fontSize: '12px' }}>Mobile No : {propertyDetails?.phone}</Text>
          <Text style={{ fontSize: '12px' }}>Society Maintanance Charges : {propertyDetails?.developer}</Text>
          <br />
          <Address addressInfo={propertyDetails?.addressInfo} />
          <br />
          <Text style={{ fontWeight: '900' }}>Brochure</Text>
        </Space>
      </Card>
      <Card className="personalDtlsSection-card">
        <Space direction="vertical">
          <Text style={{ fontWeight: '900' }}>About</Text>
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            <Text style={{ fontSize: '12px' }}>{propertyDetails?.about}</Text>
          </div>
          <br />
          <Text style={{ fontWeight: '800' }}>Amenities</Text>
          <Text style={{ fontSize: '12px' }}>Grade of building: {propertyDetails?.gradeOfBuilding}</Text>
          <Text style={{ fontSize: '12px' }}>Total Floors: {propertyDetails.floors}</Text>
          {propertyDetails?.amenities?.general && (
            <div className="propertyListContainer__div__card__row1__col1__div">
              {propertyDetails?.amenities?.general?.map((item) => {
                return (
                  <Col span={6} className="propertyListContainer__div__card__row1__col1__div__col">
                    {isEmpty(AmenitiesIconEnum[item]) ? (
                      <img src={question} className="propertyListContainer__div__card__row1__col1__div__col__img" />
                    ) : (
                      <img
                        src={AmenitiesIconEnum[item]}
                        className="propertyListContainer__div__card__row1__col1__div__col__img"
                      />
                    )}
                    <p className="propertyListContainer__div__card__row1__col1__div__col__para">{item}</p>
                  </Col>
                );
              })}
            </div>
          )}
          <br />
          {propertyDetails?.areaFacilities && propertyDetails?.areaFacilities?.length > 0 && (
            <div className="propertyListContainer__div__card__row1__col1__div1">
              {propertyDetails?.areaFacilities?.map((item) => {
                if (item?.facility && item?.metadata?.location)
                  return (
                    <span className="propertyListContainer__div__card__row1__col1__div1__span">
                      <p className="propertyListContainer__div__card__row1__col1__div1__span__para">{item?.facility}</p>
                      :&nbsp;{' '}
                      <p className="propertyListContainer__div__card__row1__col1__div1__span__para">
                        {item?.metadata?.location}
                      </p>
                    </span>
                  );
              })}
            </div>
          )}
          <Text style={{ fontWeight: '900' }}>Other Details</Text>
          <Text style={{ fontSize: '12px' }}>CAM/ sq.ft Charges : {propertyDetails?.averageCAM}</Text>
          <Text style={{ fontSize: '12px' }}>Floor Plate : {propertyDetails?.floorPlate}</Text>
          <Text style={{ fontSize: '12px' }}>Building Type : {propertyDetails?.buildingType}</Text>
          <Text style={{ fontSize: '12px' }}>
            Circle rate/ sq.ft : {propertyDetails?.moreBuildingInfo?.[0]?.averageCircleRate || 'Awaited'}
          </Text>
          <Text style={{ fontSize: '12px' }}>
            Average sale rate/ sq ft :{' '}
            {propertyDetails?.moreBuildingInfo?.[0]?.averageSaleRate
              ? Number(propertyDetails?.moreBuildingInfo?.[0]?.averageSaleRate).toFixed(2)
              : 'Awaited'}
          </Text>
          <Text style={{ fontSize: '12px' }}>
            Average rent rate/ sq ft : {propertyDetails?.moreBuildingInfo?.[0]?.averageRentRate || 'Awaited'}
          </Text>
        </Space>
      </Card>
      <Card style={{ flex: '2' }} className="companiesList">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text style={{ fontWeight: '900' }}>Location Advantages</Text>
          <div className="items-value" style={{ marginBottom: '16px', maxHeight: '120px', overflow: 'auto' }}>
            {propertyDetails?.locationAdvantages?.map((tag) => {
              return (
                <Tag className="items-tag" color="#DEF0FF">
                  <Text className="tag-text">{tag}</Text>
                </Tag>
              );
            })}
          </div>
          <br />
          <PhotoGallery photos={propertyDetails?.propertyImages} />
          <br />
          <Reviews averageRating={propertyDetails?.averageRating} reviewsList={reviwesDetails} />
        </Space>
      </Card>
    </section>
  );
};

export default ResidentialPropertyDetailsCard;
