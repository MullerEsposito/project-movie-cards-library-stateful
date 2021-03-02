import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchBar from './SearchBar';
import MovieList from './MovieList';
import AddMovie from './AddMovie';

class MovieLibrary extends Component {
  constructor(props) {
    super(props);
    const { movies } = this.props;

    this.state = {
      searchText: '',
      bookmarkedOnly: false,
      selectedGenre: '',
      movies,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClickAddMovie = this.handleOnClickAddMovie.bind(this);
  }

  handleOnChange({ target }) {
    const { movies } = this.props;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    const regexTitle = new RegExp(`.*${value}.*`, 'i');
    const moviesFiltered = value !== ''
      ? movies.filter((movie) => movie.title.match(regexTitle))
      : movies;

    this.setState({
      [name]: value,
      movies: moviesFiltered,
    });
  }

  handleOnClickAddMovie(movie) {
    const { movies } = this.props;

    this.setState({ movies: [...movies, movie] });
  }

  render() {
    const { searchText, bookmarkedOnly, selectedGenre, movies } = this.state;
    return (
      <div>
        <SearchBar
          searchText={ searchText }
          checked={ bookmarkedOnly }
          selectedGenre={ selectedGenre }
          onSearchTextChange={ this.handleOnChange }
          onBookMarkedChange={ this.handleOnChange }
          onSelectedGenreChange={ this.handleOnChange }
        />
        <MovieList movies={ movies } />
        <AddMovie onClick={ this.handleOnClickAddMovie } />
      </div>
    );
  }
}

MovieLibrary.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      subtitle: PropTypes.string,
      title: PropTypes.string,
      imagePath: PropTypes.string,
      storyline: PropTypes.string,
      rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      genre: PropTypes.string,
    }),
  ).isRequired,
};

export default MovieLibrary;
