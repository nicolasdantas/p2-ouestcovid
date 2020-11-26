import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './style/News.scss';
import axios from 'axios';

const News = () => {
  const [arrayOfNews, setArrayOfNews] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const url = `http://api.mediastack.com/v1/news?access_key=a68740b739e0ad207741172c4574dc94&keywords=covid&sources=lepoint&countries=fr&limit=7&sort=popularity`;
    axios
      .get(url, { cancelToken: source.token })
      .then((response) => response.data)
      .then((response) => setArrayOfNews(response.data))
      .catch((err) => console.log(err.message));
    return () => {
      source.cancel('API News request canceled by user');
    };
  }, []);

  console.log(arrayOfNews);

  return (
    <div className="carousel-container" id="news">
      <h1 className="title">Dernières actualités</h1>
      <Carousel
        className="carousel"
        autoPlay
        showThumbs={false}
        showStatus={false}
        infiniteLoop
      >
        {arrayOfNews
          .filter((article) => article.image !== null)
          .map((article) => (
            <a
              href={article.url}
              key={article.title}
              target="_blank"
              rel="noreferrer noopener "
            >
              <div className="container">
                <img className="picture" alt="" src={article.image} />
                <p className="legend">{article.title}</p>
              </div>
            </a>
          ))}
      </Carousel>
    </div>
  );
};

export default News;
