import { useEffect, useState } from 'react'
import {
    Flex,
    Box,
    Avatar,
    Heading,
    Text,
    Link,
    Spinner
} from "@chakra-ui/react"
import { MdPerson } from 'react-icons/md'

import userEvents from '../../utils/user_events.js'
import timeUtils from '../../utils/time_utils.js'

import MiniEventCard from '../../components/MiniEventCard/MiniEventCard'

import useUsers from '../../hooks/useUsers'

function UserProfile({ match }) {

  const [ user ] = useUsers({username: match.params.username})

  const currentUserId = localStorage.getItem('userId')

  const [pastEvents, setPastEvents] = useState([])
  const [futureEvents, setFutureEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect( () => {
    if (user?.id) getEvents()
  }, [user])

  const getEvents = async () => {
    const res = await userEvents.getUserEventsForUsers([user.id, currentUserId])
    console.log(res)
    const currentDate = new Date()



    const fetchedEvents = res?.data?.data ? res.data.data.map( e => {

      const timeRange = timeUtils.convertToTime(e.begin_time_unit, e.end_time_unit)
      const duration = Math.abs(e.end_time_unit - e.begin_time_unit)
      const diff = Math.abs(parseInt(e.begin_time_unit) - parseInt(e.end_time_unit))
      const date = new Date(e.date)

      return {
        title: e.title,
        desc: e.description,
        variant: `${ diff == 1 ? 'fifteen' : ''}${ diff == 2 ? 'thirty' : ''}${ diff == 4 ? 'sixty' : ''}`,
        value: `${ diff == 1 ? 'www.google.com' : ''}${ diff == 2 ? 'www.facebook.com' : ''}${ diff == 4 ? 'www.apple.com' : ''}`,
        timeRange: timeRange,
        duration: duration,
        date: date,
        id: e.id,
        ownerId: e.owner_id,
        active: e.active,
        userId: e.user_id
      }
    }) : []

    console.log('fetched Events: ', fetchedEvents)
    const { past, future } = fetchedEvents.reduce( (arrs, event) => {
      console.log('compare: ', new Date(event.date) >= new Date(currentDate))
      if ( event.date < currentDate ) arrs.past.push(event)
      if ( event.date >= currentDate ) arrs.future.push(event)
      return arrs
    }, { past: [], future: []})

    console.log('events: ', past, future)

    setPastEvents(past)
    setFutureEvents(future)
    setLoading(false)
  }

  return (
    <Flex minH="100%" w="100%" py="30px" alignItems='start' justifyContent='center' background="gray.50">
      <Flex minW='900px' flexDirection="column" alignItems="center" justifyContent="space-between" mt="30px" mb="60px" py="30px" px="30px" background="white" boxShadow="md">

        <Flex direction="column" justifyContent="space-between" align="center" w="100%">
          <Box h="200px" w="100%" background="gray.200" rounded="md"/>
          <Flex direction={["column", "row"]} w="100%" justifyContent={["center", "space-around"]} alignItems="flex-start">
            <Flex mt="-80px" direction="column" justifyContent="center" align="center">
              <Avatar name={`${user.firstName} ${user.lastName}`} src={user.photo || "./sample_avi.png" } icon={<MdPerson/>} size="2xl"/>
              <Heading mt="15px" size="md">{`${user.firstName || 'Name'} ${user.lastName || 'Here'}`}</Heading>
              <Box>
                <Text color="gray.500" fontSize="md">{`@${user.username || ''}`}</Text>
                <Text color="gray.500" fontSize="sm">{`${user.email || ''}`}</Text>
              </Box>
              <Box minH="50px" mt="15px" maxW="260px">
                <Text fontSize="md">{user.blurb}</Text>
              </Box>
            </Flex>
          </Flex>
          <Flex>
            <Link mt="15px" fontSize="md" color="gray.400" href={`/${user.id}`}>Booking Page</Link>
          </Flex>
        </Flex>

        <Flex mt="30px" flexDirection={ ["column",'row'] }>
          <Flex mr="10px" ml="20px" p="10px" shadow="inner" maxW="560px" w="100%" flexDirection={ ["column",'row'] } flexWrap={ ["nowrap","wrap"]} justifyContent='flex-start' alignItems='flex-start' alignContent='flex-start'>
            <Heading my="10px" w="100%" flexGrow="2" size="md">Past Events Together</Heading>
            {
              !loading ?
                  pastEvents && pastEvents.length ?
                    pastEvents.map( event => (
                      <Box key={event.id} p="12px" w="50%" boxSizing="border-box">
                        <MiniEventCard
                          event={event}
                        />
                      </Box>
                    ))
                  :
                    <Text fontSize="md" color="gray.400">No Shared Events</Text>
              :
                <Flex w="560px" justifyContent="center" align="center">
                  <Spinner size="xl" color="teal.500" />
                </Flex>
            }
          </Flex>
          <Flex ml="10px" mr="20px" p="10px" shadow="inner" maxW="560px" w="100%" flexDirection={ ["column",'row'] } flexWrap={ ["nowrap","wrap"]} justifyContent='flex-start' alignItems='flex-start' alignContent='flex-start'>
            <Heading my="10px" w="100%" flexGrow="2" size="md">Upcoming Events Together</Heading>
            {
              !loading ?
                  futureEvents && futureEvents.length ?
                    futureEvents.map( event => (
                      <Box key={event.id} p="12px" w="50%" boxSizing="border-box">
                        <MiniEventCard
                          event={event}
                        />
                      </Box>
                    ))
                  :
                    <Text fontSize="md" color="gray.400">No Shared Events</Text>
              :
                <Flex w="560px" justifyContent="center" align="center">
                  <Spinner size="xl" color="teal.500" />
                </Flex>
            }

          </Flex>
        </Flex>

      </Flex>
    </Flex>
  )
}

UserProfile.displayName = "UserProfile"
export default UserProfile
