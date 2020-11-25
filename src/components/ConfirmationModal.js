import React from 'react';
import { Modal } from 'react-bootstrap';

function GeoLocationModal(props) {
  return (
    <div>
      <div>
        <Modal
          {...props}
          size="sg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="county-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Votre commande a été envoyée</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Mais vous ne la recevrez jamais ...
            <br /> Vous allez être redirigé vers la boutique dans 5 secondes ...
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default GeoLocationModal;
