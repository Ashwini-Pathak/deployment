import React from 'react';
import './cards.scss';
const CommonCard = ({ label, children }) => {
  return (
    <div className="commonCard">
      <span className="title fontExtraDark">{label}</span>
      {children}
    </div>
  );
};

export default CommonCard;
