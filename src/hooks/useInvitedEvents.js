import { useState, useEffect, useReducer } from 'react';

import timeUtils from '../utils/time_utils.js'
import userEvents from '../utils/user_events.js'
import eventInvites from '../utils/event_invites'

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
      return { ...state, loading: false, events: action.payload, error: undefined };
    case 'created':
      return { ...state, loading: false, events: [...state.events, action.payload], error: undefined };
    case 'deleted':
      return { ...state, loading: false, events: action.payload };
    case 'error':
      return { ...state, loading: false, error: action.payload };
    default:
      return state
  }
}

function useInvitedEvents() {

  const initialState = {
    events: [],
    loading: true,
    error: undefined
  }

  const userId = localStorage.userId

  const [state, dispatch] = useReducer(reducer, initialState)

  const getInvitedEvents = async () => {
    dispatch({type: ACTIONS.LOADING})
    try {
      const inviteRes = await eventInvites.getUserInvited(userId)
      const eventsToGet = inviteRes.data.data.reduce( (acc, invite) => ([...acc, { eventId: invite.user_events_id, inviteId: invite.id, status: invite.status}]), [] )

      const events = await Promise.all(eventsToGet.map( async (event) => {
        const eventRes = await userEvents.getEvent(event.eventId)

        let timeRange = timeUtils.convertToTime(eventRes.data.data.begin_time_unit, eventRes.data.data.end_time_unit)
        let duration = Math.abs(eventRes.data.data.end_time_unit - eventRes.data.data.begin_time_unit)
        let diff = Math.abs(parseInt(eventRes.data.data.begin_time_unit) - parseInt(eventRes.data.data.end_time_unit))
        let date = new Date(eventRes.data.data.date)

        return {
          title: eventRes.data.data.title,
          desc: eventRes.data.data.description,
          variant: `${ diff == 1 ? 'fifteen' : ''}${ diff == 2 ? 'thirty' : ''}${ diff == 4 ? 'sixty' : ''}`,
          value: `${ diff == 1 ? 'www.google.com' : ''}${ diff == 2 ? 'www.facebook.com' : ''}${ diff == 4 ? 'www.apple.com' : ''}`,
          timeRange: timeRange,
          duration: duration,
          date: date,
          id: eventRes.data.data.id,
          ownerId: eventRes.data.data.owner_id,
          active: eventRes.data.data.active,
          userId: eventRes.data.data.user_id,
          inviteId: event.inviteId,
          status: event.status
        }
      }))
      dispatch({ payload: events, type: ACTIONS.FETCHED })
    } catch (err){
      dispatch({ payload: err, type: ACTIONS.ERROR })
      throw err
    }
  }

  const updateStatus = async (inviteId, status) => {
    // dispatch({type: ACTIONS.LOADING})
    console.log(inviteId, status)
    try {
      const res = await eventInvites.editInvite(inviteId, status)

      const updatedEvents = state.events.map( event => res.data.data.id === event.inviteId ?
        {
          ...event,
          status: res.data.data.status
        }
      : event)

      dispatch({ payload: updatedEvents, type: ACTIONS.FETCHED })
    } catch (err){
      dispatch({ payload: err, type: ACTIONS.ERROR })
      throw err
    }
  }

  useEffect( () => {
    getInvitedEvents()
  }, [])

  return [state, updateStatus]
}

export default useInvitedEvents
