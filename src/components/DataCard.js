import React from 'react';
import moment from 'moment';

const DataCard = ({ selectedDataToday }) => {
  return (
    <div className="dataCard">
      {selectedDataToday !== '' ? (
        <div className="dataNumbers">
          <h2 className="data-card-title">{selectedDataToday.nom}</h2>
          <p>
            Situation le {moment(selectedDataToday.date).format('DD/MM/YYYY')}
          </p>
          <ul>
            <li>
              <em>Hospitalisés :</em> {selectedDataToday.hospitalises}
            </li>
            <li>
              <em>En réanimation :</em> {selectedDataToday.reanimation}
            </li>
            <li>
              <em>Nouvelles hospitalisations :</em>{' '}
              {selectedDataToday.nouvellesHospitalisations}
            </li>
            <li>
              <em>Nouvelles réanimations :</em>{' '}
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
      ) : (
        <div className="empty-card">
          <h2>Sélectionnez un département</h2>
        </div>
      )}
    </div>
  );
};

export default DataCard;
