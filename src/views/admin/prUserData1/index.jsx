import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Button,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { primaryDB } from "config/firebase";
import { clientDB } from "config/firebase";
import DetailsModal from "./utils/DetailsModal";
// import { partnerDB } from "config/firebase";
import "../../../assets/css/App.css"

function Test() {
  const [prUsers, setPrUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [partners, setPartners] = useState([]);

  const textColor = useColorModeValue("secondaryGray.900", "white");

  //   useEffect(() => {
  //     const fetchClients = async () => {
  //       const clientCollectionRef = collection(clientDB, "prUsers");
  //       const snapshot = await getDocs(clientCollectionRef);
  //       const fetchedClients = snapshot.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }));
  //       setPartners(fetchedClients);
  //     };

  //     fetchClients();
  //   }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const getCurrentDateWithoutSeconds = () => {
    const date = new Date();
    return date.toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: undefined,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const prUsers = collection(clientDB, "prUsers");
      const snapshot = await getDocs(prUsers);
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPrUsers(data);
    };
    fetchData();
  }, []);
  console.log(prUsers);
  return (
    <div style={{overflow: "auto", maxHeight: "600px"}}>
      <Box sx={{ bgColor: "#fff", borderRadius: "20px" }}>
      <Flex px='25px' justify='space-between' mb='10px' pt='20px' align='center'>
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'
        >
          PR Service Requests
        </Text>
      </Flex>
        <Table variant="simple" colorScheme="teal" size="md" w="full">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Budget</Th>
              <Th>Email</Th>
              <Th>Company</Th>
              <Th>Delivery Time</Th>
              <Th>Created At</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {prUsers.map((row, index) => (
              <Tr key={index}>
                <Td>
                  {row.firstName} {row.lastName}
                </Td>
                <Td>{row.budget}</Td>
                <Td>{row.email}</Td>
                <Td>{row.company}</Td>
                <Td>{row.deliveryTime}</Td>
                <Td>{getCurrentDateWithoutSeconds()}</Td>
                <Td>
                  <Button
                    onClick={() => {
                      setIsModalOpen(true);
                      setSelectedRowData(row);
                    }}
                  >
                    View Details
                  </Button>
                </Td>
                {/* Render other fields as per your data structure */}
              </Tr>
            ))}
          </Tbody>
        </Table>
        <DetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          rowData={selectedRowData}
        />
      </Box>
    </div>
  );
}

export default Test;
