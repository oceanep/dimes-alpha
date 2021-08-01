import axios from 'axios'
import BASE_URL from './env.js'
let api_endpoint = BASE_URL
let headers = {
    "Content-type": "application/json"
}

const eventTemplates = {
  async getTemplates(id) {
    let url = `${api_endpoint}/users/event_templates/${id}`;
    try {
      let res = await axios.get(url, {
        params: {
        }
      }, headers)
      return res
    } catch (err){
        alert('No Templates Available')
        return err
    }
  },
    async createTemplate(userId, title, duration, desc, active, event_url) {
    let url = `${api_endpoint}/event_templates`;
      console.log('createTemplate', userId, title, desc, duration, active, event_url)
      const event_template = {
    	"user_id": userId,
    	"title": title,
      "description": desc,
    	"duration": duration,
    	"active": active,
      "url": event_url
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
  async updateTemplate(templateId, title, duration, desc, active, event_url) {
    let url = `${api_endpoint}/event_templates/${templateId}`;
    try {
      let res = await axios.patch(url, {
        "event_id": templateId,
        "event_templates": {
      		"title": title,
      		"duration": duration,
          "description": desc,
      		"active": active,
          "url": event_url
        }
      }, headers)
      return res
    } catch {
      throw new Error('Failed to update event')
    }
  },
  async deleteTemplate(templateId) {
    let url = `${api_endpoint}/event_templates/${templateId}`;
    try {
      let res = await axios.delete(url, headers)
      return res
    } catch {
      throw new Error('Failed to delete event')
    }
  }
}

export default eventTemplates;
