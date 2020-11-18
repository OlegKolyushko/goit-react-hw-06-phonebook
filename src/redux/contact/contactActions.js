import { v4 as uuidv4 } from "uuid";
import { createAction } from "@reduxjs/toolkit";

const addContact = createAction("contact/addContact", (name, number) => ({
  payload: {
    contacts: {
      id: uuidv4(),
      name,
      number,
    },
  },
}));

const deleteContact = createAction('contact/deleteContact');
const filterContact = createAction('contact/filterContact');
const contactFromLoacalStorage = createAction('contact/contactFromLoacalStorage')

export default { addContact, deleteContact, filterContact, contactFromLoacalStorage };
