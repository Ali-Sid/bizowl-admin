import { ChevronDownIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, FormControl, FormLabel, Img, ModalOverlay, Progress, SimpleGrid, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useState } from 'react';
import CardTimeline from "../assets/img/system-uicons_card-timeline.png";
import { Avatar, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from "@chakra-ui/react";
import { BsClock } from "react-icons/bs";
import { FaRegCalendarAlt } from 'react-icons/fa';
import { SlGraph } from "react-icons/sl";
import { GoBell } from 'react-icons/go';
import { TbTag } from "react-icons/tb";
import { HSeparator } from 'components/separator/Separator';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';

const EnquiryTable = ({ columnData, rowData }) => {

    
    const [openActionModal, setOpenActionModal] = useState(false);
    //const navigate = useNavigate

    // const handleQuotePrice = ()=>{

    // }

    return (
        <>
            <TableContainer
                border="3px solid"
                borderRadius="0.5rem"
                borderColor="#D3D3D3"
            >
                <Flex m="1rem 2rem" justifyContent="space-between">
                    <Flex
                        alignItems="center"
                        fontWeight="bold"
                        fontSize="1.1rem"
                    >
                        <Text>Enquiries</Text>
                    </Flex>
                    <Flex
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Img src={CardTimeline} alt="CardTimeline" style={{ width: "30px", height: "30px", marginRight: "0.6rem" }} />
                        <Text mr="0.6rem">Past 15 days</Text>
                        <ChevronDownIcon mr="0.6rem" />
                        <Text mr="0.6rem" >17 Jan 2024</Text>
                        <Text><span style={{ marginRight: "0.6rem" }}>to</span> 08 Feb 2024</Text>
                    </Flex>
                </Flex>
                <Table
                    variant='simple'
                    overflowX="hidden"
                    style={{ borderCollapse: 'separate', borderSpacing: '0 1rem' }}
                >
                    <Thead height="4rem" mb="1rem">
                        <Tr backgroundColor="#D0E3F3">
                            {columnData?.map((item, index) => (
                                <Th key={index}>{item}</Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {rowData.map((item, index) => (
                            <Tr key={index}
                                backgroundColor="#EBF2FA"
                                boxShadow="0rem 0.25rem 0.25rem 0rem #00000040"
                            >
                                <Td>
                                    <Flex direction="column">
                                        <Text fontWeight="bold">{item?.category}</Text>
                                        <Text fontSize="sm">{item?.subCategory}</Text>
                                    </Flex>
                                </Td>
                                <Td>
                                    <Flex
                                        direction="column"
                                    >
                                        <Text fontWeight="bold">{item?.date}</Text>
                                        <Text fontSize="sm">{item?.time}</Text>
                                    </Flex>
                                </Td>
                                <Td>{item?.name}</Td>
                                <Td fontWeight="bold">₹{item?.budget}</Td>
                                <Td fontWeight="bold">{item?.industry}</Td>
                                <Td fontWeight="bold">{item?.timeline}</Td>
                                <Td fontWeight="bold">{item?.status}</Td>
                                <Td>
                                    <Button
                                        backgroundColor="#9BC5EF"
                                        borderRadius="2rem"
                                        cursor="pointer"
                                        onClick={() => { setOpenActionModal(!openActionModal) }}
                                    >
                                        Action
                                    </Button>
                                </Td>
                            </Tr>
                        ))}

                    </Tbody>
                    
                       
                    
                </Table>
                <Flex justifyContent="center" alignItems="center" marginBottom="1rem">
            <Button
              backgroundColor="#D7E9FD"
              borderRadius="10px"
              boxShadow="3px 5px 5px 0px #ccc"
            >
              View All
            </Button>
          </Flex>
            </TableContainer>


            {/* Action Modal Opening */}
            <Modal
                size="xl"
                isOpen={openActionModal}
                onClose={() => { setOpenActionModal(!openActionModal) }}
            >
                <ModalOverlay />
                <ModalContent
                    backgroundColor="#EBF2FA"
                >
                    <ModalHeader color="#1B2559">Digitial Marketing</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Details</Text>
                        <Flex pt="1rem" pb="1rem">
                            <Flex w="50%">
                                <Avatar size='sm' />
                                <Input ml="0.5rem" variant='flushed' placeholder='CustomerName' />
                            </Flex>
                            <Flex w="50%">
                                <Input ml="0.5rem" variant='flushed' placeholder='SEO' />
                            </Flex>
                        </Flex>
                        <Flex pt="1rem" pb="1rem">
                            <Flex
                                w="50%"
                                alignItems="center"
                            >
                                <Icon as={SlGraph} />
                                <Input ml="0.5rem" variant='flushed' placeholder='Banking & Finance' />
                            </Flex>
                            <Flex
                                w="50%"
                                alignItems="center"
                            >
                                <Icon as={FaRegCalendarAlt} />
                                <Input ml="0.5rem" variant='flushed' placeholder='24 Jan 2024 to 24 Feb 2024' />
                            </Flex>
                        </Flex>
                        <Text>Pricings</Text>
                        <Flex pt="1rem" pb="1rem">
                            <Flex
                                w="50%"
                                alignItems="center"
                            >
                                <Icon as={BsClock} />
                                <Input ml="0.5rem" variant='flushed' placeholder='2 Weeks' />
                            </Flex>
                            <Flex
                                w="50%"
                                alignItems="center">
                                <Icon as={GoBell} />
                                <Input ml="0.5rem" variant='flushed' placeholder='Immediately' />
                            </Flex>
                        </Flex>
                        <Flex
                            pt="1rem" pb="1rem"
                            w="50%"
                            alignItems="center"
                        >
                            <Icon as={TbTag} />
                            <Input ml="0.5rem" variant='flushed' placeholder='5-7K' />
                        </Flex>
                        <Text pt="0.8rem" pb="0.8rem">Project Requirement</Text>
                        <HSeparator boxShadow="0px 0.25rem 0.25rem 0px rgba(0, 0, 0, 0.4)" />
                        <Text mt="0.8rem" mb="0.8rem" fontSize="sm">We are facing a lot of problem in our organic growth and we want somenone to improve it.
                            This is our requirement.</Text>
                        <HSeparator boxShadow="0px 0.25rem 0.25rem 0px rgba(0, 0, 0, 0.4)" />
                        <Text mt="1rem" mb="1rem">Customer Decision Priority</Text>
                        <SimpleGrid columns={3} spacing={5}>
                            <Button w="100%" h="2rem" mr="0.5rem" textAlign="center" backgroundColor="#65C756" color="#fff" borderRadius="50px 0px 0px 50px">Cost</Button>
                            <Button w="100%" h="2rem" mr="0.5rem" textAlign="center" backgroundColor="#65C756" color="#fff" borderRadius="0px 0px 0px 0px">Experience</Button>
                            <Button w="100%" h="2rem" mr="0.5rem" textAlign="center" backgroundColor="#E0E0E0" color="#263238" borderRadius="2px 60px 60px 2px">Quality work</Button>
                            <Button w="100%" h="2rem" mr="0.5rem" textAlign="center" backgroundColor="#E0E0E0" color="#263238" borderRadius="50px 0px 0px 50px">Timeline</Button>
                            <Button w="100%" h="2rem" mr="0.5rem" textAlign="center" backgroundColor="#E0E0E0" color="#fff" borderRadius="0px 0px 0px 0px">Ratings</Button>
                            <Button w="100%" h="2rem" mr="0.5rem" textAlign="center" backgroundColor="#65C756" color="#fff" borderRadius="2px 60px 60px 2px">Payment Structure</Button>
                        </SimpleGrid>
                        <Text mt="1rem" mb="1rem">Status</Text>
                        <Flex justifyContent="space-between">
                            <Box w="25%" mr="0.5rem" textAlign="center" backgroundColor="#D8F9E6" color="#5DEF92">New</Box>
                            <Box w="25%" mr="0.5rem" textAlign="center" backgroundColor="#5DEF9233" color="#5DEF92">Open</Box>
                            <Box w="25%" mr="0.5rem" textAlign="center" backgroundColor="#65C756" color="#FFFFFF">In Progress</Box>
                            <Box w="25%" mr="0.5rem" textAlign="center" backgroundColor="#E0E0E0" color="#455A64BF">Closed</Box>
                        </Flex>
                    </ModalBody>
                    <Text ml="1.5rem">Take Action</Text>
                    <Flex
                        ml="1.5rem"
                        mt="1rem" mb="1rem"
                        justifyContent="flex-start"
                        color="#FFFFFF"
                    >
                         <NavLink to ="/admin/assigned-partners"><Button backgroundColor="#407BFF">Assign Partners</Button></NavLink>
                        <Button ml="1rem" backgroundColor="#F28F8F">Reject</Button>
                    </Flex>
                    <FormControl mt="1rem" mb="1rem" w="90%" ml="1.5rem">
                        <FormLabel htmlFor='question'>Remarks</FormLabel>
                        <Input
                            id='question'
                            type='text'
                            placeholder='Type your Question'
                            minHeight="6rem"
                            backgroundColor="#FFFFFF"
                        />
                    </FormControl>
                    <ModalFooter>
                       <Button backgroundColor="#F28F8F" color="#fff">Reject</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EnquiryTable
