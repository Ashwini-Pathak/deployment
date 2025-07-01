import { Space } from 'antd';
import Title from 'antd/es/typography/Title';
import { isEmpty } from 'lodash';
import './PhotoGallery.scss';
const PhotoGallery = ({ photos }) => {
  return (
    <>
      <Space direction="vertical" classNames="photogallery-container">
        <Title level={5}>Photo Gallery</Title>
        <div className="photogallery-container__imgbox">
          {photos?.map((img) => (
            <img
              src={img}
              alt="photogallery"
              className="photogallery-container__imgbox-img"
              onError={(e) =>
                (e.target.src = 'https://s3.ap-south-1.amazonaws.com/trythatai.dev/image_2024_03_10T18_24_42_397Z.png')
              }
            />
          ))}
        </div>
      </Space>
    </>
  );
};

export default PhotoGallery;
