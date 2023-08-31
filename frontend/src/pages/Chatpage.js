import React, { useEffect } from 'react'
// import axios from 'axios'

const Chatpage = () => {
  const fetchData = async () => {
    // const { data } = await axios.get('/api/chats')
    // console.log('🚀 ~ file: Chatpage.js:8 ~ fetchData ~ data:', data)
  }
  useEffect(() => {
    fetchData()
  }, [])
  return <div>Chatpage</div>
}

export default Chatpage
