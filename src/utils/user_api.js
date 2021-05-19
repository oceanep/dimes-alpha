import axios from 'axios'
let api_endpoint = 'http://ec2-3-113-15-18.ap-northeast-1.compute.amazonaws.com/api/users'
let headers = {
    "Content-type": "application/json",
    "Accept" : "application/json"
}

const userApi = {
    async loginUser(username, password) {
        var url = `${api_endpoint}/login`;
        try {
            var res = await axios.post(url,{
                "email": username,
                "password": password
            }, headers)
            return res
        } catch {
            throw new Error('Login Failed')
        }
    },
    async signupUser(email, username, firstName, lastName, password) {
        var url = `${api_endpoint}/register`
        try {
            var res = await axios.post(url,{
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