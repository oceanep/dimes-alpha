import axios from 'axios'
import BASE_URL from './env.js'
let api_endpoint = BASE_URL
let headers = {
    "Content-type": "application/json"
}

const eventInvites = {
  async createInvite(userId, eventId, email, status = 0) {
    let url = `${api_endpoint}/event_invites`;
    const event_invite = {
      "status": status,
      "user_id": userId,
      "user_event_id": eventId,
      "invitee_email": email
    }
    try {
      let res = await axios.post(url, {
        "event_invites": event_invite
      }, headers)
      return res
    } catch(err) {
      throw new Error('Failed to create invite')
    }
  }
}

export default eventInvites;
