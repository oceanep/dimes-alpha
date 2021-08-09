import axios from 'axios'
import BASE_URL from './env.js'

const api_endpoint = BASE_URL
const headers = {
    "Content-type": "application/json"
}
const token = localStorage.getItem('token');
const bearer_token = {"Authorization" : `Bearer ${token}`};
const authHeaders = Object.assign(headers, bearer_token);

const userContacts = {
  async getContacts(id) {
    let url = `${api_endpoint}/user_contacts`;
    try {
      let res = await axios.get(url, {
        params: {
          id: id
        }
      }, {headers: authHeaders})
      return res
    } catch (err){
        alert('No Contacts Available')
        return err
    }
  },

  async updateContact(id, userId, contactId, firstName, lastName, relationType, phone, email, invited = false, status = 1) {
    let url = `${api_endpoint}/user_contacts/${id}`
    const user_contact = {
      "contact_id": contactId,
      "first_name": firstName,
      "last_name": lastName,
      "email": email,
      "invited": invited,
      "phone": phone,
      "relation_type": relationType,
      "status": status,
      "user_id": userId
    }
    try {
      let res = await axios.patch(url, {
        "user_contact" : user_contact
      }, {headers: authHeaders})
      return res
    } catch (err) {
      alert('Contact Update Failed')
      return err
    }
  },

  async createContact(contactId, userId, firstName, lastName, relationType, phone, email, invited = false, status = 1) {
    let url = `${api_endpoint}/user_contacts`
    const user_contact = {
      "contact_id": contactId,
      "first_name": firstName,
      "last_name": lastName,
      "email": email,
      "invited": invited,
      "phone": phone,
      "user_id": userId,
      "relation_type": relationType,
      "status": status
    }
    console.log('creating contact', user_contact)
    try {
      let res = await axios.post(url, {
        "user_contact" : user_contact
      }, {headers: authHeaders})
      return res
    } catch (err) {
      alert('Contact Creation Failed')
      return err
    }
  },

  async deleteContact(id) {
    let url = `${api_endpoint}/user_contacts/${id}`
    try {
      let res = await axios.delete(url, {headers: authHeaders})
      return res
    } catch (err){
      alert('Contact Deletion Failed')
      return err
    }
  }
}

export default userContacts;
