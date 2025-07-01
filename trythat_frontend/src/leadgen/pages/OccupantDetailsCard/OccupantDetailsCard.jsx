import { Card, Space, Steps, Row, Col, Divider } from 'antd';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import { useNavigate, useParams } from 'react-router';
import { Fragment, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import dayjs from 'dayjs';
import { getOccupantDetailsFullInfo } from '../../features/searchSlice';
import BarGraph from './BarGraph';
import PieChart from './PieChart';

import './OccupantDetailsCard.scss';

const customDot = (dot, { status, index }) => <></>;

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, ChartTitle);

const backgroundColors = ['rgba(0, 128, 252, 1)'];

const ChartData = [
  {
    companyName: '1000-1500',
    progressPaymentPrice: '80',
  },
  {
    companyName: '1500-2000',
    progressPaymentPrice: '40',
  },
  {
    companyName: '2000-2500',
    progressPaymentPrice: '60',
  },
  {
    companyName: '2500-3000',
    progressPaymentPrice: '100',
  },
  {
    companyName: '3000-3500',
    progressPaymentPrice: '60',
  },
  {
    companyName: '3500-4000',
    progressPaymentPrice: '20',
  },
];

const barChartData = {
  labels: ChartData.map((item) => item.companyName),
  datasets: [
    {
      label: '',
      data: ChartData.map((item) => item.progressPaymentPrice),
      backgroundColor: backgroundColors,
      borderWidth: 1,
    },
  ],
};

