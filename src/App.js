import React from "react";
import "./App.css";
import axios from "axios";
import styled from "styled-components";

const Header = styled.div`
    max-width:756px;
    background-color:blue;
    padding-left: 12px;
    padding-right: 12px;
    display: block;
    padding-top: 12px;

`;

const SiteName = styled.div`
    background-color: #f7df1e;
    padding: 4px 8px;
    float: left;
`



const Container = styled.div`
    background-color: blue;
    padding: 50px;
`;

const StoryList = styled.li`
    background-color: #f8f7f5;
`;

class App extends React.Component {
    state = {
        topStories: []
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
                    });

                    return this.state;
                });
            })
            .catch(error => console.log(error));
    }

    render() {
        const { topStories } = this.state;
        return (
            <div>
            <Header>
                <SiteName>Hacker News</SiteName>
                </Header>
                <Container>
                    <StoryList>
                        {topStories.map(story => (
                            <li key={story.id}>
                                by: {story.by}
                                title: {story.title}
                                website: {story.url}
                            </li>
                        ))}
                    </StoryList>
                </Container>
            </div>
        );
    }
}

export default App;
