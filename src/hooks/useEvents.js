import { useState, useEffect, useReducer } from 'react';

import timeUtils from '../utils/time_utils.js'
import userEvents from '../utils/user_events.js'

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
      return { ...state, loading: true, events: undefined, error: undefined };
    case 'fetched':
      return { ...state, loading: false, events: action.payload, error: undefined };
    case 'created':
      return { ...state, loading: false, events: [...state.events, action.payload], error: undefined };
    case 'deleted':
      return { ...state, loading: false };
    case 'error':
      return { ...state, loading: false, error: action.payload };
    default:
      return state
  }
}

function useEvents(apiCall, ...rest ) {

  //custom hook usable for both events and event templates, takes appropriate
  //function utility call
  const initialState = {
    events: [
      {
        title: '',
        desc: '',
        variant: '',
        value: '',
        timeRange: [],
        date: null,
        ownerId: null,
        active: null,
        userId: null
      }
    ],
    loading: true,
    error: undefined
  }

  const [ userId ] = [...rest]
  const [state, dispatch] = useReducer(reducer, initialState)

  const getEvents = async () => {
    dispatch({type: ACTIONS.LOADING})
    try {
      const res = await apiCall(parseInt(userId))
      const newEvents = res.data.data.map( event => {

          let timeRange = timeUtils.convertToTime(event.begin_time_unit, event.end_time_unit)
          let diff = Math.abs(parseInt(event.begin_time_unit) - parseInt(event.end_time_unit))
          let date = new Date(event.date)
          return {
            //write catch for UI based failing later
            title: event.title,
            desc: event.description,
            variant: `${ diff == 1 ? 'fifteen' : ''}${ diff == 2 ? 'thirty' : ''}${ diff == 4 ? 'sixty' : ''}`,
            value: `${ diff == 1 ? 'www.google.com' : ''}${ diff == 2 ? 'www.facebook.com' : ''}${ diff == 4 ? 'www.apple.com' : ''}`,
            timeRange: timeRange,
            date: date,
            ownerId: event.owner_id,
            active: event.active,
            userId: event.user_id
          }
        }
      )
      console.log('before dispatch: ', newEvents)
      dispatch({ payload: newEvents, type: ACTIONS.FETCHED })
    } catch (err) {
      dispatch({ payload: err, type: ACTIONS.ERROR })
      alert(err)
    }
  }

  const createEvent = async (userId, ownerId, title, desc, status = 1, beginTime, endTime, date, active = true) => {
    dispatch({type: ACTIONS.LOADING})
    try {
      const res = await userEvents(userId, ownerId, title, desc, status, beginTime, endTime, date, active)

      const timeRange = timeUtils.convertToTime(res.data.data.begin_time_unit, res.data.data.end_time_unit)
      const diff = Math.abs(parseInt(res.data.data.begin_time_unit) - parseInt(res.data.data.end_time_unit))

      const newEvent = {
        title: res.data.title,
        desc: res.data.description,
        variant: `${ diff == 1 ? 'fifteen' : ''}${ diff == 2 ? 'thirty' : ''}${ diff == 4 ? 'sixty' : ''}`,
        value: `${ diff == 1 ? 'www.google.com' : ''}${ diff == 2 ? 'www.facebook.com' : ''}${ diff == 4 ? 'www.apple.com' : ''}`,
        timeRange: timeRange,
        date: res.data.date,
        ownerId: res.data.owner_id,
        active: res.data.active,
        userId: res.data.user_id
      }

      console.log('before dispatch: ', newEvent)
      dispatch({ payload: newEvent, type: ACTIONS.CREATED })
    } catch (err) {
      dispatch({ payload: err, type: ACTIONS.ERROR })
      console.log(err)
    }
  }

  useEffect( () => {
    getEvents()
  }, [])

  return [ state, { createEvent } ]
}

export default useEvents
