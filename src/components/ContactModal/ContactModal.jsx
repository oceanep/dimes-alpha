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
    InputLeftAddon,
    Select,
    textArea,
    Button,
    IconButton,
    Box,
    Circle
} from "@chakra-ui/react"
import { MdModeEdit } from 'react-icons/md'

import useToggle from "../../hooks/useToggle"
import { useContactsDispatch } from '../../hooks/useContacts'

import './ContactModal.module.scss'

function ContactModal({id, contactId, photo, firstName = '', lastName = '', relationType, phone, email}) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editable: state, toggleEdit: toggle ] = useToggle(true)
  const { editContact } = useContactsDispatch()

  const [newFirstName, setFirstName] = useState(firstName)
  const [newLastName, setLastName] = useState(lastName)
  const [newRelationType, setRelationType] = useState(relationType)
  const [newPhone, setPhone] = useState(phone)
  const [newEmail, setEmail] = useState(email)

  const updateContact = async () => {
    const res = await editContact(id, contactId, newFirstName, newLastName, newRelationType, newPhone, newEmail)
    onClose()
  }

  const editPage = () => (
    <Flex direction="column" justifyContent="space-between" align="center">
      <Box w="100%">
        <Box h="200px" w="100%" background="gray.200"/>
        <Flex mt="-32px" justifyContent="center" align="center">
          <Circle w="75px" overflow="hidden">
            <img src={ photo ? photo : "http://www.gravatar.com/avatar"} overflow="hidden"/>
          </Circle>
        </Flex>
      </Box>
      <Flex direction="column" justifyContent="space-around" align="center" px="24px" mt="12px" minH="200px">
        <InputGroup size='md'>
          <InputLeftAddon children="Name" w="100px"/>
            <HStack>
              <Input
                  placeholder={'First Name'}
                  value={newFirstName}
                  onChange={ e => setFirstName(e.target.value)}
                  isRequired
              />
              <Input
                  placeholder={'Last Name'}
                  value={newLastName}
                  onChange={ e => setLastName(e.target.value)}
                  isRequired
              />
            </HStack>
        </InputGroup>
        <InputGroup size='md'>
          <InputLeftAddon children="Relation" w="100px"/>
            <Input
                placeholder={'Relation'}
                value={newRelationType}
                onChange={ e => setRelationType(e.target.value)}
                isRequired
            />
        </InputGroup>
        <InputGroup size='md'>
          <InputLeftAddon children="Email" w="100px"/>
            <Input
                placeholder={'Email'}
                value={newEmail}
                onChange={ e => setEmail(e.target.value)}
                isRequired
            />
        </InputGroup>
        <InputGroup size='md'>
          <InputLeftAddon children="Phone" w="100px"/>
            <Input
                placeholder={'Phone Number'}
                value={newPhone}
                onChange={ e => setPhone(e.target.value)}
                isRequired
            />
        </InputGroup>
      </Flex>
    </Flex>
  )

  //build out review page later
  //purely for viewing contact information
  const reviewPage = () => (
    <Flex direction="column" justifyContent="space-between" align="center">
      <Box w="100%">
        <Box h="200px" w="100%" background="gray.200"/>
        <Flex mt="-32px" justifyContent="center" align="center">
          <Circle w="75px" overflow="hidden">
            <img src={ photo ? photo : "http://www.gravatar.com/avatar"} overflow="hidden"/>
          </Circle>
        </Flex>
      </Box>
      <Flex direction="column" justifyContent="space-around" align="center" px="24px" mt="12px" minH="200px">

      </Flex>
    </Flex>
  )

  return (
    <>
      <IconButton variant="outline" borderColor="white" icon={<MdModeEdit/>} fontSize="3xl"
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose} size='md'>
          <ModalOverlay />
          <ModalContent>
              <ModalCloseButton />

              <ModalBody p="0px">
                  { editable ? editPage() : reviewPage() }
              </ModalBody>

              <ModalFooter>
                  <Button colorScheme="blue" onClick={updateContact}>Save</Button>
              </ModalFooter>
          </ModalContent>
      </Modal>
    </>
  )
}

ContactModal.displayName = "ContactModal"
export default ContactModal;
