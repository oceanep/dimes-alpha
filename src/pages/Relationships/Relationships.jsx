import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Center,
    Box,
    Flex,
    Circle,
    Icon,
    Button
} from "@chakra-ui/react"
import { MdAddCircle } from 'react-icons/md'

import withMenu from '../withMenu/withMenu'
import Contacts from '../../components/Contacts/Contacts'
import Pagination from '../../components/Pagination/Pagination'

import { useContactsState } from '../../hooks/useContacts'

import styles from './Relationships.module.scss'

function Relationships() {

    const { contacts, loading, error } = useContactsState()

    const [currentPage, setCurrentPage] = useState(1);
    const [contactsPerPage] = useState(6);

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
            window.gapi.auth2.getAuthInstance().isSignedIn.get()
        }
    }

    return (
        <Flex className="relationships-container" minH="100%" w="100%" alignItems='start' justifyContent='center'>
            <Flex position="relative" minW='650px' w="1200px" flexDirection="column" alignItems="center" justifyContent="space-between" mt="30px" mb="60px" py="30px" background="white" boxShadow="md">

                <Circle size='40px' shadow='md' position="absolute" right="2%" top="2%">
                    <Icon as={MdAddCircle} />
                </Circle>

                <Contacts type="Relationships" contactItems={currentContacts} />
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
