import {useState} from 'react';
import {
    Center,
    Box,
    Flex,
    Tabs,
    TabList,
    Tab,
    HStack,
    Text
} from "@chakra-ui/react"

import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import './Recurring.scss'

function Recurring() {
  const [value, onChange] = useState(['10:00', '11:00']);

  return (
    <div>
      <Text w="50%" align="left">Recurring Availability</Text>
      <Box px='1em' py='.5em' mb='1em' shadow='md' rounded='md' borderTop="2px" borderColor='gray.50'>
        <Tabs variant="soft-rounded" colorScheme="blue">
          <TabList>
            <Tab>Monday</Tab>
            <Tab>Tuesday</Tab>
            <Tab>Wednesday</Tab>
            <Tab>Thursday</Tab>
            <Tab>Friday</Tab>
            <Tab>Saturday</Tab>
            <Tab>Sunday</Tab>
          </TabList>
        </Tabs>
      </Box>
      <HStack w="100%">
        <Text w="50%" align="left">From:</Text>
        <Text w="50%" align="left">Until:</Text>
      </HStack>
      <TimeRangePicker
        onChange={onChange}
        value={value}
        className='recCustom'
      />
    </div>
  );
}

Recurring.displayName = "Recurring"
export default Recurring;
