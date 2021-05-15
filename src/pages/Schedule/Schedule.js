import {useState} from 'react';
import {
    Center,
    Box,
    Flex
} from "@chakra-ui/react"
import withMenu from '../withMenu/withMenu'

import styles from './Schedule.module.scss'

function Schedule() {

  return (
    <Center h="100%">Schedule</Center>
  );
}

Schedule.displayName = "Schedule"
export default withMenu(Schedule);
