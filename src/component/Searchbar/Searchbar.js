import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    query: '',
  };

  // МЕТОДЫ
  handleChange = event => {
    this.setState({
      query: event.currentTarget.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    //  передача  props onSubmit из App.js для обработки действий когда будет изменяться query
    this.props.onSubmit(this.state.query);

    //   обновление input
    this.setState({
      query: '',
    });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;