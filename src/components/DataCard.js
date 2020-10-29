import React from 'react';

const DataCard = ({ selectedDataToday }) => {
  return (
    <div className="dataCard">
      {selectedDataToday !== null && (
        <div className="dataNumbers">
          <h2>{selectedDataToday.nom}</h2>
          <p>
            Situation le
            {selectedDataToday.date}
          </p>
          <ul>
            <li>
              <em>Hospitalisés :</em>
              {selectedDataToday.hospitalises}{' '}
            </li>
            <li>
              <em>En réanimation :</em>
              {selectedDataToday.reanimation}
            </li>
            <li>
              <em>Nouvelles hospitalisations :</em>{' '}
              {selectedDataToday.nouvellesHospitalisations}
            </li>
            <li>
              <em>Nouvelles Réanimations :</em>{' '}
              {selectedDataToday.nouvellesReanimations}
            </li>
            <li>
              <em>Décès (cumulés) :</em> {selectedDataToday.deces}
            </li>
            <li>
              <em>Guéris (cumulés) :</em> {selectedDataToday.gueris}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DataCard;
