import React from 'react';
import axios from 'axios';
import prefectures from './prefectures.json';
import './TopFiveCard.scss';
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
  let countyPrefecture = '';
  countyPrefecture = prefectures.filter((item) => {
    const countyCodePrefecture =
      item.code.toString().length === 1 ? '0' : `${item.code.toString()}`;
    return countyCodeAPI === countyCodePrefecture;
  })[0].prefecture;
  console.log(countyPrefecture);

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
        console.log(
          `https://pixabay.com/api/?key=17897584-e09f7abfae1318c47f87ae891&q=${q}&image_type=photo`
        );
        setImageUrl(data.hits[0].webformatURL);
      })
      .catch(handleFetchError);
  };

  React.useEffect(() => {
    fetchCityImages(countyPrefecture);
  });

  //   import { createClient } from 'pexels';

  // const client = createClient('YOUR_API_KEY');
  // const query = 'Nature';

  // client.photos.search({ query, per_page: 1 })

  return (
    <div className="top-five-card">
      <h3>{county.nom}</h3>
      <img src={imageUrl} alt="paysage de la préfecture du département" />
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
          <em>Nouvelles Réanimations :</em> {county.nouvellesReanimations}
        </li>
        {/* <li>
          <em>Décès (cumulés) :</em> {county.deces}
        </li>
        <li>
          <em>Guéris (cumulés) :</em> {county.gueris}
        </li> */}
      </ul>
    </div>
  );
}

export default TopFiveCard;
