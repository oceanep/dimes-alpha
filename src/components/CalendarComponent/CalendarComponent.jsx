import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from "react"

import useEvents from '../../hooks/useEvents'
import userEvents from '../../utils/user_events'

const localizer = momentLocalizer(moment)
const DnDCalendar = withDragAndDrop(Calendar);

const CalendarComponent = ({ props }) => {

    const userId = localStorage.user_id
    const dimes_events = useEvents(userEvents.getEvents, 2)

    const google_events = JSON.parse(localStorage.getItem("google_events"))
    let parsed_events = []

    const [events, setEvents] = useState(
        parsed_events
    );



    useEffect(() => {

      parsed_events = [...events]
      if (dimes_events) {
        for (var i = 0; i < dimes_events.length; i++) {
            parsed_events.push({
                id: i,
                start: new Date(`${(""+dimes_events[i].dayOfWeek).split("")[0]} ${(""+dimes_events[i].dayOfWeek).substring(1)}, 2021 ${dimes_events[i].timeRange[0]}:00`),
                end: new Date(`${(""+dimes_events[i].dayOfWeek).split("")[0]} ${(""+dimes_events[i].dayOfWeek).substring(1)}, 2021 ${dimes_events[i].timeRange[1]}:00`),
                title: dimes_events[i].title
            })
        }
      }

      if (google_events) {
          for (var i = 0; i < google_events.length; i++) {
              parsed_events.push({
                  id: i,
                  start: new Date(google_events[i].start["dateTime"]),
                  end: new Date(google_events[i].end["dateTime"]),
                  title: google_events[i].summary
              })
          }
      }

      console.log('dimes events', dimes_events)
      console.log('parsed events', parsed_events)
      setEvents(parsed_events)
    }, [dimes_events, google_events])

    const onEventResize = (data) => {
        const { start, end } = data;
        setEvents(
            events.map(event =>
                event.id === data.event.id
                    ? { ...event, start: start, end: end }
                    : event
            ))

    };

    const onEventDrop = (data) => {
        const { start, end } = data;
        setEvents(
            events.map(event =>
                event.id === data.event.id
                    ? { ...event, start: start, end: end }
                    : event
            ))
    };

    return (
        <div>
            <DnDCalendar
                defaultDate={moment().toDate()}
                defaultView="month"
                events={events}
                localizer={localizer}
                onEventDrop={onEventDrop}
                onEventResize={onEventResize}
                resizable
                style={{ height: "650px", width: "800px" }}
            />
        </div>
    );
};


export default CalendarComponent;
