import axios from 'axios'
let api_endpoint = 'http://ec2-35-74-184-115.ap-northeast-1.compute.amazonaws.com/api/users'
let headers = {
    "Content-type": "application/json",
    "Accept" : "application/json"
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
      throw new Error('Failed to fetch availability')
    }
  },
  async createAvailability(userId, beginTime, endTime, dayOfWeek, type) {
    let url = `${api_endpoint}/user_calendars`;
    try {
      let res = await axios.post(url, {
        "user_calendar": {
          "user_id": userId,
          "begin_time_unit": beginTime,
          "end_time_unit": endTime,
          "day_of_week": dayOfWeek,
          "type": type
        }
      }, headers)
      return res
    } catch {
      throw new Error('Failed to create availability')
    }
  }
}

export default userAvailability;
