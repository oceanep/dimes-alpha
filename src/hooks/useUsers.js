import { useState, useEffect } from 'react';

import userApi from '../utils/user_api.js'

function useUsers(username) {
  const [user, setUser] = useState({})

  useEffect( () => {
      const getUser = async () => {
        try {
          const res = await userApi.getUser(username)
          setUser(res.data)
        } catch (err) {
          alert(err)
          return err
        }
      }

      getUser()
  }, [])

  return user
}

export default useUsers
