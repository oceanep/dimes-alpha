import axios from 'axios'
let api_endpoint = 'https://dimes-back.ngrok.io/api'
let headers = {
    "Content-type": "application/json"
}

const userEvents = {
  async getEvents(id) {
    let url = `${api_endpoint}/user_events`;
    try {
      let res = await axios.get(url, {
        params: {
          id: id
        }
      }, headers)
      return res
    } catch (error) {
        if (error) {
          throw error
        }
        return {statusText: 'No Events Registered'}
    }
  },
  async createEvent(userId, ownerId, title, desc, status = 1, beginTime, endTime, dayOfWeek, active) {
    let url = `${api_endpoint}/user_events`;
    const user_event = {
      "active": active,
      "begin_time_unit": beginTime,
      "day_of_week": dayOfWeek,
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
      }, headers)
      return res
    } catch {
      throw new Error('Failed to create event')
    }
  },
  async updateEvent(eventId, ownerId, title, desc, status = 1, beginTime, endTime, dayOfWeek, active) {
    let url = `${api_endpoint}/user_events`;
    try {
      let res = await axios.patch(url, {
        "event_id": eventId,
        "user_event": {
          "active": active,
          "begin_time_unit": beginTime,
          "day_of_week": dayOfWeek,
          "description": desc,
          "end_time_unit": endTime,
          "owner_id": ownerId,
          "status": status,
          "title": title,
        }
      }, headers)
    } catch {
      throw new Error('Failed to update event')
    }
  },
  async deleteEvent(eventId) {
    let url = `${api_endpoint}/user_events`;
    try {
      let res = await axios.delete(url, headers)
      return res
    } catch {
      throw new Error('Failed to delete event')
    }
  }
}

export default userEvents;
