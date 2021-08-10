import { Fragment, useState, useEffect } from 'react'
import {
  useStyleConfig,
  Box,
  Flex,
  Spacer,
  Button,
  Text,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from "@chakra-ui/react"

import styles from './InviteCard.module.scss'
import QRCode from "react-qr-code";

const InviteCard = ({invite, variant, onUpdate}) => {

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const formatedDate =  invite?.date ? `${invite.date.getMonth() + 1}/${invite.date.getDate()}/${invite.date.getFullYear()}` : null

  const c_styles = useStyleConfig("InviteCard", { variant })

  return (
    <Box __css={c_styles.container}>
      <Box __css={c_styles.topbar}></Box>
      <Accordion allowToggle w="100%">
        <AccordionItem>
          <Box __css={c_styles.header}>
            <Text minW="150px" fontSize="md">{invite.title}</Text>
            {
              invite.status === 0 ?
                <>
                  <Button ml="10px" mr="5px" size="sm" colorScheme="red" variant="outline" onClick={ () => onUpdate(invite.inviteId, 2) } >Reject</Button>
                  <Button ml="5px" mr="10px" size="sm" colorScheme="green" variant="outline" onClick={ () => onUpdate(invite.inviteId, 1) }>Accept</Button>
                </>
              : invite.status === 1 ?
                <Button ml="10px" mr="10px" size="sm" colorScheme="red" variant="outline" onClick={ () => onUpdate(invite.inviteId, 0) } >Cancel Accept?</Button>
              : invite.status === 2 ?
                <Button ml="10px" mr="5px" size="sm" colorScheme="green" variant="outline" onClick={ () => onUpdate(invite.inviteId, 1) } >Accept Invite?</Button>
              :
                null
            }

            <AccordionButton maxW="50px">
              <Stack justify="center">
                <AccordionIcon/>
              </Stack>
            </AccordionButton>
          </Box>
          <AccordionPanel>
            <Box __css={c_styles.body}>
              <Stack spacing="2">
                <Text fontSize="sm" color="gray.400">{invite.desc}</Text>
                <Text fontSize="sm" color="gray.400">{`${days[formatedDate] ? days[formatedDate] : formatedDate} ${invite.timeRange}`}</Text>
              </Stack>
              <Stack justify="center"><QRCode size={50} value={invite.value} /></Stack>
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}

InviteCard.defaultProps = {
  invite: {},
  onUpdate: (x,y) => console.log(x,y)
}

InviteCard.displayName = "InviteCard"
export default InviteCard
