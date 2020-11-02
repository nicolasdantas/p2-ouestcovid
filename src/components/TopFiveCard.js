import React from 'react';
import moment from 'moment';

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
  //this component will get data from its parent TopFive

  return (
    <div>
      <h2>{county.nom}</h2>
      <p>Situation le {moment(county.date).format('DD/MM/YYYY')}</p>
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
        <li>
          <em>Décès (cumulés) :</em> {county.deces}
        </li>
        <li>
          <em>Guéris (cumulés) :</em> {county.gueris}
        </li>
      </ul>
    </div>
  );
}

export default TopFiveCard;
