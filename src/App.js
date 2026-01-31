import React, { Component } from "react";
import GifSearch from "./components/GifSearch";
import GifList from "./components/GifList";
import "./App.css";

class App extends Component {
  state = {
    searchTerm: "funny", 
  };

  handleSearch = (term) => {
    this.setState({ searchTerm: term });
  };

  render() {
    return (
      <div className="App">
        <h1>Пошук гіфок</h1>
        <GifSearch onSearch={this.handleSearch} />
        <GifList searchTerm={this.state.searchTerm} />
      </div>
    );
  }
}

export default App;
