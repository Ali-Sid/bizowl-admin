import { Box, Flex, Spinner } from "@chakra-ui/react";
import { primaryDB } from "config/firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ComplexTable from "./components/ComplexTable";

const UserManagement = () => {
  const [usersData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unsubscribe, setUnSubscribe] = useState(null)

  useEffect(() => {
    getUsers();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const getUsers = () => {
    try {
      const subscribe = onSnapshot(collection(primaryDB, "userQuotations"), (snapshot) => {
        const users = snapshot.docs.map((doc, index) => ({
          ...doc.data(),
          id: doc.id,
          srNo: index + 1,
          name: `${doc.data().firstName} ${doc.data().lastName}`,
        }));
        setUserData(users);
        setLoading(false);
      });
      setUnSubscribe(() => subscribe);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  
  const columns = [
    {
      Header: "SRNO",
      accessor: "srNo",
    },
    {
      Header: "NAME",
      accessor: rowData => `${rowData.firstName} ${rowData.lastName}`,
    },
    {
      Header: "EMAIL",
      accessor: "email",
    },
    {
      Header: "PHONE",
      accessor: "phoneNumber",
    },
    // {
    //   Header: "ROLE",
    //   accessor: "role",
    // },
    {
      Header: "ACTION",
      accessor: "action",
    },
  ];

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Flex align="center" justify="center" h="100%">
        {loading ? (
          <Spinner size="xl" marginTop={'5rem'} />
        ) : (
          <ComplexTable
            columnsData={columns}
            tableData={usersData}
          />
        )}
      </Flex>
    </Box>
  )

};
export default UserManagement;