const OccupantDetailsCard = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { detailedPropertyData, occupantDetails, navigateFrom, occupantsData } = useSelector((store) => store.search);
  const { selectedNav } = useSelector((store) => store.leadGenSideNav);

  const [propertyDetails, setPropertyDetails] = useState({});
  const [unitTimelineDetails, setUnitTimelineDetails] = useState([]);
  const [transactionId, setTransactionId] = useState(null);

  const [currentValue, setCurrentValue] = useState(0);

  const onChange = (value) => {
    let transactionId = unitTimelineDetails?.[value]?.id;
    dispatch(getOccupantDetailsFullInfo(transactionId));
    setTransactionId(transactionId);
    setCurrentValue(value);
  };
  const data = {
    labels: ['1000-1500', '1500-2000', '2000-2500', '2500-3000', '3000-3500', '3500-4000'],
    values: [0, 2, 4, 8, 10, 12],
    text: 'Building Analysis(Area/St.Ft)',
  };
  const item = {
    vacant: 30,
    occupied: 40,
    total: 1245,
    totalText: 'Total Sq.Ft',
    occupiedText: 'Occupied-253 Unit(56%)',
    vacantText: 'Vacant-253 Unit(56%)',
  };
  useEffect(() => {
    dispatch(getOccupantDetailsFullInfo(id));
  }, []);

  useEffect(() => {
    let occupantDetails = occupantsData.filter((item) => item?._id === id);
    // let filteredOccupantsData = FormatOccupantsData(occupantDetails);
    let filteredOccupantsData = occupantsData.filter(
      (item) =>
        item?.address?.unitNo === occupantDetails?.[0]?.address?.unitNo &&
        item?.address?.floorNo === occupantDetails?.[0]?.address?.floorNo,
    );
    setUnitTimelineDetails(formatUnitTimelineObj(filteredOccupantsData));
  }, [occupantsData]);

  useEffect(() => {
    if (isEmpty(detailedPropertyData)) return;
    // const data = FormatProperty(detailedPropertyData);
    setPropertyDetails(detailedPropertyData);
  }, [detailedPropertyData]);

  const formatUnitTimelineObj = (obj) => {
    let unitTimelines = obj?.map((item) => {
      return {
        id: item?._id,
        title: dayjs(item?.registrationDate).format('MMM YYYY'),
        status: 'wait',
        description: (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Text style={{ fontWeight: '800' }}>
              {item?.isPerson ? item?.purchaserInfo?.[0]?.personName : item?.purchaserInfo?.[0]?.companyName}
            </Text>

            {item?.documentType != 'Sale' && item?.expiryDate && (
              <Text>Exp Date: {dayjs(item?.expiryDate).format('MMM YYYY')}</Text>
            )}
            <Text>Doc Name: {item?.documentType}</Text>
          </div>
        ),
      };
    });
    return unitTimelines;
  };
  return (
    <Fragment>
      <section
        className="occupantDtlsSection"
        style={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#F8F8F8',
          gap: '10px',
        }}
      >
        <Card style={{ flex: '1.2' }}>
          <Space direction="vertical">
            <Title level={4} strong style={{ color: '#0081FC', fontSize: '24px', marginBottom: '0' }}>
              <span
                onClick={() => {
                  if (navigateFrom === 'PropertyDetails') {
                    navigate(`/leadgen/propertyDetails/${propertyDetails?.id}`);
                    return;
                  } else if (selectedNav !== 'ContactBook') {
                    navigate('/leadgen/search');
                    return;
                  }
                  navigate('/leadgen/contactbook');
                }}
                style={{ cursor: 'pointer', verticalAlign: 'middle' }}
              >
                {'< '}
                <span style={{ fontSize: '16px', verticalAlign: 'middle', fontWeight: '600' }}>
                  {`${propertyDetails?.buildingName ?? 'Awaited'} - ${occupantDetails?.address?.unitNo ?? ''}`}
                </span>
              </span>
            </Title>
            <Text style={{ fontWeight: '900', fontSize: '15px' }}>Unit Details</Text>
            <Text style={{ fontSize: '13px', fontWeight: '600' }}>
              Building Name : {occupantDetails?.address?.buildingName ?? 'Awaited'}
            </Text>
            <Text style={{ fontSize: '13px', fontWeight: '600' }}>
              Floor No : {occupantDetails?.address?.floorNo ?? 'Awaited'}
            </Text>
            <Text style={{ fontSize: '13px', fontWeight: '600' }}>
              Unit No : {occupantDetails?.address?.unitNo ?? 'Awaited'}
            </Text>
            <Text style={{ fontSize: '13px', fontWeight: '600' }}>
              Unit Status : {occupantDetails?.unitStatus ?? 'Awaited'}
            </Text>
            <Text style={{ fontSize: '13px', fontWeight: '600' }}>
              Unit Condition : {occupantDetails?.unitCondition ?? 'Awaited'}
            </Text>
            <Text style={{ fontSize: '13px', fontWeight: '600' }}>
              Locality : {occupantDetails?.propertyInfo?.addressDetail?.[0]?.locality ?? 'Awaited'}
            </Text>
            <Text style={{ fontSize: '13px', fontWeight: '600' }}>
              City : {occupantDetails?.propertyInfo?.addressDetail?.[0]?.city ?? 'Awaited'}
            </Text>
            <br />
            <Text style={{ fontWeight: '900', fontSize: '15px' }}>Transactional Details</Text>
            <Text className="text-size card--property-details" style={{ fontSize: '13px', fontWeight: '600' }}>
              Document Type : {occupantDetails?.documentType ?? 'Awaited'}
            </Text>
            <Text style={{ fontSize: '13px', fontWeight: '600' }}>
              Registration Date :{' '}
              {occupantDetails?.registrationDate
                ? dayjs(occupantDetails?.registrationDate).format('DD/MM/YYYY')
                : 'Awaited'}
            </Text>
            <Text style={{ fontSize: '13px', fontWeight: '600' }}>
              Expiry Date :{' '}
              {occupantDetails?.expiryDate ? dayjs(occupantDetails?.expiryDate).format('DD/MM/YYYY') : 'Awaited'}
            </Text>
            <Text style={{ fontSize: '13px', fontWeight: '600' }}>
              Chargeable Area : {occupantDetails?.moreTransactionInfo?.[0]?.chargableArea ?? 'Awaited'}
            </Text>
            <Text style={{ fontSize: '13px', fontWeight: '600' }}>
              Start Rent : {occupantDetails?.moreTransactionInfo?.[0]?.rentRate ?? 'Awaited'}
            </Text>
            <Text style={{ fontSize: '13px', fontWeight: '600' }}>
              Escalation : {occupantDetails?.moreTransactionInfo?.[0]?.escalationInLicenseFees ?? 'Awaited'}
            </Text>
            <Text style={{ fontSize: '13px', fontWeight: '600' }}>
              Current Rent Rate : {occupantDetails?.moreTransactionInfo?.[0]?.currentRentRate ?? 'Awaited'}
            </Text>
            <br />
            <Text style={{ fontWeight: '900', fontSize: '15px' }}>Parking</Text>
            <Text style={{ fontSize: '13px', fontWeight: '600' }}>
              Car Parking : {occupantDetails?.parkingInfoFourWheeler ?? 'Awaited'}
            </Text>
            <Text style={{ fontSize: '13px', fontWeight: '600' }}>
              2- wheeler Parking : {occupantDetails?.parkingInfoTwoWheeler ?? 'Awaited'}
            </Text>
          </Space>
        </Card>
        <Card style={{ flex: '2.2' }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Text style={{ fontWeight: '900', fontSize: '15px' }}>Parties Involved</Text>
            {/* {true ? ( */}
            <Card
              className="container-card"
              style={{
                backgroundColor: '#F8F8F8',
                padding: '0px !important',
                paddingTop: '10px',
                marginTop: '10px',
                border: 'none',
              }}
            >
              <Text style={{ fontWeight: '900', padding: '20px', fontSize: '15px' }}>
                {occupantDetails?.documentType === 'Sale' ? 'Buyer' : 'Lessor'}
              </Text>
              <Row
                span={12}
                style={{
                  gap: '20px',
                  fontWeight: '600',
                  padding: '20px',
                  marginTop: '-8px',
                  marginBottom:
                    occupantDetails?.buyerInfoIndividual?.length > 0
                      ? occupantDetails?.buyerInfoIndividual?.personName
                        ? '-35x'
                        : '0px'
                      : occupantDetails?.sellerInfoIndividual?.personName
                      ? '-35x'
                      : '0px',
                  paddingBottom: '0px',
                }}
              >
                <Col style={{ fontSize: '13px' }} span={8}>
                  Name:
                </Col>
                <Col style={{ fontSize: '13px', textAlign: 'left' }} span={10}>
                  E-mail:
                </Col>
                <Col style={{ fontSize: '13px' }} span={2}>
                  Contact:
                </Col>
              </Row>
              <Row span={12} style={{ gap: '20px', padding: '20px', paddingTop: '0px' }}>
                <Col style={{ fontSize: '13px', inlineSize: '100%', overflowWrap: 'break-word' }} span={8}>
                  {occupantDetails?.buyerInfoIndividual?.length > 0
                    ? occupantDetails?.buyerInfoIndividual?.[0]?.personName
                    : occupantDetails?.sellerInfoIndividual?.[0]?.personName}
                </Col>
                <Col style={{ fontSize: '13px', inlineSize: '100%', overflowWrap: 'break-word' }} span={10}>
                  {occupantDetails?.buyerInfoIndividual?.length > 0
                    ? occupantDetails?.buyerInfoIndividual?.[0]?.emailId
                    : occupantDetails?.sellerInfoIndividual?.[0]?.emailId}
                </Col>
                <Col style={{ fontSize: '13px' }} span={2}>
                  {occupantDetails?.buyerInfoIndividual?.length > 0
                    ? occupantDetails?.buyerInfoIndividual?.[0]?.contactNumber
                    : occupantDetails?.sellerInfoIndividual?.[0]?.contactNumber}
                </Col>
              </Row>
              <div
                style={{
                  backgroundColor: '#0080fc',
                  borderBottomRightRadius: '10px',
                  borderBottomLeftRadius: '10px',
                  paddingTop: '10px',
                }}
              >
                <Text style={{ fontWeight: '900', padding: '20px', color: 'white', fontSize: '15px' }}>
                  {occupantDetails?.documentType === 'Sale' ? 'Seller' : 'Lessee'}
                </Text>
                <Text style={{ fontWeight: '600', display: 'flex', padding: '20px', color: 'white', fontSize: '13px' }}>
                  Name: <br /> {occupantDetails?.sellerInfo?.[0]?.personName}
                </Text>
                <Row span={12} style={{ gap: '20px', fontWeight: '600', padding: '20px', color: 'white' }}>
                  <Col style={{ color: 'white', fontSize: '13px' }} span={8}>
                    Representative Name:
                  </Col>
                  <Col style={{ color: 'white', fontSize: '13px' }} span={10}>
                    E-mail:
                  </Col>
                  <Col style={{ color: 'white', fontSize: '13px' }} span={2}>
                    Contact:
                  </Col>
                </Row>
                <Row span={12} style={{ gap: '20px', padding: '20px', color: 'white', marginTop: '-35px' }}>
                  <Col
                    style={{ color: 'white', fontSize: '13px', inlineSize: '100%', overflowWrap: 'break-word' }}
                    span={8}
                  >
                    {!occupantDetails?.sellerInfoIndividual?.length > 0 &&
                    !occupantDetails?.buyerInfoCompany?.length > 0
                      ? occupantDetails?.sellerInfoCompany?.[0]?.companyName
                      : occupantDetails?.sellerInfoIndividual?.[0]?.personName}
                  </Col>
                  <Col
                    style={{ color: 'white', fontSize: '13px', inlineSize: '100%', overflowWrap: 'break-word' }}
                    span={10}
                  >
                    {!occupantDetails?.sellerInfoIndividual?.length > 0 &&
                    !occupantDetails?.buyerInfoCompany?.length > 0
                      ? occupantDetails?.sellerInfoCompany?.[0]?.companyEmail
                      : occupantDetails?.sellerInfoIndividual?.[0]?.emailId}
                  </Col>
                  <Col style={{ color: 'white', fontSize: '13px' }} span={2}>
                    {!occupantDetails?.sellerInfoIndividual?.length > 0 &&
                    !occupantDetails?.buyerInfoCompany?.length > 0
                      ? occupantDetails?.sellerInfoCompany?.[0]?.companyNumber
                      : occupantDetails?.sellerInfoIndividual?.[0]?.contactNumber}
                  </Col>
                </Row>
              </div>
            </Card>
            {/* ) : ( */}
            {occupantDetails?.buyerInfoCompany?.length > 0 && occupantDetails?.sellerInfoCompany?.length > 0 && (
              <Card
                className="container-card"
                style={{
                  padding: '0px !important',
                  paddingTop: '10px',
                  marginTop: '10px',
                  border: 'none',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#F8F8F8',
                    borderTopRightRadius: '10px',
                    borderTopLeftRadius: '10px',
                    marginTop: '10px',
                  }}
                >
                  <Text style={{ fontWeight: '900', padding: '20px', fontSize: '15px', marginTop: '10px' }}>
                    {occupantDetails?.documentType === 'Sale' ? 'Buyer' : 'Lessor'}
                  </Text>
                  {occupantDetails?.buyerInfoCompany?.map((companyInfo, idx) => (
                    <>
                      <Text style={{ fontWeight: '600', display: 'flex', padding: '20px', fontSize: '13px' }}>
                        Name: {companyInfo?.companyName}
                      </Text>
                      <Row span={12} style={{ gap: '20px', fontWeight: '600', padding: '20px', paddingTop: 0 }}>
                        <Col style={{ fontSize: '13px' }} span={8}>
                          Representative Name:
                        </Col>
                        <Col style={{ fontSize: '13px' }} span={10}>
                          E-mail:
                        </Col>
                        <Col style={{ fontSize: '13px' }} span={2}>
                          Contact:
                        </Col>
                      </Row>
                      <Row span={12} style={{ gap: '20px', padding: '20px', marginTop: '-35px' }}>
                        <Col style={{ fontSize: '13px', inlineSize: '100%', overflowWrap: 'break-word' }} span={8}>
                          {companyInfo?.representativeInfo?.personName}
                        </Col>
                        <Col style={{ fontSize: '13px', inlineSize: '100%', overflowWrap: 'break-word' }} span={10}>
                          {companyInfo?.representativeInfo?.emailId}
                        </Col>
                        <Col style={{ fontSize: '13px' }} span={2}>
                          {companyInfo?.representativeInfo?.contactNumber}
                        </Col>
                      </Row>
                    </>
                  ))}
                </div>
                <div
                  style={{
                    backgroundColor: '#0080fc',
                    borderBottomRightRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    paddingTop: '10px',
                  }}
                >
                  <Text style={{ fontWeight: '900', padding: '20px', fontSize: '15px', color: 'white' }}>
                    {occupantDetails?.documentType === 'Sale' ? 'Seller' : 'Lessee'}
                  </Text>
                  <Row
                    span={12}
                    style={{
                      gap: '20px',
                      borderBottomRightRadius: '10px',
                      borderBottomLeftRadius: '10px',
                      fontWeight: '600',
                      backgroundColor: '#0080fc',
                      padding: '20px',
                      marginTop: '-8px',
                      marginBottom: '-18px',
                    }}
                  >
                    <Col style={{ fontSize: '13px', color: 'white' }} span={8}>
                      Name:
                    </Col>
                    <Col style={{ fontSize: '13px', color: 'white' }} span={9}>
                      E-mail:
                    </Col>
                    <Col style={{ fontSize: '13px', color: 'white' }} span={2}>
                      Contact:
                    </Col>
                  </Row>
                  {occupantDetails?.sellerInfoCompany?.map((companyInfo) => (
                    <Row
                      span={12}
                      style={{
                        gap: '20px',
                        padding: '0px 20px',
                        color: 'white',
                        marginBottom: '12px',
                      }}
                    >
                      <Col style={{ fontSize: '13px', inlineSize: '100%', overflowWrap: 'break-word' }} span={8}>
                        {companyInfo?.companyName}
                      </Col>
                      <Col style={{ fontSize: '13px', inlineSize: '100%', overflowWrap: 'break-word' }} span={9}>
                        {companyInfo?.companyEmail}
                      </Col>
                      <Col style={{ fontSize: '13px' }} span={2}>
                        {companyInfo?.companyNumber}
                      </Col>
                    </Row>
                  ))}
                </div>
              </Card>
            )}

            {/* // )} */}
          </Space>
        </Card>
        <Card style={{ flex: '1.5', maxHeight: '730px', overflow: 'scroll' }} className="companiesList">
          <Text style={{ fontWeight: '900', fontSize: '15px' }}>Unit Timeline</Text>
          <Steps
            type="navigation"
            current={currentValue}
            onChange={onChange}
            progressDot={customDot}
            direction="vertical"
            className="site-navigation-steps"
            items={unitTimelineDetails}
          />
        </Card>
        {/* </section> */}
        {/* <Card
        style={{ flex: '1.5', maxHeight: '730px', overflow: 'scroll', marginTop: '20px', border: 'none' }}
        className="companiesList"
      >
        <Row span={12}>
          <Col span={12} style={{ marginRight: '50px' }}>
            <Bar data={barChartData} options={options} />
          </Col>
          <Col span={1}>
            <Divider type="vertical" style={{ height: '320px' }} />
          </Col>
          <Col span={6}>
            <Doughnut
              data={doughnutChartData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
              }}
            />
          </Col>
        </Row>
      </Card>
      <Card style={{ flex: '1.5', maxHeight: '730px', overflow: 'scroll' }} className="companiesList">
        <Text style={{ fontWeight: '900', fontSize: '15px' }}>Unit Timeline</Text>
        <Steps
          type="navigation"
          current={currentValue}
          onChange={onChange}
          progressDot={customDot}
          direction="vertical"
          className="site-navigation-steps"
          items={unitTimelineDetails}
        />
      </Card> */}
      </section>
      <div style={{ backgroundColor: '#fff', marginTop: '12px', display: 'flex', flexDirection: 'row' }}>
        <BarGraph data={data} />

        <PieChart item={item} />
      </div>
    </Fragment>
  );
};

export default OccupantDetailsCard;
