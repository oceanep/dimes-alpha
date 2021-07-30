import { Calendar, momentLocalizer } from 'react-big-calendar'
import {
    Spinner,
    Flex,
    Button,
    Box,
    VStack,
    StackDivider
} from "@chakra-ui/react"
import moment from 'moment'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from "react"

import { useEventsState } from '../../hooks/useEvents'
import userEvents from '../../utils/user_events'

const localizer = momentLocalizer(moment)
const DnDCalendar = withDragAndDrop(Calendar);

const CalendarComponent = ({ props }) => {

    const userId = localStorage.user_id
    const { events, loading, error } = useEventsState()

    const google_events = JSON.parse(localStorage.getItem("google_events"))
    let parsed_events = []

    const [calEvents, setEvents] = useState(
        parsed_events
    );


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


    useEffect(() => {
        let unmounted = false

        if (!unmounted) {
            parsed_events = [...calEvents]
            if (events) {
                for (var i = 0; i < events.length; i++) {
                    parsed_events.push({
                        id: i,
                        start: new Date(`${events[i].date.getMonth() + 1}/${events[i].date.getDate()}/${events[i].date.getFullYear()} ${events[i].timeRange[0]}:00`),
                        end: new Date(`${events[i].date.getMonth() + 1}/${events[i].date.getDate()}/${events[i].date.getFullYear()} ${events[i].timeRange[1]}:00`),
                        title: events[i].title
                    })
                }
            }

            setEvents(parsed_events)
        }

        return () => { unmounted = true }
    }, [events])

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

    const syncGoogleCalendar = () => {
        if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
            window.listUpcomingEvents(true, "/home")
            window.location.reload()
        }
        else {
            window.gapi.auth2.getAuthInstance().isSignedIn.get()
        }
    }

    return (
        <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
        >
            <div>
                {
                    loading ?
                        <Flex w="100%" justifyContent="center" align="center">
                            <Spinner size="xl" color="teal.500" />
                        </Flex>
                        :
                        <DnDCalendar
                            defaultDate={moment().toDate()}
                            defaultView="month"
                            events={calEvents}
                            localizer={localizer}
                            onEventDrop={onEventDrop}
                            onEventResize={onEventResize}
                            resizable
                            style={{ height: "650px", width: "800px" }}
                        />
                }
            </div>
            <Button onClick={syncGoogleCalendar}>Sync Google Calendar</Button>
        </VStack>
    );
};


export default CalendarComponent;
