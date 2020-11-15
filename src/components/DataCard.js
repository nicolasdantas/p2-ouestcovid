import React from 'react';
import moment from 'moment';

const DataCard = ({ selectedDataToday, isCountySelected }) => {
  return (
    <div className="dataCard">
      {isCountySelected !== '' ? (
        <div className="dataNumbers">
          <h2 className="data-card-title">{selectedDataToday.nom}</h2>
          <p>
            Situation le {moment(selectedDataToday.date).format('DD/MM/YYYY')}
          </p>
          <ul>
            <li>
              <em>Hospitalisés :</em>{' '}
              {selectedDataToday.hospitalises || 'données non disponibles'}
            </li>
            <li>
              <em>En réanimation :</em>{' '}
              {selectedDataToday.reanimation || 'données non disponibles'}
            </li>
            <li>
              <em>Nouvelles hospitalisations :</em>{' '}
              {selectedDataToday.nouvellesHospitalisations ||
                'données non disponibles'}
            </li>
            <li>
              <em>Nouvelles réanimations :</em>{' '}
              {selectedDataToday.nouvellesReanimations ||
                'données non disponibles'}
            </li>
            <li>
              <em>Décès (cumulés) :</em>{' '}
              {selectedDataToday.deces || 'données non disponibles'}
            </li>
            <li>
              <em>Guéris (cumulés) :</em>{' '}
              {selectedDataToday.gueris || 'données non disponibles'}
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
