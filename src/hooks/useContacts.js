import { useState, useEffect, useReducer, createContext, useContext } from 'react';

import userContacts from '../utils/user_contacts.js';

const ACTIONS = {
  LOADING: 'loading',
  FETCHED: 'fetched',
  CREATED: 'created',
  DELETED: 'deleted',
  ERROR: 'error'
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'loading':
      return { ...state, loading: true };
    case 'fetched':
      return { ...state, loading: false, contacts: action.payload, error: undefined };
    case 'created':
      return { ...state, loading: false, contacts: [...state.contacts, action.payload], error: undefined };
    case 'deleted':
      return { ...state, loading: false, contacts: action.payload };
    case 'error':
      return { ...state, loading: false, error: action.payload };
    default:
      return state
  }
}

const UseContactsContext = createContext()
const UseContactsDispatchContext = createContext()

export function useContactsState() {
  return useContext(UseContactsContext)
}

export function useContactsDispatch() {
  return useContext(UseContactsDispatchContext)
}

function UseContactsProvider({children}) {

  const initialState = {
    contacts: [],
    loading: true,
    error: undefined
  }

  const userId = localStorage.userId

  const [state, dispatch] = useReducer(reducer, initialState)

  const getContacts = async () => {
    dispatch({ type: ACTIONS.LOADING })
    try {
      const res = await userContacts.getContacts(userId)
      const newContacts = res.data.data.map( contact => (
        {
          contactId: contact.contact_id,
          id: contact.id,
          firstName: contact.first_name,
          lastName: contact.last_name,
          email: contact.email,
          phone: contact.phone,
          photo: contact.photo || '',
          invited: contact.invited,
          relationType: contact.relation_type,
          status: contact.status,
          userId: contact.user_id
        }
      ))

        const google_contacts = JSON.parse(localStorage.getItem("google_contacts"))
        let parsed_contacts = []
        if (google_contacts) {
          parsed_contacts = google_contacts.map( obj => {
              const email = obj.emailAddresses && (obj.emailAddresses.length >= 1) ? (obj.emailAddresses[0] || {}).value : null
              const photo = obj.photos && (obj.photos.length >= 1) ? (obj.photos[0] || {}).url : null
              const phone = obj.phoneNumbers ? (obj.phoneNumbers[0] || {}).canonicalForm : undefined
              const firstName = obj.names && (obj.names.length >=1) ? (obj.names[0] || {}).givenName : ''
              const lastName = obj.names && (obj.names.length >=1) ? (obj.names[0] || {}).familyName : ''
              return (
                  {
                      id: obj.resourceName.slice(9,),
                      userId: obj.resourceName.slice(9,),
                      firstName: firstName,
                      lastName: lastName,
                      email: email,
                      body: null,
                      photo: photo,
                      phone: phone
                  }
              )
          })
        }

      const completeContacts = parsed_contacts.concat(newContacts)

      // console.log('before get contacts dispatch: ', completeContacts)
      dispatch({ payload: completeContacts, type: ACTIONS.FETCHED })
    } catch (err) {
      dispatch({ payload: err, type: ACTIONS.ERROR })
      alert(err)
    }
  }

  const createContact = async (contactId, firstName, lastName, relationType, phone, email) => {
    dispatch({ type: ACTIONS.LOADING })
    try {
      const res = await userContacts.createContact(contactId, userId, firstName, lastName, relationType, phone, email)

      const newContact = {
        contactId: res.data.data.contact_id,
        id: res.data.data.id,
        firstName: res.data.data.first_name,
        lastName: res.data.data.last_name,
        email: res.data.data.email,
        phone: res.data.data.phone,
        photo: res.data.data.photo || '',
        invited: res.data.data.invited,
        relationType: res.data.data.relation_type,
        status: res.data.data.status,
        userId: res.data.data.user_id
      }

      dispatch({ payload: newContact, type: ACTIONS.CREATED })
      return newContact
    } catch (err) {
      dispatch({ payload: err, type: ACTIONS.ERROR })
      alert(err)
    }
  }

  const editContact = async (id, contactId, firstName, lastName, relationType, phone, email) => {
    dispatch({ type: ACTIONS.LOADING })
    try {
      const res = await userContacts.updateContact(id, userId, contactId, firstName, lastName, relationType, phone, email)
      const updatedContacts = state.contacts.map( contact => res.data.data.id === contact.id ?
        {
          contactId: res.data.data.contact_id,
          id: res.data.data.id,
          firstName: res.data.data.first_name,
          lastName: res.data.data.last_name,
          email: res.data.data.email,
          phone: res.data.data.phone,
          photo: contact.photo || '',
          invited: res.data.data.invited,
          relationType: res.data.data.relation_type,
          status: res.data.data.status,
          userId: res.data.data.user_id
        }
        : contact )
      dispatch({ payload: updatedContacts, type: ACTIONS.FETCHED })
    } catch (err) {
      dispatch({ payload: err, type: ACTIONS.ERROR })
      alert(err)
    }
  }

  const deleteContact = async(id) => {
    dispatch({ type: ACTIONS.LOADING })
    try {
      const deletedId = await userContacts.deleteContact(id)
      const filteredContacts = state.contacts.filter( contact => contact.id !== deletedId.data )

      dispatch({ payload: filteredContacts, type: ACTIONS.DELETED })
    } catch (err) {
      dispatch({ payload: err, type: ACTIONS.ERROR })
      alert(err)
    }
  }

  useEffect( () => {
    getContacts()
  },[])

  return (
    <UseContactsContext.Provider value={state}>
      <UseContactsDispatchContext.Provider value={{editContact, createContact, deleteContact}}>
        {children}
      </UseContactsDispatchContext.Provider>
    </UseContactsContext.Provider>
  )
}

export default UseContactsProvider;
