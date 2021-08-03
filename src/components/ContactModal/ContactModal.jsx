import { useState } from 'react';
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
    Icon,
    Box,
    Circle
} from "@chakra-ui/react"
import { MdModeEdit, MdAddCircle } from 'react-icons/md'

import useToggle from "../../hooks/useToggle"
import { useContactsDispatch } from '../../hooks/useContacts'

import styles from './ContactModal.module.scss'

function ContactModal({type, id, contactId, photo, firstName, lastName, relationType, phone, email}) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editable: state, toggleEdit: toggle ] = useToggle(true)
  const { editContact, createContact, deleteContact } = useContactsDispatch()

  const [newFirstName, setFirstName] = useState(firstName)
  const [newLastName, setLastName] = useState(lastName)
  const [newRelationType, setRelationType] = useState(relationType)
  const [newPhone, setPhone] = useState(phone)
  const [newEmail, setEmail] = useState(email)

  const updateContact = async () => {
    if (type === 'edit'){
      const res = await editContact(id, contactId, newFirstName, newLastName, newRelationType, newPhone, newEmail)
    } else {
      const contactId = Math.floor(Math.random() * (1000, 300) + 300)
      const res = await createContact(contactId, newFirstName, newLastName, newRelationType, newPhone, newEmail)
      setFirstName(res.firstName)
      setLastName(res.lastName)
      setRelationType(res.relationType)
      setPhone(res.phone)
      setEmail(res.email)
    }
    toggleEdit()
  }

  const onDelete = async () => {
    const res = await deleteContact(id)
  }

  const page = () => (
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

          {
            editable ?
              <InputGroup size='md'>
                <InputLeftAddon children="Name" w="100px"/>
                <HStack spacer="6">
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
            :
              <HStack spacer="6">
                <Text fontSize="md">Name: </Text>
                <Text fontSize="sm">{`${newFirstName} ${newLastName}`}</Text>
              </HStack>
          }
          {
            editable?
              <InputGroup size='md'>
                <InputLeftAddon children="Relation" w="100px"/>
                <Input
                    placeholder={'Relation'}
                    value={newRelationType}
                    onChange={ e => setRelationType(e.target.value)}
                    isRequired
                />
              </InputGroup>
            :
              <HStack spacer="6">
                <Text fontSize="md">Relation: </Text>
                <Text fontSize="sm">{newRelationType}</Text>
              </HStack>
          }
          {
            editable?
              <InputGroup size='md'>
                <InputLeftAddon children="Email" w="100px"/>
                <Input
                    placeholder={'Email'}
                    value={newEmail}
                    onChange={ e => setEmail(e.target.value)}
                    isRequired
                />
              </InputGroup>
            :
              <HStack spacer="6">
                <Text fontSize="md">Email: </Text>
                <Text fontSize="sm">{newEmail}</Text>
              </HStack>

          }
          {
            editable?
              <InputGroup size='md'>
                <InputLeftAddon children="Phone" w="100px"/>
                <Input
                    placeholder={'Phone Number'}
                    value={newPhone}
                    onChange={ e => setPhone(e.target.value)}
                    isRequired
                />
              </InputGroup>
            :
              <HStack spacer="6">
                <Text fontSize="md">Phone: </Text>
                <Text fontSize="sm">{newPhone}</Text>
              </HStack>
          }

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
      {
        type === 'edit' ?
          <IconButton variant="outline" borderColor="white" icon={<MdModeEdit/>} fontSize="3xl"
            onClick={onOpen}
          />
        :
          <button onClick={onOpen}>
            <Circle size='40px' shadow='md'>
                <Icon as={MdAddCircle} />
            </Circle>
          </button>
      }

      <Modal isOpen={isOpen} onClose={onClose} size='md'>
          <ModalOverlay />
          <ModalContent>
              <ModalCloseButton />

              <ModalBody p="0px">
                  {page()}
              </ModalBody>

              <ModalFooter>
                {
                  editable && type === 'edit' ?
                    <HStack spacing="6" w="100%">
                      <Button colorScheme="red" onClick={onDelete}>Delete</Button>
                      <Spacer/>
                      <Button colorScheme="blue" onClick={updateContact}>Save</Button>
                    </HStack>
                  : editable ?
                    <Button colorScheme="blue" onClick={updateContact}>Save</Button>
                  :
                    <Button variant="outline" onClick={onClose}>Close</Button>
                }

              </ModalFooter>
          </ModalContent>
      </Modal>
    </>
  )
}

ContactModal.defaultProps = {
  type: 'edit',
  photo: '',
  firstName: '',
  lastName: '',
  relationType: '',
  phone: '',
  email: ''
}

ContactModal.displayName = "ContactModal"
export default ContactModal;
