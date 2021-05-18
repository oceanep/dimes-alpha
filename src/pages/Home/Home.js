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

import styles from './Home.module.scss'

function Home() {

  return (
    <Flex className="home-container" px="30px" py="60px" h="100%" w="100%" alignItems='center' justifyContent='space-between'>
      <Center h="100%">Home, welcome {localStorage.getItem('username')}</Center>
      <Flex w="50%" maxW="640px" minW='460px' h="80%" flexDirection="column" alignItems="center" justifyContent="space-between">
        <Cal />
        <Upcoming />
      </Flex>
      <Flex w="40%" maxW="640px" minW='460px' h="80%" flexDirection="column" alignItems="center" justifyContent="space-between">
        <List variant='rounded' title='Invites'>
          <Center borderBottom='1px' borderColor='gray.50' h='2em' >Lunch 6/21/2021/ 12:00pm</Center>
          <Center borderBottom='1px' borderColor='gray.50' h='2em' >Group 7/08/2021 Link 6:00pm</Center>
          <Center borderBottom='1px' borderColor='gray.50' h='2em' >Jet's Bday 6/29/2021/ 17:00pm</Center>
          <Center borderBottom='1px' borderColor='gray.50' h='2em' >Brunch 8/19/2021/ 9:00am</Center>
        </List>
      </Flex>
    </Flex>
  );
}

Home.displayName = "Home"
export default withMenu(Home);
