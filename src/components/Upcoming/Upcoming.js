import {useState} from 'react';
import {
    Box,
    Flex,
    Button,
    Text,
    Avatar
} from "@chakra-ui/react"
import { MdPlaylistAdd, MdPerson } from 'react-icons/md'

import EventCard from '../EventCard/EventCard'

import styles from './Upcoming.module.scss'
import QRCode from "react-qr-code";

function Upcoming() {

  const data = [
    {
      title: '15 Minute Meeting',
      type: 'One-on-one',
        time: 'fifteen',
        value: 'www.google.com'
    },
    {
      title: '30 Minute Meeting',
      type: 'One-on-one',
        time: 'thirty',
        value: 'www.facebook.com'
    },
    {
      title: '60 Minute Meeting',
      type: 'One-on-one',
        time: 'sixty',
        value: 'www.apple.com'
    },
  ]

  return (
    <Box className="upcoming-container" w='100%'>
      <Box w='100%' mb='4px' px="12px" borderBottom="2px" borderColor='gray.50' rounded='md'>
        <Flex w='50%' pb="15px" justifyContent='flex-start' alignItems="center" display="inline-flex">
          <Avatar mr="10px"name={localStorage.getItem("username") != null ? localStorage.getItem('username') : null} src="./sample_avi.png" />
          <Text fontSize="md" display="inline-block">{localStorage.getItem("username") != null ? localStorage.getItem('username') : null}</Text>
        </Flex>
        <Box w='50%' textAlign='right' display="inline-block">
          <Button fontSize="sm" iconRight={<MdPlaylistAdd/>} variant="outline" >New Event Template</Button>
        </Box>
      </Box>
      <Flex w="100%" flexWrap="wrap" justifyContent="space-between" alignItems='center'>
        {
          data.map((template, index) => {
            return(
              <Box key={index} p="12px" w="33.3333%" boxSizing="border-box">
                <EventCard
                  title={template.title}
                  type={template.type}
                  variant={template.time}
                  value={template.value}
                />
              </Box>
            );
          })
        }
      </Flex>
    </Box>
  );
}

Upcoming.displayName = "Upcoming"
export default Upcoming;
