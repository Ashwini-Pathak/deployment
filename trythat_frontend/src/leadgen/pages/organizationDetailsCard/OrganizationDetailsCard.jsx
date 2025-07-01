import { Card, Space, Tag } from 'antd';
import ProspectImage from '../../components/prospectImage/ProspectImage';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import PhotoGallery from '../../components/photoGallery/PhotoGallery';
import Reviews from '../../components/reviews/Reviews';
import DataGrid from '../../components/dataGrid/DataGrid';
import { getConnectsFromOrganization, getDetailedOrganizationInfo } from '../../features/searchSlice';
import { FormatOrganization } from '../../../utils/formatSearchData/Organization';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { isEmpty } from 'lodash';
import { getOrganizationReviews } from '../../features/contactBookSlice';
import search_organization from '../../../assets/images/search_organization.svg';

import './OrganizationDetailsCard.scss';

const OrganizationDetailsCard = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { detailedOrganizationData, connectsData, navigateFrom, detailedPropertyData } = useSelector(
    (store) => store.search,
  );
  const { organizationReviews } = useSelector((store) => store.contactBook);

  const [organizationDetails, setOrganizationDetails] = useState({});
  const [reviewDetails, setReviewsDetails] = useState([]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'personName',
      key: 'personName',
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
    },
    {
      title: 'Email',
      dataIndex: 'emailId',
      key: 'emailId',
    },
    {
      title: 'Mobile',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
    },
  ];

  const { selectedNav } = useSelector((store) => store.leadGenSideNav);

  useEffect(() => {
    dispatch(getDetailedOrganizationInfo(id));
    dispatch(getConnectsFromOrganization(id));
    dispatch(getOrganizationReviews(id));
  }, []);
  useEffect(() => {
    if (isEmpty(detailedOrganizationData)) return;
    const data = FormatOrganization(detailedOrganizationData);
    setOrganizationDetails(data);
  }, [detailedOrganizationData]);

  useEffect(() => {
    if (isEmpty(organizationReviews)) return;
    setReviewsDetails(organizationReviews);
  }, [organizationReviews]);

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
              className="personalDtlsSection-card__backbtn"
            >
              {'< '}
              <span className="personalDtlsSection-card__username">{organizationDetails?.name}</span>
            </span>
          </Title>
          <div className="prospectImage">
            <ProspectImage imageUrl={organizationDetails?.featuredImage || search_organization} />
          </div>
          <Title level={5}>Organization Details</Title>
          <Text className="personalDtlsSection-card__text">Office Mail id : {organizationDetails?.officeMailId}</Text>
          <Text className="personalDtlsSection-card__text">Head Office : {organizationDetails?.headOfficeNumber}</Text>
          <Text className="personalDtlsSection-card__text">Industry Type : {organizationDetails?.industryType}</Text>
          <Text className="personalDtlsSection-card__text">Website Link : {organizationDetails?.industryType}</Text>
          <Text className="personalDtlsSection-card__text">
            Company Strength : {organizationDetails?.companyStrength}
          </Text>
          <PhotoGallery photos={organizationDetails?.gallery} />
          <Reviews averageRating={organizationDetails?.averageRating} reviewsList={reviewDetails} />
        </Space>
      </Card>
      <Card className="personalDtlsSection-card">
        <Space direction="vertical">
          <Title level={5} className="card__titletwo">
            About
          </Title>
          <Text className="card__about">{organizationDetails?.about}</Text>
          <Title level={5} className="card__keyoffering">
            Key Offerings
          </Title>
          <div className="orgDtls__keyOfferings">
            {organizationDetails?.keyOfferings?.map((el) => (
              <Tag className="orgDtls__keyOfferings__item">{el}</Tag>
            ))}
          </div>
          <div className="personalDtlsSection-card__divbox">
            <div className=" divbox__item">
              <Title level={5} className="item-directortext">
                Directors
              </Title>
              {organizationDetails?.directorDetails?.map((el) => {
                return (
                  <Fragment>
                    <Text className="item-detailname">{el?.personName}</Text>
                    <br />
                    <Text className="item-detailinfo">
                      <img src={require('../../../assets/images/phone.png')} alt="Phone" className="detailinfo-img" />
                      &nbsp;&nbsp;&nbsp;
                      {el?.contactNumber}
                    </Text>
                    <br />
                    <Text className="item-detailinfo">
                      {el?.mail && (
                        <>
                          <img
                            src={require('../../../assets/images/mail.png')}
                            alt="email"
                            className="detailinfo-img"
                          />
                          &nbsp;&nbsp;&nbsp;
                          {el?.emailId}
                        </>
                      )}
                    </Text>
                  </Fragment>
                );
              })}
            </div>
            <div>
              <Text strong className="divbox-founder">
                Founder Year
              </Text>
              <br />
              <Text className="divbox-founderyear">{organizationDetails?.foundedYear}</Text>
            </div>
          </div>
        </Space>
      </Card>
      <Card className="companiesList">
        <Title level={5}>Employee listing</Title>
        <DataGrid columns={columns} data={connectsData?.map((el) => el?.personalInfo)} pagination={false} />
      </Card>
    </section>
  );
};

export default OrganizationDetailsCard;
