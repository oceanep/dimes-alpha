import axios from 'axios'
import BASE_URL from './env.js'

const api_endpoint = BASE_URL
const headers = {
    "Content-type": "application/json"
}
const token = localStorage.getItem('token');
const bearer_token = {"Authorization" : `Bearer ${token}`};
const authHeaders = Object.assign(headers, bearer_token);

const userApi = {
  async loginUser(email, password) {
    const url = `${api_endpoint}/login`;
    try {
      let res = await axios.post(url, {
          "email": email,
          "password": password
      }, headers)
      return res
    } catch {
      return {statusText: 'Login Failed'};
    }
  },
  async signupUser(email, username, firstName, lastName, password) {
    const url = `${api_endpoint}/register`
    try {
        var res = await axios.post(url, {
            "user": {
                "email": email,
                "first_name": firstName,
                "last_name": lastName,
                "password": password,
                "username": username
            }
        }, {headers: authHeaders})
        return res
    } catch {
      throw new Error('Signup Failed')
    }
  },
  async getUserByUsername(username) {
    const url = `${api_endpoint}/users/${username}`
    try {
      const res = axios.get(url, {headers: authHeaders})
      return res
    } catch (err) {
      throw err
    }
  },
  async getUserById(id) {
    const url = `${api_endpoint}/users/data/${id}`
    try {
      const res = axios.get(url, {headers: authHeaders})
      return res
    } catch (err) {
      throw err
    }
  },
  async getUserByEmail(email) {
    const url = `${api_endpoint}/users/info`
    try {
      const res = axios.get(url, {
        params: {
          email : email
        }
      }, {headers: authHeaders})
      return res
    } catch(err) {
      throw err
    }
  },
  async updateUser(id, firstName, lastName, username, email, blurb, photo) {
    const url = `${api_endpoint}/users/${id}`
    try {
      const user = {
        "blurb": blurb,
        "email": email,
        "first_name": firstName,
        "last_name": lastName,
        "photo_url": photo,
        "username": username
      }
      const res = axios.patch(url, {
        "user": user
      }, {headers: authHeaders})
      return res
    } catch (err) {
      throw err
    }
  }
}

export default userApi;
