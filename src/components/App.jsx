import React from "react";
import {ContactForm} from "./ContactForm/ContactForm"
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { nanoid } from "nanoid";

export class App extends React.Component{
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: ''
  }
  
  addContact = (name, number) => {
    if (this.state.contacts.filter(contact => contact.name === name).length) {
      alert(`${name} is already in contacts.`);
      return;
    }
    this.setState(prevState => {
      const newContacts = prevState.contacts.slice(0).concat({ id: nanoid(), name, number })
      return ({ contacts: newContacts })
    })
  }
  onChange = (e) => {
  const filter = e.target.value;
  this.setState({ filter });
  };
  onDelete = (e) => {
    const deletedContactId = e.target.value;

    this.setState(prevState => {
      const contacts = prevState.contacts;
      const newArr = contacts.filter(contact => contact.id !== deletedContactId);

      return ({
        contacts: newArr
      })
    })
  }
  filterContacts = (contacts, filter) => {
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.trim().toLowerCase()))
  }

  render(){
    const { contacts, filter } = this.state;
    const filtered = this.filterContacts(contacts, filter);
    return (
      <div
        // style={{
        //   height: '100vh',
        //   display: 'flex',
        //   flexdirection: 'column',
        //   justifyContent: 'center',
        //   alignItems: 'center',
        //   fontSize: 20,
        //   color: '#010101'
        // }}
        className="App"
      >
       <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact}/>
       
       </div>

        <h2>Contacts</h2>
        <Filter value = {this.state.filter} onChange = {this.onChange}/>
        <ContactList  contacts={filtered}  onDelete={this.onDelete}/>
      </div>
    );
  };
  
  }
  