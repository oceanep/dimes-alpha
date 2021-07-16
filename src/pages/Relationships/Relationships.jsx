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

import styles from './Relationships.module.scss'

const google_contacts = JSON.parse(localStorage.getItem("google_contacts"))
const parsed_contacts = []

function parse_contacts(obj) {
    var email = null;
    var photo = null;
    if (obj.emailAddresses && (obj.emailAddresses.length >= 1)) {
        email = obj.emailAddresses[0].value;
    }
    if (obj.photos && (obj.photos.length >= 1)) {
        photo = obj.photos[0].url;
    }
    parsed_contacts.push({
        id: obj.resourceName.slice(9,),
        userId: obj.resourceName.slice(9,),
        title: obj.names[0].displayName,
        email: email,
        body: null,
        photo: photo
    })
}

if (google_contacts) {
    google_contacts.forEach(parse_contacts);
}



function Relationships() {

    const [contactItems, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [contactsPerPage] = useState(6);

    useEffect(() => {
        const fetchContacts = async () => {
            setLoading(true)
            //const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
            setContacts(parsed_contacts);
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
        <Flex className="relationships-container" minH="100%" w="100%" alignItems='start' justifyContent='center'>
            <Flex position="relative" minW='650px' w="1200px" flexDirection="column" alignItems="center" justifyContent="space-between" mt="30px" mb="60px" py="30px" background="white" boxShadow="md">

                <Circle size='40px' shadow='md' position="absolute" right="2%" top="2%">
                    <Icon as={MdAddCircle} />
                </Circle>

                <Contacts type="Relationships" contactItems={currentContacts} />
                <Pagination
                    contactsPerPage={contactsPerPage}
                    totalContacts={contactItems.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </Flex>
        </Flex>
    );
}

Relationships.defaultProps = {

}

Relationships.displayName = "Relationships"
export default withMenu(Relationships);
