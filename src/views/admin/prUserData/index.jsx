import React, { useState, useEffect } from "react";
// import { clientDB } from "config/firebase";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import ServiceRequestDetailsModal from "../marketplace/ServiceRequestComponents/ServiceRequestDetailsModal";
import ComplexTable from "../marketplace/components/ComplexTable";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { primaryDB } from "config/firebase";


const PrUserData = ({ serviceRequests: propServiceRequests }) => {
  const [serviceRequests, setServiceRequests] = useState([]);
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

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(primaryDB, "prUsers"), (snapshot) => {
      const serviceRequests = snapshot.docs.map((doc, index) => ({
        srNo: index + 1,
        id: doc.id,
        ...doc.data(), // Spread the entire document data here
        email: doc.data().userDetails?.email, // Adjust based on your actual data structure
      }));

      console.log("Fetched service requests:", serviceRequests); // Log fetched data for inspection

      console.log("Fetched service requests:", JSON.stringify(serviceRequests, null, 2)); // Enhanced logging

      setServiceRequests(serviceRequests);
      setLoading(false);
    });

    // Cleanup function to unsubscribe from snapshot listener
    return () => {
      unsubscribe();
    };
  }, []);



  const columns = [
    {
      Header: "SRNO",
      accessor: "srNo",
    },
    {
      Header: "Name",
      accessor: rowData => `${rowData.firstName} ${rowData.lastName}`,
    },
    {
      Header: "PROJECT TYPE",
      accessor: "projectType",
    },
    {
      Header: "SERVICE",
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
      accessor: rowData => rowData.status || "Pending", // Custom accessor function
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
          <Spinner size="xl" marginTop={'5rem'} />
        ) : (
          <ComplexTable columnsData={columns} tableData={serviceRequests} />
        )}
      </Flex>
    </Box>
  );
};

export default PrUserData;
