import axios from 'axios'
import BASE_URL from './env.js'

const api_endpoint = BASE_URL
const headers = {
    "Content-type": "application/json"
}
const token = localStorage.getItem('token');
const bearer_token = {"Authorization" : `Bearer ${token}`};
const authHeaders = Object.assign(headers, bearer_token);

const userAvailability = {
  async getAvailability(id) {
    let url = `${api_endpoint}/user_calendars`;
    try {
      let res = await axios.get(url, {
        params: {
          id: id
        }
      }, {headers: authHeaders})
      return res
    } catch (err){
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
      }, {headers: authHeaders})
      return res
    } catch (err){
      alert('Failed to create availability')
      return err
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
      }, {headers: authHeaders})
      return res
    } catch (err){
      alert('Failed to update availability')
      return err
    }
  },
  async deleteAvailability(calId) {
    let url = `${api_endpoint}/user_calendars/${calId}`;
    try {
      let res = await axios.delete(url, {headers: authHeaders})
      return "success"
    } catch (err){
      alert('Failed to delete availability')
      return err
    }
  }
}

export default userAvailability;
