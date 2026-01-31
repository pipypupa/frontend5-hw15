import React, { Component } from "react";

class GifSearch extends Component {
  state = {
    input: "",
  };

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSearch(this.state.input);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="gif-search">
        <input
          type="text"
          placeholder="Введіть ключове слово"
          value={this.state.input}
          onChange={this.handleChange}
        />
        <button type="submit">Пошук</button>
      </form>
    );
  }
}

export default GifSearch;
