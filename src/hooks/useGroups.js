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
      // console.log('before get groups dispatch: ', newGroups)
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
            email: email,
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

  const updateGroup = async (groupId, name, photo, newMembers, deletedMembers, contacts) => {
    dispatch({ type: ACTIONS.LOADING })
    try {
      const groupRes = await userGroups.editGroup(groupId, name, photo)
      console.log('group update res: ', groupRes)
      const newMemRes = newMembers.length > 0 ? await Promise.all(newMembers.map( async (member) => {
        let res = await userGroups.createGroupMember(groupId, member)
        return res.data.data
      } )) : []
      console.log('new members res: ', newMemRes)
      const deletedMemRes = deletedMembers.length > 0 ? await Promise.all(deletedMembers.map( async (member) => {
        let res = await userGroups.deleteGroupMember(member)
        return res.data
      } )) : []
      console.log('deleteMemRes: ', deletedMemRes)

      const oldMembers = state.groups.find( group => group.id === groupId ).members
      const filteredMembers = oldMembers.filter( member => !deletedMemRes.includes(member.id) )
      console.log('filtered deleted members: ', filteredMembers)
      const mappedNewMembers = newMemRes.map( member => {
        const {firstName, lastName, email, photo, relationType} = contacts.find( contact => contact.contactId === member.user_id) || {}
        return (
          {
            id: member.id,
            groupId: member.user_group_id,
            memberId: member.user_id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            photo: photo,
            relationType: relationType
          }
        )
      })
      const updatedMembers = filteredMembers.concat(mappedNewMembers)

      const updatedGroups = state.groups.map( group => groupRes.data.data.id === group.id ?
        {
          id: groupRes.data.data.id,
          name: groupRes.data.data.name,
          userId: groupRes.data.data.user_id,
          members: updatedMembers
        }
        : group )

      console.log('updated groups: ', updatedGroups)
      dispatch({ payload: updatedGroups, type: ACTIONS.FETCHED })
    } catch (err) {
      dispatch({ payload: err, type: ACTIONS.ERROR })
      throw err
      alert(err)
    }
  }

  useEffect( () => {
    getGroups()
  },[])

  return (
    <UseGroupsContext.Provider value={state}>
      <UseGroupsDispatchContext.Provider value={{setGroupMembers, updateGroup}}>
        {children}
      </UseGroupsDispatchContext.Provider>
    </UseGroupsContext.Provider>
  )
}

export default UseGroupsProvider;
