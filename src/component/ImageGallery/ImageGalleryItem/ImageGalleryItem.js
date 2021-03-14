import React from 'react';

import PropTypes from 'prop-types';

import './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ imgSrc, imgAlt, largeSrc, onImgClick }) => {
      return (
        <li className="ImageGalleryItem">
      <img
        src={imgSrc}
        alt={imgAlt}
        // width="320"
        className="ImageGalleryItem-image"
        onClick={() => {
          onImgClick(largeSrc, imgAlt);
        }}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  previewUrl: propTypes.string,
  imageUrl: propTypes.string,
  onClickImage: propTypes.func,
}
export default ImageGalleryItem;