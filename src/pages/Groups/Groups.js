import {useState} from 'react';
import {
    Center,
    Box,
    Flex,
    Icon,
    Circle
} from "@chakra-ui/react"
import { MdAddCircle } from 'react-icons/md'

import withMenu from '../withMenu/withMenu'
import Contacts from '../../components/Contacts/Contacts'

import styles from './Groups.module.scss'

function Groups() {

  const contactItems= [
    {
      name: "The Bebop Crew"
    },
    {
      name: "Red Dragon Syndicate"
    },
    {
      name: "Blue Snack Syndicate"
    },
    {
      name: "Space Warriors"
    },
    {
      name: "White Tiger Syndicate"
    },
    {
      name: "Da Ops"
    }
  ]

  return (
    <Flex className="Groups-container" px="30px" pt="15px" pb="60px" h="100%" w="100%" alignItems='center' justifyContent='center'>
      <Box w="100%" h="100%" maxW="800px" maxH="600" position="relative">
        <Circle size='40px' shadow='md' position="absolute" right="2%" top="10%">
          <Icon as={MdAddCircle} />
        </Circle>
        <Contacts type="Groups" contactItems={contactItems} />
      </Box>
    </Flex>
  );
}

Groups.displayName = "Groups"
export default withMenu(Groups);
