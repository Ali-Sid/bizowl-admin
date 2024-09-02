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
    const unsubscribe = onSnapshot(prUsers, (snapshot) => {
      const data = snapshot.docs.map((doc, index) => ({
        srNo: index + 1,
        ...doc.data(),
        id: doc.id,
      }));

      // Sort PR Service Requests by timestamp
      const sortedPrServiceRequests = data.sort((a, b) => {
        if (b.id > a.id) {
          return 1;
        } else if (b.id < a.id) {
          return -1;
        } else {
          return 0;
        }
      });
      
      setPrServiceRequests(sortedPrServiceRequests);
    });
    return () => {
      unsubscribe();
    };
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
      accessor: (row, index) => index + 1,
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
    // {
    //   Header: "STATUS",
    //   accessor: (rowData) => rowData.status || "Pending", // Custom accessor function
    // },
    {
      Header: "CREATED-AT",
      accessor: (rowData) => {
        if (rowData.createdAt) {
          const date = rowData.createdAt.toDate();
          const formattedDate = date.toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
          return formattedDate;
        } else {
          return <></>;
        }
      },
      // sortType: (a, b) => {
      //   const dateA = new Date(a.timestamp);
      //   const dateB = new Date(b.timestamp);
      //   return dateA - dateB;
      // },
    },
    {
      Header: "ACTION",
      accessor: "action",
    },
  ];

  const prColumns = [
    {
      Header: "SRNO",
      accessor: (row, index) => index + 1,
    },
    {
      Header: "NAME",
      accessor: (rowData) => `${rowData.fullName || rowData.firstName}`,
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
      accessor: (row) => `${row.priceRange[0]}-${row.priceRange[1]}`,
    },
    // {
    //   Header: "STATUS",
    //   accessor: (rowData) => rowData.status || "Pending", // Custom accessor function
    // },
    {
      Header: "CREATED-AT",
      accessor: (rowData) => {
        if (rowData.createdAt) {
          const date = rowData.createdAt.toDate();
          const formattedDate = date.toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
          return formattedDate;
        } else {
          return <></>;
        }
      },
      // sortType: (a, b) => {
      //   const dateA = new Date(a.timestamp);
      //   const dateB = new Date(b.timestamp);
      //   return dateA - dateB;
      // },
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
            <ComplexTable
              tableName={"Service Requests"}
              columnsData={columns}
              tableData={serviceRequests}
            />
            <ComplexTable
              tableName={"PR Service Requests"}
              columnsData={prColumns}
              tableData={prServiceRequests}
            />
            {/* <Test /> */}
          </div>
        )}
      </Flex>
    </Box>
  );
};

export default ServiceRequests;
