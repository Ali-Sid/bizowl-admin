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
import { primaryDB } from "config/firebase";
import ServiceRequestDetailsModal from "../ServiceRequestComponents/ServiceRequestDetailsModal";
import PrServiceRequestDetailsModal from "../ServiceRequestComponents/PrServiceRequestDetailsModal";
import { clientDB } from "config/firebase";

export default function ComplexTableForService(props) {
  console.log(props);
  const { columnsData, tableData, tableName } = props;
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const toast = useToast();
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedPrDetails, setSelectedPrDetails] = useState(null);
  const [isPrDetailsModalOpen, setIsPrDetailsModalOpen] = useState(false);

  const tableInstance = useTable(
    {
      columns,
      data,
      // initialState: {
      //   sortBy: [
      //     {
      //       id: "timestamp",
      //       desc: true,
      //     },
      //   ],
      // },
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

  const handleDelete = async (data) => {
    try {
      const userDocRef = doc(primaryDB, "userQuotations", data?.original.id);
      const userDocRefClientDB = doc(clientDB, "quotations", data?.original.id);
      const response = await deleteDoc(userDocRef);
      const responseClientDB = await deleteDoc(userDocRefClientDB);
      if (response && responseClientDB) {
        toast({
          description: "Deleted Successfully",
          status: "success",
          position: "top",
          duration: 1000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  const handlePrDelete = async (data) => {
    try {
      const userDocRef = doc(clientDB, "prUsers", data?.original.id);
      const response = await deleteDoc(userDocRef);
      if (response) {
        toast({
          description: "Deleted Successfully",
          status: "success",
          position: "top",
          duration: 1000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  const handleViewDetails = (details) => {
    setSelectedDetails(details);
    setIsDetailsModalOpen(true);
  };

  const handleViewPrDetails = (details) => {
    setSelectedPrDetails(details);
    setIsPrDetailsModalOpen(true);
  };

  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" mb="10px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          {tableName}
        </Text>
        <Input
          type="text"
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          // mb='16px'
          style={{ width: "20%", marginTop: "0.5rem" }}
        />
        {/* <Menu /> */}
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="10px"
                  key={index}
                  borderColor={borderColor}
                  style={{ textAlign: "center" }}
                >
                  <Flex
                    justify="center"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
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
                  if (cell.column.Header === "ACTION") {
                    if (tableName === "Service Requests") {
                      data = (
                        <Flex align="center" justify="center">
                          <Button
                            size="sm"
                            colorScheme="green"
                            onClick={() => handleViewDetails(row)}
                            mr="0.3rem"
                          >
                            View
                          </Button>
                          <Button
                            size="sm"
                            colorScheme="red"
                            onClick={() => handleDelete(row)}
                          >
                            Delete
                          </Button>
                        </Flex>
                      );
                    } else if (tableName === "PR Service Requests") {
                      data = (
                        <Flex align="center" justify="center">
                          <Button
                            size="sm"
                            colorScheme="green"
                            onClick={() => handleViewPrDetails(row)}
                            mr="0.3rem"
                          >
                            View
                          </Button>
                          <Button
                            size="sm"
                            colorScheme="red"
                            onClick={() => handlePrDelete(row)}
                          >
                            Delete
                          </Button>
                        </Flex>
                      );
                    }
                  } else {
                    data = (
                      <Text
                        color={textColor}
                        fontSize="sm"
                        fontWeight="700"
                        align="center"
                      >
                        {cell?.value ?? "---"}
                      </Text>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      maxH="30px !important"
                      py="8px"
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
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

      <Flex
        mt="4"
        justify="space-between"
        align="center"
        style={{ marginInline: "1rem" }}
      >
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
          <Text mr="2">
            Page {pageIndex + 1} of {pageOptions.length}
          </Text>
          <Button
            onClick={() => gotoPage(0)}
            isDisabled={!canPreviousPage}
            mx="1"
          >
            {"<<"}
          </Button>
          <Button onClick={previousPage} isDisabled={!canPreviousPage} mx="1">
            {"<"}
          </Button>
          <Button onClick={nextPage} isDisabled={!canNextPage} mx="1">
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

      <ServiceRequestDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        details={selectedDetails}
      />
      <PrServiceRequestDetailsModal
        isOpen={isPrDetailsModalOpen}
        onClose={() => setIsPrDetailsModalOpen(false)}
        details={selectedPrDetails}
      />
    </Card>
  );
}
