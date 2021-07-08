import {
  Flex,
  Heading,
  Button
} from "@chakra-ui/react"

import Card from '../Card/Card'
import timeUtils from '../../utils/time_utils.js'


function TimeMatches({nextView, matches}) {
  return (
    <Flex mx='30px' mt='15px' flexWrap='wrap' justifyContent='space-between' alignItems='center' alignContent='space-around'>
      {
        matches.map((match, index) => {
          let cTime = timeUtils.convertToTime(match[0], match[1])
          return(
            <Card variant='smooth' key={index} mb="15px">
              <Heading size='sm'>{`${cTime[0]} - ${cTime[1]}`}</Heading>
              <Button colorScheme="blue" onClick={nextView(match)}>Choose</Button>
            </Card>
          )
        })
      }
    </Flex>
  )
}

export default TimeMatches;
