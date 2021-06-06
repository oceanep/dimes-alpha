import {useState} from 'react';
import {
    Center,
    Box,
    Flex,
    Button,
    Text
} from "@chakra-ui/react"

import withMenu from '../withMenu/withMenu'
import Cal from '../../components/Cal/Cal'
import Recurring from '../../components/Recurring/Recurring'

import styles from './Availability.module.scss'

function Availability() {

  return (
    <Flex className={styles.availabilityContainer} shadow='md' rounded='md' borderTop="2px" borderColor='gray.50' mx="30px" my="30px" flexDirection="row" alignItems='start' justifyContent='space-around'>
      <Recurring />
      <Flex h="100%" minW="350px" direction="column">
        <Text pl="10px" w="50%" align="left">Overrides</Text>
        <Button size='lg' mt='1em'>Add a Date Override</Button>
      </Flex>
    </Flex>
  );
}

Availability.displayName = "Availability"
export default withMenu(Availability);
