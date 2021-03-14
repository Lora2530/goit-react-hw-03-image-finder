import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default class App extends React.Component {
    render() {
      return (
              <Loader
                visible={this.props.isLoading}
                type="Puff"
                color="#00BFFF"
                height={50}
                width={50}
                timeout={0} 
              />        
      );
    }
  }