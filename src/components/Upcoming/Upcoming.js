import {useState} from 'react';
import {
    Center,
    Box,
    Circle,
    Icon,
    Flex,
    Heading
} from "@chakra-ui/react"
import { MdForward } from 'react-icons/md'

import Card from '../Card/Card'

import styles from './Upcoming.module.scss'

function Upcoming() {

  const data = [
    {
      name: 'Event 1',
      date: '6/02/2021'
    },
    {
      name: 'Event 2',
      date: '5/27/2021'
    },
    {
      name: 'Event 3',
      date: '6/07/2021'
    }
  ]

  return (
    <Box className="upcoming-container" w='100%'>
      <Box w='100%' h='2em' mb='4px' shadow='md' borderTop="2px" borderColor='gray.50' rounded='md'/>
      <Flex w="100%" justifyContent="space-between" alignItems='center'>
        {
          data.map((event) => {
            return(
              <Card variant='smooth'>
                <Heading size='sm'>{event.name}</Heading>
                <span>{event.date}</span>
              </Card>
            );
          })
        }
        <Circle size='40px' shadow='md'>
          <Icon as={MdForward} />
        </Circle>
      </Flex>
    </Box>
  );
}

Upcoming.displayName = "Upcoming"
export default Upcoming;
