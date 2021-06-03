import { useState, useEffect } from 'react';
import axios from 'axios';
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
import Pagination from '../../components/Pagination/Pagination'

import styles from './Groups.module.scss'

function Groups() {

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
    <Flex className="Groups-container" px="30px" pt="15px" pb="60px" h="100%" w="100%" alignItems='center' justifyContent='center'>
      <Box w="100%" h="100%" maxW="800px" maxH="600" position="relative">
        <Circle size='40px' shadow='md' position="absolute" right="2%" top="10%">
          <Icon as={MdAddCircle} />
        </Circle>
        <Contacts type="Groups" contactItems={currentContacts} />
        <Pagination
          contactsPerPage={contactsPerPage}
          totalContacts={contactItems.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </Box>
    </Flex>
  );
}

Groups.displayName = "Groups"
export default withMenu(Groups);
