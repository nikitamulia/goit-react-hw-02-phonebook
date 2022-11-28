import React from "react";
import {ContactForm} from "./ContactForm/ContactForm"
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";


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
  
  addContact = user => {
    if (this.state.contacts.find(contact => contact.name.toLowerCase() === user.name.toLowerCase())) {
      alert(`${user.name} is already in contacts.`);
      return;
    }
    this.setState(prevState =>  ({
      contacts: [...prevState.contacts, user],
    }));
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
  