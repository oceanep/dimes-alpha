import {useState} from 'react';
import {
    Box,
    Flex
} from "@chakra-ui/react"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"

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
      <Flex className="home-container" minH="100%" w="100%" alignItems='start' justifyContent='center'>
        <Flex minW='850px' w="1200px" flexDirection="column" alignItems="center" justifyContent="space-between" mt="30px" mb="60px" py="30px" px="15px" background="white" boxShadow="md">
          <Tabs w="100%" variant="enclosed">
            <TabList>
              <Tab>Events</Tab>
              <Tab>Calendar</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box w="100%">
                  <Upcoming />
                </Box>
              </TabPanel>
              <TabPanel>
                <Flex w="100%" justifyContent="center">
                  <CalendarComponent />
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
    </Flex>
  );
}

Home.displayName = "Home"
export default withMenu(Home);
