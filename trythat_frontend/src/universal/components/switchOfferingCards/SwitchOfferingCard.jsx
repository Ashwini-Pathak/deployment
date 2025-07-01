import { Card, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import './switchOfferingCard.scss';
import { useNavigate } from 'react-router';
import { TeamOutlined, UserOutlined } from '@ant-design/icons';

const SwitchOfferingCard = ({ data }) => {
  const { crmData, okrData, fmsData } = useSelector((store) => store.userDashboard);
  const navigate = useNavigate();
  const cardStyle = {
    width: '250px',
    border: data?.border || '',
    backgroundColor: data?.background || '',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  };

  const contentStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px',
    justifyContent: 'center',
  };

  const handleRedirect = (item) => {
    switch (item?.label) {
      case 'CRM Tool':
        window.open(crmData?.url, '_blank').focus();
        break;
      case 'EasyOKR':
        window.open(okrData?.url, '_blank').focus();
        break;
      case 'FMS':
        window.open(fmsData?.url, '_blank').focus();
        break;
      case 'Social App':
        navigate(item?.url);
        break;
      default:
        window.open(item?.route, '_blank').focus();
        break;
    }
  };

  return (
    <Card className="card_style" style={cardStyle} onClick={() => handleRedirect(data)}>
      <div style={contentStyle}>
        {data?.label == 'Social App' ? (
          <TeamOutlined className="font22" />
        ) : (
          <img className="card_image" src={data?.imgUrl} alt="offering" />
        )}
        <h1 className="card_font" style={{ color: data?.color || '' }}>
          {data?.label}
        </h1>
      </div>
      {data?.desc && (
        <Tag className="card_tag" style={{ backgroundColor: data?.descColor, marginLeft: '7rem' }}>
          {data?.desc}
        </Tag>
      )}
    </Card>
  );
};

export default SwitchOfferingCard;
