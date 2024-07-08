import * as React from 'react';
import { useState, useEffect } from 'react';
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import ComplexTable from "./components/ComplexTable";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { partnerDB } from "config/firebase";

const PartnerManagement = () => {

    const [partnersData, setPartnersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [unsubscribe, setUnSubscribe] = useState(null)

    useEffect(() => {
        getPartners();
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    console.log("Partners Data :", partnersData);
    const getPartners = () => {
        try {
            const subscribe = onSnapshot(collection(partnerDB, "partners"), (snapshot) => {
                const users = snapshot.docs.map((doc, index) => ({
                    ...doc.data(),
                    id: doc.id,
                    srNo: index + 1,
                }));
                setPartnersData(users);
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
            accessor: "name",
        },
        {
            Header: "EMAIL",
            accessor: "email",
        },
        {
            Header: "PHONE",
            accessor: "phone",
        },
        {
            Header: "INDUSTRY",
            accessor: "industry",
        },
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
                        tableData={partnersData}
                    />
                )}
            </Flex>
        </Box>
    )
}
export default PartnerManagement