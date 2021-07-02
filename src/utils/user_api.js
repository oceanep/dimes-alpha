import axios from 'axios'
let api_endpoint = 'https://dimes-back.ngrok.io/api/users'
let headers = {
    "Content-type": "application/json",
    "Accept" : "application/json"
}

const userApi = {
    async loginUser(email, password) {
        var url = `${api_endpoint}/login`;
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
        var url = `${api_endpoint}/register`
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
    }
}

export default userApi;
