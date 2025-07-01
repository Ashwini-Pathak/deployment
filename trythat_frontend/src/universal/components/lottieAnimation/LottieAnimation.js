import React from 'react';
import Lottie from 'react-lottie';

const LottieAnimation = ({ height, width, animationData, loop = false }) => {
  const defaultOptions = {
    loop: loop,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return <Lottie options={defaultOptions} height={height} width={width} />;
};

export default LottieAnimation;
