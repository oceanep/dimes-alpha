import {useState} from 'react';
import {
  useStyleConfig,
  Center,
  Box,
  Flex,
  Circle,
  Icon,
  IconButton,
  Text,
  Heading
} from "@chakra-ui/react"
import { MdArrowForward, MdArrowBack, MdPerson, MdGroup, MdModeEdit, MdMoreVert, MdStarBorder } from 'react-icons/md'

import styles from './Contacts.module.scss'

function Contacts(props) {
  const { variant, children, type, contactItems, mini, ...rest } = props
  const c_styles = useStyleConfig("Contacts", { variant })

  return (
    <>
    {mini ? '' : <Heading size="md" mb="1em">{ type }</Heading>}
    <Box __css={c_styles.container} {...rest}>
      <Flex flexDirection="column" justifyContent="space-around" alignItems="start" className={styles.contactsInner}>
        {
          contactItems.map((contact, index) => {
            return (
              <Flex w="100%" py="10px" direction="row" align="center" justifyContent="space-around" key={index}  borderBottom="1px" borderColor="gray.100">
                <Circle w="100px" overflow="hidden">
                  <Icon as={ type == "Relationships" ? MdPerson : MdGroup } boxSize="100px" />
                </Circle>
                <Flex align="center" w="60%" justifyContent="flex-start" justifyContent="space-between">
                  <Box textAlign="left" pr="30px">
                    <Text fontSize="md">{ contact.title }</Text>
                    <Text fontSize="sm">Relationships: </Text>
                  </Box>
                  <Box textAlign="left">
                    <Text fontSize="xs">Last connected: 2 days ago</Text>
                    <Text fontSize="sm">Groups: </Text>
                  </Box>
                </Flex>
                {
                  mini ? ''
                  :
                  <Flex direction="row">
                    <IconButton variant="outline" borderColor="white" icon={<MdStarBorder/>} fontSize="3xl"/>
                    <IconButton variant="outline" borderColor="white" icon={<MdMoreVert/>} fontSize="3xl"/>
                    <IconButton variant="outline" borderColor="white" icon={<MdModeEdit/>} fontSize="3xl"/>
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
