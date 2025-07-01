import React, { Fragment, useState, useEffect } from 'react';
import { Button, Table, Rate, Space, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOrganizationDataV1,
  unlockOrganizationFields,
  setPagination,
  getSearchResults,
} from '../../../../features/searchV1Slice';
import { isEmpty } from 'lodash';
import OrgDetailV1 from './OrgDetailV1';

const SearchTable = ({ organizationsData, onSaveCard, onDeleteCard }) => {
  const { organizationFullInfo, searchQuery, pagination } = useSelector((store) => store.searchV1);
  const [organizationData, setOrganizationData] = useState([]);
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
    return ['directorDetails', 'propertyEngagement'];
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Head Office Number',
      dataIndex: 'headOfficeNumber',
      key: 'headOfficeNumber',
    },
    {
      title: 'Head Office Location',
      dataIndex: 'headOfficeLocation',
      key: 'headOfficeLocation',
    },
    {
      title: 'Company Strength',
      dataIndex: 'companyStrength',
      key: 'companyStrength',
      render: (text, record) => <span>{text?.$numberInt}</span>,
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
      key: 'x',
      render: (orgItem) => (
        <Fragment>
          <Space>
            {orgItem?.isSaved ? (
              <Button
                disabled={!orgItem?.isResourceLocked}
                onClick={() => {
                  onDeleteCard(orgItem?._id, orgItem?.name, 'organization', getLockedArray(orgItem));
                }}
              >
                Unsave
              </Button>
            ) : (
              <Button
                disabled={!orgItem?.isResourceLocked}
                onClick={() => {
                  onSaveCard(orgItem?._id, orgItem?.name, 'organization', getLockedArray(orgItem));
                }}
                type="primary"
              >
                Save
              </Button>
            )}
            {!orgItem?.isResourceLocked ? (
              <></>
            ) : (
              <Button
                onClick={() => {
                  dispatch(
                    unlockOrganizationFields({
                      body: {
                        payload: [
                          {
                            name: orgItem?.name,
                            resourceId: orgItem?._id,
                            resourceType: 'commercial',
                            resourceSubType: 'organization',
                            unlockedFields: ['directorDetails', 'propertyEngagement'],
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

  useEffect(() => {
    if (!isEmpty(organizationFullInfo)) {
      const tempData = organizationData.map((item) => {
        if (item?._id === organizationFullInfo?._id) {
          return {
            ...organizationFullInfo,
            key: organizationFullInfo?._id,
          };
        }
        return item;
      });

      setOrganizationData(tempData);
    }
  }, [organizationFullInfo]);

  useEffect(() => {
    const newData = organizationsData.map((el) => {
      return {
        ...el,
        key: el?._id,
      };
    });

    setOrganizationData(newData);
  }, [organizationsData]);

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
    <div className="orgSearchTable__container">
      <Table
        // style={{ overflow: 'scroll' }}
        columns={columns}
        pagination={false}
        scroll={{ x: 1300 }}
        expandable={{
          expandedRowKeys: expandedRowKey ? [expandedRowKey] : [],
          expandedRowRender: (record) => {
            return (
              <Fragment>
                <OrgDetailV1 record={record}></OrgDetailV1>
              </Fragment>
            );
          },
          onExpand: (expanded, record) => {
            if (expanded) {
              // Call your API function when the row is expanded
              dispatch(getOrganizationDataV1(record?._id));
              setExpandedRowKey(record?.key);
              return;
            }
            setExpandedRowKey(null);
          },
        }}
        dataSource={organizationData}
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
export default SearchTable;
