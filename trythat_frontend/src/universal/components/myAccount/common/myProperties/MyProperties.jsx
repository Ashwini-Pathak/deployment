import { Table } from 'antd';
import Title from 'antd/es/typography/Title';

export default function MyProperties({ columns, dataSource }) {
  return (
    <>
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <Title level={5} style={{ position: 'absolute', top: '20px' }}>
          My Properties
        </Title>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ position: ['topRight'], defaultPageSize: 5, pageSize: 5 }}
        />
      </div>
    </>
  );
}
