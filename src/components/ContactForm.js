import React, { Component } from 'react';
import './style/ContactForm.scss';

const startState = {
  name: '',
  message: '',
  email: '',
  nameError: '',
  emailError: '',
  messageError: '',
};

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = startState;
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleMessageChange = (event) => {
    this.setState({
      message: event.target.value,
    });
  };

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  validation = () => {
    let nameError = '';
    let emailError = '';
    let messageError = '';

    if (!this.state.name) {
      nameError = '*Name cannot be blank';
    }
    if (!this.state.email) {
      emailError = '*E-mail required';
    }
    if (!this.state.message) {
      messageError = '*Please enter your message';
    }
    if (emailError || nameError || messageError) {
      this.setState({ emailError, nameError, messageError });
      return false;
    }
    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validation();
    if (isValid) {
      // clear form
      this.setState(startState);
    }
  };

  render() {
    return (
      <div className="form-wrapper">
        <form id="contact" onSubmit={this.handleSubmit}>
          <h2> Faites-nous part de vos remarques, suggestions, ... </h2>
          <div>
            <label htmlFor="inputName">
              Nom
              <input
                type="text"
                value={this.state.name}
                onChange={this.handleNameChange}
                id="inputName"
              />
            </label>
            <div className="error">{this.state.nameError}</div>
          </div>
          <div>
            <label htmlFor="inputEmail">
              E-mail
              <input
                type="email"
                value={this.state.email}
                onChange={this.handleEmailChange}
                id="inputEmail"
              />
            </label>
            <div className="error">{this.state.emailError}</div>
          </div>
          <div>
            <label htmlFor="inputMessage">
              Message
              <textarea
                value={this.state.message}
                onChange={this.handleMessageChange}
                id="inputMessage"
              />
            </label>
            <div className="error">{this.state.messageError}</div>
          </div>

          <div className="button-div">
            <button type="submit">Envoyer</button>
          </div>
        </form>
      </div>
    );
  }
}

export default ContactForm;
