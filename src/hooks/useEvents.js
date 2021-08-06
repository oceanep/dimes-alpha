import { useState, useEffect, useReducer, createContext, useContext } from 'react';

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

const UseEventsContext = createContext()
const UseEventsDispatchContext = createContext()

export function useEventsState() {
  return useContext(UseEventsContext)
}

export function useEventsDispatch() {
  return useContext(UseEventsDispatchContext)
}

function UseEventsProvider({children}) {

  const initialState = {
    events: [],
    loading: true,
    error: undefined
  }

  const userId = localStorage.userId

  const [state, dispatch] = useReducer(reducer, initialState)

  const getEvents = async () => {
    dispatch({type: ACTIONS.LOADING})
    try {
      // console.log('in get event: ', userId)
      const res = await userEvents.getEvents(userId)
      const newEvents = await Promise.all(res.data.data.map( async (event) => {

          let timeRange = timeUtils.convertToTime(event.begin_time_unit, event.end_time_unit)
          let duration = Math.abs(event.end_time_unit - event.begin_time_unit)
          let diff = Math.abs(parseInt(event.begin_time_unit) - parseInt(event.end_time_unit))
          let date = new Date(event.date)

          // const inviteRes = await eventInvites.getInvites(event.id)
          // const invitees = inviteRes ? inviteRes.data.data.map( invite => (
          //   {
          //     id: invite.id,
          //     eventId: invite.event_id,
          //     inviteeEmail: invite.invitee_email || '',
          //     userInviteeId: invite.user_invite_id || null,
          //     groupInviteeId: invite.user_group_id || null,
          //     status: invite.status,
          //     userId: invite.user_id
          //   }
          // )) : []

          return {
            //write catch for UI based failing later
            title: event.title,
            desc: event.description,
            variant: `${ diff == 1 ? 'fifteen' : ''}${ diff == 2 ? 'thirty' : ''}${ diff == 4 ? 'sixty' : ''}`,
            value: `${ diff == 1 ? 'www.google.com' : ''}${ diff == 2 ? 'www.facebook.com' : ''}${ diff == 4 ? 'www.apple.com' : ''}`,
            timeRange: timeRange,
            duration: duration,
            date: date,
            id: event.id,
            ownerId: event.owner_id,
            active: event.active,
            userId: event.user_id,
            invitees: []
          }
        }
      ))
      // console.log('before get events dispatch: ', newEvents)
      dispatch({ payload: newEvents, type: ACTIONS.FETCHED })
    } catch (err) {
      dispatch({ payload: err, type: ACTIONS.ERROR })
      alert(err)
    }
  }

  //Memoize these functions later to prevent unnecessary rerenders

  const createEvent = async (title, desc, status = 1, beginTime, endTime, date, invitees, active = true) => {
    dispatch({type: ACTIONS.LOADING})
    try {
      const res = await userEvents.createEvent(userId, userId, title, desc, status, beginTime, endTime, date, active)
      const eventId = res.data.data.id

      const inviteEmailsRes = invitees.emails.length > 0 ? await Promise.all( invitees.emails.map( async (email) => {
        const res = await eventInvites.createInvite(userId, eventId, email)
        return {
          id: res.data.data.id,
          eventId: res.data.data.event_id,
          inviteeEmail: res.data.data.invitee_email || '',
          userInviteeId: res.data.data.user_invite_id || null,
          groupInviteeId: res.data.data.user_group_id || null,
          status: res.data.data.status,
          userId: res.data.data.user_id
        }
      })) : []
      const inviteContactsRes = invitees.contacts.length > 0 ? await Promise.all( invitees.contacts.map( async (contact) => {
        const res = await eventInvites.createInvite(userId, eventId, contact.email, contact.contactId)
        return {
          id: res.data.data.id,
          eventId: res.data.data.event_id,
          inviteeEmail: res.data.data.invitee_email || '',
          userInviteeId: res.data.data.user_invite_id || null,
          groupInviteeId: res.data.data.user_group_id || null,
          status: res.data.data.status,
          userId: res.data.data.user_id
        }
      })) : []
      const inviteGroupsRes = invitees.groups.length > 0 ? await Promise.all( invitees.groups.map( async (group) => {
        const res = await eventInvites.createInvite(userId, eventId, '', null, group.groupId)
        return {
          id: res.data.data.id,
          eventId: res.data.data.event_id,
          inviteeEmail: res.data.data.invitee_email || '',
          userInviteeId: res.data.data.user_invite_id || null,
          groupInviteeId: res.data.data.user_group_id || null,
          status: res.data.data.status,
          userId: res.data.data.user_id
        }
      })) : []

      const timeRange = timeUtils.convertToTime(res.data.data.begin_time_unit, res.data.data.end_time_unit)
      const duration = Math.abs(res.data.data.end_time_unit - res.data.data.begin_time_unit)
      const diff = Math.abs(parseInt(res.data.data.begin_time_unit) - parseInt(res.data.data.end_time_unit))
      const formatedDate = new Date(res.data.data.date)

      const newEvent = {
        title: res.data.data.title,
        desc: res.data.data.description,
        variant: `${ diff == 1 ? 'fifteen' : ''}${ diff == 2 ? 'thirty' : ''}${ diff == 4 ? 'sixty' : ''}`,
        value: `${ diff == 1 ? 'www.google.com' : ''}${ diff == 2 ? 'www.facebook.com' : ''}${ diff == 4 ? 'www.apple.com' : ''}`,
        timeRange: timeRange,
        duration: duration,
        date: formatedDate,
        id: res.data.data.id,
        ownerId: res.data.data.owner_id,
        active: res.data.data.active,
        userId: res.data.data.user_id,
        invitees: inviteEmailsRes.concat(inviteContactsRes, inviteGroupsRes)
      }

      // console.log('before new event dispatch: ', newEvent)
      dispatch({ payload: newEvent, type: ACTIONS.CREATED })
      return newEvent
    } catch (err) {
      dispatch({ payload: err, type: ACTIONS.ERROR })
      console.log(err)
      alert(err)
    }
  }

  const deleteEvent = async (eventId) => {
    dispatch({type: ACTIONS.LOADING})
    try {
      // console.log('inside delete: ', eventId)
      const res = await userEvents.deleteEvent(eventId)
      const filteredEvents = state.events.filter(event => event.id !== eventId)

      // console.log('filtered events: ', filteredEvents)
      dispatch({ payload: filteredEvents, type: ACTIONS.DELETED })
    } catch (err) {
      dispatch({ payload: err, type: ACTIONS.ERROR })
      console.log(err)
      alert(err)
    }
  }

  const editEvent = async (eventId, title, desc, status = 1, beginTime, endTime, date, active = true) => {
    dispatch({type: ACTIONS.LOADING})
    try {
      const res = await userEvents.updateEvent(eventId, userId, title, desc, status, beginTime, endTime, date, active)

      const timeRange = timeUtils.convertToTime(res.data.data.begin_time_unit, res.data.data.end_time_unit)
      const duration = Math.abs(res.data.data.end_time_unit - res.data.data.begin_time_unit)
      const diff = Math.abs(parseInt(res.data.data.begin_time_unit) - parseInt(res.data.data.end_time_unit))
      const formatedDate = new Date(res.data.data.date)

      const updatedEvents = state.events.map( event => res.data.data.id === event.id ?
        {
          ...event,
          title: res.data.data.title,
          desc: res.data.data.description,
          variant: `${ diff == 1 ? 'fifteen' : ''}${ diff == 2 ? 'thirty' : ''}${ diff == 4 ? 'sixty' : ''}`,
          value: `${ diff == 1 ? 'www.google.com' : ''}${ diff == 2 ? 'www.facebook.com' : ''}${ diff == 4 ? 'www.apple.com' : ''}`,
          timeRange: timeRange,
          duration: duration,
          date: formatedDate,
          id: res.data.data.id,
          ownerId: res.data.data.owner_id,
          active: res.data.data.active,
          userId: res.data.data.user_id
        }
        : event )
      console.log('updated events: ', updatedEvents)
      dispatch({ payload: updatedEvents, type: ACTIONS.FETCHED })

    } catch (err) {
      dispatch({ payload: err, type: ACTIONS.ERROR })
      console.log(err)
      alert(err)
    }
  }

  useEffect( () => {
    getEvents()
  }, [])

  return (
    <UseEventsContext.Provider value={state}>
      <UseEventsDispatchContext.Provider value={{ createEvent, deleteEvent, editEvent }}>
        {children}
      </UseEventsDispatchContext.Provider>
    </UseEventsContext.Provider>
  )
}

export default UseEventsProvider
