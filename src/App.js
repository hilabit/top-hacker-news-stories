import React from "react";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  state = {
    topStories:[]
  };

  componentDidMount() {
    axios
      .get("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
      .then(({ data }) => {

        const topStoriesIds = data.slice(0, 10);

        topStoriesIds
          .map(storyId => {
            const storyEndpoint = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`;
            axios.get(storyEndpoint).then(response => {
              this.setState({topStories: response.data})
            })
            return this.state;
        })
        console.log(this.state.topStories);
        })
          .catch(error =>
            console.log(error));
  }


  render() {
      const {topStories} = this.state
      const {id, title, by, url} = topStories;
    return (
        <div>
        {Object.keys(topStories).map((story, id) =>
            (
                <ul>
                <li key={id}>
                {url}
                </li>
                </ul>
            )
        )}
        </div>

    );
}
}



export default App;
