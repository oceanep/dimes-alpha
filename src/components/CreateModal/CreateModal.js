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

import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import TimeMatches from '../TimeMatches/TimeMatches'

import './CreateModal.scss'

function CreateModal({ label, ...rest }) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [value, onChange] = useState([new Date(), new Date()])
  const [duration, setDuration] = useState('')
  const [timesDisplayed, setTimesDisplay] = useState(false)
  const [formDisplayed, setFormDisplay] = useState(true)
  const [eventDisplayed, setEventDisplay] = useState(false)
  const [meet, setMeet] = useState({
    time: '',
    invitees: [],
    title: '',
    desc: ''
  });

  console.log(meet)



  const selectEvent = (time, invitees) => {
    setMeet({...meet, time, invitees})

  }

  const setEventTitle = (e) => {
    setMeet({...meet, title: e.target.value})
  }

  const setEventDesc = (e) => {
    setMeet({...meet, desc: e.target.value})
  }

  const displayTimes = useCallback(
    () => {
      //to make sure only one display is shown at a time
      setFormDisplay(timesDisplayed)
      //event info should ALWAYS be hidden if this view is shown
      setEventDisplay(false)
      //invert the display of available times
      setTimesDisplay(!timesDisplayed)
    },
    [timesDisplayed, setTimesDisplay, setFormDisplay, setFormDisplay]
  )

  const displayEvent = useCallback(
    () => {
      setEventDisplay(!eventDisplayed)
      setTimesDisplay(!timesDisplayed)
    },
    [eventDisplayed, setEventDisplay, timesDisplayed, setTimesDisplay]
  )

  return (
    <>
      <Button onClick={onOpen} leftIcon={label.icon} fontSize="sm" variant="outline">{label.button}</Button>

      <Modal isOpen={isOpen} onClose={onClose} size={timesDisplayed ? 'xl' : 'sm'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{label.title}</ModalHeader>
          <ModalCloseButton />
            {
              timesDisplayed?
                <TimeMatches nextView={displayEvent}/>
              :
                ''
            }
            {
              formDisplayed?
              <>

                <ModalBody>
                  <Flex direction='column' minH="120px">
                    <HStack w="100%">
                      <Text w="50%" align="left">From:</Text>
                      <Text w="50%" align="left">Until:</Text>
                    </HStack>
                    <DateRangePicker
                      onChange={onChange}
                      value={value}
                    />
                    <Spacer/>
                    <InputGroup>
                      <Select
                        placeholder={label.placeholder}
                        size='md'
                        onChange={setDuration}
                        isRequired
                      >
                        <option value="15">15 Minute</option>
                        <option value="30">30 Minute</option>
                        <option value="60">60 Minute</option>
                      </Select>
                      <InputRightAddon children='Meeting' />
                    </InputGroup>
                  </Flex>
                </ModalBody>
              </>
              :
                ''
            }
            {
              eventDisplayed?
              <>
                <VStack m='30px'>
                  <Text w='92%' align='left'>Details</Text>
                  <Input
                    placeholder='Title'
                    size='md'
                    value={meet.title}
                    onChange={setEventTitle}
                    isRequired/>
                  <Textarea
                    placeholder='Description of event'
                    size='md'
                    value={meet.desc}
                    onChange={setEventDesc}
                  />
                </VStack>
              </>
              :
              ''
            }

          <ModalFooter>
            <Button colorScheme="blue" onClick={displayTimes}>{ timesDisplayed ? 'Return' : label.secondary}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

CreateModal.displayName = "CreateModal"
export default CreateModal;
