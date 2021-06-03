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
    <Box __css={c_styles.container} {...rest} w="100%" minH="560px">
      <Flex wrap="wrap" justifyContent="space-around" alignItems="center" className={styles.contactsInner}>
        {
          contactItems.map((contact, index) => {
            return (
              <Flex w="30%" direction="column" align="center" key={index}>
                <Circle w="70%" shadow='md' overflow="hidden">
                  <Icon as={ type == "Relationships" ? MdPerson : MdGroup } boxSize="100%" />
                </Circle>
                <Text>{ contact.title }</Text>
              </Flex>
            )
          })
        }
      </Flex>
    </Box>
    </>
  )
}

Contacts.displayName = "Contacts"
export default Contacts;
