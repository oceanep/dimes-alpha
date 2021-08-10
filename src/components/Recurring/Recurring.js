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
    Heading,
    Button,
    IconButton,
    Checkbox,
    Skeleton
} from "@chakra-ui/react"

import { MdAddCircle, MdDeleteForever, MdUndo } from 'react-icons/md'

import List from '../../components/List/List'
import useAvailability from '../../hooks/useAvailability'
import timeUtils from '../../utils/time_utils.js'

import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import './Recurring.scss'

function Recurring() {

  const [ availability, loading, fetchAvailability, createAvailability, deleteAvailability, updateAvailability ] = useAvailability()

  const { convertToTime, convertFromTime, roundTime } = timeUtils
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
  const [displayAvailability, setDisplayAvailability] = useState([
    '','','','','','',''
  ]);

  // const createAvailability = async (index) => {
  //   const { beginCodec, endCodec } = convertFromTime(timeRange[index])
  //   const userId = localStorage.userId
  //
  //   let res = await userAvailability.createAvailability(userId, beginCodec, endCodec, index)
  //   return res.data.data
  // }
  //
  // const updateAvailability = async (id, beginCodec, endCodec) => {
  //
  //   let res = await userAvailability.updateAvailability(id, beginCodec, endCodec)
  //   return res.data.data
  // }
  //
  // const deleteAvailability = async (id) => {
  //   let res = await userAvailability.deleteAvailability(id)
  //   return res
  // }

  // const fetchAvailability = useCallback( async () => {
  //   const userId = localStorage.userId
  //
  //   let newArr = [...availability]
  //   const res = await userAvailability.getAvailability(userId)
  //   console.log('availability response: ', res)
  //   console.log('test', !(res === undefined))
  //   if(!(res === undefined)){
  //     res.data.data.forEach((time, i) => {
  //       const timeObj = {
  //         id: time.id,
  //         time: convertToTime(time.begin_time_unit, time.end_time_unit)
  //       }
  //       const index = time.day_of_week
  //       newArr[index] = {
  //         index: index,
  //         day: days[index],
  //         active: newArr[index].hasOwnProperty('active') ? newArr[index]['active'] : true,
  //         times: newArr[index].hasOwnProperty('times') ? [...newArr[index]['times'], timeObj] : [timeObj]
  //       }
  //       console.log('initial state ', newArr)
  //     });
  //   }
  //   setAvailability(newArr)
  //
  // }, [])

  useEffect( ()=> {
    // let newArr = [...displayAvailability]

    let newArr = availability.reduce( (acc, avails, index) => {
      acc[index] = {
        index: index,
        day: days[index],
        active: true,
        times: avails.map( avail => ({
          id: avail.id,
          time: convertToTime(avail.begin_time_unit, avail.end_time_unit)
        }))
      }
      return acc
    }, [])

    // availability.forEach((time, i) => {
    //   const timeObj = {
    //     id: time.id,
    //     time: convertToTime(time.begin_time_unit, time.end_time_unit)
    //   }
    //   const index = time.day_of_week
    //   newArr[index] = {
    //     index: index,
    //     day: days[index],
    //     active: newArr[index].hasOwnProperty('active') ? newArr[index]['active'] : true,
    //     times: newArr[index].hasOwnProperty('times') ? [...newArr[index]['times'], timeObj] : [timeObj]
    //   }
    //   console.log('initial state ', newArr)
    // });
    setDisplayAvailability(newArr)
  }, [availability])

  const changeTime = (time, index) => {
    let newArr = [...timeRange]
    // console.log('time index', index)
    // console.log('time', time)

    newArr[index] = roundTime(time)
    // console.log('new time array', newArr)
    onTimeChange(newArr)
  }

  const changeNewTime = async (time, index, i) => {
    // let newArr = [...availability]
    // console.log('index', index)
    // console.log('preparing to add...', time)

    const newTime = roundTime(time)
    const { beginCodec, endCodec } = convertFromTime(newTime)
    const id = displayAvailability[index].times[i].id

    await updateAvailability(id, beginCodec, endCodec)

    // updateAvailability( id, beginCodec, endCodec)
    //   .then( res => {
    //     newArr[index][i] = {
    //       ...newArr[index][i],
    //       time: convertToTime(res.begin_time_unit, res.end_time_unit)
    //     }
    //     console.log('adding...',newArr)
    //     setAvailability(newArr)
    //   }, err => {
    //     alert(err)
    //   })
  }

  const addTime = async (day, index) => {

    // let newArr = [...availability]
    // console.log('index', index)
    // console.log('preparing to add...', timeRange[index])
    const { beginCodec, endCodec } = convertFromTime(timeRange[index])

    await createAvailability(beginCodec, endCodec, index)
    // createAvailability(index)
    //   .then( (res) => {
    //
    //     const timeObj = {
    //       id: res.id,
    //       time: convertToTime(res.begin_time_unit, res.end_time_unit)
    //     }
    //
    //     newArr[index] = {
    //       index: index,
    //       day: days[res.day_of_week],
    //       active: newArr[index].hasOwnProperty('active') ? newArr[index]['active'] : true,
    //       times: newArr[index].hasOwnProperty('times') ? [...newArr[index]['times'], timeObj] : [timeObj]
    //     }
    //     console.log('adding...',newArr)
    //     setAvailability(newArr)
    //   }, err => {
    //     alert(err)
    //   })

  }

  const removeTime = async (tabIndex, index) => {

    // let newArr = [...availability]

    const id = displayAvailability[tabIndex].times[index].id
    console.log('id to delete', id)

    await deleteAvailability(tabIndex, id)

    // deleteAvailability(id)
    //   .then( res => {
    //     const newTimes = availability[tabIndex].times.filter((time, i) => index !== i )
    //     console.log(`remaining times ${newTimes}`)
    //     newArr[tabIndex] = {
    //       ...availability[tabIndex], times: newTimes
    //     }
    //
    //     console.log(newArr)
    //     setAvailability(newArr)
    //   }, err => {
    //     alert(err)
    //   })
  }

  const toggleDayActivation = (checked, index) => {
    let newArr = [...displayAvailability]
    console.log('index', index)
    console.log('checked?', checked)
    newArr[index] = {
      ...newArr[index],
      active: checked
    }
    console.log('checked? ',newArr)
    setDisplayAvailability(newArr)
  }

  return (
        <Flex minW="640px" borderRight="2px" borderColor='gray.100' direction='column'>
          <Heading size="sm" pl="30px" py="15px" w="50%" align="left">Recurring Availability</Heading>
            { days.map( (day,index) => {
              return (
                <Flex key={index} justifyContent='space-around' pl='10px' borderBottom='1px' borderTop={ index < 1 ? "1px" : 'none'} borderColor='gray.100'>
                  <Flex minW='2em' w='30%' justify="center" py='10px' borderRight='1px' borderColor='gray.100'>
                    <Checkbox
                      isChecked={displayAvailability[index]?.active}
                      defaultIsChecked
                      onChange={ e => toggleDayActivation(e.target.checked, index)}
                      >
                      <Heading size="sm">{day}</Heading>
                    </Checkbox>
                  </Flex>
                  {
                    displayAvailability[index]?.active ?
                      <Flex w="70%" py='10px' direction='column'>
                        <Skeleton isLoaded={!loading}>
                          <Flex className='time-container' pr="10px" justifyContent="space-between" align="center">
                            <TimeRangePicker
                              onChange={(e) => changeTime(e, index)}
                              value={timeRange[index]}
                              className='recCustom'
                              disableClock={true}
                              clearIcon={<MdUndo/>}
                            />
                            <IconButton onClick={() => addTime(day, index)} icon={<MdAddCircle/>} size='lg' bg='white' />
                          </Flex>
                        </Skeleton>
                        {
                          displayAvailability[index]?.times ?
                            displayAvailability[index]['times'].map( (time, i) =>
                              <Flex pl='15px' pt='10px' pr="10px" >
                                <Skeleton w="100%" isLoaded={!loading}>
                                  <Flex key={i} w="100%" justifyContent='space-between' align='center' borderTop="1px solid" borderColor="gray.100">
                                    <TimeRangePicker
                                      onChange={(e) => changeNewTime(e, index, i)}
                                      value={time.time}
                                      className='recCustom'
                                      disableClock={true}
                                      clearIcon={<MdUndo/>}
                                    />
                                    <IconButton onClick={ () => removeTime(index, i)} icon={<MdDeleteForever/>} size='lg' bg='white'/>
                                  </Flex>
                                </Skeleton>
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
