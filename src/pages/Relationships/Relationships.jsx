import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Center,
    Box,
    Flex,
    Heading,
    Circle,
    Icon,
    Button,
    Spinner
} from "@chakra-ui/react"
import { MdAddCircle } from 'react-icons/md'

import withMenu from '../withMenu/withMenu'
import Contacts from '../../components/Contacts/Contacts'
import Pagination from '../../components/Pagination/Pagination'
import ContactModal from '../../components/ContactModal/ContactModal'

import { useContactsState } from '../../hooks/useContacts'

import styles from './Relationships.module.scss'

function Relationships() {

    const { contacts, loading, error } = useContactsState()

    const [currentPage, setCurrentPage] = useState(1);
    const [contactsPerPage] = useState(20);

    // Get current contacts
    const indexOfLastPost = currentPage * contactsPerPage;
    const indexOfFirstPost = indexOfLastPost - contactsPerPage;
    const currentContacts = contacts.slice(indexOfFirstPost, indexOfLastPost);

    //Change page
    const paginate = pageNumber => setCurrentPage(pageNumber)

    const syncGoogleContacts = () => {
        if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
            window.listConnectionNames()
        }
        else {
            window.gapi.auth2.getAuthInstance().signIn()
        }
    }

    return (
        <Flex className="relationships-container" w="100%" alignItems='start' justifyContent='center'>
            <Flex position="relative" minW='650px' w="1200px" overflowY="scroll" flexDirection="column" alignItems="center" justifyContent="space-between" mt="30px" mb="60px" py="30px" background="white" boxShadow="md">

                <Box position="absolute" right="2%" top="2%">
                    <ContactModal type="create" />
                </Box>
                <Heading size="md" mb="1em">Relationships</Heading>
                {
                  !loading ?
                    <Contacts type="Relationships" contactItems={currentContacts} />
                  :
                    <Flex w="100%" justifyContent="center" align="center">
                      <Spinner size="xl" color="teal.500" />
                    </Flex>
                }
                <Pagination
                    contactsPerPage={contactsPerPage}
                    totalContacts={contacts.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
                <Button onClick={syncGoogleContacts}>Sync Google Contacts</Button>
            </Flex>
        </Flex>
    );
}

Relationships.defaultProps = {

}

Relationships.displayName = "Relationships"
export default withMenu(Relationships);
