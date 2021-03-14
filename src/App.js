import React, { Component } from 'react';


import Searchbar from './component/Searchbar/Searchbar';

import ImageGallery from './component/ImageGallery/ImageGallery';

import Loader from './component/Loader/Loader';

import Button from './component/Button/Button';




import galleryApi from './component/galleryApi';

class App extends Component {
  state = {
    gallery: [],
    currentPage: 1,
    perPage: 12,

    searchQuery: 'spring', 
    isLoading: false,
    error: null, 
  };

  
  componentDidMount() {
    this.fetchImages();
  }
  componentDidUpdate(prevProps, prevState) {
    
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  
  changeQuery = query => {
   

    
    this.setState({
      searchQuery: query,
      currentPage: 1,
      gallery: [],

      totalHits: null,
      error: null, //для catch
    });
  };

  
  fetchImages = () => {
    const { searchQuery, currentPage, perPage } = this.state;

    
    const options = { searchQuery, currentPage, perPage };

    
    this.setState({ isLoading: true });

    
    galleryApi
      .fetchImages(options)

      .then(({ hits, totalHits }) => {
        
        if (hits.length === 0) {
          throw new Error('Error fetching data');
        }

        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...hits],
          totalHits,

          
          currentPage: prevState.currentPage + 1,
        }));

        
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => this.setState({ error }))
      
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const {
      gallery,
      currentPage,
      perPage,
      isLoading,
      totalHits,
      error,
    } = this.state;

    //   должен ли отображаться Load more и спиннер, если закончились images
    const shouldRenderLoadMoreButton = gallery.length > 0 && !isLoading;

    const hideLoadMoreButton = totalHits > (currentPage - 1) * perPage;
    // console.log('perPage:', perPage);
    // console.log('currentPage:', currentPage);

    return (
      <div className="App">
        {/* Searchbar. В props передаем метод, который будет отрабатываться при submit формы */}
        <Searchbar onSubmit={this.changeQuery} />
        {/* ImageGallery */}
        <ImageGallery gallery={gallery} />

        {/* Loader {/* появление спиннера, рендерим по условию  */}
        {isLoading && <Loader />}

        {/* Button Load more. Рендер по условию */}
        {shouldRenderLoadMoreButton && hideLoadMoreButton && (
          <Button onClick={this.fetchImages}>
            <Loader />
          </Button>
        )}

        {/* для обработки ошибок (error), рендер по условию */}
        {error && (
          <h2 className="ErrorMessage">
            Something get wrong! Please, try again!
          </h2>
        )}
      </div>
    );
  }
}

export default App;