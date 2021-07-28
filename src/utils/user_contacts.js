import axios from 'axios'
import BASE_URL from './env.js'
let api_endpoint = BASE_URL
let headers = {
    "Content-type": "application/json"
}

const userContacts = {
  async getContacts(id) {
    let url = `${api_endpoint}/user_contacts`;
    try {
      let res = await axios.get(url, {
        params: {
          id: id
        }
      }, headers)
      return res
    } catch (err){
        alert('No Contacts Available')
        return err
    }
  }
}

export default userContacts;
