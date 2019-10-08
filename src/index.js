import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

let wordList = [
  {
    text: "日曜日",
    reading: "nichiyoubi",
    kana: "にちようび"
  },
  {
    text: "土曜日",
    reading: "doyoubi",
    kana: "どようび"
  },
  {
    text: "月曜日",
    reading: "getsuyoubi",
    kana: "げつようび"
  },
  {
    text: "火曜日",
    reading: "kayoubi",
    kana: "かようび"
  },
  {
    text: "水曜日",
    reading: "suiyoubi",
    kana: "すいようび"
  },
  {
    text: "木曜日",
    reading: "mokuyoubi",
    kana: "もくようび"
  },
  {
    text: "金曜日",
    reading: "kinyoubi",
    kana: "きんようび"
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordList: this.props.wordList,
      word: "",
      value: "",
      streak: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  UNSAFE_componentWillMount() {
    let randomNum = Math.floor(
      Math.random() * Math.floor(this.state.wordList.length)
    );
    this.setState({ word: wordList[randomNum] });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    let streak = this.state.streak;
    let randomNum = Math.floor(Math.random() * Math.floor(wordList.length));
    if (
      this.state.word.reading === this.state.value ||
      this.state.word.kana === this.state.value
    ) {
      console.log("That was correct!");
      streak = streak + 1;
      wordList.map(word => {
        if (word.text === this.state.value || word.kana === this.state.value) {
          let index = wordList.indexOf(word);
          wordList.splice(index, 1);
        }
      });
    } else {
      streak = 0;
    }
    this.setState({ word: wordList[randomNum], value: "", streak: streak });
  }
  render() {
    return (
      <div className="App">
        <h1>{this.state.word.text}</h1>
        <form onSubmit={this.onFormSubmit}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button type="submit" hidden>
            Submit
          </button>
        </form>
        <p>Streak: {this.state.streak}</p>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App wordList={wordList} />, rootElement);
