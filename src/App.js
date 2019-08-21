import React from "react";
import "./App.css";
import axios from "axios";
import styled from "styled-components";

const Page = styled.div`
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    margin: 0;
`;
const Container = styled.div`
    flex-direction: column;
`;
const Header = styled.div`
    padding-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    line-height: 1em;
    font-weight: 500;
    font-family: "-apple-system,BlinkMacSystemFont,Helvetica,sans-serif";
`;
const SiteName = styled.div`
    background-color: #f7df1e;
    padding: 4px 8px;
`;
const Body = styled.div`
    font-family: "-apple-system,BlinkMacSystemFont,Helvetica,sans-serif";
`;

const StoryList = styled.div`
    background-color: #f8f7f5;
`;

const Story = styled.section`
    margin-top: 28px;
    margin-bottom: 28px;
    max-width: 570px;
    padding: 0px 15px;
    justify-self: center;
`;
const Atag = styled.a`
    text-decoration: none;
    color: #3366aa;
    border-bottom-width: 1px;
    font-size: 20px;
    line-height: 1.4em;
    border-bottom-style: solid;
    border-bottom-color: #ddd;
`;
const Author = styled.p`
    font-size: 14px;
    color: #5a5a5a;
    margin-top: 4px;
    margin-bottom: 0.8em;
    text-transform: uppercase;
    line-height: 1.2em;
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
            <Page>
                <Container>
                    <Header>
                        <SiteName>Hacker News</SiteName>
                    </Header>
                    <Body>
                        <StoryList>
                            {topStories.map(story => (
                                <Story key={story.id}>
                                    <Atag href={story.url}>{story.title}</Atag>
                                    <Author>{story.by}</Author>
                                </Story>
                            ))}
                        </StoryList>
                    </Body>
                </Container>
            </Page>
        );
    }
}

export default App;
