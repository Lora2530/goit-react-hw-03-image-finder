import React, { Component } from 'react';

import PropTypes from 'prop-types';

// Components
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

import Modal from '../Modal/Modal';



class ImageGallery extends Component {
  state = {
    showModal: false, // для Модального окна
    largeSrc: '',
    imgAlt: '',
  };
  
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

 
  onImgClick = (largeSrc, imgAlt) => {

    this.toggleModal();

    this.setState({ largeSrc, imgAlt });
  };

  render() {
    const { gallery } = this.props;

    const { showModal, largeSrc, imgAlt } = this.state;

    return (
      <>
        <ul className="ImageGallery">
          {/* Набор <li> с изображениями */}
          {gallery.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              imgSrc={webformatURL}
              imgAlt={tags}
              largeSrc={largeImageURL}
              onImgClick={this.onImgClick}
            />
          ))}
        </ul>

        {/* Modal window. Открытие по условию*/}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeSrc} alt={imgAlt} />
          </Modal>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageGallery;