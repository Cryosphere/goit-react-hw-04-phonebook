import React, { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import style from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [firstRenderFlag, setFlag] = useState(true);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (firstRenderFlag) {
      const contactsFromLocalStorage = localStorage.getItem('contactList');

      if (contactsFromLocalStorage !== 'undefined') {
        const parsedContacts = JSON.parse(contactsFromLocalStorage);

        if (parsedContacts) {
          setContacts(parsedContacts);
        }
      }
      setFlag(false);
    } else {
      localStorage.setItem('contactList', JSON.stringify(contacts));
    }
  }, [contacts, firstRenderFlag]);

  const add = ({ name, number }) => {
    const lowerCase = name.toLowerCase();
    let onList = false;

    const newContact = { id: nanoid(), name: name, number: number };

    contacts.forEach(contact => {
      if (contact.name.toLowerCase() === lowerCase) {
        alert(`${contact.name} is already in contacts`);
        onList = true;
      }
    });

    if (onList) {
      return;
    }

    setContacts(prevState => prevState.concat(newContact));
  };

  const handleChangeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const filterItems = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = idToDelete => {
    setContacts(contacts.filter(contact => contact.id !== idToDelete));
  };

  return (
    <div>
      <h1 className={style.header}>Phonebook</h1>
      <ContactForm onSubmit={add} />
      <Filter value={filter} onChange={handleChangeFilter} />
      <ContactList contacts={filterItems()} toDelete={deleteContact} />
    </div>
  );
};
