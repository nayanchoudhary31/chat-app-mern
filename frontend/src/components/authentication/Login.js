import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const history = useHistory()
  const toast = useToast()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleClickBtn = () => {
    setShow(!show)
  }

  const submitHandler = async () => {
    setLoading(true)
    if (!email || !password) {
      toast({
        title: 'All fields are mandatory',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      setLoading(false)
      return
    }

    try {
      const config = {
        header: {
          'Content-type': 'application/json',
        },
      }

      const { data } = await axios.post('/api/user/login', { email, password }, config)
      toast({
        title: 'User login successfully',
        status: 'success',
        duration: 5000,
        position: 'bottom',
        isClosable: true,
      })
      localStorage.setItem('userInfo', JSON.stringify(data))
      setLoading(false)
      history.push('/chats')
    } catch (error) {
      toast({
        title: 'Error Occured !',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      setLoading(false)
    }
  }

  return (
    <VStack color="black">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          v
          value={email}
          placeholder="Enter Your Email"
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
      </FormControl>
      <FormControl id="login-password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            value={password}
            placeholder="Enter your Password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <InputRightElement w="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClickBtn}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button colorScheme="blue" width="100%" style={{ marginTop: 15 }} isLoading={loading} onClick={submitHandler}>
        Sign Up
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail('guest@example.com')
          setPassword('12345')
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  )
}

export default Login
