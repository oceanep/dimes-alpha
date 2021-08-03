import {useState} from 'react';
import {
  useStyleConfig,
  Center,
  Box,
  Flex,
  Circle,
  Icon,
  IconButton,
  Text,
  Heading,
  InputGroup,
  Input,
  HStack
} from "@chakra-ui/react"

import GroupModal from "../GroupModal/GroupModal"
import { useContactsState } from "../../hooks/useContacts"

import styles from './GroupsDisplay.module.scss'

function GroupsDisplay({groups}) {

  const { contacts } = useContactsState()

  return (
    <>
      <Heading size="md" mb="1em">Groups</Heading>
      <Box background="white" w="100%" pb="20px">
        <Flex direction="row" justifyContent="flex-start" align="center" flexWrap="wrap">
          {
            groups.map((group, index) => {
              // console.log("group id in display: ", group.id)
              return (
              <Flex key={group.id} direction="column" justifyContent="center" align="center" w="33%" mt="25px">
                <GroupModal groupName={group.name} groupId={group.id} members={group.members} contacts={contacts}/>
                <Text fontSize="md" color="gray.600" mt="5px">{group.name}</Text>
              </Flex>
            )})
          }
        </Flex>
      </Box>
    </>
  )
}

GroupsDisplay.displayName = "Groups Display"
export default GroupsDisplay;
