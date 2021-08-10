import {useState} from 'react';
import {
  Flex,
  Text,
  Heading,
  Spinner
} from "@chakra-ui/react"

import { MdAddCircle } from 'react-icons/md'

import withMenu from '../withMenu/withMenu'
import InvitesList from '../../components/InvitesList/InvitesList'

import useInvitedEvents from '../../hooks/useInvitedEvents'

import styles from './Invited.module.scss'

function Invited() {

  const [{ events, loading, error }, updateStatus] = useInvitedEvents()

  return (
    <Flex className="initiated-container" minH="100%" w="100%" alignItems='start' justifyContent='center'>
      <Flex position="relative" minW='650px' w="1200px" flexDirection="column" alignItems="center" justifyContent="space-between" mt="30px" mb="60px" py="30px" background="white" boxShadow="md">
        <Heading size="md" mb="1em">Initiated Event Invites</Heading>
        {
          !loading ?
            <InvitesList events={events} updateStatus={updateStatus}/>
          :
            <Flex w="100%" justifyContent="center" align="center">
              <Spinner size="xl" color="teal.500" />
            </Flex>
        }
      </Flex>
    </Flex>
  );
}

Invited.displayName = "Invited"
export default withMenu(Invited);
