import { useState, useEffect, useReducer, createContext, useContext } from 'react';

import userGroups from '../utils/user_groups.js';

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
      return { ...state, loading: false, groups: action.payload, error: undefined };
    case 'created':
      return { ...state, loading: false, groups: [...state.groups, action.payload], error: undefined };
    case 'deleted':
      return { ...state, loading: false, groups: action.payload };
    case 'error':
      return { ...state, loading: false, error: action.payload };
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
          groupId: group.id,
          name: group.name,
          userId: group.user_id
        }
      ))
      console.log('before get groups dispatch: ', newGroups)
      dispatch({ payload: newGroups, type: ACTIONS.FETCHED })
    } catch (err) {
      dispatch({ payload: err, type: ACTIONS.ERROR })
      alert(err)
    }
  }

  useEffect( () => {
    getGroups()
  },[])

  return (
    <UseGroupsContext.Provider value={state}>
      <UseGroupsDispatchContext.Provider value={getGroups}>
        {children}
      </UseGroupsDispatchContext.Provider>
    </UseGroupsContext.Provider>
  )
}

export default UseGroupsProvider;
