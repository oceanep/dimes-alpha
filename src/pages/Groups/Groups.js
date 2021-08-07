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
import GroupsDisplay from '../../components/GroupsDisplay/GroupsDisplay'
import Pagination from '../../components/Pagination/Pagination'
import GroupModal from "../../components/GroupModal/GroupModal"

import { useGroupsState } from '../../hooks/useGroups'
import { useContactsState } from "../../hooks/useContacts"

import styles from './Groups.module.scss'

function Groups() {

  const { groups, loading, error } = useGroupsState()
  const { contacts } = useContactsState()

  const [currentPage, setCurrentPage] = useState(1);
  const [groupsPerPage] = useState(6);



  // Get current contacts
 const indexOfLastPost = currentPage * groupsPerPage;
 const indexOfFirstPost = indexOfLastPost - groupsPerPage;
 const currentGroups = groups.slice(indexOfFirstPost, indexOfLastPost);

 //Change page
 const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <Flex className="Groups-container" minH="100%" w="100%" alignItems='start' justifyContent='center'>
      <Flex position="relative" minW='650px' w="1200px" flexDirection="column" alignItems="center" justifyContent="space-between" mt="30px" mb="60px" py="30px" background="white" boxShadow="md">
        <Box position="absolute" right="2%" top="2%">
          <GroupModal type='create' contacts={contacts}/>
        </Box>
        <GroupsDisplay type="Groups" groups={currentGroups} />
        <Pagination
          contactsPerPage={groupsPerPage}
          totalContacts={groups.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </Flex>
    </Flex>
  );
}

Groups.displayName = "Groups"
export default withMenu(Groups);
