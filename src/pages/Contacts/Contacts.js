import {useState} from 'react';
import {
    Center,
    Box,
    Flex
} from "@chakra-ui/react"
import withMenu from '../withMenu/withMenu'

import styles from './Contacts.module.scss'

function Contacts() {

  return (
    <Center h="100%">Contacts</Center>
  );
}

Contacts.displayName = "Contacts"
export default withMenu(Contacts);
