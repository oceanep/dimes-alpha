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

import styles from './Schedule.module.scss'

function Schedule() {

  return (
    <Flex className="schedule-container" px="30px" py="60px" h="100%" w="100%" alignItems='center' justifyContent='space-between'>
      <Flex w="50%" maxW="640px" minW='460px' h="80%" flexDirection="column" alignItems="center" justifyContent="space-between">
        <Cal />
      </Flex>
      <Flex w="40%" maxW="640px" minW='460px' h="80%" flexDirection="column" alignItems="center" justifyContent="space-between">
        <Upcoming />
      </Flex>
    </Flex>
  );
}

Schedule.displayName = "Schedule"
export default withMenu(Schedule);
