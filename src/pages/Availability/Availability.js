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
    <Flex className={styles.availabilityContainer} minH="100%" w="100%" alignItems='start' justifyContent='center'>
      <Flex minW='800px' flexDirection="row" alignItems="start" justifyContent="center" mt="30px" mb="60px" background="white" boxShadow="md">
        <Box fontSize="md">
          <Recurring />
        </Box>
        <Flex minW="350px" direction="column" px="30px">
          <Text fontSize="md" pl="10px" w="100%" align="left">Availability Overrides</Text>
          <Button fontSize="md" size='lg' mt='1em'>Add an Override</Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

Availability.displayName = "Availability"
export default withMenu(Availability);
