import { Card, Rate, Space } from 'antd';
import Text from 'antd/es/typography/Text';
import dayjs from 'dayjs';
import './Reviews.scss';

const Reviews = ({ averageRating = 0, reviewsList }) => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Text style={{ marginBottom: '0px', fontWeight: '900' }}>Reviews</Text>
      <Text className="averageRating">
        Average Rating:{' '}
        <Rate allowHalf defaultValue={0} value={averageRating} style={{ backgroundColor: 'transparent' }} disabled />
      </Text>
      <div style={{ height: '110px', overflowY: 'scroll' }}>
        {reviewsList?.map((item) => {
          return (
            <Card
              className="reviews__card"
              style={{
                border: '1px solid #F0F8FF',
                borderRadius: '10px',
                backgroundColor: '#F0F8FF',
                marginBottom: '10px',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                  }}
                  className="averageRating"
                >
                  <Rate
                    allowHalf
                    defaultValue={0}
                    value={item?.rating}
                    style={{ backgroundColor: 'transparent', margin: '10px 0px 30px 0px' }}
                    disabled
                  />
                  <span style={{ color: '#6E6E6E', fontSize: '12px' }}>
                    {dayjs(item?.timestamp).format('DD-MM-YYYY hh:mm')}
                  </span>
                </div>
                <p style={{ color: '#313131', marginTop: '10px', fontSize: '12px' }}>{item?.comment}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </Space>
  );
};

export default Reviews;
