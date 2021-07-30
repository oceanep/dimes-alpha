import axios from 'axios'
import BASE_URL from './env.js'
let api_endpoint = BASE_URL
let headers = {
    "Content-type": "application/json"
}

const userGroups = {
  async getContacts(userId) {
    let url = `${api_endpoint}/user_groups`;
    try {
      let res = await axios.get(url, {
        params: {
          user_id: userId
        }
      }, headers)
      return res
    } catch (err){
        alert('No Groups Available')
        return err
    }
  }
}

export default userGroups;