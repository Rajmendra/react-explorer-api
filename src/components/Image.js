import React from 'react';
import PlaceHolder from '../assests/noimg.jpg';

const ApiImg = ({ url, className }) => (
  <img
    className={className}
    src={url ?? PlaceHolder}
    alt="API Logo"
    onError={(e) => {
      e.target.src = PlaceHolder;
    }}
  />
);

export default ApiImg;