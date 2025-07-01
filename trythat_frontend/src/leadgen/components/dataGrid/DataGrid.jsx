import { Table } from 'antd';
import './dataGrid.scss';
import { useSelector } from 'react-redux';

const DataGrid = ({ columns = [], data = [], pagination = true, onRowClick }) => {
  const { loading } = useSelector((store) => store.contactBook);

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={pagination}
      onRow={(record, rowIndex) => {
        if (onRowClick) {
          return {
            onClick: (event) => {
              onRowClick(record?.id);
            },
            style: {
              cursor: 'pointer',
            },
          };
        }
      }}
    />
  );
};

export default DataGrid;
