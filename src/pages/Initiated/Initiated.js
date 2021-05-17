import {useState} from 'react';
import {
  Center,
  Box,
  Flex,
  Text
} from "@chakra-ui/react"

import withMenu from '../withMenu/withMenu'
import Cal from '../../components/Cal/Cal'
import Upcoming from '../../components/Upcoming/Upcoming'
import List from '../../components/List/List'

import styles from './Initiated.module.scss'

function Initiated() {

  return (
    <Flex className="initiated-container" px="30px" py="60px" h="100%" w="100%" alignItems='center' justifyContent='space-between'>
      <Flex w="60%" maxW="840px" minW='460px' h="80%" flexDirection="column" alignItems="center" justifyContent="space-between">
        <Cal />
      </Flex>
      <Flex w="30%" maxW="640px" minW='460px' h="80%" flexDirection="column" alignItems="center" justifyContent="space-between">
        <List variant='rounded' title='Sent'>
          <Center borderBottom='1px' borderColor='gray.50' h='2em' >Potential Heist 6/21/2021/ 12:00pm</Center>
          <Center borderBottom='1px' borderColor='gray.50' h='2em' >Bounty Search 7/08/2021 Link 6:00pm</Center>
          <Center borderBottom='1px' borderColor='gray.50' h='2em' >Ship Maintenance 6/29/2021/ 17:00pm</Center>
          <Center borderBottom='1px' borderColor='gray.50' h='2em' >Brunch 8/19/2021/ 9:00am</Center>
        </List>
      </Flex>
    </Flex>
  );
}

Initiated.displayName = "Initiated"
export default withMenu(Initiated);
