import React, { useState, useCallback } from 'react';
import './ImageCarousel.scss';

const ImageCarousel = ({ imageUrls = [], className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1));
  }, [imageUrls.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1));
  }, [imageUrls.length]);

  const goToIndex = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const defaultImage = 'https://via.placeholder.com/600x400?text=Default+Image';
  const image = imageUrls.length > 0 ? imageUrls : [defaultImage];

  return (
    <div className={`carousel ${className}`}>
      <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)`, height: 'inherit' }}>
        {imageUrls.map((url, index) => (
          <div key={index} className={`carousel-item ${index === currentIndex ? 'active' : ''}`}>
            <img src={url} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
      {imageUrls.length > 1 && (
        <div className="carousel-dots">
          {imageUrls.map((url, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToIndex(index)}
            ></button>
          ))}
        </div>
      )}
      {imageUrls.length > 1 && currentIndex > 0 && (
        <button className="carousel-control prev" onClick={goToPrevious}>
          &#10094;
        </button>
      )}
      {imageUrls.length > 1 && currentIndex < imageUrls.length - 1 && (
        <button className="carousel-control next" onClick={goToNext}>
          &#10095;
        </button>
      )}
    </div>
  );
};

export default ImageCarousel;
