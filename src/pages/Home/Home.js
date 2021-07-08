import { useState, useEffect } from 'react';
import axios from 'axios';
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
import Contacts from '../../components/Contacts/Contacts'
import Pagination from '../../components/Pagination/Pagination'

import styles from './Home.module.scss'

function Home() {

    const [contactItems, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [contactsPerPage] = useState(6);

    useEffect(() => {
      const fetchContacts = async () => {
        setLoading(true)
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
        setContacts(res.data);
        setLoading(false);
      };

      fetchContacts()
    }, [])

    // Get current contacts
   const indexOfLastPost = currentPage * contactsPerPage;
   const indexOfFirstPost = indexOfLastPost - contactsPerPage;
   const currentContacts = contactItems.slice(indexOfFirstPost, indexOfLastPost);

   //Change page
   const paginate = pageNumber => setCurrentPage(pageNumber)

    return (
        <Box>
          <Flex className="home-container" minH="100%" w="100%" alignItems='start' justifyContent='center'>
            <Flex minW='900px' w="1500px" flexDirection="column" alignItems="center" justifyContent="space-between" mt="30px" mb="60px" py="30px" px="15px" background="white" boxShadow="md">
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
                  <Flex position="relative" flexDirection="column" alignItems="center" pt="15px" pr="30px">
                      <Contacts type="Relationships" contactItems={currentContacts} mini/>
                      <Pagination
                        contactsPerPage={contactsPerPage}
                        totalContacts={contactItems.length}
                        paginate={paginate}
                        currentPage={currentPage}
                        mini
                      />
                  </Flex>
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
