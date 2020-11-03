import React from 'react';
import axios from 'axios';
import prefectures from './prefectures.json';

//   [{
//     "code": "DEP-02",
//     "nom": "Aisne",
//     "date": "2020-10-25",
//     "hospitalises": 117,
//     "reanimation": 12,
//     "nouvellesHospitalisations": 8,
//     "nouvellesReanimations": 2,
//     "deces": 306,
//     "gueris": 1259,
//     "source": {
//       "nom": "Santé publique France Data"
//     },
//     "sourceType": "sante-publique-france-data"
//   }]

function TopFiveCard({ county }) {
  const [imageUrl, setImageUrl] = React.useState('');

  const countyCodeAPI = county.code.split('-')[1];
  const countyPrefecture = prefectures.filter((item) => {
    const countyCodePrefecture =
      item.code.toString().length === 1 ? '0' : `${item.code.toString()}`;
    return countyCodeAPI === countyCodePrefecture;
  })[0].prefecture;

  const handleFetchError = (error) => {
    console.error(
      'Une erreur est survenue lors de la communication avec le service de données'
    );
    console.error(error);
  };

  const fetchCityImages = (cityName) => {
    const q = encodeURIComponent(`${cityName} France`);
    return axios
      .get(
        `https://pixabay.com/api/?key=17897584-e09f7abfae1318c47f87ae891&q=${q}&image_type=photo`
      )
      .then((response) => response.data)
      .then((data) => {
        setImageUrl(data.hits[0].webformatURL);
      })
      .catch((err) => {
        setImageUrl(
          'https://cdn.pixabay.com/photo/2013/12/22/17/34/french-countryside-232571_1280.jpg'
        );
        handleFetchError(err);
      });
  };

  React.useEffect(() => {
    fetchCityImages(countyPrefecture);
  }, []);

  //   import { createClient } from 'pexels';

  // const client = createClient('YOUR_API_KEY');
  // const query = 'Nature';

  // client.photos.search({ query, per_page: 1 })

  return (
    <div
      className="top-five-card"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="overlay">
        <h3>{county.nom}</h3>
        {/* <img src={imageUrl} alt="paysage de la préfecture du département" /> */}
        <ul>
          <li>
            <em>Hospitalisés :</em> {county.hospitalises}
          </li>
          <li>
            <em>En réanimation :</em> {county.reanimation}
          </li>
          <li>
            <em>Nouvelles hospitalisations :</em>{' '}
            {county.nouvellesHospitalisations}
          </li>
          <li>
            <em>Nouvelles réanimations :</em> {county.nouvellesReanimations}
          </li>
          {/* <li>
          <em>Décès (cumulés) :</em> {county.deces}
        </li>
        <li>
          <em>Guéris (cumulés) :</em> {county.gueris}
        </li> */}
        </ul>
      </div>
    </div>
  );
}

export default TopFiveCard;
