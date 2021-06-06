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
    Button,
    IconButton,
    Checkbox
} from "@chakra-ui/react"

import { MdAddCircle, MdDeleteForever } from 'react-icons/md'

import List from '../../components/List/List'

import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import './Recurring.scss'

function Recurring() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const [timeRange, onTimeChange] = useState(
    [
      ['10:00', '11:00'],
      ['10:00', '11:00'],
      ['10:00', '11:00'],
      ['10:00', '11:00'],
      ['10:00', '11:00'],
      ['10:00', '11:00'],
      ['10:00', '11:00']
    ]
  );
  const [tabIndex, setTabIndex] = useState(0);
  const [availability, setAvailability] = useState([
    '','','','','','',''
  ]);

  const changeTime = (time, index) => {
    let newArr = [...timeRange]
    console.log('time index', index)
    console.log('time', time)
    newArr[index] = time
    console.log('new time array', newArr)
    onTimeChange(newArr)
  }

  const changeNewTime = (time, index, i) => {
    let newArr = [...availability]
    console.log('index', index)
    console.log('preparing to add...', time)
    newArr[index].times[i] = time
    console.log('adding...',newArr)
    setAvailability(newArr)
  }

  const addTime = (day, index) => {

    let newArr = [...availability]
    console.log('index', index)
    console.log('preparing to add...', timeRange[index])
    newArr[index] = {
      index: index,
      day: day,
      active: newArr[index].hasOwnProperty('active') ? newArr[index]['active'] : true,
      times: newArr[index].hasOwnProperty('times') ? [...newArr[index]['times'], timeRange[index]] : [timeRange[index]]
    }
    console.log('adding...',newArr)
    setAvailability(newArr)
  }

  const removeTime = (tabIndex, index) => {

    let newArr = [...availability]
    console.log('index', index)
    const newTimes = availability[tabIndex].times.filter((time, i) => index !== i )
    console.log(`remaining times ${newTimes}`)
    newArr[tabIndex] = {
      ...availability[tabIndex], times: newTimes
    }

    console.log(newArr)
    setAvailability(newArr)
  }

  const toggleDayActivation = (checked, index) => {
    let newArr = [...availability]
    console.log('index', index)
    console.log('checked?', checked)
    newArr[index] = {
      ...newArr[index],
      active: checked
    }
    console.log('checked? ',newArr)
    setAvailability(newArr)
  }

  return (
        <Flex minW="640px" px='1em' py='.5em' mb='1em' borderRight="2px" borderColor='gray.50' direction='column'>
          <Text pl="10px" w="50%" align="left">Recurring Availability</Text>
            { days.map( (day,index) => {
              return (
                <Flex key={index} justifyContent='space-around' py='10px' borderBottom='1px' borderColor='gray.50'>
                  <Box minW='2em' maxW='3em'>
                    <Checkbox isChecked={
                      availability[index].hasOwnProperty('active') ?
                        availability[index].active :
                        true
                    } mt='.9em' defaultIsChecked onChange={(e) => toggleDayActivation(e.target.checked, index)}>{day} </Checkbox>
                  </Box>
                  {
                    !availability[index].hasOwnProperty('active') || availability[index].active ?
                      <Flex w="70%" direction='column'>
                        <Flex className='time-container' justifyContent="space-between" align="center">
                          <TimeRangePicker
                            onChange={(e) => changeTime(e, index)}
                            value={timeRange[index]}
                            className='recCustom'
                            disableClock={true}
                          />
                          <IconButton onClick={() => addTime(day, index)} icon={<MdAddCircle/>} size='lg' bg='white' border="1px" borderColor='gray.50' rounded='md'/>
                        </Flex>
                        {
                          availability[index].hasOwnProperty('times') ?
                            availability[index]['times'].map( (time, i) =>
                              <Flex key={i}  pl='15px' pt='10px' justifyContent='space-between' align='center'>
                                <TimeRangePicker
                                  onChange={(e) => changeNewTime(e, index, i)}
                                  value={time}
                                  className='recCustom'
                                  disableClock={true}
                                />
                                <IconButton onClick={ () => removeTime(index, i)} icon={<MdDeleteForever/>} size='lg' bg='white' border="1px" borderColor='gray.50' rounded='md'/>
                              </Flex>
                            )
                          :''
                        }
                      </Flex>
                      :
                      <Text w="70%" h="3em" pt=".6em">Unavailable</Text>
                  }

                </Flex>
              )
            })}
        </Flex>
  );
}

Recurring.displayName = "Recurring"
export default Recurring;
