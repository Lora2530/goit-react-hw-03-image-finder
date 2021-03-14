import React, { Component } from 'react';

import s from './Modal.module.css';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeydown);
    };
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeydown);
    };
    handleKeydown = event => {
        if (event.code === 'Escape') {
            this.props.onClose();
        }
    };
    onOverlayClick = event => {
        if (event.target === event.currentTarget) {
          this.props.onClose();
        }
    };
    render() {
        return createPortal(
          <div className="Overlay" onClick={this.onOverlayClick}>
            <div className="Modal">{this.props.children}</div>
          </div>,
          modalRoot,
        );
    }
}
Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };
  
export default Modal;
