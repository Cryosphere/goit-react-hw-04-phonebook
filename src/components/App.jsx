import React, { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import style from './App.module.css';


export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const localContacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(localContacts);

    if (localContacts === null) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    } else {
      this.setState({ contacts: parseContacts });
    };
  };

  componentDidUpdate(prevProps, prevState) {
   
    
    if (prevState.contacts.length !== this.state.contacts.length) {
       const newContacts = this.state.contacts;
       const newLocalContacts = JSON.stringify(newContacts);
      
      localStorage.setItem('contacts', newLocalContacts);
    };
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  add = ({ name, number }) => {
    const lowerCase = name.toLowerCase();
    const contacts = this.state.contacts;
    let onList = false;

    const newContact = { id: nanoid(), name: name, number: number };

    contacts.forEach(contact => { 
      if (contact.name.toLowerCase() === lowerCase) {
        alert(`${contact.name} is already in contacts`);
        onList = true;
      }
    });

    if (onList) return;

    this.setState(prevState => ({
      contacts: prevState.contacts.concat(newContact),
    }));
  };

  handleChangeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  filterItems = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = idToDelete => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== idToDelete),
    }));
  };  

  render() {
    const { filter } = this.state;
    return (
      <div>
        <h1 className={style.header}>Phonebook</h1>
        <ContactForm onSubmit={this.add} />
        <Filter value={filter} onChange={this.handleChangeFilter} />
        <ContactList
          contacts={this.filterItems()}
          toDelete={this.deleteContact}
        />
      </div>
    );
  }
};
