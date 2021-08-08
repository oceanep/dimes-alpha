import {
    Flex,
    Box,
    Stack,
    Button,
    Switch,
    VStack,
    Avatar,
    Heading,
    Text,
    Link
} from "@chakra-ui/react"
import { MdPerson } from 'react-icons/md'

import useUsers from '../../hooks/useUsers'

function UserProfile({ match }) {

  const [ user ] = useUsers({username: match.params.username})
  console.log(user)

  return (
    <Flex minH="100%" w="100%" py="30px" alignItems='start' justifyContent='center' background="gray.50">
      <Flex minW='900px' flexDirection="column" alignItems="center" justifyContent="space-between" mt="30px" mb="60px" py="30px" px="30px" background="white" boxShadow="md">
        <Flex direction="column" justifyContent="space-between" align="center" w="100%">
          <Box h="200px" w="100%" background="gray.200" rounded="md"/>
          <Flex direction={["column", "row"]} w="100%" justifyContent={["center", "space-around"]} alignItems="flex-start">
            <Flex mt="-80px" direction="column" justifyContent="center" align="center">
              <Avatar name={`${user.firstName} ${user.lastName}`} src={user.photo || "./sample_avi.png" } icon={<MdPerson/>} size="2xl"/>
              <Heading mt="15px" size="md">{`${user.firstName || 'Name'} ${user.lastName || 'Here'}`}</Heading>
              <Box>
                <Text color="gray.500" fontSize="md">{`@${user.username || ''}`}</Text>
                <Text color="gray.500" fontSize="sm">{`${user.email || ''}`}</Text>
              </Box>
              <Box minH="50px" mt="15px" maxW="260px">
                <Text fontSize="md">{user.blurb}</Text>
              </Box>
            </Flex>
          </Flex>
        </Flex>
        <Flex>
          <Link mt="15px" fontSize="md" color="gray.400" href={`/${user.id}`}>Booking Page</Link>
        </Flex>
      </Flex>
    </Flex>
  )
}

UserProfile.displayName = "UserProfile"
export default UserProfile
