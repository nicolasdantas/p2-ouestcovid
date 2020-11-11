import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import moment from 'moment';
import 'moment/locale/fr';
import './style/TopFive.scss';
import countyList from './datas/countyList.json';

function CountyModal(props) {
  return (
    <div>
      {props.datacounty.length !== 0 && (
        <div>
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="county-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title
                bsPrefix="customized-modal-title"
                id="contained-modal-title-vcenter"
              >
                {props.datacounty[0].nom}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <h4>
                  Dernières données au{' '}
                  {moment(props.datacounty[0].date).format('LL')}
                </h4>
                <ul>
                  <li>
                    <em>Hospitalisés : </em> {props.datacounty[0].hospitalises}
                  </li>
                  <li>
                    <em>En réanimation : </em> {props.datacounty[0].reanimation}
                  </li>
                  <li>
                    <em>Nouvelles hospitalisations : </em>{' '}
                    {props.datacounty[0].nouvellesHospitalisations}
                  </li>
                  <li>
                    <em>Nouvelles réanimations : </em>{' '}
                    {props.datacounty[0].nouvellesReanimations}
                  </li>
                  <li>
                    {' '}
                    <em>Décès (cumulés) : </em> {props.datacounty[0].deces}
                  </li>
                  <li>
                    <em>Guéris (cumulés) : </em> {props.datacounty[0].gueris}
                  </li>
                </ul>
                <p className="ratio">
                  Taux d'occupation des lits en réanimation :{' '}
                  {props.datacounty[0].ratio}%
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                href={countyList
                  .filter((county) => props.datacounty[0].code === county.code)
                  .map((data) => data.url)
                  .toString()}
                variant="light"
                target="_blank"
                onClick={props.onHide}
              >
                Je veux partir ici !
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default CountyModal;
