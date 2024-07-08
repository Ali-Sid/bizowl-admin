import { Box, Flex, Spinner } from '@chakra-ui/react'
import React, { useState } from 'react'
import ComplexTable from './components/ComplexTable';

const QuoteManagement = () => {

    const [loading, setLoading] = useState(false);

    const columns = [
        {
            Header: "SRNO",
            accessor: "srNo",
        },
        {
            Header: "PROJECT",
            accessor: "project",
        },
        {
            Header: "CLIENT",
            accessor: "client",
        },
        // {
        //     Header: "PARTNER",
        //     accessor: "partner",
        // },
        {
            Header: "STATUS",
            accessor: "status",
        },
        {
            Header: "ACTION",
            accessor: "action",
        },
    ];

    const quoteData = [
        {
            srNo: 1,
            project: "Web Developemnt",
            client: "Om",
            status: "Approve",
        },
        {
            srNo: 2,
            project: "SEO",
            client: "Suman",
            status: "Approve",
        }
    ];
    return (
        <div>
            <h1>Quote Managemnet</h1>
            <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
                <Flex align="center" justify="center" h="100%">
                    {loading ? (
                        <Spinner size="xl" marginTop={'5rem'} />
                    ) : (
                        <ComplexTable
                            columnsData={columns}
                            tableData={quoteData}
                        />
                    )}
                </Flex>
            </Box>
        </div>
    )
}

export default QuoteManagement
