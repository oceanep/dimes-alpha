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
    Heading,
    Circle
} from "@chakra-ui/react"
import { MdGroup } from 'react-icons/md'

import useToggle from "../../hooks/useToggle"
import { useGroupsDispatch } from "../../hooks/useGroups"

import styles from './GroupModal.module.scss'

function GroupModal({groupName, groupId, photo, members, contacts, icon}) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editable: state, toggleEdit: toggle ] = useToggle()

  const { setGroupMembers } = useGroupsDispatch()

  const openModal = () => {
    setGroupMembers(groupId, contacts)
    onOpen()
  }


  return (
    <>
      <button onClick={openModal}>
        <Circle w="200px" overflow="hidden" border="1px solid" borderColor="gray.100">
          <Icon as={ MdGroup } boxSize="200px" background="gray.50"/>
        </Circle>
      </button>

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
                  <Heading size="md">{groupName}</Heading>
                  <Flex w="100%" direction="column" justifyContent="space-around" align="center">
                    {
                      members.length > 0 ?
                        members.map( member => (
                          <Flex mb="15px" px="30px" align="center" w="100%" justifyContent="space-between" align="center" borderBottom="1px solid" borderColor="gray.100">
                              <Circle w="36px" overflow="hidden">
                                <img src={ member.photo ? member.photo : "http://www.gravatar.com/avatar"} overflow="hidden"/>
                              </Circle>
                              <Box minW="120px">
<Text fontSize="md">{`${member.firstName ? member.firstName : ''} ${member.lastName ? member.lastName : ''}`}</Text>
                              </Box>
                              <Box minW="100px">
<Text fontSize="sm">{`Email: ${member.email ? member.email : ''}`}</Text>
                              </Box>
                              <Box minW="180px">
<Text fontSize="sm">{`Relationships: ${member.relationType}`}</Text>
                              </Box>

                          </Flex>
                        ))
                      :
                        null
                    }
                  </Flex>
                </Flex>
              </ModalBody>

              <ModalFooter>
                  <Button colorScheme="blue" onClick={() => console.log()}>Save</Button>
              </ModalFooter>
          </ModalContent>
      </Modal>
    </>
  )
}

GroupModal.displayName = "GroupModal"
export default GroupModal;
