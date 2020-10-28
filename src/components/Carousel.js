import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Carousel.scss';
import axios from 'axios';

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayOfNews: [],
    };
  }

  componentDidMount = () => {
    const url = `https://newsapi.org/v2/top-headlines?country=fr&q=covid&apiKey=f545ace02057431081cf6684cc135a79`;
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
      <Carousel className="carousel" autoPlay showThumbs={false}>
        {arrayOfNews.map((article) => (
          <div key={article.title}>
            <img alt="" src={article.urlToImage} />
            <p className="legend">{article.title}</p>
          </div>
        ))}
      </Carousel>
    );
  }
}

export default News;
