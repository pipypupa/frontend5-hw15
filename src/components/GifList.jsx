import React, { Component } from "react";
import axios from "axios";

const API_KEY = "R87gwnQsFKPj40m6nuer5iMGkd2OuzI2";
const LIMIT = 9;

class GifList extends Component {
  state = {
    gifs: [],
    offset: 0,
  };

  componentDidMount() {
    this.fetchGifs(this.props.searchTerm);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.setState({ offset: 0 }, () => this.fetchGifs(this.props.searchTerm));
    }
  }

  fetchGifs = (term) => {
    const { offset } = this.state;
    axios
      .get("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: API_KEY,
          q: term,
          limit: LIMIT,
          offset: offset,
        },
      })
      .then((response) => {
        this.setState({ gifs: response.data.data });
      })
      .catch((error) => {
        console.error("Помилка при завантаженні гіфок:", error);
      });
  };

  handleNext = () => {
    this.setState(
      (prevState) => ({ offset: prevState.offset + LIMIT }),
      () => this.fetchGifs(this.props.searchTerm),
    );
  };

  handlePrev = () => {
    this.setState(
      (prevState) => ({
        offset: Math.max(prevState.offset - LIMIT, 0),
      }),
      () => this.fetchGifs(this.props.searchTerm),
    );
  };

  render() {
    return (
      <div className="gif-list-container">
        <div className="gif-list">
          {this.state.gifs.map((gif) => (
            <img
              key={gif.id}
              src={gif.images.fixed_height.url}
              alt={gif.title}
            />
          ))}
        </div>
        <div className="pagination">
          <button onClick={this.handlePrev} disabled={this.state.offset === 0}>
            Назад
          </button>
          <button onClick={this.handleNext}>Далі</button>
        </div>
      </div>
    );
  }
}

export default GifList;
