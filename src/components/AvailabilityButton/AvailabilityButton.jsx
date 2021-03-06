import { useEffect } from 'react';
import {
  Flex,
  Text,
  Button
} from "@chakra-ui/react"

import useToggle from '../../hooks/useToggle'

function AvailabilityButton({time, onConfirm}) {

  const [confirm, toggle] = useToggle()
  return (
    <Flex minH="40px" my="15px" w="100%" justifyContent="flex-start" align="center" overflowY="scroll">
      <Button
        variant="outline"
        w={ confirm ? '48.5%' : '100%'}
        onClick={toggle}
      >
        <Text >{`${time[0]} - ${time[1]}`}</Text>
      </Button>
      {
        confirm ?
        <Button
          w="48.5%"
          ml="3%"
          onClick={() => onConfirm(time)}
        >
          <Text>Confirm</Text>
        </Button>
        : null
      }

    </Flex>
  )
}

export default AvailabilityButton
