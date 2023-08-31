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
import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
const Signup = () => {
  const [show, setShow] = useState(false)
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassoword] = useState()
  const [pic, setPic] = useState()
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const history = useHistory()

  const submitHandler = async () => {
    setLoading(true)
    if (!name || !email || !password || !confirmPassword) {
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
    if (password !== confirmPassword) {
      toast({
        title: 'Password does not match !',
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
        headers: {
          'Content-type': 'application/json',
        },
      }

      const { data } = await axios.post('/api/user', { name, email, password, pic }, config)

      toast({
        title: 'User Registered Successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })

      localStorage.setItem('userInfo', JSON.stringify(data))
      setLoading(false)
      history.push('/chats')
    } catch (error) {
      console.log(error)
      process.exit()
    }
  }
  const handleClickBtn = () => {
    setShow(!show)
  }
  const postDetails = (pic) => {
    setLoading(true)
    if (pic === undefined) {
      toast({
        title: 'Please select an image',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      setLoading(false)
      return
    }

    if (pic.type === 'image/jpeg' || pic.type === 'image/png') {
      const data = new FormData()
      data.append('file', pic)
      data.append('upload_preset', 'mern-chat-app')
      data.append('cloud_name', 'iamnayan31')

      axios
        .post('https://api.cloudinary.com/v1_1/iamnayan31/image/upload', data)
        .then((response) => {
          console.log('Cloudinary response:', response)
          setPic(response.data.url)
          setLoading(false)
          toast({
            title: 'Image upload successfully',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'bottom',
          })
        })
        .catch((err) => {
          console.log('Cloudinary error:', err)
          setLoading(false)
        })
    } else {
      toast({
        title: 'Please select an Image',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      setLoading(false)
      return
    }
  }

  return (
    <VStack spacing={4} color={'black'}>
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
      </FormControl>
      <FormControl id="email-address" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
      </FormControl>
      <FormControl id="signup-password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Enter Your Password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClickBtn}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password-confirm" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Enter Your Confirm Password"
            onChange={(e) => {
              setConfirmPassoword(e.target.value)
            }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClickBtn}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your pic</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => {
            postDetails(e.target.files[0])
          }}
        />
      </FormControl>
      <Button colorScheme="blue" width="100%" style={{ marginTop: 15 }} onClick={submitHandler} isLoading={loading}>
        Sign Up
      </Button>
    </VStack>
  )
}

export default Signup
