import { useState, useEffect } from 'react';

import userAvailability from '../utils/user_availability.js'

function useAvailability(userId = localStorage.userId) {

  const [availability, setAvailability] = useState([])
  const [loading, setLoading] = useState(true)

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  useEffect( () => {
    fetchAvailability()
  }, [])

  const fetchAvailability = async (id = userId) => {
    let dayAvails = [[], [], [], [], [], [], []]
    console.log('avail id ', id)
    setLoading(true)
    try {
      const res = await userAvailability.getAvailability(id)
      const sorted = res.data.data.sort( (a, b) => {
        return a.day_of_week - b.day_of_week || a.begin_time_unit - b.begin_time_unit
      })
      const byDay = sorted.map( time => (
        dayAvails[time.day_of_week] = [...dayAvails[time.day_of_week], time]
      ))
      // console.log('availability response: ', dayAvails)
      setAvailability(dayAvails)
      setLoading(false)
      return dayAvails
    } catch (err) {
      alert(err)
      throw err
    }
  }

  const createAvailability = async (beginCodec, endCodec, day) => {
    setLoading(true)
    try {
      const res = await userAvailability.createAvailability(userId, beginCodec, endCodec, day)
      const updatedDay  = [...availability[res.data.data.day_of_week], res.data.data]

      setAvailability([...availability.slice(0,res.data.data.day_of_week), updatedDay, ...availability.slice(res.data.data.day_of_week+1)])
      setLoading(false)
    } catch (err) {
      alert(err)
      throw err
    }
  }

  const deleteAvailability = async(day, id) => {
    setLoading(true)
    try {
      const res = await userAvailability.deleteAvailability(id)
      const filteredAvails = availability[day].filter( time => time.id != id)

      setAvailability([...availability.slice(0,day), filteredAvails, ...availability.slice(day+1)])
      setLoading(false)
    } catch (err) {
      alert(err)
      throw err
    }
  }

  const updateAvailability = async(id, beginCode, endCodec) => {
    setLoading(true)
    try {
      const res = await userAvailability.updateAvailability(id, beginCode, endCodec)
      const filteredAvails = availability[res.data.data.day_of_week].filter( time => time.id != res.data.data.id)
      const updatedDay = [...filteredAvails, res.data.data]
      const sortedDay = updatedDay.sort( (a,b) => a.begin_time_unit - b.begin_time_unit)

      setAvailability([...availability.slice(0,res.data.data.day_of_week), sortedDay, ...availability.slice(res.data.data.day_of_week+1)])
      setLoading(false)
    } catch (err) {
      alert(err)
      throw err
    }
  }

  return [ availability, loading, fetchAvailability, createAvailability, deleteAvailability, updateAvailability ]
}

export default useAvailability
