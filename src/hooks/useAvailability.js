import { useState, useEffect } from 'react';

import userAvailability from '../utils/user_availability.js'

function useAvailability(userId) {

  const [availability, setAvailability] = useState([])

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // const fetchAvailability = async () => {
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
  // }

  const fetchAvailability = async () => {
    let dayAvails = [[], [], [], [], [], [], []]
    try {
      const res = await userAvailability.getAvailability(userId)
      const sorted1 = res.data.data.sort( (a, b) => {
        return a.begin_time_unit - b.begin_time_unit
      })
      const sorted2 = sorted1.sort( (a, b) => {
        return a.day_of_week - b.day_of_week
      })
      const byDay = sorted2.map( time => (
        dayAvails[time.day_of_week] = [...dayAvails[time.day_of_week], time]
      ))
      console.log('availability response: ', dayAvails)
      setAvailability(dayAvails)
    } catch (err) {
      alert(err)
      console.log(err)
    }
  }

  return [ availability, fetchAvailability ]
}

export default useAvailability
