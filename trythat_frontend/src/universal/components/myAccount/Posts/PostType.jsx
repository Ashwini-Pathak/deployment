import React from 'react';
import { Card, Button, Row, Col } from 'antd';
import genericPostImage from '../../../../assets/images/genericPostImage.png';
import './PostType.scss';
import { createPostTypes } from '../../socialApp/posts/addPost/posts.utils';

const PostType = ({ disabled, onCardClick, selectedCard, setShowForm }) => {
  const cards = [
    { title: 'Card 1', enable: true, description: 'News / Generic / Report', image: genericPostImage },
    { title: 'Card 2', description: 'Lead / Ask Card', image: genericPostImage },
    { title: 'Card 3', description: 'Ad Card', image: genericPostImage },
    { title: 'Card 4', description: 'Job Card', image: genericPostImage },
    { title: 'Card 5', description: 'Poll Card', image: genericPostImage },
  ];

  const handleOnClick = (card) => {
    onCardClick(card);
    setShowForm(true);
  }

  return (
    <>
      <h2 className="title">Select a Post Type:</h2>
      <h3 className="title">Please select the respective post tile and click "Next"</h3>
      <div className="cards-component">
        <Row className="g-10" gutter={[24, 24]}>
          {createPostTypes.map((card, index) => {
            const Icon = card?.icon;
            return (
              <div
                key={index}
                style={!card?.enable ? { opacity: 0.4, pointerEvents: 'none' } : {}}
                onClick={handleOnClick}
                className={`postCard `}
              >
                <img
                  src={Icon}
                  className={`img ${selectedCard?.key === card?.key && !disabled ? 'highlighted-card' : ''}`}
                />
                {/* <img
                  alt={card.title}
                  className={` ${selectedCard?.title === card?.title && !disabled ? 'highlighted-card' : ''}`}
                  src={card.image}
                /> */}
                <span className="font14 d-flex fontDark font700">{card.label}</span>
              </div>
            );
          })}
        </Row>
      </div>
    </>
  );
};

export default PostType;
