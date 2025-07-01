import { Card, Spin, Typography } from 'antd';
import { Outlet } from 'react-router';
import man from '../../assets/man.png';
import './defaultLayout.scss';

const DefaultLayout = ({ loading }) => {
  const { Title } = Typography;
  return (
    <>
      {loading ? (
        <Spin spinning={loading} size="large" fullscreen />
      ) : (
        <section className='page-container'>
          <div
            className="page-container__left"
          >
            <img src={man} width={'65%'} alt="" />
            <div  className='left-item'>
              <Title className='left-item__title'>A Lead Generation Platform</Title>
              <Title
                level={3}
                className='left-item__slogan'
              >
                tailored specifically for your needs.
              </Title>
              <Title
                level={4}
                className='left-item__desc'
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
              </Title>
            </div>
          </div>

          <div
            className="page-container__right" 
          >
            <div>
              <Card className='right-card'
              >
                <Outlet />
              </Card>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default DefaultLayout;
