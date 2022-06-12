import React from "react";
import './App.css';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

class App extends React.Component<IProps, IState, ISnapshot> {

  constructor(props: any) {
    super(props);
    this.state = {
      news: new Array<NewsItemVM>()
    };
  }

  componentDidMount() {
    //load first page of news
    this.getNewsPageAsync(1);
  }

  getNewsPageAsync(page: number) {
    this.fetchNewsPageAsync(page).then(newsList => {
      this.setState({
        news: newsList
      });
    }).catch(error => {
      throw error;
    })
  }

  async fetchNewsPageAsync(page: number): Promise<Array<NewsItemVM>> {
    var url = new URL("newest", "https://node-hnapi.herokuapp.com/");
    url.searchParams.append("page", page.toString());
    return fetch(url.href).then(response => {
      return response.json();
    }).catch(error => console.log(error));
  }

  render() {
    var newsItem = this.state.news.map((news: NewsItemVM, index: number) => (
      <Card key={news.id}>
        <Card.Body>
          <Card.Title>{index + 1}. {news.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <Card.Text>
              {news.points} Points by {news.user}
            </Card.Text>
          </Card.Subtitle>
          <Card.Link href={news.url}>{news.domain}</Card.Link>
        </Card.Body>
      </Card>
    ));
    return (
      <div className="App" >
        <Container>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand href="#home">Hacker News</Navbar.Brand>
              <Navbar.Text className="justify-content-end">
                <Button variant="primary" onClick={() => this.getNewsPageAsync(1)}>Refresh</Button>
              </Navbar.Text>
            </Container>
          </Navbar>
        </Container>
        <Container>
          {newsItem}
        </Container>
      </div>
    );
  };
}

export class NewsItemVM {
  comments_count: number = 0;
  domain: string = '';
  id: number = 0;
  points: number = 0;
  time: number = 0;
  time_ago: string = '';
  title: string = '';
  type: string = '';
  url: string = '';
  user: string = '';
}

interface IProps { }

interface IState {
  news: Array<NewsItemVM>
}

interface ISnapshot { }

export default App;