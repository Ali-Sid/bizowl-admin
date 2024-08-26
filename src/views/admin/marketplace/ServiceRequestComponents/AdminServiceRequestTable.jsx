import React, { useState, useEffect } from "react";
import { primaryDB } from "config/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import ServiceRequestDetailsModal from "./ServiceRequestDetailsModal";
import ComplexTable from "../components/ComplexTable";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import Test from "views/admin/prUserData1";
import { clientDB } from "config/firebase";

const ServiceRequests = ({ serviceRequests: propServiceRequests }) => {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [prServiceRequests, setPrServiceRequests] = useState([]);
  // const [selectedDetails, setSelectedDetails] = useState(null);
  // const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [unSubscribe,setUnSubscribe]=useState(null)

  // const handleViewDetails = (details) => {
  //   setSelectedDetails(details);
  //   setIsDetailsModalOpen(true);
  // };

  // useEffect(() => {
  //   getServiceRequests();
  //   return () => {
  //     if (unSubscribe) {
  //       unSubscribe();
  //     }
  //   };
  // }, []);
  //
  // const getServiceRequests = async () => {
  //   try {
  //     const subScribe= onSnapshot(collection(db, "users"), (snapshot) => {
  //       const serviceRequests = snapshot.docs.map((doc, index) => {
  //         return({
  //           ...doc.data(),
  //           srNo:index+1,
  //           id: doc.id,
  //           email:doc.data().userDetails?.email
  //         })
  //       });
  //       setServiceRequests(serviceRequests);
  //       setLoading(false);
  //     });
  //     setUnSubscribe(()=>subScribe)
  //   } catch (error) {
  //     console.log(error.message);
  //     setLoading(false);
  //   }
  // }

  const fetchData = async () => {
    const prUsers = collection(clientDB, "prUsers");
    const snapshot = await getDocs(prUsers);
    const data = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setPrServiceRequests(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(primaryDB, "userQuotations"),
      (snapshot) => {
        const serviceRequests = snapshot.docs.map((doc, index) => ({
          srNo: index + 1,
          id: doc.id,
          ...doc.data(), // Spread the entire document data here
          email: doc.data().userDetails?.email, // Adjust based on your actual data structure
        }));

        console.log("Fetched service requests:", serviceRequests); // Log fetched data for inspection

        console.log(
          "Fetched service requests:",
          JSON.stringify(serviceRequests, null, 2)
        ); // Enhanced logging

        setServiceRequests(serviceRequests);
        setLoading(false);
      }
    );

    // Cleanup function to unsubscribe from snapshot listener
    return () => {
      unsubscribe();
    };
  }, []);

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

  const columns = [
    {
      Header: "SRNO",
      accessor: "srNo",
    },
    {
      Header: "Name",
      accessor: (rowData) => `${rowData.firstName} ${rowData.lastName}`,
    },
    {
      Header: "PHONE",
      accessor: "phoneNumber",
    },
    {
      Header: "SERVICE TYPE",
      accessor: "services",
    },
    {
      Header: "TIMELINE",
      accessor: "timeLine",
    },
    {
      Header: "BUDGET",
      accessor: "budget",
    },
    {
      Header: "STATUS",
      accessor: (rowData) => rowData.status || "Pending", // Custom accessor function
    },
    {
      Header: "CREATED-AT",
      accessor: (rowData) => {
        const timestamp = rowData.createdAt;
        if (timestamp) {
          const date = new Date(timestamp.seconds * 1000);
          return date.toLocaleString();
        }

        return getCurrentDateWithoutSeconds();
      },
    },
    {
      Header: "ACTION",
      accessor: "action",
    },
  ];

  const prColumns = [
    {
      Header: "NAME",
      accessor: (rowData) => `${rowData.firstName} ${rowData.lastName}`,
    },
    {
      Header: "PHONE",
      accessor: "phone",
    },
    {
      Header: "SERVICE TYPE",
      accessor: "industry",
    },
    {
      Header: "DELIVERY TIME",
      accessor: "deliveryTime",
    },
    {
      Header: "BUDGET",
      accessor: "budget",
    },
    {
      Header: "STATUS",
      accessor: (rowData) => rowData.status || "Pending", // Custom accessor function
    },
    {
      Header: "ACTION",
      accessor: "action",
    },
  ];

  return (
    <Box pt={{ base: "180px", md: "5px", xl: "5px" }}>
      <Flex align="center" justify="center" h="100%">
        {loading ? (
          <Spinner size="xl" marginTop={"5rem"} />
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <ComplexTable columnsData={columns} tableData={serviceRequests} />
            {/* <ComplexTable columnsData={prColumns} tableData={prServiceRequests} /> */}
            <Test />
          </div>
        )}
      </Flex>
    </Box>
  );
};

export default ServiceRequests;
