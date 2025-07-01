import { Card, Col, Row, Space } from 'antd';
import ProspectImage from '../../components/prospectImage/ProspectImage';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import PhotoGallery from '../../components/photoGallery/PhotoGallery';
import Reviews from '../../components/reviews/Reviews';
import DataGrid from '../../components/dataGrid/DataGrid';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailedPropertyInfo, getOccupantsFromProperty, setNavigateFrom } from '../../features/searchSlice';
import { isEmpty } from 'lodash';
import { FormatOccupantsData } from '../../../utils/formatSearchData/Occupants';
import AmenitiesIconEnum from '../../../utils/referenceData/search/amenitiesIconEnum';
import { getPropertyReviews } from '../../features/contactBookSlice';
import question from '../../../assets/images/question.svg';
import properties from '../../../assets/images/properties.svg';
import search_organization from '../../../assets/images/search_organization.svg';

import './CommercialPropertyDetailsCard.scss';
import Address from '../../components/address/Address';
import { UserOutlined } from '@ant-design/icons';

const CommercialPropertyDetailsCard = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { detailedPropertyData, occupantsData } = useSelector((store) => store.search);
  const { propertyReviews } = useSelector((store) => store.contactBook);
  const { selectedNav } = useSelector((store) => store.leadGenSideNav);

  const [propertyDetails, setPropertyDetails] = useState({});
  const [occupantsDetails, setOccupantsDetails] = useState([]);
  const [reviwesDetails, setReviewsDetails] = useState([]);

  const columns = [
    {
      title: 'Floor No.',
      dataIndex: 'floorNo',
      key: 'floorno',
    },
    {
      title: 'Unit No.',
      dataIndex: 'unitNo',
      key: 'unitno',
    },
    {
      title: 'Occupant',
      dataIndex: 'occupantName',
      key: 'occupantname',
      render: (text, record) => {
        return (
          <div style={{ display: 'flex' }}>
            {record?.isPerson ? (
              <UserOutlined />
            ) : (
              <img
                src={search_organization}
                alt="location"
                className="organizationListContainer__div__card__row2__col1__row__col__img"
              />
            )}

            <Text
              // onClick={() => {
              //   dispatch(setNavigateFrom('PropertyDetails'));
              //   navigate(`/leadgen/organizationDetails/65ecc80188094c7f70d7be9b`);
              // }}
              style={{ fontSize: '12px', maxWidth: '120px' }}
              ellipsis={{ tooltip: text }}
            >
              {text}
            </Text>
          </div>
        );
      },
    },
    {
      title: 'Transaction Type',
      dataIndex: 'transactionType',
      key: 'transactionType',
    },
    {
      title: 'Registration Date',
      dataIndex: 'registrationDate',
      key: 'registrationDate',
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <span
          style={{ cursor: 'pointer', fontSize: '15px' }}
          onClick={() => {
            dispatch(setNavigateFrom('PropertyDetails'));
            navigate(`/leadgen/occupantDetails/${text.id}`);
          }}
        >
          {'>'}
        </span>
      ),
    },
  ];

  const onRowClick = (id) => {
    dispatch(setNavigateFrom('PropertyDetails'));
    navigate(`/leadgen/occupantDetails/${id}`);
  };

  useEffect(() => {
    dispatch(getDetailedPropertyInfo(id));
    dispatch(getOccupantsFromProperty(id));
    dispatch(getPropertyReviews(id));
  }, []);

  useEffect(() => {
    if (isEmpty(detailedPropertyData)) return;
    setPropertyDetails(detailedPropertyData);
  }, [detailedPropertyData]);

  useEffect(() => {
    if (isEmpty(occupantsData)) return;
    const data = FormatOccupantsData(occupantsData);
    setOccupantsDetails(data);
  }, [occupantsData]);

  useEffect(() => {
    if (isEmpty(propertyReviews)) return;
    setReviewsDetails(propertyReviews);
  }, [propertyReviews]);
  return (
    <section className="personalDtlsSection">
      <Card className="personalDtlsSection-card">
        <Space direction="vertical">
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
          <Text style={{ fontWeight: '900' }}>Building Mgmt. Contact Details</Text>
          <Text style={{ fontSize: '12px' }}>Name : {propertyDetails?.ownerName}</Text>
          <Text style={{ fontSize: '12px' }}>Mobile No : {propertyDetails?.phone}</Text>
          <Text style={{ fontSize: '12px' }}>Email : {propertyDetails?.email}</Text>
          <Text style={{ fontSize: '12px' }}>Developer Name : {propertyDetails?.developer}</Text>
          <br />
          <Address addressInfo={propertyDetails?.addressInfo} />
          <br />
          <Text style={{ fontWeight: '900' }}>About</Text>
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            <Text style={{ fontSize: '12px' }}>{propertyDetails?.about}</Text>
          </div>
        </Space>
      </Card>
      <Card className="personalDtlsSection-card">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text style={{ fontWeight: '900' }}>Key Information</Text>
          <Text style={{ fontSize: '12px' }}>Building Type : {propertyDetails?.buildingType}</Text>
          <Text style={{ fontSize: '12px' }}>Building Status : {propertyDetails?.buildingStatus}</Text>
          <Text style={{ fontSize: '12px' }}>Total Chargeable Area : {propertyDetails?.totalChargeableArea}</Text>
          <Text style={{ fontSize: '12px' }}>
            Average Floor Plate : {propertyDetails?.moreBuildingInfo?.[0]?.averageFloorPlateCarpet ?? 'Awaited'}
          </Text>
          <Text style={{ fontSize: '12px' }}>
            Average sale rate/ sq ft :{' '}
            {propertyDetails?.moreBuildingInfo?.[0]?.averageSaleRate
              ? Number(propertyDetails?.moreBuildingInfo?.[0]?.averageSaleRate).toFixed(2)
              : 'Awaited'}
          </Text>
          <Text style={{ fontSize: '12px' }}>
            Average rent rate/ sq ft :{' '}
            {propertyDetails?.moreBuildingInfo?.[0]?.averageRentRate
              ? Number(propertyDetails?.moreBuildingInfo?.[0]?.averageRentRate)?.toFixed(2)
              : 'Awaited'}
          </Text>
          <Text style={{ fontSize: '12px' }}>
            Average CAM chargeable :{' '}
            {propertyDetails?.moreBuildingInfo?.[0]?.averageCamChargeable
              ? Number(propertyDetails?.moreBuildingInfo?.[0]?.averageCamChargeable)?.toFixed(2)
              : 'Awaited'}
          </Text>
          <Text style={{ fontSize: '12px' }}>
            Efficiency : {propertyDetails?.efficiency ? Number(propertyDetails?.efficiency)?.toFixed(2) : 'Awaited'}
          </Text>
          <br />
          <Text style={{ fontWeight: '800' }}>Amenities</Text>
          <Text style={{ fontSize: '12px' }}>Grade of building: {propertyDetails?.gradeOfBuilding}</Text>
          {/* <Text style={{ fontSize: '12px' }}>Total Floors: {propertyDetails.floors}</Text> */}
          <Text style={{ fontSize: '12px' }}>Building Classification: {propertyDetails?.buildingClassification}</Text>
          <Text style={{ fontSize: '12px' }}>Building Structure: {propertyDetails?.buildingStructure}</Text>
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
          <PhotoGallery photos={propertyDetails?.propertyImages} />
          <Reviews averageRating={propertyDetails?.averageRating} reviewsList={reviwesDetails} />
        </Space>
      </Card>
      <Card style={{ flex: '2' }} className="companiesList">
        <Text style={{ fontWeight: '900' }}>List of Occupants</Text>
        <DataGrid columns={columns} data={occupantsDetails} onRowClick={(id) => onRowClick(id)} />
      </Card>
    </section>
  );
};

export default CommercialPropertyDetailsCard;
