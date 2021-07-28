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
          name: contact.name,
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
          const email = obj.emailAddresses && (obj.emailAddresses.length >= 1) ? obj.emailAddresses[0].value : null
          const photo = obj.photos && (obj.photos.length >= 1) ? obj.photos[0].url : null

          return (
            {
                id: obj.resourceName.slice(9,),
                userId: obj.resourceName.slice(9,),
                name: obj.names[0].displayName,
                email: email,
                body: null,
                photo: photo
            }
          )
        })
      }

      const completeContacts = parsed_contacts.concat(newContacts)

      console.log('before get contacts dispatch: ', completeContacts)
      dispatch({ payload: completeContacts, type: ACTIONS.FETCHED })
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
      <UseContactsDispatchContext.Provider value={getContacts}>
        {children}
      </UseContactsDispatchContext.Provider>
    </UseContactsContext.Provider>
  )
}

export default UseContactsProvider;
