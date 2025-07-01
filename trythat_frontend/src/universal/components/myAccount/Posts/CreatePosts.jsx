import React, { useEffect, useState } from 'react';
import PostType from './PostType';
import PostForm from './PostForm';

const CreatePost = ({ hidePostType = false, setActiveTab, isCompany, postRel }) => {
  const [disabled, setDisabled] = useState(true);
  const [card, setSelectedCard] = useState({});
  const [showForm, setShowForm] = useState(false);
  const onCardClick = (newCard) => {
    if (card?.key === newCard?.key) {
      setDisabled(!disabled);
    } else {
      setDisabled(false);
    }
    setSelectedCard(newCard);
  };

  useEffect(() => {
    if (!showForm) {
      setSelectedCard({});
      setDisabled(true);
    }
  }, [showForm, hidePostType]);

  return (
    <>
      {showForm || hidePostType ? (
        <PostForm
          postRel={postRel}
          setActiveTab={setActiveTab}
          isCompany={isCompany}
          description={card?.description}
          setShowForm={setShowForm}
        />
      ) : (
        <PostType onCardClick={onCardClick} disabled={disabled} setShowForm={setShowForm} selectedCard={card} />
      )}
    </>
  );
};

export default CreatePost;
