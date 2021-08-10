import {useState, useEffect} from 'react';
import {
    Box,
    Flex,
    HStack,
    Text,
    Badge
} from "@chakra-ui/react"

import EventCard from '../EventCard/EventCard'
import { useEventsDispatch } from '../../hooks/useEvents'

const  InitiatedEvents = ({ events }) => {

  const { deleteEvent, editEvent } = useEventsDispatch()

  return (
    <Box className="events-container" w='100%' >
      <Flex w="100%" flexDirection='row' flexWrap="wrap" justifyContent='flex-start' alignItems='center' >
        {
          events.length ?
            events.map((event, index) => {
              const confirmed = event.invitees.find( invitee => invitee.status == 0 ) ?
                <HStack justify="center">
                  <Text fontSize="sm" color="gray.400">Awaiting Confirmation</Text>
                  <Badge ml="1" fontSize="0.5em" colorScheme="red">Unconfirmed</Badge>
                </HStack>
                :
                <HStack justify="center">
                  <Text fontSize="sm" color="gray.400">All Invitees Confirmed</Text>
                  <Badge ml="1" fontSize="0.5em" colorScheme="green">Confirmed</Badge>
                </HStack>
              return(
                <Box key={index} p="12px" w="33.3333%" boxSizing="border-box">
                  <EventCard
                    type="Event"
                    title={event.title}
                    desc={event.desc}
                    variant={event.active ? '' : 'inactive'}
                    active={event.active}
                    value={event.value}
                    time={event.timeRange}
                    duration={event.duration}
                    id={event.id}
                    day={event.date}
                    invitees={event.invitees}
                    onDelete={deleteEvent}
                    onEditSave={editEvent}
                  />
                  {confirmed}
                </Box>
              );
            })
          :
            <Flex w="100%" justifyContent="center" align="center">
              <Text>No Initiated Events with Invitees</Text>
            </Flex>
        }

      </Flex>
    </Box>
  )
}

InitiatedEvents.defaultProps = {
  events: []
}

InitiatedEvents.displayName = "Initiated Events"
export default InitiatedEvents
