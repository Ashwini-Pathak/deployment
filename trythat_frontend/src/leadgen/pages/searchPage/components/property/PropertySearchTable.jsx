import React, { Fragment, useState, useEffect } from 'react';
import { Button, Table, Rate, Space, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import {
  getPropertyDataV1,
  unlockPropertyFields,
  getSearchResults,
  setPagination,
} from '../../../../features/searchV1Slice';
import { isEmpty } from 'lodash';
import PropertyDetailV1 from './PropertyDetailV1';
import { populateAddressInfo } from '../../../../../utils/formatSearchData/Address';

const PropertySearchTable = ({ propertiesData, onSaveCard, onDeleteCard }) => {
  const { propertyFullInfo, pagination, searchQuery } = useSelector((store) => store.searchV1);
  const [propertyData, setPropertyData] = useState([]);
  const [expandedRowKey, setExpandedRowKey] = useState(null);
  const dispatch = useDispatch();

  const { crmData } = useSelector((store) => store.userDashboard);
  const getLockedArray = (org) => {
    // const directorDetailsPresent = !org?.lockedResourceDetails?.lockedFields.includes('directorDetails');
    // const propertyEngagementPresent = !org?.lockedResourceDetails?.lockedFields.includes('propertyEngagement');
    // return compact([
    //   directorDetailsPresent ? '' : 'directorDetails',
    //   propertyEngagementPresent ? '' : 'propertyEngagement',
    // ]);
    return ['ownerDetails'];
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'buildingName',
      key: 'name',
    },
    {
      title: 'Area',
      dataIndex: 'location',
      key: 'area',
      render: (text, record) => <span>{record?.addressInfo?.[0]?.locality}</span>,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (text, record) => <span>{populateAddressInfo(record?.addressInfo?.[0])}</span>,
    },

    {
      title: 'Average Rating',
      dataIndex: 'averageRating',
      key: 'averageRating',
      render: (text, record) => <Rate allowHalf disabled defaultValue={text} />,
    },
    {
      title: 'Action',
      dataIndex: '',
      fixed: 'right',
      width: '200px',
      key: 'x',
      render: (propertyItem) => (
        <Fragment>
          <Space>
            {propertyItem?.isSaved ? (
              <Button
                disabled={!propertyItem?.isResourceLocked}
                onClick={() => {
                  onDeleteCard(
                    propertyItem?._id,
                    propertyItem?.buildingName,
                    'property',
                    propertyItem?.buildingType,
                    getLockedArray(propertyItem),
                  );
                }}
              >
                Unsave
              </Button>
            ) : (
              <Button
                disabled={!propertyItem?.isResourceLocked}
                onClick={() => {
                  onSaveCard(
                    propertyItem?._id,
                    propertyItem?.buildingName,
                    'property',
                    propertyItem?.buildingType,
                    getLockedArray(propertyItem),
                  );
                }}
                type="primary"
              >
                Save
              </Button>
            )}
            {!propertyItem?.isResourceLocked ? (
              <></>
            ) : (
              <Button
                onClick={() => {
                  dispatch(
                    unlockPropertyFields({
                      body: {
                        payload: [
                          {
                            name: propertyItem?.buildingName,
                            resourceId: propertyItem?._id,
                            resourceType: propertyItem?.buildingType,
                            resourceSubType: 'property',
                            unlockedFields: ['representativeEmail', 'representativeNumber'],
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

  useEffect(() => {
    if (!isEmpty(propertyFullInfo)) {
      const tempData = propertyData?.map((item) => {
        if (item?._id === propertyFullInfo?._id) {
          return {
            ...propertyFullInfo,
            key: propertyFullInfo?._id,
          };
        }
        return item;
      });

      setPropertyData(tempData);
    }
  }, [propertyFullInfo]);

  useEffect(() => {
    const newData = propertiesData?.map((el) => {
      return {
        ...el,
        key: el?._id,
      };
    });

    setPropertyData(newData);
  }, [propertiesData]);

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
    <div className="propertySearchTable__container">
      <Table
        style={{ overflow: 'auto' }}
        columns={columns}
        pagination={false}
        scroll={{ x: 1300 }}
        expandable={{
          expandedRowKeys: expandedRowKey ? [expandedRowKey] : [],
          expandedRowRender: (record) => {
            return (
              <Fragment>
                <PropertyDetailV1 record={record}></PropertyDetailV1>
              </Fragment>
            );
          },
          onExpand: (expanded, record) => {
            if (expanded) {
              // Call your API function when the row is expanded
              dispatch(getPropertyDataV1(record?._id));
              setExpandedRowKey(record?.key);
              return;
            }
            setExpandedRowKey(null);
          },
        }}
        dataSource={propertyData}
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
export default PropertySearchTable;
