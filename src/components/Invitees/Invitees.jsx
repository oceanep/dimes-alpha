import { useState } from 'react';
import {
  Flex,
  HStack,
  VStack,
  Spacer,
  Heading,
  Text,
  Box,
  Select,
  Input,
  InputGroup,
  InputLeftAddon,
  IconButton,
  Icon,
  Avatar
} from "@chakra-ui/react"
import { MdAdd, MdPerson, MdPersonAdd, MdGroup, MdGroupAdd, MdCancel } from 'react-icons/md'

import styles from './Invitees.module.scss'

function Invitees({contacts, groups, invitees, setInvitee, cancelInvite}) {

  const [cSelect, setCSelect] = useState({})
  const [gSelect, setGSelect] = useState({})
  const [email, setEmail] = useState('')

  return (
    <Flex direction="column" border="1px solid" borderColor="gray.200" pt="15px">
      <Heading size="sm" pl="15px">Invitees</Heading>
      <Flex direction="column" my="15px" px="15px">
        {/*select from contacts drop down, confirm Button*/}
        <HStack mb="15px">
          <InputGroup size="md">
            <InputLeftAddon children="Contacts" minW="100px" fontSize="sm" />
            <Select
              placeholder="Invite Contact"
              fontSize="sm"
              size='md'
              onChange={ e => setCSelect(e.target.value) }
            >
              {contacts.map( contact => <option key={contact.id} value={JSON.stringify({ email: contact.email,  contactId: contact.contactId || null, name: `${contact.firstName || ''} ${contact.lastName || ''}`, photo: contact.photo || '' })}>{`${contact.firstName ? contact.firstName : ''} ${contact.lastName ? contact.lastName : ''}`}</option>)}
            </Select>
          </InputGroup>
          <IconButton icon={<MdPersonAdd/>} variant="outline" colorScheme="blue" onClick={() => setInvitee('contacts', cSelect)}/>
        </HStack>
        {/*select from groups drop down, confirm button*/}
        <HStack mb="15px">
          <InputGroup size="md">
            <InputLeftAddon children="Groups" minW="100px" fontSize="sm"/>
            <Select
              placeholder="Invite Group"
              fontSize="sm"
              size='md'
              onChange={ e => setGSelect(e.target.value) }
            >
              {groups.map( group => <option key={group.id} value={JSON.stringify({ name: group.name, groupId: group.id, photo: group.photo || ''})}>{group.name}</option>)}
            </Select>
          </InputGroup>
          <IconButton icon={<MdGroupAdd/>} variant="outline" colorScheme="blue" onClick={() => setInvitee('groups', gSelect)}/>
        </HStack>
        {/*input for raw email*/}
        <HStack mb="15px">
          <InputGroup size="md">
            <InputLeftAddon children="Email" minW="100px" fontSize="sm"/>
            <Input
              placeholder='Email'
              fontSize="sm"
              size='md'
              value={email}
              onChange={e => setEmail(e.target.value) }
              isRequired
            />
          </InputGroup>
          <IconButton icon={<MdAdd/>} variant="outline" colorScheme="blue" onClick={() => setInvitee('emails', email)}/>
        </HStack>
      </Flex>
      <Flex direction="column" >
        {/*map list of invitees, cancel button for each invitee*/}
        {
          /*map groups*/
          invitees.groups.length ?
            <Box borderTop="1px solid" borderColor="gray.200" px="10px" pt="10px">
              <HStack mb="10px">
                <Icon as={MdGroup}/>
                <Heading size="sm">Groups</Heading>
              </HStack>
              <Flex direction="column">
                {
                  invitees.groups && invitees.groups.length ?
                    invitees.groups.map( group =>
                    <HStack key={group.id} spacing="15px" mb="10px">
                      <Avatar name={group.name} src={group.photo} icon={<MdGroup/>} size="sm"/>
                      <Text fontSize="sm" minW="100px">{group.name}</Text>
                      <Spacer/>
                      <IconButton icon={<MdCancel/>} variant="outline" colorScheme="red" size="sm" onClick={ () => cancelInvite('groups', group) } />
                    </HStack>
                  )
                  :
                    null
                }
              </Flex>
            </Box>
          :
            null
        }
        {
          /*map contacts*/
          invitees.contacts.length ?
            <Box borderTop="1px solid" borderColor="gray.200" px="10px" pt="10px">
              <HStack mb="10px">
                <Icon as={MdPerson}/>
                <Heading size="sm">Contacts</Heading>
              </HStack>
              <Flex direction="column">
                {invitees.contacts.map( (contact, index) =>
                  <HStack key={contacts.contactsId || index} spacing="15px" mb="10px">
                    <Avatar name={contact.name} src={contact.photo} icon={<MdPerson/>} size="sm"/>
                    <Text fontSize="sm"  minW="100px">{contact.name}</Text>
                    <Text fontSize="sm"  minW="100px">{contact.email}</Text>
                    <Spacer/>
                    <IconButton icon={<MdCancel/>} variant="outline" colorScheme="red" size="sm" onClick={ () => cancelInvite('contacts', contact) } />
                  </HStack>
                )}
              </Flex>
            </Box>
          :
            null
        }
        {
          /*map emails*/
          invitees.emails.length ?
            <Box borderTop="1px solid" borderColor="gray.200" px="10px" pt="10px">
              <HStack mb="10px">
                <Icon as={MdPerson}/>
                <Heading size="sm">Emails</Heading>
              </HStack>
              <Flex direction="column">
                {invitees.emails.map( (em, index) =>
                  <HStack key={`${index}${em?.email || em}`} spacing="15px" mb="10px">
                    <Avatar icon={<MdPerson/>} size="sm"/>
                    <Text fontSize="sm"  minW="100px"></Text>
                    <Text fontSize="sm"  minW="100px">{em?.email || em}</Text>
                    <Spacer/>
                    <IconButton icon={<MdCancel/>} variant="outline" colorScheme="red" size="sm" onClick={ () => cancelInvite('emails', em) } />
                  </HStack>
                )}
              </Flex>
            </Box>
          :
            null
        }
      </Flex>
    </Flex>
  )
}

Invitees.defaultProps = {
  contacts: [],
  groups: [],
  invitees: {
    groups: [],
    contacts: [],
    emails: []
  },
  setInvitee: (type, value) => value,
  cancelInvite: (type, value) => value
}

Invitees.displayName = "Invitees"
export default Invitees;
