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
  async getEvents(userId) {
    let url = `${api_endpoint}/user_events/user/${userId}`;
    try {
      let res = await axios.get(url, {headers: authHeaders})
      return res
    } catch (error) {
      throw error
    }
  },
  async getEvent(id) {
    let url = `${api_endpoint}/user_events/${id}`;
    try {
      const res = await axios.get(url, {headers: authHeaders})
      return res
    } catch (err) {
      throw err
    }
  },
  async getUserEventsForUsers(userIds) {
    let url = `${api_endpoint}/get_user_events_for_users`;
    const idsString = userIds.toString()
    try {
      const res = await axios.get(url, {
        params: {
          user_ids: idsString
        }
      }, {headers: authHeaders})
      return res
    } catch (err) {
      throw err
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
      throw err
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
      throw err
    }
  },
  async deleteEvent(eventId) {
    let url = `${api_endpoint}/user_events/${eventId}`;
    try {
      let res = await axios.delete(url, {headers: authHeaders})
      return res
    } catch (err){
      throw err
    }
  }
}

export default userEvents;
