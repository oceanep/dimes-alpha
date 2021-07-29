import {useState, useEffect} from 'react';
import {
    Box,
    Flex,
    Button,
    Text,
    Avatar,
    Spinner
} from "@chakra-ui/react"
import { MdPlaylistAdd, MdPerson } from 'react-icons/md'

import EventCard from '../EventCard/EventCard'
import CreateModal from '../CreateModal/CreateModal'
import { useEventsState, useEventsDispatch } from '../../hooks/useEvents'

import userEvents from '../../utils/user_events'

import styles from './Upcoming.module.scss'
import QRCode from "react-qr-code";

function Upcoming({ vertical }) {
  const userId = localStorage.user_id
  const { events, loading, error } = useEventsState()
  const { deleteEvent, editEvent } = useEventsDispatch()

  // useEffect( () => {
  //   if (events && events !== null){
  //   }
  // }, [events])

  return (
    <Box className="upcoming-container" w={ vertical ? '' : '100%'} maxH={ vertical ? '650px' : ''} overflowY={ vertical ? 'scroll' : ''} overflowX={ vertical ? 'hidden' : ''}>
      <Flex w='100%' mb='4px' px="12px" pb="15px" borderBottom="2px" borderColor='gray.50' rounded='md'>
        {/*
        <Flex w={ vertical ? '' : '50%'} justifyContent='flex-start' alignItems="center" display="inline-flex">
          <Avatar mr="10px"name={localStorage.getItem("username") != null ? localStorage.getItem('username') : null} src="./sample_avi.png" />
          <Text fontSize="md" display="inline-block">{localStorage.getItem("username") != null ? localStorage.getItem('username') : null}</Text>
        </Flex>
        */}
        {
          vertical ? ''
          :
          <Flex w='100%' justifyContent='flex-end'>
            <CreateModal
              label={{
                icon: <MdPlaylistAdd/>,
                button: 'New Event',
                title: 'New Event',
                placeholder: 'Duration',
                secondary: 'next'
              }}
            />
          </Flex>
        }
      </Flex>
      <Flex w="100%" flexDirection={ vertical ? "column" : 'row' } flexWrap={ vertical ? "nowrap" : "wrap"} justifyContent={ vertical ? 'space-between' : 'flex-start'} alignItems={ vertical ? 'flex-start' : 'center'}>
        {
          !loading ?
            events.map((event, index) => {
              return(
                <Box key={index} p="12px" w="33.3333%" boxSizing="border-box">
                  <EventCard
                    type="Event"
                    title={event.title}
                    desc={event.desc}
                    variant={event.variant}
                    value={event.value}
                    time={event.timeRange}
                    duration={event.duration}
                    id={event.id}
                    day={event.date}
                    onDelete={deleteEvent}
                    onEditSave={editEvent}
                  />
                </Box>
              );
            })
          :
            <Flex w="100%" justifyContent="center" align="center">
              <Spinner size="xl" color="teal.500" />
            </Flex>
        }

      </Flex>
    </Box>
  );
}

Upcoming.defaultProps = {
  vertical: false
}

Upcoming.displayName = "Upcoming"
export default Upcoming;
