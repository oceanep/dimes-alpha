import {useState} from 'react';
import {
  Flex,
  Text,
  Heading,
  Spinner
} from "@chakra-ui/react"

import { MdAddCircle } from 'react-icons/md'

import withMenu from '../withMenu/withMenu'
import InitiatedEvents from '../../components/InitiatedEvents/InitiatedEvents'

import { useEventsState } from '../../hooks/useEvents'

import styles from './Initiated.module.scss'

function Initiated() {

  const { events, loading, error } = useEventsState()

  return (
    <Flex className="initiated-container" minH="100%" w="100%" alignItems='start' justifyContent='center'>
      <Flex position="relative" minW='650px' w="1200px" flexDirection="column" alignItems="center" justifyContent="space-between" mt="30px" mb="60px" py="30px" background="white" boxShadow="md">
        <Heading size="md" mb="1em">Initiated Event Invites</Heading>
        {
          !loading ?
            <InitiatedEvents events={events.filter( event => event.invitees.length > 0 )} />
          :
            <Flex w="100%" justifyContent="center" align="center">
              <Spinner size="xl" color="teal.500" />
            </Flex>
        }
      </Flex>
    </Flex>
  );
}

Initiated.displayName = "Initiated"
export default withMenu(Initiated);
