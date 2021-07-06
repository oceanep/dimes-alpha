import axios from 'axios'
let api_endpoint = 'https://dimes-back.ngrok.io/api'
let headers = {
    "Content-type": "application/json"
}

const eventTemplates = {
  async getTemplates(id) {
    let url = `${api_endpoint}/event_templates`;
    try {
      let res = await axios.get(url, {
        params: {
          id: id
        }
      }, headers)
      return res
    } catch (err){
        alert('No Templates Available')
        return err
    }
  },
  async createTemplate(userId, title, duration, desc, active) {
    let url = `${api_endpoint}/event_templates`;
    console.log('createTemplate', userId, title, desc, duration, active)
    const event_template = {
  		"user_id": userId,
  		"title": title,
      "description": desc,
  		"duration": duration,
  		"active": active
  	}
    try {
      let res = await axios.post(url, {
        "event_templates": event_template
      }, headers)
      return res
    } catch {
      throw new Error('Failed to create event')
    }
  },
  async updateTemplate(eventId, title, duration, desc, active) {
    let url = `${api_endpoint}/event_templates`;
    try {
      let res = await axios.patch(url, {
        "event_id": eventId,
        "event_templates": {
      		"title": title,
      		"duration": duration,
          "description": desc,
      		"active": active
        }
      }, headers)
    } catch {
      throw new Error('Failed to update event')
    }
  },
  async deleteTemplate(eventId) {
    let url = `${api_endpoint}/event_templates/${eventId}`;
    try {
      let res = await axios.delete(url, headers)
      return res
    } catch {
      throw new Error('Failed to delete event')
    }
  }
}

export default eventTemplates;
