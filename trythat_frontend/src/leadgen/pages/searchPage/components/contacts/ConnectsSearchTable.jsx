import { Button, Pagination, Rate, Space, Table } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { unlockOrganizationFields } from '../../../../features/searchSlice';
import { isEmpty } from 'lodash';
import ConnectDetailV1 from './ConnectDetailV1';
import {
  getSearchResults,
  getConnectDataV1,
  unlockConnectsFields,
  setPagination,
} from '../../../../features/searchV1Slice';

const ConnectsSearchTable = ({ connectsData, onSaveCard, onDeleteCard }) => {
  const { crmData } = useSelector((store) => store.userDashboard);
  const { pagination, searchQuery } = useSelector((store) => store.searchV1);
  const dispatch = useDispatch();

  const [tableData, setTableData] = useState();

  useEffect(() => {
    if (isEmpty(connectsData)) return;
    const newData = connectsData.map((el) => {
      return {
        ...el,
        key: el?._id,
      };
    });

    setTableData(newData);
  }, [connectsData]);

  const [expandedRowKey, setExpandedRowKey] = useState(null);
  const columns = [
    {
      title: 'Name',
      dataIndex: ['personalDetails', 'name'],
      key: 'name',
    },
    {
      title: 'Years of Experience',
      dataIndex: ['professionalDetails', 'experience'],
      key: 'yearsOfExperience',
    },
    {
      title: 'Average Rating',
      dataIndex: 'average_rating',
      key: 'average_rating',
      render: (text, record) => <Rate allowHalf disabled defaultValue={text} />,
    },
    {
      title: 'Action',
      dataIndex: '',
      fixed: 'right',
      width: '200px',
      key: 'x',
      render: (connectItem) => (
        <Fragment>
          <Space>
            {connectItem?.isSaved ? (
              <Button
                disabled={!connectItem?.isResourceLocked}
                onClick={() => {
                  onDeleteCard(connectItem?._id, connectItem?.personalDetails?.name, 'connect', ['personalDetails']);
                }}
              >
                Unsave
              </Button>
            ) : (
              <Button
                disabled={!connectItem?.isResourceLocked}
                onClick={() => {
                  onSaveCard(connectItem?._id, connectItem?.personalDetails?.name, 'connect', ['personalDetails']);
                }}
                type="primary"
              >
                Save
              </Button>
            )}
            {!connectItem?.isResourceLocked ? (
              <></>
            ) : (
              <Button
                onClick={() => {
                  dispatch(
                    unlockConnectsFields({
                      body: {
                        payload: [
                          {
                            name: connectItem?.name,
                            resourceId: connectItem?._id,
                            resourceType: 'commercial',
                            resourceSubType: 'connect',
                            unlockedFields: ['personalDetails'],
                            // crmPayload: {
                            //   Email: orgItem?.officemailid,
                            //   FirstName: orgItem?.name,
                            //   Mobile: orgItem?.headOfficeNumber,
                            //   Website: orgItem?.websiteLink,
                            //   Description: orgItem?.description,
                            //   Micromarket: orgItem?.location?.mapLocation,
                            // },
                          },
                        ],
                        crmDetails: {
                          id: crmData?.id,
                          accessToken: crmData?.accessToken,
                        },
                      },
                    }),
                  );
                }}
              >
                Unlock
              </Button>
            )}
          </Space>
        </Fragment>
      ),
    },
  ];

  const handlePaginationChange = (page, pageSize) => {
    dispatch(setPagination({ current: page, pageSize })); // Update pagination state
    const body = { ...searchQuery, offset: page };
    dispatch(
      getSearchResults({
        body,
      }),
    );
  };

  return (
    <div className="connectSearchTable__container">
      <Table
        style={{ overflow: 'auto' }}
        pagination={false}
        columns={columns}
        scroll={{ x: 1300 }}
        expandable={{
          expandedRowKeys: expandedRowKey ? [expandedRowKey] : [],
          expandedRowRender: (record) => {
            return (
              <Fragment>
                <ConnectDetailV1 record={record}></ConnectDetailV1>
              </Fragment>
            );
          },
          onExpand: (expanded, record) => {
            if (expanded) {
              // Call your API function when the row is expanded
              dispatch(getConnectDataV1(record?._id));
              setExpandedRowKey(record?.key);
              return;
            }
            setExpandedRowKey(null);
          },
        }}
        dataSource={tableData}
      />
      {/* <Pagination
        style={{ marginTop: '40px' }}
        current={pagination?.current}
        pageSize={pagination?.pageSize}
        total={50} // Total count received from another API
        onChange={handlePaginationChange}
      /> */}
    </div>
  );
};

export default ConnectsSearchTable;
