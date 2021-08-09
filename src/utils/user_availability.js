import axios from 'axios'
import BASE_URL from './env.js'
import Cookies from 'js-cookie'

let api_endpoint = BASE_URL
let headers = {
    "Content-type": "application/json"
}

const userAvailability = {
  async getAvailability(id) {
    let url = `${api_endpoint}/user_calendars`;
    try {
      let res = await axios.get(url, {
        params: {
          id: id
        }
      }, headers)
      console.log('user availability: ', res)
      return res
    } catch {
      return {statusText: 'No Availabilities Registered'}
    }
  },
  async createAvailability(userId, beginTime, endTime, dayOfWeek, type = 1) {
      let url = `${api_endpoint}/user_calendars`;
    const user_calendar = {
      "user_id": userId,
      "begin_time_unit": beginTime,
      "end_time_unit": endTime,
      "day_of_week": dayOfWeek,
      "type": type
    }
      console.log("User calendar: ", user_calendar);
    try {
      let res = await axios.post(url, {
        "user_calendar": user_calendar
      }, headers)
      return res
    } catch {
      throw new Error('Failed to create availability')
    }
  },
  async updateAvailability(calId, beginTime, endTime, type = 1) {
    let url = `${api_endpoint}/user_calendars/${calId}`;
    try {
      let res = await axios.patch(url, {
        "id": calId,
        "user_calendar": {
          "begin_time_unit": beginTime,
          "end_time_unit": endTime
        }
      }, headers)
      return res
    } catch {
      throw new Error('Failed to update availability')
    }
  },
  async deleteAvailability(calId) {
    let url = `${api_endpoint}/user_calendars/${calId}`;
    try {
      let res = await axios.delete(url, headers)
      return res
    } catch {
      throw new Error('Failed to delete availability')
    }
  }
}

export default userAvailability;
