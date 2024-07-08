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
import React, { useMemo } from "react";
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

export default function ComplexTable(props) {
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

  const handleDelete = async (data) => {
    try {
      const userDocRef = doc(primaryDB, "users", data?.original.id);
      const response = await deleteDoc(userDocRef);
      if (response) {
        toast({
          description: "Deleted Successfully",
          status: "success",
          position: 'top',
          duration: 1000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  }

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
           Users
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
                  if (cell.column.Header === "NAME") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700' align="center">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "EMAIL") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700' align="center">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "PHONE") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700' align="center">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "ROLE") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700' align="center">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "ACTION") {
                    data = (
                      <Flex align='center' justify="center">
                        <Button size="sm" colorScheme="red" onClick={() => handleDelete(row)}>
                          Delete
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
