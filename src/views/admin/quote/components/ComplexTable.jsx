import {
    Flex,
    Table,
    Progress,
    Icon,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    Button,
    Input,
    useToast,
    Modal,
    ModalHeader,
    ModalContent,
    ModalFooter,
    ModalBody,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";

// Assets
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "config/firebase";

export default function ComplexTable(props) {

    const [isOpen, setIsOpen] = useState(false);
    const { columnsData, tableData } = props;
    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);
    const toast = useToast();
    const tableInstance = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter, // Add useGlobalFilter hook for global search
        useSortBy,
        usePagination
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize, globalFilter },
        preGlobalFilteredRows,
        setGlobalFilter,
    } = tableInstance;

    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

    return (
        <Card
            direction='column'
            w='100%'
            px='0px'
            overflowX={{ sm: "scroll", lg: "hidden" }}
        >
            <Flex px='25px' justify='space-between' mb='10px' align='center'>
                <Text
                    color={textColor}
                    fontSize='22px'
                    fontWeight='700'
                    lineHeight='100%'
                >
                    Quotes
                </Text>
                <Input
                    type='text'
                    value={globalFilter || ""}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder='Search...'
                    // mb='16px'
                    style={{ width: '20%', marginTop: '0.5rem' }}
                />
                {/* <Menu /> */}
            </Flex>

            {/* Global Search Input */}


            <Table
                {...getTableProps()}
                variant='simple'
                color='gray.500'
                mb='24px'
            >
                <Thead>
                    {headerGroups.map((headerGroup, index) => (
                        <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                            {headerGroup.headers.map((column, index) => (
                                <Th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    pe='10px'
                                    key={index}
                                    borderColor={borderColor}
                                    style={{ textAlign: 'center' }}
                                >
                                    <Flex
                                        justify='center'
                                        align='center'
                                        fontSize={{ sm: "10px", lg: "12px" }}
                                        color='gray.400'
                                    >
                                        {column.render("Header")}
                                    </Flex>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {page.map((row, index) => {
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()} key={index}>
                                {row.cells.map((cell, index) => {
                                    let data = "";
                                    if (cell.column.Header === "PROJECT") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700' align="center">
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "CLIENT") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700' align="center">
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "PARTNER") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700' align="center">
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "STATUS") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700' align="center">
                                                {cell.value}
                                            </Text>
                                        );
                                    }
                                    else if (cell.column.Header === "ACTION") {
                                        data = (
                                            <Flex align='center' justify="center">
                                                <Button size="sm" colorScheme="blue" onClick={() => { setIsOpen(true) }}>
                                                    View
                                                </Button>
                                            </Flex>
                                        );
                                    }
                                    else if (cell.column.Header === "SRNO") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700' align="center">
                                                {cell.value}
                                            </Text>
                                        );
                                    }
                                    return (
                                        <Td
                                            {...cell.getCellProps()}
                                            key={index}
                                            fontSize={{ sm: "14px" }}
                                            maxH='30px !important'
                                            py='8px'
                                            minW={{ sm: "150px", md: "200px", lg: "auto" }}
                                            borderColor='transparent'
                                        >
                                            {data}
                                        </Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>

            {/*Modal For View Details*/}
            <Modal
                isOpen={isOpen}
                onClose={() => { setIsOpen(false) }}

            >
                <ModalContent>
                    <ModalHeader>Quote Details</ModalHeader>
                    <ModalBody>
                        <Table
                            variant='simple'
                            color='gray.500'
                            mb='24px'
                        >
                            <Thead>
                                <Tr>
                                    <Th style={{ textAlign: 'center' }}>Partners</Th>
                                    <Th style={{ textAlign: 'center' }}>Bid Amount</Th>
                                    <Th style={{ textAlign: 'center' }}>TimeLine</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td style={{ textAlign: 'center' }}>Partner1</Td>
                                    <Td style={{ textAlign: 'center' }}>5 K</Td>
                                    <Td style={{ textAlign: 'center' }}>2 Months</Td>
                                </Tr>
                                <Tr>
                                    <Td style={{ textAlign: 'center' }}>Partner2</Td>
                                    <Td style={{ textAlign: 'center' }}>20 K</Td>
                                    <Td style={{ textAlign: 'center' }}>3 Months</Td>
                                </Tr>
                                <Tr>
                                    <Td style={{ textAlign: 'center' }}>Partner3</Td>
                                    <Td style={{ textAlign: 'center' }}>15 K</Td>
                                    <Td style={{ textAlign: 'center' }}>1 Month</Td>
                                </Tr>
                                <Tr>
                                    <Td style={{ textAlign: 'center' }}>Partner4</Td>
                                    <Td style={{ textAlign: 'center' }}>10 K</Td>
                                    <Td style={{ textAlign: 'center' }}>2.5 Months</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='green' mr={3} onClick={() => { setIsOpen(false) }}>
                            Approve
                        </Button>
                        <Button colorScheme='red' mr={3} onClick={() => { setIsOpen(false) }}>
                            Decline
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Pagination */}
            <Flex mt="4" justify="space-between" align="center" style={{ marginInline: '1rem' }}>
                <Flex align="center">
                    <Text mx="2">Items per page:</Text>
                    <select
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                    >
                        {[5, 10, 20, 50, 100].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                </Flex>
                <Flex align="center">
                    <Text mr="2">Page {pageIndex + 1} of {pageOptions.length}</Text>
                    <Button
                        onClick={() => gotoPage(0)}
                        isDisabled={!canPreviousPage}
                        mx="1"
                    >
                        {"<<"}
                    </Button>
                    <Button
                        onClick={previousPage}
                        isDisabled={!canPreviousPage}
                        mx="1"
                    >
                        {"<"}
                    </Button>
                    <Button
                        onClick={nextPage}
                        isDisabled={!canNextPage}
                        mx="1"
                    >
                        {">"}
                    </Button>
                    <Button
                        onClick={() => gotoPage(pageCount - 1)}
                        isDisabled={!canNextPage}
                        mx="1"
                    >
                        {">>"}
                    </Button>
                </Flex>

            </Flex>
        </Card>
    );
}
