import { Card, Space, Tag } from 'antd';
import ProspectImage from '../../components/prospectImage/ProspectImage';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import PhotoGallery from '../../components/photoGallery/PhotoGallery';
import Reviews from '../../components/reviews/Reviews';
import { getDetailedConnectInfo } from '../../features/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { isEmpty } from 'lodash';
import { FormatConnect } from '../../../utils/formatSearchData/Connect';
import search_connect from '../../../assets/images/search_connect.svg';
import './ConnectDetailsCard.scss';
const ConnectDetailsCard = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { detailedConnectData } = useSelector((store) => store.search);

  const [connectDetails, setConnectDetails] = useState({});

  useEffect(() => {
    dispatch(getDetailedConnectInfo(id));
  }, []);
  useEffect(() => {
    if (isEmpty(detailedConnectData)) return;
    const data = FormatConnect(detailedConnectData?.[0]);
    setConnectDetails(data);
  }, [detailedConnectData]);

  const { selectedNav } = useSelector((store) => store.leadGenSideNav);

  return (
    <section className="personalDtlsSection">
      <Card className="personalDtlsSection-cardone">
        <Space direction="vertical">
          <Text
            onClick={() => {
              if (selectedNav !== 'ContactBook') {
                navigate('/leadgen/search');
                return;
              }
              navigate('/leadgen/contactbook');
            }}
            strong
            className="personalDtlsSection-cardone__details"
          >
            <span className="details-user">{'< '}</span>
            <span className="details-username">{connectDetails?.name}</span>
          </Text>
          <div className="prospectImage">
            <ProspectImage imageUrl={connectDetails?.featuredImage || search_connect} />
          </div>
          <Title level={5} className="personalDtlsSection-cardone__heading">
            Personal Details
          </Title>
          <div className="personalDtlsSection-cardone__personaldtls">
            <Text className="personaldtls-text">Name : {connectDetails?.name}</Text>
            <Text className="personaldtls-text">E-Mail : {connectDetails?.email}</Text>
            <Text className="personaldtls-text">Mobile No. : {connectDetails?.phone}</Text>
          </div>
          <Reviews averageRating={connectDetails?.averageRating} />
        </Space>
      </Card>
      <Card className="personalDtlsSection-cardone">
        <Space direction="vertical">
          <Title level={5}>Professional Details</Title>
          <div className="personalDtlsSection-cardone__personaldtls">
            <Text className="personaldtls-text">Current Company: {connectDetails?.currentCompany}</Text>
            <Text className="personaldtls-text">Designation: {connectDetails?.designation}</Text>
            <Text className="personaldtls-text">Years of Experience: {connectDetails?.experience}</Text>
            <Text className="personaldtls-text">Current Industry: {connectDetails?.currentIndustry}</Text>
            <Text className="personaldtls-text">Last Company Industry: {connectDetails?.lastIndustry}</Text>
          </div>
          <Title level={5}>Key Skills</Title>
          <div className="personalDtlsSection-cardone__tagbox">
            {connectDetails?.keySkills?.map((el) => {
              return <Tag className="tagbox-tag">{el}</Tag>;
            })}
          </div>
        </Space>
      </Card>
      <Card className="personalDtlsSection-cardthree">
        <Title level={5}>Personal details</Title>
        <div className="personalDtlsSection-cardthree__personaldtls">
          <Text className="personaldtls-text">Type of Users: {connectDetails?.userType}</Text>
          <Text className="personaldtls-text">Experties: {connectDetails?.experties}</Text>
          <Text className="personaldtls-text">Preferred Cities: {connectDetails?.perferredCities}</Text>
        </div>
        <Title level={5} className="personalDtlsSection-cardthree__services">
          Services they sell
        </Title>
        <div className="personalDtlsSection-cardthree__tagbox">
          {connectDetails?.serviceSell?.map((el) => {
            return <Tag className="box-tag">{el}</Tag>;
          })}
        </div>
        <Title level={5} className="personalDtlsSection-cardthree__services">
          Target Group
        </Title>
        <div className="personalDtlsSection-cardthree__tagbox">
          {connectDetails?.targetGroup?.map((el) => {
            return <Tag>{el}</Tag>;
          })}
        </div>
        <Title level={5} className="personalDtlsSection-cardthree__services">
          Services they buy
        </Title>
        <div className="personalDtlsSection-cardthree__tagbox">
          {connectDetails?.servicesBuy?.map((el) => {
            return <Tag>{el}</Tag>;
          })}
        </div>
      </Card>
    </section>
  );
};

export default ConnectDetailsCard;
