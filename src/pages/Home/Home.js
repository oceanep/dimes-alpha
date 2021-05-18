import {useState} from 'react';
import {
    Center,
    Box,
    Flex
} from "@chakra-ui/react"
import withMenu from '../withMenu/withMenu'

import styles from './Home.module.scss'

function Home() {

  return (
    <Center h="100%">Home, welcome {localStorage.getItem('username')}</Center>
  );
}

Home.displayName = "Home"
export default withMenu(Home);
