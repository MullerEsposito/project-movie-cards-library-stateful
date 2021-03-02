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
    const { movies: moviesOrigin } = this.props;

    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({ movies: moviesOrigin });

    if (['bookmarkedOnly', 'selectedGenre'].includes(name)) this.setState({ [name]: value });

    this.setState(({ bookmarkedOnly, movies }) => {
      if (bookmarkedOnly) {
        return { movies: movies.filter((movie) => movie.bookmarked) };
      }
      return { movies: moviesOrigin };
    });

    this.setState(({ selectedGenre, movies }) => {
      if (selectedGenre) return ({ movies: movies.filter(({ genre }) => selectedGenre === genre) });
    });

    this.setState(({ searchText, movies }) => {
      const regex = new RegExp(`.*${searchText}.*`, 'i');
      const moviesFiltered = movies.filter(({ title, subtitle, storyline }) => (
        title.concat(subtitle, storyline).match(regex)
      ));

      if (!searchText) return this.setState({ [name]: value });

      return { movies: moviesFiltered, [name]: value };
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
          bookmarkedOnly={ bookmarkedOnly }
          selectedGenre={ selectedGenre }
          onSearchTextChange={ this.handleOnChange }
          onBookmarkedChange={ this.handleOnChange }
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
      bookmarked: PropTypes.bool,
      genre: PropTypes.string,
    }),
  ).isRequired,
};

export default MovieLibrary;
