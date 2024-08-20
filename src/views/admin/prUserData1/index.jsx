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
} from "@chakra-ui/react";
import { primaryDB } from "config/firebase";
import { clientDB } from "config/firebase";
import DetailsModal from "./utils/DetailsModal";
// import { partnerDB } from "config/firebase";

function Test() {
  const [prUsers, setPrUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [partners, setPartners] = useState([]);

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
  console.log(prUsers)
  return (
    <div>
      <Box>
        <Table variant="simple" colorScheme="teal" size="md" w="full">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Budget</Th>
              <Th>Email</Th>
              <Th>Company</Th>
              <Th>Delivery Time</Th>
              <Th></Th>
              {/* Add more columns as per your data structure */}
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
