import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './style/TopFive.scss';

function CountyModal(props) {
  return (
    <div>
      {props.datacounty.length !== 0 ? (
        <div>
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                {props.datacounty[0].nom}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <h3>{props.datacounty[0].nom}</h3>
                <ul>
                  <li>
                    <em>Hospitalisés :</em> {props.datacounty[0].hospitalises}
                  </li>
                  <li>
                    <em>En réanimation :</em> {props.datacounty[0].reanimation}
                  </li>
                  <li>
                    <em>Nouvelles hospitalisations :</em>{' '}
                    {props.datacounty[0].nouvellesHospitalisations}
                  </li>
                  <li>
                    <em>Nouvelles réanimations :</em>{' '}
                    {props.datacounty[0].nouvellesReanimations}
                  </li>
                  <li>
                    {' '}
                    <em>Décès (cumulés) :</em> {props.datacounty[0].deces}
                  </li>
                  <li>
                    <em>Guéris (cumulés) :</em> {props.datacounty[0].gueris}
                  </li>
                </ul>
                <p className="ratio">
                  Taux d'occupation des lits en réa :{' '}
                  {props.datacounty[0].ratio}%
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Fermer</Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <div>Aucune donnée à afficher</div>
      )}
    </div>
  );
}

export default CountyModal;
