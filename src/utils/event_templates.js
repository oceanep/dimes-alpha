import axios from 'axios'
import BASE_URL from './env.js'

const api_endpoint = BASE_URL
const headers = {
    "Content-type": "application/json"
}
const token = localStorage.getItem('token');
const bearer_token = {"Authorization" : `Bearer ${token}`};
const authHeaders = Object.assign(headers, bearer_token);

const eventTemplates = {
  async getTemplates(id) {
    let url = `${api_endpoint}/event_templates`;
    try {
      let res = await axios.get(url, {
        params: {
          id: id
        }
      }, {headers: authHeaders})
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
    }, {headers: authHeaders})
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
      }, {headers: authHeaders})
      return res
    } catch {
      throw new Error('Failed to update event')
    }
  },
  async deleteTemplate(templateId) {
    let url = `${api_endpoint}/event_templates/${templateId}`;
    try {
      let res = await axios.delete(url, {headers: authHeaders})
      return res
    } catch {
      throw new Error('Failed to delete event')
    }
  }
}

export default eventTemplates;
