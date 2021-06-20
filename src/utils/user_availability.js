import axios from 'axios'
let api_endpoint = 'http://ec2-35-74-184-115.ap-northeast-1.compute.amazonaws.com/api'
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
