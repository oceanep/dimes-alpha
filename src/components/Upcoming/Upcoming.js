import {useState, useEffect} from 'react';
import {
    Box,
    Flex,
    Button,
    Text,
    Avatar
} from "@chakra-ui/react"
import { MdPlaylistAdd, MdPerson } from 'react-icons/md'

import EventCard from '../EventCard/EventCard'
import CreateModal from '../CreateModal/CreateModal'
import useEvents from '../../hooks/useEvents'
import userEvents from '../../utils/user_events'

import styles from './Upcoming.module.scss'
import QRCode from "react-qr-code";

function Upcoming({ vertical }) {
  const userId = localStorage.user_id
  const events = useEvents(userEvents.getEvents, userId)

  const [loading, setLoading] = useState(true)

  useEffect( () => {
    if (events && events !== null){
      setLoading(false)
    }
  }, [events])

  return (
    <Box className="upcoming-container" w={ vertical ? '' : '100%'}>
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
          events.map((event, index) => {
            return(
              <Box key={index} p="12px" w="33.3333%" boxSizing="border-box">
                <EventCard
                  title={event.title}
                  desc={event.desc}
                  variant={event.variant}
                  value={event.value}
                  time={event.timeRange}
                  day={`${(""+event.dayOfWeek).split("")[0]}/${(""+event.dayOfWeek).substring(1)}`}
                />
              </Box>
            );
          })
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
