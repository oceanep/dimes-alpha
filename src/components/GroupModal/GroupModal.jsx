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
    Heading,
    Circle
} from "@chakra-ui/react"
import { MdGroup, MdModeEdit, MdDeleteForever, MdAddCircle, MdUndo } from 'react-icons/md'

import useToggle from "../../hooks/useToggle"
import { useGroupsDispatch } from "../../hooks/useGroups"

import styles from './GroupModal.module.scss'

function GroupModal({type, groupName, groupId, photo, members, contacts}) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editable: state, toggleEdit: toggle ] = useToggle(type !== 'edit')
  const { setGroupMembers, updateGroup, createGroup, deleteGroup } = useGroupsDispatch()

  const [newGroupName, setGroupName] = useState(groupName)
  const [newPhoto, setPhoto] = useState(photo)
  // const [members, setMembers] = useState(groupMembers)
  const [newMembers, setNewMembers] =  useState([])
  const [deleteMembers, setDeleteMembers] = useState([])
  const [select, setSelect] = useState(null)
  const [saved, setSaved] = useState(false)

  const openEditModal = () => {
    // console.log("group id: ", groupId)
    setGroupMembers(groupId, contacts)
    onOpen()
  }

  const savable = () => (newGroupName != groupName || newPhoto != photo || newMembers.length > 0 || deleteMembers.length > 0)

  const cancelNewMember = (id) => {
    const newArr = newMembers.filter( member => !(member === id))
    setNewMembers(newArr)
  }

  const deleteMember = (id) => {
    if ( !deleteMembers.includes(id) ) {
      const newArr = [...deleteMembers, parseInt(id)]
      setDeleteMembers(newArr)
    }
  }

  const undoDelete = (id) => {
    // console.log('undo delete id: ', id)
    const newArr = deleteMembers.filter( member => !(member === id))
    // console.log('undo delete new arr: ', newArr)
    setDeleteMembers(newArr)
  }

  const onSave = async () => {

    if (type === 'edit') {
      const res = await updateGroup(groupId, newGroupName, newPhoto, newMembers, deleteMembers, contacts)
      setNewMembers([])
      setDeleteMembers([])
    } else {
      const res = await createGroup(newGroupName, newPhoto, newMembers, contacts)
      setSaved(true)
    }
    toggleEdit()
  }

  const onDelete = async () => {
    const res = await deleteGroup(groupId)
  }

  const membersItem = (member, index, newM = false) => (
    <Flex key={member.memberId || member.contactId} px="30px" py="10px" align="center" w="100%" justifyContent="space-between" align="center" borderTop={index === 0 ? "1px solid" : "none"} borderBottom="1px solid" borderColor="gray.100" background={ newM ? "green.100" : deleteMembers.includes(+member.id) ? "red.50" : "none"}>
        <Circle w="36px" mx="5px" overflow="hidden">
          <img src={ member.photo ? member.photo : "http://www.gravatar.com/avatar"} overflow="hidden"/>
        </Circle>
        <Box minW="140px">
          <Text fontSize="md">{`${member.firstName ? member.firstName : ''} ${member.lastName ? member.lastName : ''}`}</Text>
        </Box>
        <Box minW="120px">
          <Text fontSize="sm">{`${member.email ? member.email : ''}`}</Text>
        </Box>
        <Box minW="80px">
          <Text fontSize="sm">{`${member.relationType}`}</Text>
        </Box>
    </Flex>
  )

  const editMembersItem = (member, index, onMemberDelete) => (
    <Flex key={member.memberId || member.contactId} px="30px" py="10px" align="center" w="100%" justifyContent="space-between" align="center" borderTop={index === 0 ? "1px solid" : "none"} borderBottom="1px solid" borderColor="gray.100">
        <Circle w="36px" mx="5px" overflow="hidden">
          <img src={ member.photo ? member.photo : "http://www.gravatar.com/avatar"} overflow="hidden"/>
        </Circle>
        <Box minW="120px">
          <Text fontSize="md">{`${member.firstName ? member.firstName : ''} ${member.lastName ? member.lastName : ''}`}</Text>
        </Box>
        <Box minW="100px">
          <Text fontSize="sm">{`${member.email ? member.email : ''}`}</Text>
        </Box>
        <Box minW="80px" textAlign="center">
          <Text fontSize="sm">{`${member.relationType}`}</Text>
        </Box>
        <Box minW="40px">
          {
            deleteMembers.includes(+member.id) ?
              <IconButton onClick={ () => undoDelete(member.id)} colorScheme="green" variant="ghost" icon={<MdUndo/>} />
            :
              <IconButton onClick={ () => onMemberDelete(member.contactId || member.id )} colorScheme="red" variant="ghost" icon={<MdDeleteForever/>} />
          }
        </Box>
    </Flex>
  )

  const filteredContacts = () => {
    const currentMembers = members.map( member => member.memberId)
    return contacts.filter( c => !newMembers.includes(c.contactId) && !currentMembers.includes(c.contactId)).map( contact => (
      <option key={contact.contactId} value={contact.contactId} >{`${contact.firstName} ${contact.lastName}`}</option>
    ))
  }

  return (
    <>
      {
        type === 'edit' ?
          <button onClick={openEditModal}>
            <Circle w="200px" overflow="hidden" border="1px solid" borderColor="gray.100">
              <Icon as={ MdGroup } boxSize="200px" background="gray.50"/>
            </Circle>
          </button>
        :
          <button onClick={onOpen}>
            <Circle size='40px' shadow='md'>
                <Icon as={MdAddCircle} />
            </Circle>
          </button>
      }

      <Modal isOpen={isOpen} onClose={onClose} size='lg'>
          <ModalOverlay />
          <ModalContent>
              <ModalCloseButton />

              <ModalBody p="0px">
                <Flex direction="column" justifyContent="space-between" align="center">
                  <Box w="100%">
                    <Box h="200px" w="100%" background="gray.200"/>
                    <Flex mt="-75px" justifyContent="center" align="center">
                      <Circle w="150px" overflow="hidden">
                        {
                          photo ?
                            <img src={photo} overflow="hidden"/>
                          :
                            <Circle w="200px" overflow="hidden" border="1px solid" borderColor="gray.100">
                              <Icon as={ MdGroup } boxSize="150px" background="gray.50"/>
                            </Circle>
                        }

                      </Circle>
                    </Flex>
                  </Box>
                  {
                    !editable ?
                      <Heading my="15px" size="md">{newGroupName}</Heading>
                    :
                      <Input
                        size="md"
                        my="15px"
                        maxW="200px"
                        placeholder={'First Name'}
                        value={newGroupName}
                        onChange={ e => setGroupName(e.target.value)}
                        isRequired
                      />
                  }
                  <Flex w="100%" direction="column" justifyContent="space-around" align="center">
                    {
                      !editable ?
                        members.length > 0 ?
                          members.map( (member, index) => (
                            membersItem(member, index)
                          ))
                        :
                          null
                      :
                        members.length > 0 ?
                          members.map( (member, index) => (
                            editMembersItem(member, index, deleteMember)
                          ))
                        :
                          null
                    }
                    {
                      !editable ?
                        newMembers.map( (member, index) => {
                          const c_obj = contacts.find( contact => member === contact.contactId )
                          return (
                            membersItem( c_obj, index+1, true)
                          )
                        })
                      :
                        newMembers.map( (member, index) => {
                          const c_obj = contacts.find( contact => member === contact.contactId )
                          // console.log('mapping new contacts: ', c_obj)
                          return (
                            editMembersItem( c_obj, index+1, cancelNewMember)
                          )
                        })
                    }
                    {
                      !editable ?
                        null
                      :
                        <Flex px="30px" py="10px" align="center" w="100%" justifyContent="space-between" align="center" borderBottom="1px solid" borderColor="gray.100">
                          <Select
                            mr="30px"
                            placeholder="Contacts"
                            onChange={ e => setSelect(e.target.value)}
                          >
                            {filteredContacts()}
                          </Select>
                          <Button variant="outline" leftIcon={<MdAddCircle/>} onClick={ () => setNewMembers([...newMembers, parseInt(select)])}>Add</Button>
                        </Flex>
                    }
                  </Flex>
                </Flex>
              </ModalBody>

              <ModalFooter>
                {
                  !editable ?
                    <HStack spacing="6">
                      <Button leftIcon={<MdModeEdit/>} colorScheme="blue" onClick={toggleEdit}>Edit</Button>
                      { savable() ? <Button variant="outline" onClick={onSave} disabled={saved && type !== 'edit'}>Save</Button> : null }
                    </HStack>
                  :
                    <HStack spacing="6" w="100%">
                      {
                        type === 'edit' ?
                          <Button colorScheme="red" onClick={onDelete}>Delete Group</Button>
                        :
                          null
                      }
                      <Spacer/>
                      <Button variant="outline" colorScheme="red" onClick={toggleEdit}>Cancel</Button>
                      <Button variant="outline" onClick={onSave} disabled={saved && type !== 'edit'}>Save</Button>
                    </HStack>
                }
              </ModalFooter>
          </ModalContent>
      </Modal>
    </>
  )
}

GroupModal.defaultProps = {
  type: 'edit',
  groupName: '',
  groupId: '',
  photo: '',
  members: [],
  contacts: []
}

GroupModal.displayName = "GroupModal"
export default GroupModal;
