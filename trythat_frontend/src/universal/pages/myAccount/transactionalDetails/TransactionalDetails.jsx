// react imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// library imports
import { DownloadOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Button, Card, Col, Pagination, Row, Space, Table } from 'antd';
import Text from 'antd/es/typography/Text';
import Title from 'antd/es/typography/Title';
import dayjs from 'dayjs';
import cibil from '../../../../assets/images/cibil.png';
import './transactionalDetails.scss';
// action imports
import { fetchPaymentDetails, fetchTransactionDetails } from '../../../features/myAccountSlice';
import { paymentStatusMaps } from './TransactionDetailUtil';

// Point detail column
const pointsTablecolumns = [
  {
    title: 'Items',
    dataIndex: 'itemUnlocked',
    key: 'Items',
  },
  {
    title: 'Points Utilized',
    dataIndex: 'pointUtilised',
    key: 'PointsUtilized',
  },
  {
    title: 'Purchase Date',
    dataIndex: 'purchaseDate',
    key: 'PurchaseDate',
    render: (text, record) => <span>{text && dayjs(text)?.format('DD-MM-YYYY')}</span>,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'Category',
  },
];

// payment detail column

const paymentTablecolumns = [
  {
    title: 'Order ID',
    dataIndex: 'orderId',
    key: 'orderId',
  },
  {
    title: 'Item',
    dataIndex: 'Item',
    key: 'Item',
  },
  {
    title: 'Price',
    dataIndex: 'Price',
    key: 'Price',
  },
  {
    title: 'Purchase Date',
    dataIndex: 'PurchaseDate',
    key: 'PurchaseDate',
    render: (text) => <span>{text ? dayjs(text)?.format('DD-MM-YYYY') : '- - -'}</span>,
  },
  {
    title: 'Payment Status',
    dataIndex: 'paymentStatus',
    key: 'paymentStatus',
    render: (key) => (
      <span>
        {key ? (
          <span className={`${paymentStatusMaps?.[key]?.className} payment_status_common`}>
            {paymentStatusMaps?.[key]?.icon} {paymentStatusMaps?.[key]?.label}
          </span>
        ) : (
          '- - -'
        )}
      </span>
    ),
  },
  {
    title: '',
    key: 'actions',
    render: (text, record) => (
      <>
        <FilePdfOutlined style={{ color: 'red' }} /> &nbsp;
        <DownloadOutlined />
      </>
    ),
  },
];

const TransactionalDetails = () => {
  // hooks
  const dispatch = useDispatch();

  // states
  const { transactionDetails, loading, paymentDetails, paymentDetailsLoader } = useSelector((store) => store.myAccount);
  const [paymentDetailsCurrentPage, setPaymentDetailsCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });

  // handeling page change for transaction details

  const handlePaginationChange = (page, pageSize) => {
    setPagination({ current: page, pageSize });
  };

  // handeling page change for payment details
  const handlePaymentPageChange = (page) => {
    setPaymentDetailsCurrentPage(page);
    dispatch(fetchPaymentDetails({ limit: 5, page }));
  };

  useEffect(() => {
    const offset = (pagination.current - 1) * pagination.pageSize;
    dispatch(fetchTransactionDetails({ limit: 5, offset: offset }));
  }, [pagination]);

  // fetching payment details on mounting
  useEffect(() => {
    dispatch(fetchPaymentDetails({ limit: 5, page: paymentDetailsCurrentPage }));
  }, []);

  return (
    <>
      <section className="transactionalDtlsSection">
        {/* ----------POINTS DETAILS------- */}
        <Card className="transaction-card">
          <div className="card-position">
            <Title level={5} className="points-desc">
              Points Usage Details
            </Title>
            <Pagination
              className="card-position__pagination"
              current={pagination.current}
              pageSize={pagination.pageSize}
              total={transactionDetails?.totalCount}
              onChange={handlePaginationChange}
              pagination={{ position: ['topRight'], defaultPageSize: 5, pageSize: 5 }}
            />
            <Table
              loading={loading}
              dataSource={transactionDetails?.transactions}
              columns={pointsTablecolumns}
              pagination={false}
            />
          </div>
          <div>
            <Card className="card-items">
              <Title level={5}>About Coins</Title>
              <Row className="items-row">
                <Col span={8}>
                  <Space direction="vertical">
                    <Text className="item-action" strong>
                      Description:
                    </Text>
                    <Text className="item-desc">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum itaque ad laudantium, error
                      tempore nulla perspiciatis eos tempora voluptates excepturi maiores ipsum, repellendus quo!
                      Officia voluptatum quam delectus atque? Doloremque.
                    </Text>
                  </Space>
                </Col>
                <Col span={9} className="item-col">
                  <Space direction="vertical">
                    <Text className="item-lorem" strong>
                      Lorem Ipsum:
                    </Text>
                    <ul className="item-list__first">
                      <li>Lorem, ipsum dolor sit amet consectetur</li>
                      <li>Lorem, ipsum dolor sit amet consectetur</li>
                      <li>Lorem, ipsum dolor sit amet consectetur</li>
                      <li>Lorem, ipsum dolor sit amet consectetur</li>
                    </ul>
                  </Space>
                </Col>
                <Col span={6} className="list-first__col">
                  <Space direction="vertical">
                    <Text className="list-first__text" strong>
                      Lorem Ipsum:
                    </Text>
                    <ul className="item-list__second">
                      <li>Lorem, ipsum dolor</li>
                      <li>Lorem, ipsum dolor</li>
                      <li>Lorem, ipsum dolor</li>
                      <li>Lorem, ipsum dolor</li>
                    </ul>
                  </Space>
                </Col>
              </Row>
            </Card>
          </div>
        </Card>
        {/* ----------POINTS DETAILS------- */}

        {/* ----------PAYMENT DETAILS------- */}
        <div className="transaction-card__right">
          <Card className="right-card" style={{ width: '-webkit-fill-available' }}>
            <div className="right-card__position">
              <div>
                {' '}
                <Title level={5} className="points-desc">
                  Payment Details
                </Title>
                <Pagination
                  className="card-position__pagination"
                  current={paymentDetailsCurrentPage}
                  pageSize={5}
                  total={paymentDetails?.totalRecords}
                  onChange={handlePaymentPageChange}
                  pagination={{ position: ['topRight'], defaultPageSize: 5, pageSize: 5 }}
                />
              </div>

              <Table
                dataSource={paymentDetails?.transactions?.map((elem, index) => ({
                  orderId: elem?.orderId,
                  key: index,
                  Item: `${elem?.points} Coins`,
                  Price: `Rs. ${elem?.amount}`,
                  PurchaseDate: elem?.purchaseDate,
                  paymentStatus: elem?.status,
                }))}
                loading={paymentDetailsLoader}
                columns={paymentTablecolumns}
                pagination={false}
              />
            </div>
            {/* <Card className="right-card__items">
              <Space direction="vertical">
                <Title level={5}>Financial Details</Title>
                <img src={cibil} alt="cibil" />
                <Text>Check your CIBIL Score</Text>
                <Button type="primary">Download CIBIL Report</Button>
              </Space>
            </Card> */}
          </Card>
        </div>
        {/* ----------PAYMENT DETAILS------- */}
      </section>
    </>
  );
};
export default TransactionalDetails;
