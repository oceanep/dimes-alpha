import {
    Flex,
    Box,
    Stack,
    Button,
    Switch,
    VStack,
    Avatar,
    Heading,
    Text
} from "@chakra-ui/react"
import { MdPerson } from 'react-icons/md'

import ToggleTemplates from '../ToggleTemplates/ToggleTemplates'

const PreviewSettings = ({ newFirstName, newLastName, newUsername, newEmail, newBlurb, newPhoto, toggleActive }) => {

    return (
        <Flex direction="column" justifyContent="space-between" align="center" w="100%">
            <Box h="200px" w="100%" background="gray.200" rounded="md" />
            <Flex direction={["column", "row"]} w="100%" justifyContent={["center", "space-around"]} alignItems="flex-start">
                <Flex mt="-80px" direction="column" justifyContent="center" align="center">
                    <Avatar name={`${newFirstName} ${newLastName}`} src={newPhoto || "./profile_sample.jpg" || ''} icon={<MdPerson />} size="2xl" />
                    <Heading size="md">{`${newFirstName || 'Name'} ${newLastName || 'Here'}`}</Heading>
                    <Box>
                        <Text color="gray.500" fontSize="md">{`@${newUsername || ''}`}</Text>
                        <Text color="gray.500" fontSize="sm">{`${newEmail || ''}`}</Text>
                    </Box>
                    <Box minH="50px" mt="15px" maxW="260px">
                        <Text fontSize="md">{newBlurb}</Text>
                    </Box>
                </Flex>
                <ToggleTemplates
                    toggle={toggleActive}
                />

            </Flex>
        </Flex>
    )
}

PreviewSettings.defaultProps = {
    newFirstName: '',
    newLastName: '',
    newUsername: '',
    newEmail: '',
    newBlurb: '',
    newPhoto: ''
}

export default PreviewSettings
