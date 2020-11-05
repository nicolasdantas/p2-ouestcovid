import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './style/News.scss';
import axios from 'axios';

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayOfNews: [],
    };
  }

  componentDidMount = () => {
    const url = `https://newsapi.org/v2/everything?sources=le-monde&pageSize=7&qInTitle=covid&sortBy=publishedAt&apiKey=f545ace02057431081cf6684cc135a79`;
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) =>
        this.setState({
          arrayOfNews: data.articles,
        })
      );
  };

  render() {
    const { arrayOfNews } = this.state;
    return (
      <div className="carousel-container">
        <h1 className="carousel-title">Dernières actualités</h1>
        <Carousel
          className="carousel"
          autoPlay
          showThumbs={false}
          showStatus={false}
          infiniteLoop
        >
          {arrayOfNews
            .filter((article) => article.urlToImage !== null)
            .map((article) => (
              <a
                href={article.url}
                key={article.title}
                target="_blank"
                rel="noreferrer noopener "
              >
                <div className="container">
                  <img className="picture" alt="" src={article.urlToImage} />
                  <p className="legend">{article.title}</p>
                </div>
              </a>
            ))}
        </Carousel>
      </div>
    );
  }
}

export default News;
