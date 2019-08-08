import React from "react";
import "./App.css";
import axios from "axios";
import styled from "styled-components";



const Header = styled.div`
    max-width:756px;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 12px;
    line-height: 1.0em;
    font-weight: 500;
    margin: 15px 0px;
    position: relative;
    left: 162px;
`;

const SiteName = styled.div`
    background-color: #f7df1e;
    padding: 4px 8px;
    float: left;
`;

const Body = styled.div`
    display: flex;
    padding: 50px;
    max-width:756px;
    font-family: '-apple-system,BlinkMacSystemFont,Helvetica,sans-serif';
`;

const Container = styled.div`
    max-width:756px;
`


const StoryList = styled.div`
    background-color: #f8f7f5;
    max-width:756px;
    padding: opx 15px;
    display: flex;
    flex-direction: column;

`;

const Story = styled.section`
    margin-top: 28px;
    margin-bottom: 28px;
    max-width:570px;
    padding: opx 15px;

`
const Atag = styled.a`
    text-decoration:none;
    color: #3366AA;
    border-bottom-width: 1px;
    font-size: 20px;
    line-height: 1.4em;
    font-family:'-apple-system,BlinkMacSystemFont,Helvetica,sans-serif'
`
const Author = styled.p`
    font-size: 14px;
    color: #5A5A5A;
    margin-top: 4px;
    margin-bottom: 0.8em;
    text-transform: uppercase;
    line-height: 1.2em;

`




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
                <Body>
                    <Container>
                        <StoryList>
                            {topStories.map(story => (
                                <Story key={story.id}>
                                <Atag href = {story.url}>{story.title}</Atag>
                                <Author>{story.by}</Author>
                                </Story>
                            ))}
                        </StoryList>
                    </Container>
                </Body>
            </div>
        );
    }
}

export default App;
