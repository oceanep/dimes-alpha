import { useState, useCallback, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  HStack,
  VStack,
  Spacer,
  Heading,
  Text,
  Textarea,
  InputGroup,
  Input,
  InputRightAddon,
  Select,
  textArea,
  Button,
  Box
} from "@chakra-ui/react"

import DatePicker from 'react-date-picker';

import TimeMatches from '../TimeMatches/TimeMatches'
import Card from '../Card/Card'
import timeUtils from '../../utils/time_utils.js'
import userEvents from '../../utils/user_events.js'

import './CreateModal.scss'

function CreateModal({ label, ...rest }) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [value, onChange] = useState(new Date())
  const [duration, setDuration] = useState('')
  // const [title, setTitle] = useState('')
  const [timesDisplayed, setTimesDisplay] = useState(false)
  const [formDisplayed, setFormDisplay] = useState(true)
  const [eventDisplayed, setEventDisplay] = useState(false)
  const [matches, setMatches] = useState([])
  const [meet, setMeet] = useState({
    title: '',
    desc: '',
    beginTime: null,
    endTime: null,
    dayOfWeek: null,
  });

  console.log(meet)


  const setEventTitle = (title) => {
    setMeet({...meet, title})
  }

  const setEventDesc = () => {
    let desc = `${duration} min, One-on-one`

    setMeet({...meet, desc})
  }

  const getDateNumber = () => {
    let month = value.getMonth() + 1
    let day = value.getDate()

    return parseInt(`${month}${day}`)
  }

  const calculateTimes = ()=> {
    const tFactor = duration/15
    console.log('duration and tfactor: ', duration, tFactor)

    const t1a = Math.floor(Math.random() * 97)
    const t2a = Math.floor(Math.random() * 97)
    const t3a = Math.floor(Math.random() * 97)

    const t1b = t1a + tFactor
    const t2b = t2a + tFactor
    const t3b = t3a + tFactor

    console.log("calculateTimes: ", t1a, t1b)

    setMatches([
      [t1a, t1b],
      [t2a, t2b],
      [t3a, t3b]
    ])
  }

  const calcDurationBasedInfo = () => {
    setEventTitle()
    calculateTimes()
    setEventDesc()
  }

  const displayTimes =
    () => {
      calcDurationBasedInfo()
      //to make sure only one display is shown at a time
      setFormDisplay(timesDisplayed)
      //event info should ALWAYS be hidden if this view is shown
      setEventDisplay(false)
      //invert the display of available times
      setTimesDisplay(!timesDisplayed)
    }

  const displayEvent =
    (match) => {
      setMeet({...meet, beginTime: match[0], endTime: match[1], dayOfWeek: getDateNumber()})
      setEventDisplay(!eventDisplayed)
      setTimesDisplay(!timesDisplayed)
    }

  const saveEvent = async () => {
    const userId = localStorage.user_id

    const res = await userEvents.createEvent(2, 2, meet.title, meet.desc, 1, meet.beginTime, meet.endTime, meet.dayOfWeek)
    setMeet({
      title: '',
      desc: '',
      beginTime: null,
      endTime: null,
      dayOfWeek: null,
    })
    onClose()
  }

  //modal page rendering functions
  const page1 = () => (
    <>

      <ModalBody>
        <Flex direction='column' minH="120px">
          <Input
            placeholder='Title'
            size='md'
            value={meet.title}
            onChange={e => setEventTitle(e.target.value) }
            isRequired
            mb="20px"
            />
          <HStack w="100%">
            {/*
              <Text w="50%" align="left">Between:</Text>
              <Text w="50%" align="left">And:</Text>
            */}
          </HStack>
          <DatePicker
            onChange={onChange}
            value={value}
          />
          <InputGroup my="20px">
            <Select
              placeholder={label.placeholder}
              size='md'
              onChange={ e => setDuration(e.target.value) }
              isRequired
            >
              <option value="15">15 Minute</option>
              <option value="30">30 Minute</option>
              <option value="60">60 Minute</option>
            </Select>
            <InputRightAddon children='Meeting' />
          </InputGroup>
            {/*
              <VStack>
                <Textarea
                  placeholder='Description of event'
                  size='md'
                  value={meet.desc}
                  onChange={setEventDesc}
                />
              </VStack>
            */}
        </Flex>
      </ModalBody>
    </>
  )

  const page2 = () => (
    <Flex mx='30px' mt='15px' flexWrap='wrap' justifyContent='space-between' alignItems='center' alignContent='space-around'>
      {
        matches.map((match, index) => {
          let cTime = timeUtils.convertToTime(match[0], match[1])
          return(
            <Card variant='smooth' key={index} mb="15px">
              <Heading size='sm'>{`${cTime[0]} - ${cTime[1]}`}</Heading>
              <Button colorScheme="blue" onClick={() => displayEvent(match)}>Choose</Button>
            </Card>
          )
        })
      }
    </Flex>
  )

  const page3 = () => {
    const date = `${(""+meet.dayOfWeek).split("")[0]}/${(""+meet.dayOfWeek).substring(1)}`
    const  cTime = timeUtils.convertToTime(meet.beginTime, meet.endTime)

    return (
      <>
        <VStack my='15px' mx="50px" alignItems="left">
          <Heading size="md" mb="15px">Event Details</Heading>
          <Flex justifyContent="flex-start" alignItems="center" w="100%">
            <Heading size="sm" w="250px">Title: </Heading>
            <Text w='100%' align='left'>{meet.title}</Text>
          </Flex>
          <Flex justifyContent="flex-start" alignItems="center" w="100%">
            <Heading size="sm" w="250px">Date: </Heading>
            <Text w='100%' align='left'>{`${date} ${cTime[0]} - ${cTime[1]}`}</Text>
          </Flex>
          <Flex justifyContent="flex-start" alignItems="center" w="100%">
            <Heading size="sm" w="250px">Description: </Heading>
            <Text w='100%' align='left'>{meet.desc}</Text>
          </Flex>
        </VStack>
      </>
    )
  }

  return (
    <>
      <Button onClick={onOpen} leftIcon={label.icon} fontSize="sm" variant="outline">{label.button}</Button>

      <Modal isOpen={isOpen} onClose={onClose} size={timesDisplayed ? 'xl' : 'sm'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{label.title}</ModalHeader>
          <ModalCloseButton />
            { timesDisplayed ? page2() : '' }
            { formDisplayed ? page1() : '' }
            { eventDisplayed ? page3() : '' }
          <ModalFooter>
            <Button colorScheme="blue" onClick={ eventDisplayed ? saveEvent : displayTimes }>{ timesDisplayed ? 'Return' : label.secondary}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

CreateModal.displayName = "CreateModal"
export default CreateModal;
