import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react"

const localizer = momentLocalizer(moment)
const DnDCalendar = withDragAndDrop(Calendar);
const google_events = JSON.parse(localStorage.getItem("google_events"))
const parsed_events = []

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
const CalendarComponent = ({ props }) => {

    const [events, setEvents] = useState(
        parsed_events
    );

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
