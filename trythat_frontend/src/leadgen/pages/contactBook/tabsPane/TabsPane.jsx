import React, { useEffect, useState } from 'react';
import DataGrid from '../../../components/dataGrid/DataGrid';
import { convertDataToAntDTableHeader } from '../../../../utils/convertDataToAntDTableHeader';
import { Pagination } from 'antd';
import { useNavigate } from 'react-router';

const TabsPane = ({ tableHeaders, tableRows, pagination, updateModalOpen, handlePaginationChange, totalCount }) => {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  const navigate = useNavigate();
  const handleNavigate = (data) => {
    switch (data?.resourceSubType) {
      case 'organization':
        navigate(`/leadgen/organizationDetails/${data?.resourceId}`);
        break;
      case 'connect':
        navigate(`/leadgen/connectDetails/${data?.resourceId}`);
        break;
      case 'property':
        navigate(`/leadgen/propertyDetails/${data?.resourceId}`);
        break;
    }
  };

  useEffect(() => {
    if (tableRows === undefined) return;
    setColumns(
      convertDataToAntDTableHeader(
        tableHeaders,
        (key, value, row) => {
          updateModalOpen(key, value, row);
        },
        (data) => {
          handleNavigate(data);
        },
      ),
    );
    setRows(tableRows);
  }, [tableRows]);
  return (
    <>
      <DataGrid columns={columns} data={rows} pagination={false} />
      <Pagination
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={totalCount} // Total count received from another API
        onChange={handlePaginationChange}
      />
    </>
  );
};

export default TabsPane;
