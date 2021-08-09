import axios from 'axios'
import BASE_URL from './env.js'

const api_endpoint = BASE_URL
const headers = {
    "Content-type": "application/json"
}
const token = localStorage.getItem('token');
const bearer_token = {"Authorization" : `Bearer ${token}`};
const authHeaders = Object.assign(headers, bearer_token);

const eventInvites = {
  async getInvites(eventId) {
    let url = `${api_endpoint}/user_events/invites/${eventId}`;
    try {
      const res = await axios.get(url, {headers: authHeaders})
      return res
    } catch(err) {
      alert('Failed to fetch invites')
      throw err
    }
  },

  async createInvite(userId, eventId, email = '', inviteeId = null, groupId = null, status = 0) {
    let url = `${api_endpoint}/event_invites`;
    console.log('event id: ', eventId)
    const event_invite = {
      "status": status,
      "user_id": userId,
      "user_events_id": eventId,
      "invitee_email": email,
      "user_invite_id": inviteeId,
      "user_group_id": groupId
    }
    try {
      let res = await axios.post(url, {
        "event_invites": event_invite
      }, {headers: authHeaders})
      return res
    } catch(err) {
      alert('Failed to create invite')
      throw err
    }
  },

  async deleteInvite(id) {
    let url = `${api_endpoint}/event_invites/${id}`;
    try {
      const res = axios.delete(url, {headers: authHeaders})
      return 'success'
    } catch(err) {
      alert('Failed to delete invite')
      throw err
    }
  }
}

export default eventInvites;
