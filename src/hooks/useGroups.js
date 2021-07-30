import { useState, useEffect, useReducer, createContext, useContext } from 'react';

import userGroups from '../utils/user_groups.js';


const ACTIONS = {
  LOADING: 'loading',
  SUBLOADING: 'subloading',
  FETCHED: 'fetched',
  CREATED: 'created',
  DELETED: 'deleted',
  ERROR: 'error'
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'loading':
      return { ...state, loading: true };
    case 'subloading':
      return { ...state, subloading: true };
    case 'fetched':
      return { ...state, loading: false, subloading: false, groups: action.payload, error: undefined };
    case 'created':
      return { ...state, loading: false, subloading: false, groups: [...state.groups, action.payload], error: undefined };
    case 'deleted':
      return { ...state, loading: false, subloading: false, groups: action.payload };
    case 'error':
      return { ...state, loading: false, subloading: false, error: action.payload };
    default:
      return state
  }
}

const UseGroupsContext = createContext()
const UseGroupsDispatchContext = createContext()

export function useGroupsState() {
  return useContext(UseGroupsContext)
}

export function useGroupsDispatch() {
  return useContext(UseGroupsDispatchContext)
}

function UseGroupsProvider({children}) {

  const initialState = {
    groups: [],
    loading: true,
    subloading: false,
    error: undefined
  }

  const userId = localStorage.userId

  const [state, dispatch] = useReducer(reducer, initialState)

  const getGroups = async () => {
    dispatch({ type: ACTIONS.LOADING })
    try {
      const res = await userGroups.getGroups(userId)
      const newGroups = res.data.data.map( group => (
        {
          id: group.id,
          name: group.name,
          userId: group.user_id,
          members: []
        }
      ))
      console.log('before get groups dispatch: ', newGroups)
      dispatch({ payload: newGroups, type: ACTIONS.FETCHED })
    } catch (err) {
      dispatch({ payload: err, type: ACTIONS.ERROR })
      alert(err)
    }
  }

  const setGroupMembers = async (groupId, contacts) => {
    dispatch({ type: ACTIONS.SUBLOADING })
    try {
      const res = await userGroups.getGroupMembers(groupId)

      const groupMembers = res.data.data.map( member => {
        // console.log('found match: ', contacts.find( contact => contact.contactId === member.user_id))
        const {firstName, lastName, email, photo, relationType} = contacts.find( contact => contact.contactId === member.user_id) || {}
        return (
          {
            id: member.id,
            groupId: member.user_group_id,
            memberId: member.user_id,
            firstName: firstName,
            lastName: lastName,
            photo: photo,
            relationType: relationType
          }
        )
      })
      // console.log('group members: ', groupMembers)
      const updatedGroups = state.groups.map( group => groupId === group.id ? {...group, members: groupMembers} : group )
      // console.log('before get members dispatch: ', updatedGroups)
      dispatch({ payload: updatedGroups, type: ACTIONS.FETCHED })
    } catch (err) {
      dispatch({ payload: err, type: ACTIONS.ERROR })
      // throw err
      alert(err)
    }
  }

  useEffect( () => {
    getGroups()
  },[])

  return (
    <UseGroupsContext.Provider value={state}>
      <UseGroupsDispatchContext.Provider value={{setGroupMembers}}>
        {children}
      </UseGroupsDispatchContext.Provider>
    </UseGroupsContext.Provider>
  )
}

export default UseGroupsProvider;
