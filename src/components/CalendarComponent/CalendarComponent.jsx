import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react"

const localizer = momentLocalizer(moment)
const DnDCalendar = withDragAndDrop(Calendar);

const CalendarComponent = ({ props }) => {

    const [events, setEvents] = useState(

        [{
            id: 0,
            start: new Date('June 12, 2021 19:30:00'),
            end: new Date('June 12, 2021 20:30:00'),
            title: "Flight to ICN",
        },
        {
            id: 1,
            start: new Date('June 15, 2021 19:30:00'),
            end: new Date('June 15, 2021 20:30:00'),
            title: "Dinner in Hongdae",
        },
        {
            id: 2,
            start: new Date('July 15, 2021 18:30:00'),
            end: new Date('July 15, 2021 21:00:00'),
            title: "Bros Night Out",
        },
        {
            id: 3,
            start: new Date('June 20, 2021 12:30:00'),
            end: new Date('June 20, 2021 15:00:00'),
            title: "Flight to HND",
        }

        ]

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
                style={{ height: "100vh", width: "100vh" }}
            />
        </div>
    );
};


export default CalendarComponent;
