import React from 'react';
import { Modal } from 'react-bootstrap';

function ContactConfirmation(props) {
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
            <Modal.Title>Votre message a bien été envoyé</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Nous vous répondrons dans les plus brefs délais
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default ContactConfirmation;
