import {useState} from 'react';
import {
    Center,
    Box,
    Flex,
    Circle,
    Icon
} from "@chakra-ui/react"
import { MdAddCircle } from 'react-icons/md'

import withMenu from '../withMenu/withMenu'
import Contacts from '../../components/Contacts/Contacts'

import styles from './Relationships.module.scss'

function Relationships() {

  const contactItems= [
    {
      name: "Spike Spiegel"
    },
    {
      name: "Faye Valentine"
    },
    {
      name: "Jet"
    },
    {
      name: "Edward"
    },
    {
      name: "Julia"
    },
    {
      name: "Vicious"
    }
  ]

  return (
    <Flex className="relationships-container" px="30px" pt="15px" pb="60px" h="100%" w="100%" alignItems='center' justifyContent='center'>
      <Box w="100%" h="100%" maxW="800px" maxH="600" position="relative">
        <Circle size='40px' shadow='md' position="absolute" right="2%" top="10%">
          <Icon as={MdAddCircle} />
        </Circle>
        <Contacts type="Relationships" contactItems={contactItems} />
      </Box>
    </Flex>
  );
}

Relationships.displayName = "Relationships"
export default withMenu(Relationships);
