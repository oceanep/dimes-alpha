import { useState, useEffect, useReducer, createContext, useContext } from 'react';

import eventTemplates from '../utils/event_templates.js';

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
      return { ...state, loading: false, templates: action.payload, error: undefined };
    case 'created':
      return { ...state, loading: false, templates: [...state.templates, action.payload], error: undefined };
    case 'deleted':
      return { ...state, loading: false, templates: action.payload };
    case 'error':
      return { ...state, loading: false, error: action.payload };
    default:
      return state
  }
}

const UseTemplatesContext = createContext()
const UseTemplatesDispatchContext = createContext()

export function useTemplatesState() {
  return useContext(UseTemplatesContext)
}

export function useTemplatesDispatch() {
  return useContext(UseTemplatesDispatchContext)
}

function UseTemplatesProvider({children}) {

  //custom hook for event templates, takes appropriate
  //function utility call

  const initialState = {
    templates: [],
    loading: true,
    error: undefined
  }

  const userId = localStorage.userId

  const [state, dispatch] = useReducer(reducer, initialState)

  const getTemplates = async () => {
    dispatch({ type: ACTIONS.LOADING })
    try {
      const res = await eventTemplates.getTemplates(userId)
      const newTemplates = res.data.data.map( template => (
        {
          //write catch for UI based failing later
          id: template.id,
          title: template.title,
          desc: template.description,
          variant: `${ template.duration == 15 ? 'fifteen' : ''}${ template.duration == 30 ? 'thirty' : ''}${ template.duration == 60 ? 'sixty' : ''}`,
          value: `${ template.duration == 15 ? 'www.google.com' : ''}${ template.duration == 30 ? 'www.facebook.com' : ''}${ template.duration == 60 ? 'www.apple.com' : ''}`,
          active: template.active,
          duration: template.duration,
          // isPaid: template.is_paid,
          // location: template.location,
          // locationType: template.location_type,
          // price: template.price,
          url: template.url

        }
      ))
      // console.log('before get templates dispatch: ', newTemplates)
      dispatch({ payload: newTemplates, type: ACTIONS.FETCHED })
    } catch (err) {
      dispatch({ payload: err, type: ACTIONS.ERROR })
      alert(err)
    }
  }

  const createTemplate = async (title, duration, desc, active = true, eventUrl) => {
    dispatch({ type: ACTIONS.LOADING })
    try {
      const res = await eventTemplates.createTemplate(userId, title, duration, desc, active, eventUrl)

      const newTemplate = {
        id: res.data.data.id,
        title: res.data.data.title,
        desc: res.data.data.description,
        variant: `${ res.data.data.duration == 15 ? 'fifteen' : ''}${ res.data.data.duration == 30 ? 'thirty' : ''}${ res.data.data.duration == 60 ? 'sixty' : ''}`,
        value: `${ res.data.data.duration == 15 ? 'www.google.com' : ''}${ res.data.data.duration == 30 ? 'www.facebook.com' : ''}${ res.data.data.duration == 60 ? 'www.apple.com' : ''}`,
        active: res.data.data.active,
        duration: res.data.data.duration,
        // isPaid: res.data.data.is_paid,
        // location: res.data.data.location,
        // locationType: res.data.data.location_type,
        // price: res.data.data.price,
        url: res.data.data.url
      }
      // console.log('before new event dispatch: ', newTemplate)
      dispatch({ payload: newTemplate, type: ACTIONS.CREATED })
      return newTemplate
    } catch (err) {
      dispatch({ payload: err, type: ACTIONS.ERROR })
      console.log(err)
      alert(err)
    }
  }

  const deleteTemplate = async (templateId) => {
    dispatch({ type: ACTIONS.LOADING })
    try {
      const res = await eventTemplates.deleteTemplate(templateId)
      const filteredTemplates = state.templates.filter(template => template.id !== templateId)

      // console.log('filtered templates: ', filteredTemplates)
      dispatch({ payload: filteredTemplates, type: ACTIONS.DELETED })
    } catch (err) {
      dispatch({ payload: err, type: ACTIONS.ERROR })
      console.log(err)
      alert(err)
    }
  }

  const editTemplate = async (templateId, title, duration, desc, active, event_url) => {
    dispatch({ type: ACTIONS.LOADING })
    try {
      // console.log('edit dispatch for template, id: ', templateId)
      // console.log('all edit info: ', templateId, title, duration, desc, active, event_url)
      const res = await eventTemplates.updateTemplate(templateId, title, duration, desc, active, event_url)
      // console.log('res for edit: ', res)
      const updatedTemplates = state.templates.map( template => res.data.data.id === template.id ?
        {
          id: res.data.data.id,
          title: res.data.data.title,
          desc: res.data.data.description,
          variant: `${ res.data.data.duration == 15 ? 'fifteen' : ''}${ res.data.data.duration == 30 ? 'thirty' : ''}${ res.data.data.duration == 60 ? 'sixty' : ''}`,
          value: `${ res.data.data.duration == 15 ? 'www.google.com' : ''}${ res.data.data.duration == 30 ? 'www.facebook.com' : ''}${ res.data.data.duration == 60 ? 'www.apple.com' : ''}`,
          active: res.data.data.active,
          duration: res.data.data.duration,
          // isPaid: res.data.data.is_paid,
          // location: res.data.data.location,
          // locationType: res.data.data.location_type,
          // price: res.data.data.price,
          url: res.data.data.url
        }
        : template )
      // console.log('updated template: ', updatedTemplates)
      dispatch({ payload: updatedTemplates, type: ACTIONS.FETCHED })
    } catch (err) {
      dispatch({ payload: err, type: ACTIONS.ERROR })
      console.log(err)
      alert(err)
    }
  }

  useEffect( () => {
    getTemplates()
  }, [])

  return (
    <UseTemplatesContext.Provider value={state}>
      <UseTemplatesDispatchContext.Provider value={{ createTemplate, deleteTemplate, editTemplate }}>
        {children}
      </UseTemplatesDispatchContext.Provider>
    </UseTemplatesContext.Provider>
  )
}

export default UseTemplatesProvider;
