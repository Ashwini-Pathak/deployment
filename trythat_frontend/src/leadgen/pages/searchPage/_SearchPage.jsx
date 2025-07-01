import './searchPage.scss';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Tabs, Card, Switch } from 'antd';

import Property from './components/property/Property';
import Organization from './components/organization/Organization';
import Contacts from './components/contacts/Contacts';
import MyWishlist from './components/wishlist/Wishlist';
import { fetchPropertyList } from '../../features/searchSlice';
import PropertyIcon from '../../../assets/images/property.png';
import OrganizationIcon from '../../../assets/images/organization.png';
import ConnectsIcon from '../../../assets/images/connects.png';
import FilterIcon from '../../../assets/images/filter.svg';

const SearchPage = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state) => state.search);
  const items = [
    {
      label: 'Property',
      key: 'Property',
      icon: <img src={PropertyIcon} alt="PropertyIcon" width={'20px'} height={'20px'} />,
      children: (
        <Row style={{ backgroundColor: '#ffffff ' }} className="searchPageDiv__tabs--row">
          <Col span={8} className="searchPageDiv__tabs__col">
            <div className="searchPageDiv__tabs__col__div">
              <img src={FilterIcon} alt="Save All" className="searchPageDiv__tabs__col__div__img" />
              <p className="searchPageDiv__tabs__col__div__para">Save All</p>
            </div>
            <Property />
          </Col>
          <Col span={8} className="searchPageDiv__tabs__col1">
            <div className="searchPageDiv__tabs__col1__div">
              <img src={FilterIcon} alt="Save All" className="searchPageDiv__tabs__col1__div__img" />
              <p className="searchPageDiv__tabs__col1__div__para">Save All</p>
            </div>
            <Organization />
          </Col>
          <Col span={8} className="searchPageDiv__tabs__col2">
            <div className="searchPageDiv__tabs__col2__div">
              <img src={FilterIcon} alt="Save All" className="searchPageDiv__tabs__col2__div__img" />
              <p className="searchPageDiv__tabs__col2__div__para">Save All</p>
            </div>
            <Contacts />
          </Col>
        </Row>
      ),
    },
    {
      label: 'Organization',
      key: 'Organization',
      icon: <img src={OrganizationIcon} alt="OrganizationIcon" width={'20px'} height={'20px'} />,
      children: (
        <Row style={{ backgroundColor: '#ffffff ' }} className="searchPageDiv__tabs--row">
          <Col span={8} className="searchPageDiv__tabs__col">
            <div className="searchPageDiv__tabs__col__div">
              <img src={FilterIcon} alt="Save All" className="searchPageDiv__tabs__col__div__img" />
              <p className="searchPageDiv__tabs__col__div__para">Save All</p>
            </div>
            <Property />
          </Col>
          <Col span={8} className="searchPageDiv__tabs__col1">
            <div className="searchPageDiv__tabs__col1__div">
              <img src={FilterIcon} alt="Save All" className="searchPageDiv__tabs__col1__div__img" />
              <p className="searchPageDiv__tabs__col1__div__para">Save All</p>
            </div>
            <Organization />
          </Col>
          <Col span={8} className="searchPageDiv__tabs__col2">
            <div className="searchPageDiv__tabs__col2__div">
              <img src={FilterIcon} alt="Save All" className="searchPageDiv__tabs__col2__div__img" />
              <p className="searchPageDiv__tabs__col2__div__para">Save All</p>
            </div>
            <Contacts />
          </Col>
        </Row>
      ),
    },
    {
      label: 'Connects',
      key: 'Connects',
      icon: <img src={ConnectsIcon} alt="ConnectsIcon" width={'20px'} height={'20px'} />,
      children: (
        <Row style={{ backgroundColor: '#ffffff' }} className="searchPageDiv__tabs--row">
          <Col span={8} className="searchPageDiv__tabs__col">
            <div className="searchPageDiv__tabs__col__div">
              <img src={FilterIcon} alt="Save All" className="searchPageDiv__tabs__col__div__img" />
              <p className="searchPageDiv__tabs__col__div__para">Save All</p>
            </div>
            <Property />
          </Col>
          <Col span={8} className="searchPageDiv__tabs__col1">
            <div className="searchPageDiv__tabs__col1__div">
              <img src={FilterIcon} alt="Save All" className="searchPageDiv__tabs__col1__div__img" />
              <p className="searchPageDiv__tabs__col1__div__para">Save All</p>
            </div>
            <Organization />
          </Col>
          <Col span={8} className="searchPageDiv__tabs__col2">
            <div className="searchPageDiv__tabs__col2__div">
              <img src={FilterIcon} alt="Save All" className="searchPageDiv__tabs__col2__div__img" />
              <p className="searchPageDiv__tabs__col2__div__para">Save All</p>
            </div>
            <Contacts />
          </Col>
        </Row>
      ),
    },
  ];

  useEffect(() => {
    // if(searchQuery)
    dispatch(fetchPropertyList(searchQuery));
  }, []);

  return (
    <div className="searchPageDiv">
      <Row className="searchPageDiv__row">
        <Col span={8} className="searchPageDiv__row__col">
          <Card className="searchPageDiv__row__col__card">
            <span className="searchPageDiv__row__col__card__span">
              <img src={FilterIcon} alt="filter" className="searchPageDiv__row__col__card__span__img" />
              {`Filters (0 Applied)`}
            </span>
          </Card>
          <Switch
            checkedChildren="Commercial"
            unCheckedChildren="Residential"
            defaultChecked
            className="searchPageDiv__row__col__switch"
          />
        </Col>
        <Col span={10}></Col>
        <Col span={6} className="searchPageDiv__row1__col2">
          <MyWishlist />
        </Col>
      </Row>
      <Row className="searchPageDiv__row1">
        <Col span={18} className="searchPageDiv__row1__col1">
          <Tabs type="card" items={items} className="searchPageDiv__row1__col1__tabs" />
        </Col>
      </Row>
    </div>
  );
};

export default SearchPage;
