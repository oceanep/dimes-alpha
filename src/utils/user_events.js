import axios from 'axios'
let api_endpoint = 'http://ec2-35-74-184-115.ap-northeast-1.compute.amazonaws.com/api'
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
    } catch {
        return {statusText: 'No Events Registered'}
    }
  },
  async createEvent(userId, title, duration, active) {
    let url = `${api_endpoint}/user_events`;
    const event_template = {
  		"user_id": userId,
  		"title": title,
  		"duration": duration,
  		"active": active
  	}
    try {
      let res = await axios.post(url, {
        "event_template": event_template
      }, headers)
      return res
    } catch {
      throw new Error('Failed to create event')
    }
  },
  async updateEvent(eventId, title, duration, active) {
    let url = `${api_endpoint}/user_events`;
    try {
      let res = await axios.patch(url, {
        "event_id": eventId,
        "event_template": {
      		"title": title,
      		"duration": duration,
      		"active": active
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
