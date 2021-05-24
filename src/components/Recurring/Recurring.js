import {useState} from 'react';
import {
    Center,
    Box,
    Flex,
    Tabs,
    TabList,
    Tab,
    HStack,
    Text,
    Button
} from "@chakra-ui/react"

import { MdAddCircle, MdDeleteForever } from 'react-icons/md'

import List from '../../components/List/List'

import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import './Recurring.scss'

function Recurring() {
  const tabs = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const [timeRange, onTimeChange] = useState(['10:00', '11:00']);
  const [tabIndex, setTabIndex] = useState(0);
  const [currentDay, setCurrentDay] = useState('Monday');
  const [availability, setAvailability] = useState([
    '','','','','','',''
  ]);

  const addTime = () => {

    let newArr = [...availability]
    newArr[tabIndex] = {
      index: tabIndex,
      day: currentDay,
      times: newArr[tabIndex].hasOwnProperty('times') ? [...newArr[tabIndex]['times'], timeRange] : [timeRange]
    }
    setAvailability(newArr)
  }

  const removeTime = (index) => {

    let newArr = [...availability]
    console.log('index', index)
    const newTimes = availability[tabIndex].times.filter((time, i) => index !== i )
    console.log(`new times ${newTimes}`)
    newArr[tabIndex] = {
      ...availability[tabIndex], times: newTimes
    }

    console.log(newArr)
    setAvailability(newArr)
  }

  return (
    <Flex w="100%" justifyContent="space-between">
      <Box minW="640px">
        <Text w="50%" align="left">Recurring Availability</Text>
        <Box px='1em' py='.5em' mb='1em' shadow='md' rounded='md' borderTop="2px" borderColor='gray.50'>
          <Tabs onChange={ index => setTabIndex(index)}variant="soft-rounded" colorScheme="blue">
            <TabList>
              { tabs.map( (day,index) => <Tab key={index} onClick={(e) => setCurrentDay(e.target.innerText)}>{day}</Tab>)}
            </TabList>
          </Tabs>
        </Box>
        <HStack w="100%">
          <Text w="50%" align="left">From:</Text>
          <Text w="50%" align="left">Until:</Text>
        </HStack>
        <Flex w="100%" justifyContent="space-between" align="center">
          <TimeRangePicker
            onChange={onTimeChange}
            value={timeRange}
            className='recCustom'
          />
          <Button onClick={addTime} rightIcon={<MdAddCircle/>} h="3em" shadow='md' bg='white' borderTop="2px" borderColor='gray.50' rounded='md'>Add</Button>
        </Flex>
      </Box>
      <Box minW="240px" w="30%" maxH="200px">
        <List variant='rounded' title={currentDay}>
          {
            availability[tabIndex].hasOwnProperty('times') ?
              availability[tabIndex]['times'].map( (time, index) =>
                <Flex key={index}  px='15px' justifyContent='space-between' align='center'>
                  <span>{time[0]} - {time[1]}</span>
                  <Button onClick={ () => removeTime(index)} rightIcon={<MdDeleteForever/>} shadow='md' bg='white' borderTop="2px" borderColor='gray.50' rounded='md'>Remove</Button>
                </Flex>
              )
            :''
          }
        </List>
      </Box>
    </Flex>
  );
}

Recurring.displayName = "Recurring"
export default Recurring;
