import { useState, useCallback, useEffect } from 'react';
import {
  Flex,
  Box,
  Circle,
  Heading,
  Text,
  Button,
  Icon,
  InputGroup,
  Input,
  InputRightAddon,
  Textarea
} from "@chakra-ui/react"

import {
  withRouter
} from "react-router-dom";

import { MdNavigateNext, MdArrowBack, MdAccessTime, MdDateRange } from 'react-icons/md'

import usePages from '../../hooks/usePages'
import AvailabilityButton from '../../components/AvailabilityButton/AvailabilityButton'

import Cal from '../../components/Cal/Cal'

function UserEventsList({match}) {

  const [firstPage, goFirstPage, secondPage, goSecondPage, thirdPage, goThirdPage] = usePages()
  const [showTimes, setShowTimes] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState('')

  const templateClick = (e) => {
    e.preventDefault()
    goSecondPage()
    console.log('secondpage?: ', secondPage)
  }

  const backClick = (e) => {
    e.preventDefault()
    if (secondPage) {
      goFirstPage()
    }
    if (thirdPage) {
      goSecondPage()
    }
  }

  const dayClick = useCallback((date) => {
    setSelectedDate(date)
    setShowTimes(true)
  }, [])

  const selectTime = useCallback((time) => {
    setSelectedTime(time)
    goThirdPage()
  }, [])

  const first = () => (
    <>
      <Box>
        <Heading size="sm">Name</Heading>
        <Text mt="30px" fontSize="md">Follow the instructions to schedule an event with me!</Text>
      </Box>
      <Flex mt="60px">
        <a href='' onClick={templateClick}>
          <Flex pl="15px" pr="10px" py="20px" direction="row" align="center" border="1px" borderColor="gray.100" rounded="md" _hover={{ backgroundColor: 'gray.100'}}>
            <Heading size="md">Event Template Name</Heading>
            <Icon as={MdNavigateNext} boxSize="2em"/>
          </Flex>
        </a>
      </Flex>
    </>
  )

  const second = () => (
    <Flex w="100%">
      <Flex justifyContent="center" align="center">
        <a onClick={backClick} href='!#'>
          <Circle size='40px' shadow='md'  mx="15px">
            <Icon as={MdArrowBack}/>
          </Circle>
        </a>
      </Flex>
      <Flex px="15px" w="35%">
        <Box>
          <Heading size="sm">Name</Heading>
          <Heading size="md">Event: 15 Minute Meeting</Heading>
          <Box>
            <Icon as={MdAccessTime} display="inline-block" mr="10px"/>
            <Text fontSize="md" display="inline-block">Duration: 15 min</Text>
          </Box>
        </Box>
      </Flex>
      <Flex direction="column" justifyContent="flex-start" w="50%" px="15px" borderLeft="1px" borderColor="gray.200">
          <Box align="left">
            <Heading size="md">Select Date & Time</Heading>
          </Box>
          <Box maxW="350px">
            <Cal
              dayClick={dayClick}
            />
          </Box>
      </Flex>
      <Flex>
        { showTimes ? times() : null}
      </Flex>
    </Flex>
  )

  const third = () => (
    <Flex w="100%">
      <Flex justifyContent="center" align="center">
        <a onClick={backClick} href='!#'>
          <Circle size='40px' shadow='md'  mx="15px">
            <Icon as={MdArrowBack}/>
          </Circle>
        </a>
      </Flex>
      <Flex px="15px" w="45%">
        <Box>
          <Heading size="sm">Name</Heading>
          <Heading size="md" mb="15px">Event: 15 Minute Meeting</Heading>
          <Box mb="15px">
            <Icon as={MdAccessTime} display="inline-block" mr="10px"/>
            <Text fontSize="md" display="inline-block">Duration: 15 min</Text>
          </Box>
          <Box>
            <Text fontSize="md" display="inline-block"><Icon as={MdDateRange} display="inline-block" mr="10px"/>{`${selectedTime}, ${selectedDate}`}</Text>
          </Box>
        </Box>
      </Flex>
      <Flex direction="column" justifyContent="space-between" w="50%" minH="500px" px="15px" borderLeft="1px" borderColor="gray.200">
        <Heading size="sm">Enter Details:</Heading>
        <InputGroup>
          <Input />
          <InputRightAddon children="Name" />
        </InputGroup>
        <InputGroup>
          <Input />
          <InputRightAddon children="Email" />
        </InputGroup>
        <Textarea/>
        <Button>Schedule</Button>
      </Flex>
    </Flex>
  )

  const times = () => (
      <Flex direction="column" justifyContent="flex-start" align="center" minW={showTimes ? '250px' : ''}>
        <AvailabilityButton
          time="9:00"
          onConfirm={selectTime}
        />
      </Flex>
    )

  // let id = match.params.user_id
  return (
    <Flex minH="100%" w="100%" py="30px" alignItems='start' justifyContent='center' background="gray.50">
      <Flex minW='900px' flexDirection="column" alignItems="center" justifyContent="space-between" mt="30px" mb="60px" py="30px" px="30px" background="white" boxShadow="md">
        { firstPage ? first() : null}
        { secondPage ? second() : null}
        { thirdPage ? third() : null}
      </Flex>
    </Flex>
  )
}

UserEventsList.displayName = "UserEventsList"
export default withRouter(UserEventsList);
