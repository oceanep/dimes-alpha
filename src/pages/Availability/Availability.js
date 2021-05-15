import {useState} from 'react';
import {
    Center,
    Box,
    Flex
} from "@chakra-ui/react"
import withMenu from '../withMenu/withMenu'

import styles from './Availability.module.scss'

function Availability() {

  return (
    <Center h="100%">Availability</Center>
  );
}

Availability.displayName = "Availability"
export default withMenu(Availability);
