import {
  useStyleConfig,
  Center,
  Box,
  Flex,
  Circle,
  Icon,
  IconButton,
  Text,
  Heading,
  InputGroup,
  Input,
  HStack
} from "@chakra-ui/react"
import { MdArroMdPerson, MdModeEdit, MdMoreVert, MdStarBorder, MdPhone } from 'react-icons/md'

import ContactModal from '../ContactModal/ContactModal'

import styles from './Contacts.module.scss'

function Contacts({ variant, children, type, contactItems, mini, ...rest }) {
  const c_styles = useStyleConfig("Contacts", { variant })

  return (
    <>
    {mini ? '' : <Heading size="md" mb="1em">{ type }</Heading>}
    <Box __css={c_styles.container} {...rest}>
      <Flex flexDirection="column" justifyContent="space-around" alignItems={ mini ? "center" : "start"} className={styles.contactsInner}>
        {
          contactItems.map((contact, index) => {
            return (
              <Flex w={mini ? '' : "100%"} py="10px" direction={ mini ? "column" : "row"} align="center" justifyContent="space-around" key={contact.id}  borderBottom={mini ? '' : "1px"} borderColor="gray.100">
                <Circle w="75px" overflow="hidden">
                  <img src={ contact.photo ? contact.photo : "http://www.gravatar.com/avatar"} overflow="hidden"/>
                </Circle>
                {
                  mini ?
                    <Box>
                      <Text fontSize="md">{contact.name}</Text>
                      <Text fontSize="sm">{`Relationships: ${contact.relationType}`}</Text>
                    </Box>
                  :

                      // !editable ?
                        <Flex align="center" w="60%" justifyContent="flex-start" justifyContent="space-between">
                          <Flex direction="column" textAlign="left" pr="30px">
                            <Text fontSize="md">{`${contact.firstName ? contact.firstName : ''} ${contact.lastName ? contact.lastName : ''}`}</Text>
                            <Text fontSize="sm">{`Email: ${contact.email ? contact.email : ''}`}</Text>
                          </Flex>
                          <Box textAlign="left">
                            <Text fontSize="sm">{`Relationships: ${contact.relationType}`}</Text>
                          </Box>
                          <Box textAlign="left">
                            <Icon as={ MdPhone } /><Text display="inline-block" fontSize="xs">{contact.phone}</Text>
                            <Text fontSize="sm">Groups: </Text>
                          </Box>
                        </Flex>
                      // :
                      //   <Flex align="center" w="60%" justifyContent="flex-start" justifyContent="space-between">
                      //     <Box textAlign="left" pr="30px">
                      //       <InputGroup size='sm'>
                      //         <HStack>
                      //           <Input
                      //             placeholder={"First Name"}
                      //             isRequired
                      //           />
                      //           <Input
                      //             placeholder={"Last Name"}
                      //             isRequired
                      //           />
                      //           <Input
                      //             placeholder={"Relationships"}
                      //             isRequired
                      //           />
                      //         </HStack>
                      //       </InputGroup>
                      //     </Box>
                      //     <Box textAlign="left">
                      //       <Text fontSize="xs">Last connected: 2 days ago</Text>
                      //       <Text fontSize="sm">Groups: </Text>
                      //     </Box>
                      //   </Flex>

                }

                {
                  mini ? ''
                  :
                  <Flex direction="row">
                    <IconButton variant="outline" borderColor="white" icon={<MdStarBorder/>} fontSize="3xl"/>
                    <IconButton variant="outline" borderColor="white" icon={<MdMoreVert/>} fontSize="3xl"/>
                    <ContactModal
                      id={contact.id}
                      contactId={contact.contactId}
                      photo={contact.photo}
                      firstName={contact.firstName}
                      lastName={contact.lastName}
                      relationType={contact.relationType}
                      phone={contact.phone}
                      email={contact.email}
                    />
                  </Flex>
                }

              </Flex>
            )
          })
        }
      </Flex>
    </Box>
    </>
  )
}

Contacts.defaultProps = {
  mini: false
}

Contacts.displayName = "Contacts"
export default Contacts;
