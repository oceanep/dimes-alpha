import {useState} from 'react';
import {
    Center,
    Box,
    Flex,
    Text
} from "@chakra-ui/react"

import { MdAddCircle } from 'react-icons/md'

import withMenu from '../withMenu/withMenu'
import Cal from '../../components/Cal/Cal'
import CalendarComponent from '../../components/CalendarComponent/CalendarComponent.jsx'
import Upcoming from '../../components/Upcoming/Upcoming'
import List from '../../components/List/List'
import CreateModal from '../../components/CreateModal/CreateModal'
import LandingNav from '../../components/LandingNav/LandingNav.jsx'
import styles from './Home.module.scss'

function Home() {
    return (        
      <Flex className="home-container" px="30px" py="60px" h="100%" w="100%" alignItems='center' justifyContent='space-between'>
        <Flex w="50%" minW='460px' h="80%" flexDirection="column" alignItems="center" justifyContent="space-between">
        <CalendarComponent />
        <Upcoming />
      </Flex>
    </Flex>
  );
}

Home.displayName = "Home"
export default withMenu(Home);
