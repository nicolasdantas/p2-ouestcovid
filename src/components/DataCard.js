import React, { useContext } from 'react';
import moment from 'moment';
import { CountySelected } from '../contexts/CountySelected';

const DataCard = () => {
  const { selectedCountyDatas } = useContext(CountySelected);
  return (
    <div className="dataCard">
      {selectedCountyDatas ? (
        <div className="dataNumbers">
          <h2 className="data-card-title">{selectedCountyDatas.nom}</h2>
          <p>
            Situation le {moment(selectedCountyDatas.date).format('DD/MM/YYYY')}
          </p>
          <ul>
            <li>
              <em>Hospitalisés :</em>{' '}
              {selectedCountyDatas.hospitalises || 'données non disponibles'}
            </li>
            <li>
              <em>En réanimation :</em>{' '}
              {selectedCountyDatas.reanimation || 'données non disponibles'}
            </li>
            <li>
              <em>Nouvelles hospitalisations :</em>{' '}
              {selectedCountyDatas.nouvellesHospitalisations ||
                'données non disponibles'}
            </li>
            <li>
              <em>Nouvelles réanimations :</em>{' '}
              {selectedCountyDatas.nouvellesReanimations ||
                'données non disponibles'}
            </li>
            <li>
              <em>Décès (cumulés) :</em>{' '}
              {selectedCountyDatas.deces || 'données non disponibles'}
            </li>
            <li>
              <em>Guéris (cumulés) :</em>{' '}
              {selectedCountyDatas.gueris || 'données non disponibles'}
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
