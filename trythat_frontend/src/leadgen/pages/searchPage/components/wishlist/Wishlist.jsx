import { Button, Divider, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';
import search_organization from '../../../../../assets/images/org2.svg';
import wall from '../../../../../assets/images/WALL.svg';
import person from '../../../../../assets/images/person.svg';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router';
import { setSelectedNav } from '../../../../features/leadGenSideNavSlice';

const Wishlist = ({ wishlist }) => {
  const { Text } = Typography;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedNav } = useSelector((store) => store.leadGenSideNav);

  const { userPoints } = useSelector((store) => store.userOnboarding);
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    if (isEmpty(wishlist)) return;
    setAmount(wishlist.totalPoints);
  }, [wishlist]);

  // const getPoints = () => {
  //   return parseInt(userPoints) - parseInt(amount) < 0
  //     ? Math.abs(parseInt(userPoints) - parseInt(amount))
  //     : parseInt(userPoints) - parseInt(amount);
  // };
  return (
    <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '20px',
          justifyContent: 'left',
          background: '#F0F0F0',
          padding: '0px 0px 0px 15px',
          overflowY: 'scroll',
          height: '100%',
        }}
      >
        <img src={wall} style={{ width: '20px' }} alt="" />
        <Text style={{ fontSize: '18px' ,fontWeight: '600'}}>My Wishlist</Text>
      </div>
      <div style={{ padding: '20px', maxHeight: '640px', overflowY: 'scroll' }}>
        <Text disabled style={{ fontSize: '13px' }}>
          This space is your Wishlist!
        </Text>
        <br />
        <br />
        <Text disabled style={{ fontSize: '13px' }}>
          Here you will be able to view all your saved leads and respective coins to unlock them.
        </Text>
        <Divider style={{ margin: '15px 0px 15px 0px' }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Text style={{ fontSize: '16px', margin: '0px',fontWeight:'600' }}>Total Saved Leads</Text>
          <Text style={{ fontSize: '12px', margin: '0px' }} disabled>
            As of today
          </Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
          <Space>
            <img src={person} alt="connects" style={{ width: '29px' }} />
            <Text>Connects</Text>
          </Space>
          <Text style={{ fontSize: '28px', color: '#0081FC',fontWeight: 700 }}>{wishlist?.connects || 0}</Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Space>
            <img  style={{width :'26px'}} src={search_organization} alt="organizations" />
            <Text>Organizations</Text>
          </Space>
          <Text style={{ fontSize: '28px', color: '#F2C877' ,fontWeight: 700}}>{wishlist?.organization || 0}</Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Space>
            <img src={wall} alt="properties" />
            <Text>Properties</Text>
          </Space>
          <Text style={{ fontSize: '28px', color: '#7D66FC',fontWeight: 700 }}>{wishlist?.properties || 0}</Text>
        </div>
        <Divider style={{ margin: '10px 0px 15px 0px' }} />
        <Text disabled style={{ fontSize: '13px' }}>
          The selected leads are worth of <br />
          total &nbsp;
          <Text style={{ fontSize: '18px',fontWeight: 700 }}>{amount}</Text>
        </Text>
        <Divider style={{ margin: '20px 0px 20px 0px' }} />
        <Button
          block
          style={{ height: '40px', fontSize: '16px', color: '#132056' }} 
         
          onClick={() => {
            navigate('/leadgen/contactbook')
            dispatch(setSelectedNav('ContactBook'));
          }}
         >
          View All Leads
        </Button>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ marginTop: '20px' }} disabled>
            You need additional
          </Text>
          <Text style={{ fontSize: '30px', color: '#0081FC' ,fontWeight: 700}}>
            {parseInt(userPoints) - parseInt(amount) < 0 ? Math.abs(parseInt(userPoints) - parseInt(amount)) : 0}
          </Text>
          <Text style={{ fontSize: '20px', color: '#0081FC' }}>Points</Text>
          <Text disabled style={{ marginTop: '10px', fontSize: '13px' }}>
            Buy them now at only Rs. XXX/-
          </Text>
          <Button type="primary" block style={{ height: '40px', fontSize: '18px', marginTop: '10px' }}>
            Buy Points NOW!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
