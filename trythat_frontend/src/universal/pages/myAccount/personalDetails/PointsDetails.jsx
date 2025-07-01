import { Button, Card, Col, Divider, Row, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import LottieAnimation from '../../../components/lottieAnimation/LottieAnimation';
import linkedIn from '../../../../assets/images/linkedIn.png';
import twitter from '../../../../assets/images/twitter.png';
import animationData from '../../../../assets/images/PointsDetailsLottie.json';
import './pointsdetails.scss';
import { useNavigate } from 'react-router';
   

const PointsDetails = ({ points }) => {
  const navigateTo = useNavigate();
  return (
    <div className='pointcontainer'
    >
      <div className='pointcontainer-heading' >
        <Title level={5}>For better recommendations</Title>
        <div className='pointcontainer-heading__text'
        >
          <Space direction="vertical">
            <Text>Connect your Social Profiles</Text>
            <div className='pointcontainer-heading__text--iconbox'
             
            >
              <img src={linkedIn} alt="linkedIn" className='iconbox-icon'  />
              <img src={twitter} alt="twitter" className='iconbox-icon' />
            </div>
          </Space>
          <Divider plain className='pointcontainer-heading__text--divider'  type="vertical" />
          <Space direction="vertical">
            <Text>Help us know your needs better</Text>
            <Button block ghost className='pointcontainer-heading__text--btn' >
              Fill the Questionnaire
            </Button>
          </Space>
        </div>
      </div>
      <Card  className='pointcontainer-card' >
        <Title level={4}>Total Points:</Title>
        <Title level={6} className='pointcontainer-card__point'>
          {points}
        </Title>
        <Row>
          <Col span={16}>
            <Space direction="vertical">
              <Text strong>Let’s Power Up Your Profile!</Text>
              <Text>
                Boost your points by updating your profile. A complete profile not only earns you points but also
                attracts high-quality leads!
              </Text>
            </Space>
          </Col>
          <Col span={8} className='pointcontainer-card__desc'>
            <Space direction="vertical">
              <LottieAnimation height={70} width={100} animationData={animationData} />
              <Button type="primary"   onClick={() => {
                navigateTo('/user/store');
              }} >Buy Points</Button>
            </Space>
          </Col>
        </Row>
      </Card>
      <Card className='pointcontainer-card'>
        <Title level={5}>Current Plan:</Title>
        <Title level={5} className='pointcontainer-card__point'>
          Pay as you Go!
        </Title>
        <div className='pointcontainer-card__descbox'>
          <Text className='pointcontainer-card__descbox--text'>Unlock premium leads and gain business benefits</Text>
          <Button block ghost className='pointcontainer-card__descbox--btn' >
            Upgrade Plan
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PointsDetails;
