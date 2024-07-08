import { Box, Button, Flex, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import EnquiryTable from "../assigned/components/EnquiryTable";
import { EnquiryColumn, EnquiryRow } from "./data/AssignedData";
import PartnerTable from "./components/PartnerTable";
import { collection, onSnapshot } from "firebase/firestore";
import { partnerDB, primaryDB } from "config/firebase";

const AssignedPartners = () => {
  const [enquiryColumnData, setEnquiryColumnData] = useState([]);
  const [enquiryRowData, setEnquiryRowData] = useState([]);
  const [partnersData, setPartnersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unsubscribe, setUnSubscribe] = useState(null);

  useEffect(() => {
    setEnquiryColumnData(EnquiryColumn);
    console.log(enquiryColumnData)
    // Fetching data from userQuotations collection
    const fetchDataFromUserQuotations = async () => {
      try {
        const unsubscribe = onSnapshot(
          collection(primaryDB, "userQuotations"),
          (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            setEnquiryRowData(data); // Update enquiryRowData with fetched data
          }
        );
        setUnSubscribe(() => unsubscribe);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataFromUserQuotations();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    getPartners();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);
  const getPartners = () => {
    try {
      const subscribe = onSnapshot(
        collection(partnerDB, "partners"),
        (snapshot) => {
          const users = snapshot.docs.map((doc, index) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setPartnersData(users);
          setLoading(false);
        }
      );
      setUnSubscribe(() => subscribe);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const columns = [
    {
      Header: "NAME",
      accessor: "firstName",
    },
    {
      Header: "Low Ticket",
      accessor: "lowticket",
    },
    {
      Header: "Services",
      accessor: "service",
    },
    {
      Header: "Experience",
      accessor: "experience",
    },
    {
      Header: "City",
      accessor: "city",
    },
    {
      Header: "Ratings",
      accessor: "ratings",
    },
    {
      Header: "Portfolio",
      accessor: "portfolio",
    },
  ];
  return (
    <div>
      <Box marginTop="1rem">
        <EnquiryTable columnData={enquiryColumnData} rowData={enquiryRowData} />
      </Box>
      <Text mt="1rem" mb="1rem">
        Customer Decision Priority
      </Text>
      <SimpleGrid columns={6} spacing={5}>
        <Button
          w="100%"
          h="2rem"
          mr="0.5rem"
          textAlign="center"
          backgroundColor="#65C756"
          color="#fff"
          borderRadius="50px 0px 0px 50px"
          fontSize={12}
        >
          Cost
        </Button>
        <Button
          w="100%"
          h="2rem"
          mr="0.5rem"
          textAlign="center"
          backgroundColor="#65C756"
          color="#fff"
          borderRadius="0px 0px 0px 0px"
          fontSize={12}
        >
          Experience
        </Button>
        <Button
          w="100%"
          h="2rem"
          mr="0.5rem"
          textAlign="center"
          backgroundColor="#E0E0E0"
          color="#263238"
          borderRadius="0px 0px 0px 0px"
          fontSize={12}
        >
          Ratings
        </Button>
        <Button
          w="100%"
          h="2rem"
          mr="0.5rem"
          textAlign="center"
          backgroundColor="#65C756"
          color="#fff"
          borderRadius="0px 0px 0px 0px"
          fontSize={12}
        >
          Payment Structure
        </Button>
        <Button
          w="100%"
          h="2rem"
          mr="0.5rem"
          textAlign="center"
          backgroundColor="#E0E0E0"
          color="#263238"
          borderRadius="0px 0px 0px 0px"
          fontSize={12}
        >
          Timeline
        </Button>
        <Button
          w="100%"
          h="2rem"
          mr="0.5rem"
          textAlign="center"
          backgroundColor="#E0E0E0"
          color="#263238"
          borderRadius="2px 60px 60px 2px"
          fontSize={12}
        >
          Quality work
        </Button>
      </SimpleGrid>

      <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
        <Flex align="center" justify="center" h="100%">
          {loading ? (
            <Spinner size="xl" marginTop={"5rem"} />
          ) : (
            <PartnerTable columnData={columns} tableData={partnersData} />
          )}
        </Flex>
      </Box>
    </div>
  );
};

export default AssignedPartners;
