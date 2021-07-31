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
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
} from "@chakra-ui/react"
//import moment from 'moment-timezone';

const Notifications = () => {

    return (
        <Box>
            <Flex className="home-container" minH="100%" w="100%" alignItems='start' justifyContent='center'>
                <Flex minW='800px' w="1200px" flexDirection="column" justifyContent="space-between" mb="60px" py="30px" px="15px" background="white" boxShadow="md">
                    <Table variant="simple">
                        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                        <Thead>
                            <Tr>
                                <Th>Title</Th>
                                <Th>Date</Th>
                                <Th isNumeric>Status</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>User accepted your invite.</Td>
                                <Td>2021-07-11</Td>
                                <Td isNumeric>Read</Td>
                            </Tr>
                            <Tr>
                                <Td>Account Password Reset</Td>
                                <Td>2021-07-21</Td>
                                <Td isNumeric>Read</Td>
                            </Tr>
                            <Tr>
                                <Td>User declined your invite.</Td>
                                <Td>2021-07-25</Td>
                                <Td isNumeric>Unread</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </Flex>
            </Flex>
        </Box>
    );
}

Notifications.displayName = "Notifications"
export default withMenu(Notifications);
