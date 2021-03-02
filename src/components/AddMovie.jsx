import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddMovie extends Component {
  constructor() {
    super();
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleButtonOnClick = this.handleButtonOnClick.bind(this);
    this.state = {
      subtitle: '',
      title: '',
      imagePath: '',
      storyline: '',
      rating: 0,
      genre: '',
    };
  }

  handleInputOnChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleButtonOnClick() {
    const { onClick } = this.props;
    onClick(this.state);

    this.setState({
      subtitle: '',
      title: '',
      imagePath: '',
      storyline: '',
      rating: 0,
      genre: '',
    });
  }

  renderInputTitle() {
    const { title } = this.state;
    return (
      <label data-testid="title-input-label" htmlFor="title-input">
        Título
        <input
          name="title"
          data-testid="title-input"
          value={ title }
          onChange={ this.handleInputOnChange }
        />
      </label>
    );
  }

  renderInputSubTitle() {
    const { subtitle } = this.state;
    return (
      <label data-testid="subtitle-input-label" htmlFor="subtitle-input">
        Subtítulo
        <input
          name="subtitle"
          data-testid="subtitle-input"
          value={ subtitle }
          onChange={ this.handleInputOnChange }
        />
      </label>
    );
  }

  renderInputImage() {
    const { imagePath } = this.state;
    return (
      <label data-testid="image-input-label" htmlFor="image-input">
        Imagem
        <input
          name="imagePath"
          data-testid="image-input"
          value={ imagePath }
          onChange={ this.handleInputOnChange }
        />
      </label>
    );
  }

  renderInputStoryline() {
    const { storyline } = this.state;
    return (
      <label data-testid="storyline-input-label" htmlFor="storyline-input">
        Sinopse
        <textarea
          name="storyline"
          data-testid="storyline-input"
          value={ storyline }
          onChange={ this.handleInputOnChange }
        />
      </label>
    );
  }

  renderInputRating() {
    const { rating } = this.state;
    return (
      <label data-testid="rating-input-label" htmlFor="rating-input">
        Avaliação
        <input
          type="number"
          name="rating"
          data-testid="rating-input"
          onChange={ this.handleInputOnChange }
          value={ rating }
        />
      </label>
    );
  }

  renderInputGenre() {
    const { genre } = this.state;
    return (
      <label data-testid="genre-input-label" htmlFor="genre-input">
        Gênero
        <select
          name="genre"
          data-testid="genre-input"
          value={ genre }
          onChange={ this.handleInputOnChange }
        >
          <option data-testid="genre-option" value="action">Ação</option>
          <option data-testid="genre-option" value="comedy">Comédia</option>
          <option data-testid="genre-option" value="thriller">Suspense</option>
        </select>
      </label>
    );
  }

  renderSendButton() {
    return (
      <button
        type="button"
        data-testid="send-button"
        onClick={ this.handleButtonOnClick }
      >
        Adicionar filme
      </button>
    );
  }

  render() {
    return (
      <form data-testid="add-movie-form">
        { this.renderInputTitle() }
        { this.renderInputSubTitle() }
        { this.renderInputImage() }
        { this.renderInputStoryline() }
        { this.renderInputRating() }
        { this.renderInputGenre() }
        { this.renderSendButton() }
      </form>
    );
  }
}

AddMovie.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddMovie;
