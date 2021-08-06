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
  Button,
  Box
} from "@chakra-ui/react"

import DatePicker from 'react-date-picker';

import TimeMatches from '../TimeMatches/TimeMatches'
import Card from '../Card/Card'
import Invitees from '../Invitees/Invitees'

//utils
import timeUtils from '../../utils/time_utils.js'

//hooks
import usePages from '../../hooks/usePages'
import useTemplates from '../../hooks/useTemplates'
import { useTemplatesState } from '../../hooks/useTemplates'
import { useEventsDispatch } from '../../hooks/useEvents'
import { useContactsState } from '../../hooks/useContacts'
import { useGroupsState } from '../../hooks/useGroups'

import './CreateModal.scss'

function CreateModal({ label, ...rest }) {

  //Hooks + context/reducers
  const { contacts } = useContactsState()
  const { groups } = useGroupsState()
  const { templates } = useTemplatesState()
  const { createEvent } = useEventsDispatch()
  const [firstPage, goFirstPage, secondPage, goSecondPage, thirdPage, goThirdPage] = usePages()

  //Modal State
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [value, onChange] = useState(new Date())
  const [duration, setDuration] = useState('')
  const [email, setEmail] = useState('')
  const [timesDisplayed, setTimesDisplay] = useState(false)
  const [formDisplayed, setFormDisplay] = useState(true)
  const [eventDisplayed, setEventDisplay] = useState(false)
  const [matches, setMatches] = useState([])
  const [meet, setMeet] = useState({
    title: '',
    desc: '',
    beginTime: null,
    endTime: null,
    date: null,
  });
  const [invitees, setInvitees] = useState({
    groups: [],
    contacts: [],
    emails: []
  })

  const setInvitee = (type, info) => {
    // console.log('setInvitee',type,info)
    if (type === 'contacts') setInvitees({...invitees, contacts: [...invitees.contacts, JSON.parse(info)]} )
    if (type === 'groups') setInvitees({...invitees, groups: [...invitees.groups, JSON.parse(info)]} )
    if (type === 'emails') setInvitees({...invitees, emails: [...invitees.emails, info]} )
  }

  const cancelInvite = (type, info) => {
    // console.log('cancelInvitee',type,info)
    if (type === 'contacts') setInvitees({...invitees, contacts : invitees.contacts.filter( contact => +contact.contactId != +info )})
    if (type === 'groups') setInvitees({...invitees, groups: invitees.groups.filter( group => +group.groupId != +info )})
    if (type === 'emails') setInvitees({...invitees, emails: invitees.emails.filter( email => email != info )})
  }

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
    let year = new Date().getFullYear()

    return `${month}/${day}/${year}`
  }

  const calculateTimes = ()=> {
    const tFactor = duration/15
    // console.log('duration and tfactor: ', duration, tFactor)

    const t1a = Math.floor(Math.random() * 97)
    const t2a = Math.floor(Math.random() * 97)
    const t3a = Math.floor(Math.random() * 97)

    const t1b = t1a + tFactor
    const t2b = t2a + tFactor
    const t3b = t3a + tFactor

    // console.log("calculateTimes: ", t1a, t1b)

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
      goSecondPage()
      // setFormDisplay(timesDisplayed)
      // //event info should ALWAYS be hidden if this view is shown
      // setEventDisplay(false)
      // //invert the display of available times
      // setTimesDisplay(!timesDisplayed)
    }

  const displayEvent =
    (match) => {
      setMeet({...meet, beginTime: match[0], endTime: match[1], date: getDateNumber()})
      goThirdPage()
      // setEventDisplay(!eventDisplayed)
      // setTimesDisplay(!timesDisplayed)
    }

  const saveEvent = async () => {

    const date = new Date(meet.date).toISOString()
    const eventRes = await createEvent(meet.title, meet.desc, 1, meet.beginTime, meet.endTime, date)
    console.log('eventRes: ', eventRes)
    // const eventId = eventRes.id
    // const inviteRes = await eventInvites.createInvite(10, eventId, email, 0)
    // console.log("schedule result?: ", inviteRes)
    closeModal()

  }

  const closeModal = () => {
    setMeet({
      title: '',
      desc: '',
      beginTime: null,
      endTime: null,
      date: null,
    })
    goFirstPage()
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
            fontSize="sm"
            value={meet.title}
            onChange={e => setEventTitle(e.target.value) }
            isRequired
            mb="20px"
            />
          <DatePicker
            onChange={onChange}
            value={value}
          />
          <InputGroup my="20px">
            <Select
              placeholder={label.placeholder}
              fontSize="sm"
              size='md'
              onChange={ e => setDuration(e.target.value) }
              isRequired
            >
              {
                templates.map( template => <option value={template.duration} key={template.id}>{template.title}</option>)
              }

            </Select>
            <InputRightAddon children='Meeting' fontSize="sm"/>
          </InputGroup>
          <Invitees
            contacts={contacts}
            groups={groups}
            invitees={invitees}
            setInvitee={setInvitee}
            cancelInvite={cancelInvite}
          />
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
            <Text w='100%' align='left'>{`${meet.date} ${cTime[0]} - ${cTime[1]}`}</Text>
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

      <Modal isOpen={isOpen} onClose={closeModal} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{label.title}</ModalHeader>
          <ModalCloseButton />
            { firstPage ? page1() : null }
            { secondPage ? page2() : null}
            { thirdPage ? page3() : null}

          <ModalFooter>
            { firstPage ? <Button colorScheme="blue" onClick={ displayTimes }>{label.secondary}</Button> : null }
            { secondPage ? <Button colorScheme="blue" onClick={ goFirstPage }>Return</Button> : null }
            { thirdPage ? <Button colorScheme="blue" onClick={ saveEvent }>Save</Button> : null }
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

CreateModal.displayName = "CreateModal"
export default CreateModal;
