import React, { Component } from "react";
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import {CSSTransition} from 'react-transition-group';
import styles from './App.module.css';
import Alert from '../Alert/Alert';
import alertStyles from '../Alert/Alert.module.css';
import { connect } from 'react-redux';
import contactAction from '../../redux/contact/contactActions';


 class App extends Component {
  state = {
    inList: false,
  }

  componentDidMount() {
    const savedContacts = localStorage.getItem('contactList');
    if(savedContacts) {
      this.props.getFromLocalStorage(JSON.parse(savedContacts));
    }
  }
  handlerAlert = () => {
    this.setState({inList: true});
      setTimeout(() => {
        this.setState({inList: false});
      }, 2500);
  }

  render() {
      const { inList } = this.state;
      const {contacts} = this.props;
    return (
      <>
      <CSSTransition in={true} appear={true} timeout={500} classNames={styles}>
         <h1 className={styles.title}>Phonebook</h1>
      </CSSTransition>
      <CSSTransition in={inList} timeout={250} classNames={alertStyles} unmountOnExit>
        <Alert  />
      </CSSTransition>
      <section className={styles.container}>
       <ContactForm alert={this.handlerAlert} ></ContactForm>
       </section>
       {contacts.length > 0 && (
           <>
           <br></br>
           <Filter/>
           <ContactList/>
           </>
       )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts.items,
});
const mapDispatchToProps = ({
  getFromLocalStorage: contactAction.contactFromLoacalStorage,
})

export default connect(mapStateToProps, mapDispatchToProps)(App);