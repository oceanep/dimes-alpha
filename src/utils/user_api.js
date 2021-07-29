import axios from 'axios'
import BASE_URL from './env.js'
let api_endpoint = BASE_URL
let headers = {
    "Content-type": "application/json",
    "Accept" : "application/json"
}

const userApi = {
    async loginUser(email, password) {
        const url = `${api_endpoint}/login`;
        try {
            var res = await axios.post(url, {
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
            }, headers)
            return res
        } catch {
            throw new Error('Signup Failed')
        }
    },
    async getUser(username) {
      const url = `${api_endpoint}/users/${username}`
      try {
        const res = axios.get(url, headers)
        return res
      } catch (err) {
        return err
      }
    },
    async getUserById(id) {
      const url = `${api_endpoint}/users/data/${id}`
      try {
        const res = axios.get(url, headers)
        return res
      } catch (err) {
        return err
      }
    }
}

export default userApi;
