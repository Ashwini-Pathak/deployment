import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import './tabSwitcher.scss';

const TabSwitcher = ({ items = [], tabGutter = 0, activeKey = '1', onChangeCallback }) => {
  return (
    <Tabs
      tabBarGutter={tabGutter}
      activeKey={activeKey}
      defaultActiveKey="1"
      items={items}
      onChange={onChangeCallback}
    />
  );
};

export default TabSwitcher;
