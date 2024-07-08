import { Avatar, Flex, Icon, Text } from '@chakra-ui/react'
import { SearchBar } from 'components/navbar/searchBar/SearchBar'
import React from 'react'
import { FaRegBell } from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'

const Header = (props) => {
    return (
        <Flex
            alignItems="center"
            justifyContent="space-between"
        >
            <Text fontWeight="bold" color="#1b2559">{props.brandText}</Text>
            <SearchBar
            />
            <Flex
                alignItems="center"
            >
                <Icon mr="1rem" as={MdOutlineEmail} />
                <Icon mr="1.5rem" as={FaRegBell} />
                <Avatar mr="1rem"/>
                <Flex flexDirection="column">
                    <Text mr="1rem" fontWeight="bold">Partner Name</Text>
                    <Text fontSize="sm">CRB</Text>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Header
