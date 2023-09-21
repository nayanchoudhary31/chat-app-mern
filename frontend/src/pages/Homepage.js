import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { React, useEffect } from 'react'
import Login from '../components/authentication/Login'
import Signup from '../components/authentication/Signup'
import { useHistory } from 'react-router-dom'

const Homepage = () => {
  const history = useHistory()

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    if (userInfo) {
      history.push('/chats')
    }
  }, [history])
  return (
    <Container maxW="xl">
      <Box
        display="flex"
        justifyContent="center"
        padding={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work Sans" color="black">
          Talk-A-Tive
        </Text>
      </Box>
      <Box bg={'white'} w="100%" p={4} borderRadius={'lg'} color={'black'} borderWidth="1px">
        <Tabs variant="soft-rounded">
          <TabList marginBottom={'1em'}>
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Homepage
