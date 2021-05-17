import {useState} from 'react';
import {
  Center,
  Box,
  Flex,
  Text
} from "@chakra-ui/react"

import withMenu from '../withMenu/withMenu'
import List from '../../components/List/List'

import styles from './Invited.module.scss'

function Invited() {

  return (
    <Flex className="relationships-container" px="30px" pt="15px" pb="60px" h="100%" w="100%" alignItems='center' justifyContent='center'>
      <Box w="100%" h="100%" maxW="800px" maxH="700">
        <List variant='rounded' title='Invites'>
          <Center borderBottom='1px' borderColor='gray.50' h='2em' >Lunch 6/21/2021/ 12:00pm</Center>
          <Center borderBottom='1px' borderColor='gray.50' h='2em' >Group 7/08/2021 Link 6:00pm</Center>
          <Center borderBottom='1px' borderColor='gray.50' h='2em' >Jet's Bday 6/29/2021/ 17:00pm</Center>
          <Center borderBottom='1px' borderColor='gray.50' h='2em' >Brunch 8/19/2021/ 9:00am</Center>
        </List>
      </Box>
    </Flex>
  );
}

Invited.displayName = "Invited"
export default withMenu(Invited);
