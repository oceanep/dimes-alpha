import {useState} from 'react';
import {
  useStyleConfig,
  Center,
  Box,
  Flex,
  Circle,
  Icon,
  Text,
  Heading
} from "@chakra-ui/react"
import { MdArrowForward, MdArrowBack, MdPerson, MdGroup } from 'react-icons/md'

import styles from './Contacts.module.scss'

function Contacts(props) {
  const { variant, children, type, contactItems,  ...rest } = props
  const c_styles = useStyleConfig("Contacts", { variant })

  return (
    <>
    <Heading size="lg" mb="0.5em">{ type }</Heading>
    <Box __css={c_styles.container} {...rest} w="100%" h="100%">
      <Flex wrap="wrap" justifyContent="space-around" alignItems="center" className={styles.contactsInner}>
        {
          contactItems.map((contact) => {
            return (
              <Flex w="30%" direction="column" align="center">
                <Circle w="70%" shadow='md' overflow="hidden">
                  <Icon as={ type == "Relationships" ? MdPerson : MdGroup } boxSize="100%" />
                </Circle>
                <Text>{ contact.name }</Text>
              </Flex>
            )
          })
        }
      </Flex>
      <Box __css={c_styles.bottomBar} {...rest} h="4em" >
        <Circle size='40px' shadow='md'>
          <Icon as={MdArrowBack} />
        </Circle>
        <Circle size='40px' shadow='md'>
          <Icon as={MdArrowForward} />
        </Circle>
      </Box>
    </Box>
    </>
  )
}

Contacts.displayName = "Contacts"
export default Contacts;
