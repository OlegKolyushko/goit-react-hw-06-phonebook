import { combineReducers } from "redux";
import contactActions from "../contact/contactActions";
import { createReducer } from "@reduxjs/toolkit";

const addContact = (state, action) => {
  const getContactFromLocalStorage = localStorage.getItem("contactList");
  const contact = action.payload.contacts;
  if (!getContactFromLocalStorage) {
    localStorage.setItem("contactList", JSON.stringify([contact]));
  } else {
    const parsedContact = JSON.parse(getContactFromLocalStorage);
    localStorage.setItem(
      "contactList",
      JSON.stringify([...parsedContact, contact])
    );
  }
  return [...state, action.payload.contacts];
};

const deleteContact = (state, action) => {
  const getContactFromLocalStorage = localStorage.getItem("contactList");
  const parsedContact = JSON.parse(getContactFromLocalStorage);
  const newContactLocalStorage = parsedContact.filter(
    (contact) => contact.id !== action.payload
  );
  localStorage.setItem("contactList", JSON.stringify(newContactLocalStorage));
  return state.filter((contact) => contact.id !== action.payload);
};

const items = createReducer([], {
  [contactActions.addContact]: addContact,
  [contactActions.deleteContact]: deleteContact,
  [contactActions.contactFromLoacalStorage]: (_, action) => action.payload,
});

const filter = createReducer("", {
  [contactActions.filterContact]: (_, action) => action.payload,
});

export default combineReducers({
  items,
  filter,
});
