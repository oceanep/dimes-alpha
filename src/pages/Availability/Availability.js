import {useState} from 'react';
import {
    Center,
    Box,
    Flex
} from "@chakra-ui/react"

import withMenu from '../withMenu/withMenu'
import Cal from '../../components/Cal/Cal'
import Recurring from '../../components/Recurring/Recurring'

import styles from './Availability.module.scss'

function Availability() {

  return (
    <Flex className="availability-container" px="30px" py="60px" h="100%" w="100%" flexDirection="column" alignItems='start' justifyContent='space-around'>
      <Recurring />
    </Flex>
  );
}

Availability.displayName = "Availability"
export default withMenu(Availability);
