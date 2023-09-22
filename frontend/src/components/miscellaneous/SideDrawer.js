import { Avatar, Box, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'
import { ChatState } from '../../context/ChatProvider'

const SideDrawer = () => {
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState()
  const { user } = ChatState()
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search for User to chat" hasArrow placement="bottom-end">
          <Button variant="ghost">
            <i class="fa-solid fa-magnifying-glass"></i>
            <Text display={{ base: 'none', md: 'flex' }} px="4">
              Search Users
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans" p={1}>
          Talk-A-Tive
        </Text>
        <Box>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar src={user.pic} size={'sm'} cursor={'pointer'} name={user.name} />
            </MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuDivider />
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </>
  )
}

export default SideDrawer
