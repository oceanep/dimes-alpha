import { useState, useEffect } from 'react';

import userApi from '../utils/user_api.js'

function useUsers( val = this || {} ) {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const username = val?.username || null
  const id = val?.id || localStorage.userId
  
  const getUser = async () => {
    try {
      const res = username ? await userApi.getUserByUsername(username) : await userApi.getUserById(id)
      const currentUser = {
        id: res.data.id,
        blurb: res.data.blurb,
        firstName: res.data.first_name,
        lastName: res.data.last_name,
        photo: res.data.photo_url,
        username: res.data.username,
        email: res.data.email
      }
      setUser(currentUser)
      setLoading(false)
    } catch (err) {
      alert(err)
      throw err
    }
  }

  const updateUser = async (firstName, lastName, username, email, blurb, photo) => {
    setLoading(true)
    try {
      const res = await userApi.updateUser(id, firstName, lastName, username, email, blurb, photo)
      const currentUser = {
        id: res.data.id,
        blurb: res.data.blurb,
        firstName: res.data.first_name,
        lastName: res.data.last_name,
        photo: res.data.photo_url,
        username: res.data.username,
        email: res.data.email
      }
      setUser(currentUser)
      setLoading(false)
      return currentUser
    } catch (err) {
      alert(err)
      throw err
    }
  }

  useEffect( () => {
      getUser()
  }, [])

  return [user, loading, updateUser]
}

export default useUsers
