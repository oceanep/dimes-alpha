import axios from 'axios'
import BASE_URL from './env.js'

const api_endpoint = BASE_URL
const headers = {
    "Content-type": "application/json"
}
const token = localStorage.getItem('token');
const bearer_token = {"Authorization" : `Bearer ${token}`};
const authHeaders = Object.assign(headers, bearer_token);

const userEvents = {
  async getEvents(id) {
    let url = `${api_endpoint}/user_events`;
    try {
      let res = await axios.get(url, {
        params: {
          id: id
        }
      }, {headers: authHeaders})
      return res
    } catch (error) {
      return error
    }
  },
  async createEvent(userId, ownerId, title, desc, status = 1, beginTime, endTime, date, active = true) {
    let url = `${api_endpoint}/user_events`;
    console.log('create event: ', userId, ownerId, title, desc, status, beginTime, endTime, date, active)
    const user_event = {
      "active": active,
      "begin_time_unit": beginTime,
      "date": date,
      "description": desc,
      "end_time_unit": endTime,
      "owner_id": ownerId,
      "status": status,
      "title": title,
      "user_id": userId
  	}
    try {
      let res = await axios.post(url, {
        "user_event": user_event
      }, {headers: authHeaders})
      return res
    } catch (err){
      return err
    }
  },
  async updateEvent(eventId, ownerId, title, desc, status = 1, beginTime, endTime, date, active) {
    let url = `${api_endpoint}/user_events/${eventId}`;
    try {
      let res = await axios.patch(url, {
        "event_id": eventId,
        "user_event": {
          "active": active,
          "begin_time_unit": beginTime,
          "date": date,
          "description": desc,
          "end_time_unit": endTime,
          "owner_id": ownerId,
          "status": status,
          "title": title,
        }
      }, headers)
      return res
    } catch (err){
      return err
    }
  },
  async deleteEvent(eventId) {
    let url = `${api_endpoint}/user_events/${eventId}`;
    try {
      let res = await axios.delete(url, {headers: authHeaders})
      return res
    } catch (err){
      return err
    }
  }
}

export default userEvents;
