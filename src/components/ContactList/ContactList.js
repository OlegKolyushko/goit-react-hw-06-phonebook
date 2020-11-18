import React from "react";
import PropTypes from "prop-types";
import ContactListItem from "../ContactListItem/ContactListItem";
import styles from "./ContactList.module.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import contactActions from "../../redux/contact/contactActions";

function ContactList({ contacts, deleteContact }) {
  return (
    <TransitionGroup component="ul">
      {contacts.map(({ id, name, number }) => (
        <CSSTransition key={id} timeout={250} classNames={styles}>
          <ContactListItem
            name={name}
            number={number}
            deleteContact={() => deleteContact(id)}
          ></ContactListItem>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(Object),
  deleteContact: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
 const {items, filter} = state.contacts;
 const filteredContacts = items.filter((contact) =>
 contact.name.toLowerCase().includes(filter.toLowerCase()));
 return {
   contacts: filteredContacts
 }
};
const mapDispatchToProps = {
  deleteContact: contactActions.deleteContact,
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
