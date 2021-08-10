import {useState, useEffect} from 'react';
import {
    Box,
    Flex,
    HStack,
    Heading
} from "@chakra-ui/react"

import InviteCard from '../InviteCard/InviteCard'

const InviteList = ({events, updateStatus}) => {

  return (
    <Flex w="100%" justifyContent="space-around">
      <Flex direction="column" w="30%">
        <Heading size="sm" mb="15px">Pending</Heading>
        {
          events.filter( event => event.status == 0).map( event =>
            <Box key={event.id} mb="30px">
              <InviteCard mb="30px" invite={event} variant="pending" onUpdate={updateStatus} />
            </Box>
          )
        }
      </Flex>
      <Flex direction="column" w="30%">
        <Heading size="sm" mb="15px">Rejected</Heading>
        {
          events.filter( event => event.status == 2).map( event =>
            <Box key={event.id} mb="30px">
              <InviteCard invite={event} variant="declined" onUpdate={updateStatus} />
            </Box>
          )
        }
      </Flex>
      <Flex direction="column" w="30%">
        <Heading size="sm" mb="15px">Accepted</Heading>
        {
          events.filter( event => event.status == 1).map( event =>
            <Box key={event.id} mb="30px">
              <InviteCard invite={event} variant="accepted" onUpdate={updateStatus} />
            </Box>
          )
        }
      </Flex>
    </Flex>
  )
}

InviteList.defaultProps = {
    events: [],
    updateStatus: (x,y) => console.log(x,y)
}

InviteList.displayName = "InviteList"
export default InviteList
