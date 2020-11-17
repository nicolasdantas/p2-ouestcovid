import React, { useState } from 'react';
import './style/ContactForm.scss';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const validation = () => {
    if (!name) {
      setNameError('Veuillez entrer un nom');
    }
    if (!email) {
      setEmailError('Veuillez entrer un email');
    }
    if (!message) {
      setMessageError('Veuillez rentrer un message');
    }
    if (name && email && message) {
      return true;
    }
    return false;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validation();
    if (isValid) {
      // clear form
      setName('');
      setEmail('');
      setMessage('');
      setNameError('');
      setEmailError('');
      setMessageError('');
    }
  };

  return (
    <div className="form-wrapper">
      <form id="contact" onSubmit={handleSubmit}>
        <h2> Faites-nous part de vos remarques</h2>
        <div>
          <label htmlFor="inputName">
            Nom
            <input
              className={`${nameError !== '' ? 'red' : ''}`}
              type="text"
              value={name}
              onChange={handleNameChange}
              id="inputName"
              placeholder={nameError}
            />
          </label>
        </div>
        <div>
          <label htmlFor="inputEmail">
            E-mail
            <input
              className={`${emailError !== '' ? 'red' : ''}`}
              type="email"
              value={email}
              onChange={handleEmailChange}
              id="inputEmail"
              placeholder={emailError}
            />
          </label>
        </div>
        <div>
          <label htmlFor="inputMessage">
            Message
            <textarea
              className={`${messageError !== '' ? 'red' : ''}`}
              value={message}
              onChange={handleMessageChange}
              id="inputMessage"
              placeholder={messageError}
            />
          </label>
        </div>

        <div className="button-div">
          <button type="submit">Envoyer</button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
