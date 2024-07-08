import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Img,
  ModalOverlay,
  Progress,
  SimpleGrid,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import React, { useState } from "react";
import profile from "../assets/avatar1.png"
// import CardTimeline from "../assets/img/system-uicons_card-timeline.png";

import {
  ColumnData,
  EnquiryColumn,
  EnquiryRow,
  RowData
} from "../data/AssignedData";

const EnquiryTable = ({ columnData, rowData }) => {
  return (
    <>
      <TableContainer>
        <Flex m="1rem " justifyContent="space-between">
          <Flex alignItems="center" fontWeight="bold" fontSize="1.1rem">
            <Text>Enquiries</Text>
          </Flex>
        </Flex>
        <Table
          variant="simple"
          overflowX="hidden"
          style={{ borderCollapse: "separate", borderSpacing: "0 1rem" }}
        >
          <Thead height="4rem" >
            <Tr backgroundColor="#D0E3F3">
              {EnquiryColumn?.map((item, index) => (
                <Th key={index}>{item}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {EnquiryRow.map((item, index) => (
              <Tr
                key={index}
                backgroundColor="#EBF2FA"
                boxShadow="0rem 0.25rem 0.25rem 0rem #00000040"
              >
                <Td>
                  <Text fontWeight="bold">{item?.category}</Text>
                </Td>
                <Td>
                  <Flex direction="column">
                    <Text fontWeight="bold">{item?.date}</Text>
                    {/* <Text fontSize="sm">{item?.time}</Text> */}
                  </Flex>
                </Td>
                <Td>
                  <Flex direction="row" gap={2}>
                    <Image height={5} w={5} borderRadius="50%" src={profile}></Image>
                    <Text fontWeight="bold">{item?.name}</Text>
                  </Flex>
                </Td>
                <Td fontWeight="bold">₹{item?.budget}</Td>
                <Td fontWeight="bold">{item?.industry}</Td>
                <Td fontWeight="bold">{item?.timeline}</Td>
                <Td fontWeight="bold">{item?.status}</Td>
                <Td fontWeight="bold">{item?.delivery}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default EnquiryTable;
