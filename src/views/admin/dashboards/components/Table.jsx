import { Button, Flex, Img, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

export const ChartTable = ({ columnData, rowData }) => {
  return (
    <>
     <TableContainer
            >
                
                <Table
                    variant='simple'
                    overflowX="hidden"
                    style={{ borderCollapse: 'separate', borderSpacing: '0 1rem' }}
                >
                    <Thead height="2rem" mb="1rem">
                        <Tr backgroundColor="#fff">
                            {columnData?.map((item, index) => (
                                <Th key={index}>{item.Header}</Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {rowData?.map((item, index) => (
                            <Tr key={index}
                                backgroundColor="#EBF2FA"
                                boxShadow="0rem 0.25rem 0.25rem 0rem #00000040"
                            >
                                <Td>{item?.no}</Td>
                                <Td >
                                    <Flex gap={2}>
                                    <Img height="20px" width="20px" src={item.image}/>
                                        <Text>{item?.name}</Text>
                                    </Flex>
                                    </Td>
                                <Td >{item?.sales}</Td>
                                <Td >{item?.leads}</Td>
                                <Td >{item?.partners}</Td>
                            </Tr>
                        ))}

                    </Tbody>
                    
                       
                    
                </Table>
               
            </TableContainer>
    </>
  )
}
