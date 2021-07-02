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
import EventTemplates from '../../components/EventTemplates/EventTemplates.jsx'
import List from '../../components/List/List'
import CreateModal from '../../components/CreateModal/CreateModal'
import LandingNav from '../../components/LandingNav/LandingNav.jsx'
import Relationships from '../Relationships/Relationships'

import styles from './Home.module.scss'

function Home() {
    return (
        <Box>
          <Flex className="home-container" minH="100%" w="100%" alignItems='start' justifyContent='center'>
            <Flex minW='850px' w="1200px" flexDirection="column" alignItems="center" justifyContent="space-between" mt="30px" mb="60px" py="30px" px="15px" background="white" boxShadow="md">
              <Tabs w="100%" variant="enclosed">
            <TabList>
              <Tab>Calendar</Tab>
              <Tab>Events</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Flex w="100%" justifyContent="space-between">
                  <Upcoming vertical />
                  <CalendarComponent />
                </Flex>
              </TabPanel>
              <TabPanel>
                <Box w="100%">
                  <EventTemplates />
                  <Box pt="30px">
                    <Upcoming />
                  </Box>

                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
        </Flex>
        </Box>
  );
}

Home.displayName = "Home"
export default withMenu(Home);
