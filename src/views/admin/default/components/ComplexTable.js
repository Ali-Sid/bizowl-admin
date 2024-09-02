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
} from "@chakra-ui/react";
import React, { useEffect, useMemo } from "react";
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

export default function ColumnsTable(props) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const customSort = (rows, id, desc) => {
    if (id === "CREATED-AT") {
      return rows.sort((a, b) => {
        const dateA = new Date(a.values[id]);
        const dateB = new Date(b.values[id]);
        if (desc) {
          return dateB - dateA;
        } else {
          return dateA - dateB;
        }
      });
    }
    // Fall back to default sorting behavior
    return rows;
  };

  const tableInstance = useTable(
    {
      columns,
      data,
      manualSortBy: true,
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
    state: { pageIndex, pageSize, globalFilter, sortBy },
    sort,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = tableInstance;

  useEffect(() => {
    if (sortBy.length > 0) {
      const sortedRows = customSort(data, sortBy[0].id, sortBy[0].desc);
      sort(sortedRows);
    }
  }, [sortBy, data, sort]);

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

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
          Projects
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

      {/* Global Search Input */}

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
                >
                  <Flex
                    justify="space-between"
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
                  if (cell.column.Header === "NAME") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "STATUS") {
                    data = (
                      <Flex align="center">
                        <Icon
                          w="24px"
                          h="24px"
                          me="5px"
                          color={
                            cell.value === "Approved"
                              ? "green.500"
                              : cell.value === "Disable"
                              ? "red.500"
                              : cell.value === "Error"
                              ? "orange.500"
                              : null
                          }
                          as={
                            cell.value === "Approved"
                              ? MdCheckCircle
                              : cell.value === "Disable"
                              ? MdCancel
                              : cell.value === "Error"
                              ? MdOutlineError
                              : null
                          }
                        />
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "DATE") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "PROGRESS") {
                    data = (
                      <Flex align="center">
                        <Progress
                          variant="table"
                          colorScheme="brandScheme"
                          h="8px"
                          w="108px"
                          value={cell.value}
                        />
                      </Flex>
                    );
                  } else if (cell.column.Header === "ACTION") {
                    data = (
                      <Button size="sm" colorScheme="blue">
                        View
                      </Button>
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

      {/* Pagination */}
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
    </Card>
  );
}
