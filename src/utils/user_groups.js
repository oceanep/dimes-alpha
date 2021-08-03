import axios from 'axios'
import BASE_URL from './env.js'
let api_endpoint = BASE_URL
let headers = {
    "Content-type": "application/json"
}

const userGroups = {
  async getGroups(userId) {
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
  },

  async editGroup(groupId, name, photo) {
    let url = `${api_endpoint}/user_groups/${groupId}`;
    try {
      let res = await axios.patch(url, {
        "user_groups": {
          "name": name,
          "photo": photo
        }
      }, headers)
      return res
    } catch (err){
      alert('Group Edit Failed')
      return err
    }
  },

  async createGroup(name, userId) {
    let url = `${api_endpoint}/user_groups`
    try {
      let res = await axios.post(url, {
        "user_groups": {
          "name": name,
          "user_id": userId
        }
      }, headers)
      return res
    } catch (err){
      alert('Group Creation Failed')
      return err
    }
  },

  async deleteGroup(groupId) {
    let url = `${api_endpoint}/user_groups/${groupId}`
    try {
      let res = await axios.delete(url, headers)
      return res
    } catch (err){
      alert('Group Delete Failed')
      return err
    }
  },

  async getGroupMembers(groupId) {
    // /user_groups/members/:id
    let url = `${api_endpoint}/user_groups/members/${groupId}`;
    try {
      let res = await axios.get(url, {
        params: {
          user_group_id: groupId
        }
      }, headers)
      return res
    } catch (err){
      alert('No Group Members')
      return err
    }
  },

  async deleteGroupMember(id) {
    let url = `${api_endpoint}/user_group_members/${id}`;
    try {
      let res = await axios.delete(url, headers)
      return res
    } catch (err){
      alert('Group Member Delete Failed')
      return err
    }
  },

  async createGroupMember(groupId, contactId) {
    let url = `${api_endpoint}/user_group_members`;
    try {
      let res = await axios.post(url, {
        "user_group_members": {
          "user_group_id": groupId,
          "user_id": contactId
        }
      }, headers)
      return res
    } catch (err) {
      alert('Create Group Member Failed')
      return err
    }
  }

}

export default userGroups;
