import { useState, useEffect } from "react"
import withMenu from '../withMenu/withMenu'
import {
    Box,
    Flex,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Stack,
    Input,
    InputGroup,
    InputLeftAddon,
    Switch,
    VStack,
    StackDivider,
} from "@chakra-ui/react"
//import moment from 'moment-timezone';

const Settings = () => {

    const handleGoogleContacts = (e) => {
        //Check if the user is already signedin
        //console.log("Signed in: ", window.gapi.auth2.getAuthInstance().isSignedIn.get())
        console.log("Value: ", e.target.checked);
    }

    //console.log("Time Zones: ", moment.tz.names());
    return (
        <Box>
            <Flex className="home-container" minH="100%" w="100%" alignItems='start' justifyContent='center'>
                <Flex minW='800px' w="1200px" flexDirection="column" justifyContent="space-between" mt="30px" mb="60px" py="30px" px="15px" background="white" boxShadow="md">
                    <VStack
                        divider={<StackDivider borderColor="gray.200" />}
                        spacing={4}
                        align="stretch"
                    >
                        <Stack direction={["column", "row"]} spacing="24px">
                            <FormControl id="first-name" >
                                <InputGroup>
                                    <InputLeftAddon children="First Name" />
                                    <Input placeholder="phone number" />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="last-name" >
                                <InputGroup>
                                    <InputLeftAddon children="Last Name" />
                                    <Input placeholder="phone number" />
                                </InputGroup>
                            </FormControl>
                        </Stack>
                        <Stack direction={["column", "row"]} spacing="24px">
                            <FormControl display="flex" alignItems="center">
                                <FormLabel htmlFor="google-contact" mb="0">
                                    Import Google Contacts?
                                </FormLabel>
                                <Switch id="email-alerts" onChange={handleGoogleContacts} />
                            </FormControl>
                            <FormControl display="flex" alignItems="center">
                                <FormLabel htmlFor="google-events" mb="0">
                                    Import Google Events?
                                </FormLabel>
                                <Switch id="email-alerts" />
                            </FormControl>
                        </Stack>
                    </VStack>
                </Flex>
            </Flex>
        </Box>
    );
}

Settings.displayName = "Settings"
export default withMenu(Settings);
