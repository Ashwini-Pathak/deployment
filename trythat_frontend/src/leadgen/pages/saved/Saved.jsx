import { Button, Card, Checkbox, Modal, Pagination, Space, Table } from 'antd';
import { useEffect, useState } from 'react';

import './saved.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProspects, setTransactionModal, transactProspects } from '../../features/savedSlice';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import { useNavigate } from 'react-router';
import { isEmpty } from 'lodash';
import { set_toast } from '../../../universal/features/toastSlice';

const Saved = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRowsData, setSelectedRowsData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const { userProspectsData, totalUserProspects, transactionModal, loading, transactionLoading, insufficientPoints } =
    useSelector((store) => store.saved);

  const { user } = useSelector((store) => store.user);
  const { crmData } = useSelector((store) => store.userDashboard);

  const handleSelectAll = (checked) => {
    if (checked) {
      const keys = userProspectsData?.map((item) => item?.resourceId);
      const selectedRows = userProspectsData?.map((item) => item);
      setSelectedRowKeys(keys);
      setSelectedRowsData(selectedRows);
      return;
    }
    setSelectedRowKeys([]);
    setSelectedRowsData([]);
  };

  const columns = [
    {
      title: 'Item',
      dataIndex: 'name',
      key: 'item',
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
      key: 'industry',
    },
    {
      title: 'Type',
      dataIndex: 'resourceType',
      key: 'resourceType',
    },
    {
      title: '',
      key: 'unlock',
      render: (_, value) => {
        if (value?.resourceType === 'commercial') {
          return (
            <Button
              type="primary"
              loading={transactionLoading}
              onClick={() => {
                handleUnlockProspects([value]);
                setSelectedRowsData([value]);
              }}
            >
              Unlock
            </Button>
          );
        }
      },
    },
    {
      title: (
        <Checkbox
          checked={selectedRowKeys.length === userProspectsData.length}
          onChange={(e) => handleSelectAll(e.target.checked)}
        >
          Select All
        </Checkbox>
      ),
      key: 'select all',
    },
    {
      title: (
        <Button type="primary" block loading={transactionLoading} onClick={() => handleUnlockProspects()}>
          Buy Now
        </Button>
      ),
      key: 'buy now',
    },
  ];

  const rowSelection = {
    hideSelectAll: true,
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRowsData(selectedRows);
    },
  };

  useEffect(() => {
    dispatch(setTransactionModal(false));
  }, []);

  useEffect(() => {
    dispatch(getUserProspects((pagination.current - 1) * pagination.pageSize)); // Fetch data initially
    setSelectedRowKeys([]);
    setSelectedRowsData([]);
  }, [pagination]); // Fetch data when pagination changes

  const handleTransacBody = (resourceSubType, selectedRecords) => {
    switch (resourceSubType) {
      case 'organization':
        return {
          Email: selectedRecords?.officemailid,
          FirstName: selectedRecords?.name,
          Mobile: selectedRecords?.headOfficeNumber,
          Website: selectedRecords?.websiteLink,
          Description: selectedRecords?.description,
          Micromarket: selectedRecords?.location?.mapLocation,
        };
      case 'connect':
        return {
          Email: selectedRecords?.personalDetails?.email,
          FirstName: selectedRecords?.personalDetails?.name,
          Mobile: selectedRecords?.personalDetails?.phone,
        };
      case 'property':
        return {
          FirstName: selectedRecords?.name,
          Micromarket: selectedRecords?.location?.mapLocation,
        };

      default:
        return;
    }
  };

  const handleUnlockProspects = (value) => {
    // dispatch(setTransactionModal(true));
    const selectedRecords = value || selectedRowsData;
    if (isEmpty(selectedRecords)) {
      dispatch(set_toast({ show: true, type: 'warning', content: 'Please select record(s) !' }));
      return;
    }
    const body = {
      payload: selectedRecords
        ?.filter((data) => data?.resourceType === 'commercial')
        ?.map((el) => ({
          resourceType: el?.resourceType,
          resourceSubType: el?.resourceSubType,
          resourceId: el?.resourceId,
          unlockedFields: el.unlockedFields,
          crmPayload: {
            ...handleTransacBody(selectedRecords?.[0]?.resourceSubType, selectedRecords?.[0]),
          },
        })),
      crmDetails: {
        id: crmData?.id,
        accessToken: crmData?.accessToken,
      },
    };
    dispatch(transactProspects(body));
    setPagination({ current: 1, pageSize: 10 });
  };

  const handlePaginationChange = (page, pageSize) => {
    setPagination({ current: page, pageSize }); // Update pagination state
  };

  return (
    <div className="saved" style={{ padding: '20px' }}>
      <Table
        // rowSelection={rowSelection}
        columns={columns}
        dataSource={userProspectsData}
        rowClassName={() => 'custom-row'}
        rowKey={(record) => record?.resourceId}
        loading={loading}
        pagination={false}
        //   scroll={{ y: 400 }}
      />
      <Pagination
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={totalUserProspects} // Total count received from another API
        onChange={handlePaginationChange}
      />
      <Modal
        centered
        open={transactionModal}
        onOk={() => handleUnlockProspects()}
        onCancel={() => dispatch(setTransactionModal(false))}
        cancelButtonProps={{ style: { display: 'none' } }}
        footer={
          <Button key="ok" type="primary" loading={transactionLoading} onClick={() => navigate('/user/store')}>
            Make Payment
          </Button>
        }
        className="savedModal"
      >
        <Space direction="vertical" align="center">
          <Card
            style={{
              width: 250,
              marginTop: '20px',
              background: 'transparent linear-gradient(123deg, #0081FC 0%, #66B3FD 100%) 0% 0% no-repeat padding-box',
              boxShadow: '0px 0px 20px #00000029',
              textAlign: 'center',
            }}
          >
            <Space direction="vertical">
              <Title style={{ color: '#FFFFFF' }} level={4}>
                Oops insufficient points!
              </Title>
              <Text style={{ color: '#FFFFFF' }}>You need additional {insufficientPoints} points to unlock</Text>
            </Space>
          </Card>
        </Space>
      </Modal>
    </div>
  );
};

export default Saved;
