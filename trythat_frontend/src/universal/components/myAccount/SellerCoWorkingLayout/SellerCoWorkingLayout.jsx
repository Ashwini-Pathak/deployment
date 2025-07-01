import { Button, Card, Form } from 'antd';
import Broker from '../Broker/Broker';
import Buyer from '../Buyer/Buyer';
import MyProperties from '../myProperties/MyProperties';
import Title from 'antd/es/typography/Title';
import SellerWanttoRent from '../../userOnboarding/UserTypeOfferingsLayout/Seller/SellerWanttoRent';
import CoWorkingOperator from '../../userOnboarding/UserTypeOfferingsLayout/CoWorking/CoWorkingOperator';

const SellerCoWorkingLayout = ({
  step,
  columns,
  dataSource,
  _IAmA,
  _negotiableState,
  _openToBrokerState,
  _coworkingLocation,
  _broker_location,
}) => {
  const layoutSteps = Object.freeze({
    seller: <SellerWanttoRent _negotiableState={_negotiableState} />,
    coworking: <CoWorkingOperator _openToBrokerState={_openToBrokerState} _coworkingLocation={_coworkingLocation} />,
  });

  const layoutTableColumns = Object.freeze({
    seller: ['Location', 'Expectation', 'Negotiable', 'Available from'],
    coworking: ['Location', 'Price per seat', 'Open to brokers', 'Available seats'],
  });

  return (
    <>
      <MyProperties columns={layoutTableColumns[step]} dataSource={[]} />
      <Card>
        <Title level={5}>Add New Property</Title>
        {layoutSteps[step]}
        <Form.Item>
          <Button className="editSaveBtn" htmlType="submit" ghost type="primary">
            Save
          </Button>
        </Form.Item>
      </Card>
    </>
  );
};

export default SellerCoWorkingLayout;
