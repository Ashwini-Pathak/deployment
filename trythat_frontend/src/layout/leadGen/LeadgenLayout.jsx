import { Flex, Layout, Spin } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router';
import SideNav from './components/sideNav/SideNav';
import TopNav from './components/topNav/TopNav';
import RaiseConcern from '../universal/components/raiseConcern/RaiseConcern';

const LeadGenLayout = ({ loading }) => {
  return (
    <Flex gap="middle" wrap="wrap">
      <Layout>
        <SideNav />
        <Layout>
          <TopNav />
          <Content>{loading ? <Spin spinning={loading} size="large" fullscreen /> : <Outlet />}</Content>
        </Layout>
        <RaiseConcern />
      </Layout>
    </Flex>
  );
};

export default LeadGenLayout;
