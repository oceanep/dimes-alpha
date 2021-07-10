import { useState, useEffect } from 'react';

import timeUtils from '../utils/time_utils.js'

function useEvents(apiCall, ...rest ) {

  //custom hook usable for both events and event templates, takes appropriate
  //function utility call

  const [ userId ] = [...rest]
  const [events, setEvents] = useState([])

  useEffect( () => {
    const getEvents = async () => {
      try {
        const res = await apiCall(parseInt(userId))
        const newEvents = res.data.data.map( event => {

            let timeRange = timeUtils.convertToTime(event.begin_time_unit, event.end_time_unit)
            let diff = Math.abs(parseInt(event.begin_time_unit) - parseInt(event.end_time_unit))
            return {
              //write catch for UI based failing later
              title: event.title,
              desc: event.description,
              variant: `${ diff == 1 ? 'fifteen' : ''}${ diff == 2 ? 'thirty' : ''}${ diff == 4 ? 'sixty' : ''}`,
              value: `${ diff == 1 ? 'www.google.com' : ''}${ diff == 2 ? 'www.facebook.com' : ''}${ diff == 4 ? 'www.apple.com' : ''}`,
              timeRange: timeRange,
              dayOfWeek: event.day_of_week,
              ownerId: event.owner_id,
              active: event.active,
              userId: event.user_id
            }
          }
        )
        setEvents(newEvents)
      } catch (err) {
        alert(err)
      }
    }

    getEvents()
  }, [])

  return events
}

export default useEvents
