import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'

const MyChats = () => {
  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } = ChatState()
  const [loggedUser, setLoggedUser] = useState()
  const toast = useToast()

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.get('/api/chats', config)
      setChats(data)
    } catch (error) {
      toast({
        title: 'Error fetching the chats',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      })
    }
  }

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')))
    fetchChats()
  }, [])

  return <div>My Chats</div>
}

export default MyChats
