import {
  Flex,
  Heading,
  Button
} from "@chakra-ui/react"

import Card from '../Card/Card'

function TimeMatches({nextView}) {
  const matches = [
    {
      time: 'mm/dd/yyyy'
    },
    {
      time: 'mm/dd/yyyy'
    },
    {
      time: 'mm/dd/yyyy'
    },
    {
      time: 'mm/dd/yyyy'
    },
    {
      time: 'mm/dd/yyyy'
    },
    {
      time: 'mm/dd/yyyy'
    },
    {
      time: 'mm/dd/yyyy'
    }
  ]

  return (
    <Flex mx='30px' mt='15px' flexWrap='wrap' justifyContent='space-between' alignItems='center' alignContent='space-around'>
      {
        matches.map((match, index) => {
          return(
            <Card variant='smooth' key={index} mb="15px">
              <Heading size='sm'>{match.time}</Heading>
              <Button colorScheme="blue" onClick={nextView}>Choose</Button>
            </Card>
          )
        })
      }
    </Flex>
  )
}

export default TimeMatches;
