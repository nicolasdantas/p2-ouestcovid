import React from 'react';

class DataCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { selectedDataToday } = this.props;
    return (
      <div className='countyDataCard'>
        {selectedDataToday !== null && (
          <div className='dataNumbers'>
            Situation le {selectedDataToday.date} pour le département :{' '}
            {selectedDataToday.nom}
            <ul>
              <li>Hospitalisés : {selectedDataToday.hospitalises} </li>
              <li>En réanimation : {selectedDataToday.reanimation}</li>
              <li>
                Nouvelles hospitalisations :{' '}
                {selectedDataToday.nouvellesHospitalisations}
              </li>
              <li>
                Nouvelles Reanimations :{' '}
                {selectedDataToday.nouvellesReanimations}
              </li>
              <li>Décès (cumul depuis -) : {selectedDataToday.deces}</li>
              <li>Guéris (cumul depuis -) : {selectedDataToday.gueris}</li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default DataCard;
