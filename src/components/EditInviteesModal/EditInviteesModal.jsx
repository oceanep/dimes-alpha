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

import userApi from '../../utils/user_api.js'

import { useContactsState } from '../../hooks/useContacts'
import { useGroupsState } from '../../hooks/useGroups'

function EditInviteesModal({invitees, onFinish}) {

  //Hooks + context/reducers
  const { contacts } = useContactsState()
  const { groups } = useGroupsState()
  const { isOpen, onOpen, onClose } = useDisclosure()

  //Invitee Update State
  const [currentInvitees, setCurrentInvitees] = useState([])
  const [newInvitees, setNewInvitees] = useState({
    groups: [],
    contacts: [],
    emails: []
  })
  const [deleteInvitees, setDeleteInvitees] = useState([])

  useEffect(() => {
      if ( invitees && invitees.length) mapInitialInvitees()
  }, [])

  //Initialize Invites in format for Invitee component
  const mapInitialInvitees = async () => {
    const initialContacts = await Promise.all(invitees.filter( invitee => Boolean(invitee.userInviteeId) ).map( async (invitee) => {
      const contact = contacts?.find( contact => contact.contactId === invitee.userInviteeId) ? contacts.find( contact => contact.contactId === invitee.userInviteeId) :
        await userApi.getUserById(invitee.userInviteeId)
      const contactMatch = {
        email: contact?.email || contact?.data?.email || '',
        contactId: contact?.contactId || contact?.data?.id || '',
        name: `${contact?.firstName || contact?.data?.first_name || ''} ${contact?.lastName || contact?.data?.last_name || ''}`,
        photo: contact?.photo || '',
        id: invitee.id
      }
      return contactMatch
    }))

    const initialGroups = invitees.filter( invitee => Boolean(invitee.groupInviteeId) ).map( (invitee) => {
      const group = groups.find( group => group.id === invitee.groupInviteeId )
      const groupMatch = {
        name: group?.name || '',
        groupId: group?.id,
        photo: group?.photo || '',
        id: invitee.id
      }
      return groupMatch
    })

    const initialEmails = invitees.filter( invitee => (!invitee.groupInviteeId && !invitee.userInviteeId) ).map( (invitee) => {
      const emailMatch = {
        email: invitee?.inviteeEmail,
        id: invitee.id
      }
      return emailMatch
    })

    const initialInvitees = {
      groups: initialGroups,
      contacts: initialContacts,
      emails: initialEmails
    }
    // const initialInvitees = await Promise.all(invitees.reduce( async (obj, invitee) => {
    //   if (invitee.groupInviteeId) {
    //     const group = groups.find( group => group.id === invitee.groupInviteeId )
    //     const groupMatch = {
    //       name: group?.name || '',
    //       groupId: group?.id,
    //       photo: group?.photo || '',
    //       id: invitee.id
    //     }
    //     obj["groups"].push(groupMatch)
    //   } else if (invitee.userInviteeId) {
    //     const contact = contacts?.find( contact => contact.contactId === invitee.userInviteeId) ? contacts.find( contact => contact.contactId === invitee.userInviteeId) :
    //       await userApi.getUserById(invitee.userInviteeId)
    //     const contactMatch = {
    //       email: contact?.email || contact?.data?.email || '',
    //       contactId: contact?.contactId || contact?.data?.id || '',
    //       name: `${contact?.firstName || contact?.data?.first_name || ''} ${contact?.lastName || contact?.data?.last_name || ''}`,
    //       photo: contact?.photo || '',
    //       id: invitee.id
    //     }
    //     // obj["contacts"].push(contactMatch)
    //     obj = {...obj, contacts: [...obj.contacts, contactMatch]}
    //   } else if (!invitee.groupInviteeId && !invitee.userInviteeId) {
    //     const emailMatch = {
    //       email: invitee?.inviteeEmail,
    //       id: invitee.id
    //     }
    //     obj["emails"].push(emailMatch)
    //   }
    //   return obj
    // }, { groups: [], contacts: [], emails: []}))
    setCurrentInvitees(initialInvitees)
  }

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
    groups: currentInvitees?.groups?.concat(newInvitees.groups) || newInvitees.groups,
    contacts: currentInvitees?.contacts?.concat(newInvitees.contacts) || newInvitees.contacts,
    emails: currentInvitees?.emails?.concat(newInvitees.emails) || newInvitees.emails
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
