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
  TableContainer,
  useColorModeValue,
} from "@chakra-ui/react";
import { primaryDB } from "config/firebase";
import DetailsModal from "./utils/DetailsModal";
import { partnerDB } from "config/firebase";
import PartnerAssignmentDrawer from "./utils/PartnerAssignmentModal";

function Test() {
  const [quotations, setQuotations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [partners, setPartners] = useState([]);

  const textColor = useColorModeValue("secondaryGray.900", "white");

  useEffect(() => {
    const fetchPartners = async () => {
      const partnersCollectionRef = collection(partnerDB, "partners");
      const snapshot = await getDocs(partnersCollectionRef);
      const fetchedPartners = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPartners(fetchedPartners);
    };

    fetchPartners();
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      const quotationsCollectionRef = collection(primaryDB, "userQuotations");
      const snapshot = await getDocs(quotationsCollectionRef);
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setQuotations(data);
    };

    fetchData();
  }, []);
  return (
    <div>
      <Box>
        <TableContainer sx={{bgColor: "#fff", borderRadius: "15px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", padding: "20px 0 20px 0"}}>
        <Text
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flexStart"
          padding="20px 0 20px 20px"
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'
        >
          Test Data
        </Text>
        <Table variant="simple" colorScheme="teal" size="md" w="full">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Budget</Th>
              <Th>Email</Th>
              <Th>Company</Th>
              <Th>Project Type</Th>
              <Th></Th>
              {/* Add more columns as per your data structure */}
            </Tr>
          </Thead>
          <Tbody>
            {quotations.map((row, index) => (
              <Tr key={index}>
                <Td>
                  {row.firstName} {row.lastName}
                </Td>
                <Td>{row.budget}</Td>
                <Td>{row.email}</Td>
                <Td>{row.companyName}</Td>
                <Td>{row.projectType}</Td>
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
        </TableContainer>
      </Box>
    </div>
  );
}

export default Test;
