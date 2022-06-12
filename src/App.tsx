import React from "react";
import './App.css';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

class App extends React.Component {

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    //load first page of news
    this.getNewsPageAsync(1);
  }

  async getNewsPageAsync(page: number) {
    return this.fetchNewsPageAsync(page).then((newsList: Array<NewsItemVM>) => {
      var newsItems = newsList.map((news, index) => (
        <Card key={news.id}>
          <Card.Body>
            <Card.Title>{index} {news.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <Card.Text>
                {news.points} by {news.user}
              </Card.Text>
            </Card.Subtitle>
            <Card.Link href={news.url}>{news.domain}</Card.Link>
          </Card.Body>
        </Card>
      ));
      return newsItems;
    }).catch(error => {
      throw error;
    })
  }

  async fetchNewsPageAsync(page: number) {
    var url = new URL("newest", "https://node-hnapi.herokuapp.com/");
    url.searchParams.append("page", page.toString());
    return fetch(url.href).then(response => {
      return response.json();
    }).catch(error => console.log(error));
  }

  render() {
    return (
      <div className="App" >
        <Container>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand href="#home">Hacker News</Navbar.Brand>
              <Navbar.Text className="justify-content-end">
                <Button variant="primary">Refresh</Button>
              </Navbar.Text>
            </Container>
          </Navbar>
        </Container>
        <Container>
        <Card>
          <Card.Body>
            <Card.Title>Test News Card</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <Card.Text>
                Points by Test User
              </Card.Text>
            </Card.Subtitle>
            <Card.Link href="#">test.domain</Card.Link>
          </Card.Body>
        </Card>
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

export default App;
