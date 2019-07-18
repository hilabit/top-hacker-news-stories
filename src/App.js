import React from "react";
import "./App.css";
import axios from "axios";

class App extends React.Component {
    state = {
        topStories:[]
    };

    componentDidMount() {
        axios
            .get("https://hacker-news.firebaseio.com/v0/topstories.json")
            .then(({ data }) => {
                const topStoriesIds = data.slice(0, 10);

                topStoriesIds.map(storyId => {
                    const storyEndpoint = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`;
                    axios.get(storyEndpoint).then(response => {
                        const { id, title, by, url } = response.data;
                        const { topStories } = this.state;
                        this.setState({
                            topStories: [
                                ...topStories,
                                {
                                    id: id,
                                    title: title,
                                    by: by,
                                    url: url
                                }
                            ]
                        });
                        // console.log(this.state.topStories);
                        // const {topStories} = this.state

                        // const story = topStories.map(story => story)
                        // console.log("story", story);
                    });

                    return this.state;
                });
            })
            .catch(error => console.log(error));
    }

    render() {
        // const id = this.state.topStories.id
        const {topStories} = this.state;


        //   console.log("object.keys", Object.keys(this.state.topStories[keys]));
        //   const topStories = Object.keys(this.state.topStories).map((keys) => {
        //       console.log(this.state.topStories[keys])
        //
        // })
        // console.log(topStories);

        return <div>
        {topStories.map((story) => (
            <li key={story.id}>
             by: {story.by} 
         title: {story.title}
            website: {story.url}
            </li>
        ))}
        </div>
    }
}

export default App;
