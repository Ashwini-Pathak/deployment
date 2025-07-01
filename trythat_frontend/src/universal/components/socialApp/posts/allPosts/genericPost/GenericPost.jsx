import React from 'react';
import Text from 'antd/es/typography/Text';
import CommonButton from '../../../common/CommonButton';
import ImageCarousel from './ImageCarousel';

import './genericPost.scss';

const GenericPost = ({ postDetails }) => {
  const defaultImage = 'https://placehold.jp/18/1677ff/ffffff/200x200.png?text=TryThat.ai';

  return (
    <>
      <div className="generic_post_content ">
        <div className="generic_post_images">
          {postDetails?.imageUrls && postDetails.imageUrls.length > 0 ? (
            <ImageCarousel className="carousel-image" imageUrls={postDetails.imageUrls || []} />
          ) : (
            <img src={defaultImage} alt="Default Post Image" className="default-post-image" />
          )}
        </div>
        <div
          style={{
            display: 'grid',
            gridAutoRows: 'max-content',
            gap: ' 6px',
            flex: '1',
            overflow: 'scroll',
            marginTop: '24px',
            paddingBottom: '24px',
          }}
        >
          <Text className="font14 fontDark font700">{postDetails?.title}</Text>
          <Text className="font14 fontExtraLight">{postDetails?.body}</Text>
          <span style={{ display: 'flex', flexWrap: 'wrap' }} className="d-flex font500 fontExtraLight g-5">
            {postDetails?.tags?.map((elem, index) => (
              <span style={{ flex: 'none' }} key={index} className=" font14 font500 fontExtraLight g-15">
                #{elem}
              </span>
            ))}
          </span>

          {postDetails?.CTA && (
            <CommonButton style={{ width: '90px' }} target="_blank" href={postDetails?.CTA?.link}>
              {postDetails?.CTA?.name}
            </CommonButton>
          )}
        </div>
      </div>
    </>
  );
};

export default GenericPost;
