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
            <Modal.Title>Votre localisation n'a pu être trouvée</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Cette erreur provient probablement de votre localisation actuelle
            qui se trouve hors de France
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default GeoLocationModal;
