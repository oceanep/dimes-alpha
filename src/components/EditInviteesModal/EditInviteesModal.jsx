import { useState, useEffect } from 'react';
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
  Link,
  Button,
  Box
} from "@chakra-ui/react"

import Invitees from '../Invitees/Invitees'

import { useContactsState } from '../../hooks/useContacts'
import { useGroupsState } from '../../hooks/useGroups'

function EditInviteesModal({invitees, onFinish}) {

  //Hooks + context/reducers
  const { contacts } = useContactsState()
  const { groups } = useGroupsState()
  const { isOpen, onOpen, onClose } = useDisclosure()

  //Initialize Invites in format for Invitee component
  const initialInvitees = invitees.reduce( (obj, invitee) => {
    if (invitee.groupInviteeId) {
      const group = groups.find( group => group.id === invitee.groupInviteeId )
      const groupMatch = {
        name: group.name,
        groupId: group.id,
        photo: group.photo || '',
        id: invitee.id
      }
      obj["groups"].push(groupMatch)
    } else if (invitee.userInviteeId) {
      const contact = contacts.find( contact => contact.contactId === invitee.userInviteeId)
      const contactMatch = {
        email: contact.email,
        contactId: contact.contactId || null,
        name: `${contact.firstName || ''} ${contact.lastName || ''}`,
        photo: contact.photo || '',
        id: invitee.id
      }
      obj["contacts"].push(contactMatch)
    } else if (!invitee.groupInviteeId && !invitee.userInviteeId) {
      const emailMatch = {
        email: invitee.inviteeEmail,
        id: invitee.id
      }
      obj["emails"].push(emailMatch)
    }
    return obj
  }, { groups: [], contacts: [], emails: []})

  //Invitee Update State
  const [currentInvitees, setCurrentInvitees] = useState(initialInvitees)
  const [newInvitees, setNewInvitees] = useState({
    groups: [],
    contacts: [],
    emails: []
  })
  const [deleteInvitees, setDeleteInvitees] = useState([])

  const setInvitee = (type, info) => {
    // console.log('setInvitee',type,info)
    if (type === 'contacts') setNewInvitees({...newInvitees, contacts: [...newInvitees.contacts, JSON.parse(info)]} )
    if (type === 'groups') setNewInvitees({...newInvitees, groups: [...newInvitees.groups, JSON.parse(info)]} )
    if (type === 'emails') setNewInvitees({...newInvitees, emails: [...newInvitees.emails, info]} )
  }

  const cancelInvite = (type, info) => {
    // console.log('cancelInvitee',type,info)

    if (type === 'contacts') {
      if ( newInvitees.contacts.find( contact => contact.contactId == info.contactId)) { setNewInvitees({...newInvitees, contacts : newInvitees.contacts.filter( contact => +contact.contactId != +info.contactId )}) }
      else {
        setCurrentInvitees({...currentInvitees, contacts: currentInvitees.contacts.filter( contact => contact.id != info?.id)})
        setDeleteInvitees([...deleteInvitees, info?.id])
      }
    }
    if (type === 'groups') {
      if ( newInvitees.groups.find( group => group.groupId == info.groupId)) { setNewInvitees({...newInvitees, groups: newInvitees.groups.filter( group => +group.groupId != +info.groupId )}) }
      else {
        setCurrentInvitees({...currentInvitees, groups: currentInvitees.groups.filter( group => group.id != info?.id)})
        setDeleteInvitees([...deleteInvitees, info?.id])
      }
    }
    if (type === 'emails') {
      if ( newInvitees.emails.find( email => email == info )) { setNewInvitees({...newInvitees, emails: newInvitees.emails.filter( email => email != info )}) }
      else {
        setCurrentInvitees({...currentInvitees, emails: currentInvitees.emails.filter( email => email.id != info?.id)})
        setDeleteInvitees([...deleteInvitees, info?.id])
      }
    }
  }

  const handleClose = () => {
    onFinish(newInvitees, deleteInvitees)
    onClose()
  }

  const completeInviteesRender = () => ({
    groups: currentInvitees.groups.concat(newInvitees.groups),
    contacts: currentInvitees.contacts.concat(newInvitees.contacts),
    emails: currentInvitees.emails.concat(newInvitees.emails)
  })

  return (
    <>
      <Link fontSize="md" color="gray.400" href="#" onClick={ e => { e.preventDefault(); onOpen() }} >Edit Invites</Link>

      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invitees</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Invitees
              contacts={contacts}
              groups={groups}
              invitees={completeInviteesRender()}
              setInvitee={setInvitee}
              cancelInvite={cancelInvite}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleClose}>Done</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

EditInviteesModal.displayName = "EditInviteesModal"
export default EditInviteesModal
