import { useState, useEffect, useCallback } from 'react';
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
import userAvailability from '../../utils/user_availability.js'

import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import './Recurring.scss'

function Recurring() {

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

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

  const convertToTime = (begin, end) => {
    console.log(`start values: ${begin}, ${end}`)
    let startTime = +begin * 15
    let endTime = +end * 15

    console.log(`raw values: ${startTime}, ${endTime}`)
    let startHour = (Math.floor(startTime/60)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
    let endHour = (Math.floor(endTime/60)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})

    let startMin = (startTime % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
    let endMin = (endTime % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})

    const timeRange = [`${startHour}:${startMin}`, `${endHour}:${endMin}`]
    console.log('times', timeRange)
    return timeRange
  }

  const convertFromTime = (time) => {
    let beginTime = time[0]
    let endTime = time[1]

    let beginHour = parseInt(beginTime.split(':')[0]) * 60 / 15
    let beginMin = parseInt(beginTime.split(':')[1]) / 15

    let endHour = parseInt(endTime.split(':')[0]) * 60 / 15
    let endMin = parseInt(endTime.split(':')[1]) / 15

    beginHour += beginMin
    endHour += endMin

    convertToTime(beginHour, endHour)

    console.log(`begin codec: ${beginHour}`)
    console.log(`end codec: ${endHour}`)

    return {
      beginCodec: beginHour,
      endCodec: endHour
    }
  }

  const roundTime = (time) => {
    let beginTime = time[0]
    let endTime = time[1]

    let beginHour = beginTime.split(':')[0]
    let beginMin = parseInt(beginTime.split(':')[1])
    beginMin = ((((beginMin + 7.5)/15 | 0) * 15) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})

    console.log('begin minutes', beginMin)

    let endHour = endTime.split(':')[0]
    let endMin = parseInt(endTime.split(':')[1])
    endMin = ((((endMin + 7.5)/15 | 0) * 15) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})

    const roundedTime = [`${beginHour}:${beginMin}`,`${endHour}:${endMin}`]
    console.log('Rounded Time', roundedTime)

    return roundedTime
  }

  const createAvailability = async (index) => {
    const { beginCodec, endCodec } = convertFromTime(timeRange[index])
    const userId = localStorage.userId

    let res = await userAvailability.createAvailability(userId, beginCodec, endCodec, index)
    return res.data.data
  }

  const updateAvailability = async (id, beginCodec, endCodec) => {

    let res = await userAvailability.updateAvailability(id, beginCodec, endCodec)
    return res.data.data
  }

  const deleteAvailability = async (id) => {
    let res = await userAvailability.deleteAvailability(id)
    return res
  }

  const fetchAvailability = useCallback( async () => {
    const userId = localStorage.userId

    let newArr = [...availability]
    const res = await userAvailability.getAvailability(userId)
    console.log(res.data)
    res.data.data.forEach((time, i) => {
      const timeObj = {
        id: time.id,
        time: convertToTime(time.begin_time_unit, time.end_time_unit)
      }
      const index = time.day_of_week
      newArr[index] = {
        index: index,
        day: days[index],
        active: newArr[index].hasOwnProperty('active') ? newArr[index]['active'] : true,
        times: newArr[index].hasOwnProperty('times') ? [...newArr[index]['times'], timeObj] : [timeObj]
      }
      console.log('initial state ', newArr)
    });
    setAvailability(newArr)

  }, [])

  useEffect( ()=> {
    fetchAvailability()
  }, [fetchAvailability])

  const changeTime = (time, index) => {
    let newArr = [...timeRange]
    console.log('time index', index)
    console.log('time', time)

    newArr[index] = roundTime(time)
    console.log('new time array', newArr)
    onTimeChange(newArr)
  }

  const changeNewTime = (time, index, i) => {
    let newArr = [...availability]
    console.log('index', index)
    console.log('preparing to add...', time)

    const newTime = roundTime(time)
    const { beginCodec, endCodec } = convertFromTime(newTime)
    const id = newArr[index].times[i].id

    updateAvailability( id, beginCodec, endCodec)
      .then( res => {
        newArr[index][i] = {
          ...newArr[index][i],
          time: convertToTime(res.begin_time_unit, res.end_time_unit)
        }
        console.log('adding...',newArr)
        setAvailability(newArr)
      }, err => {
        alert(err)
      })
  }

  const addTime = (day, index) => {

    let newArr = [...availability]
    console.log('index', index)
    console.log('preparing to add...', timeRange[index])

    createAvailability(index)
      .then( (res) => {

        const timeObj = {
          id: res.id,
          time: convertToTime(res.begin_time_unit, res.end_time_unit)
        }

        newArr[index] = {
          index: index,
          day: days[res.day_of_week],
          active: newArr[index].hasOwnProperty('active') ? newArr[index]['active'] : true,
          times: newArr[index].hasOwnProperty('times') ? [...newArr[index]['times'], timeObj] : [timeObj]
        }
        console.log('adding...',newArr)
        setAvailability(newArr)
      }, err => {
        alert(err)
      })

  }

  const removeTime = (tabIndex, index) => {

    let newArr = [...availability]

    const id = newArr[tabIndex].times[index].id
    console.log('id to delete', id)
    deleteAvailability(id)
      .then( res => {
        const newTimes = availability[tabIndex].times.filter((time, i) => index !== i )
        console.log(`remaining times ${newTimes}`)
        newArr[tabIndex] = {
          ...availability[tabIndex], times: newTimes
        }

        console.log(newArr)
        setAvailability(newArr)
      }, err => {
        alert(err)
      })
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
                                  value={time.time}
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
