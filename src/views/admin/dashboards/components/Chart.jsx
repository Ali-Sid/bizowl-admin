import { Box, Flex, Icon, TableContainer, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { SimpleGrid } from "@chakra-ui/react";
import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import {
  ColumnChartData,
  ColumnChartOptionsData,
  ColumnData,
  LineChartData,
  LineChartOptionsData,
  PieChartData,
  PieChartOptionsData,
  RowData,
} from "../data/DashboardData";
import { ChartTable } from "./Table";
import LineChart from "components/chartsFunctionalComponent/LineChart";
import ColumnChart from "components/chartsFunctionalComponent/BarChart";
import PieChart from "components/chartsFunctionalComponent/PieChart";
export const Chart = () => {
  const [columnData, setColumnData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [lineChartOptionsData, setLineChartOptionsData] = useState([]);
  const [columnChartData, setColumnChartData] = useState([]);
  const [columnChartOptionsData, setColumnChartOptionsData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [pieChartOptionsData, setPieChartOptionsData] = useState([]);

  useEffect(() => {
    setColumnData(ColumnData);
    setRowData(RowData);
    setLineChartData(LineChartData);
    setLineChartOptionsData(LineChartOptionsData);
    setColumnChartData(ColumnChartData);
    setColumnChartOptionsData(ColumnChartOptionsData);
    setPieChartData(PieChartData);
    setPieChartOptionsData(PieChartOptionsData);
  });
  return (
    <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
      <Flex
        p="0.8rem"
        mb="2rem"
        flexDirection="column"
        borderRadius="1rem"
        backgroundColor="#fff"
        boxShadow="0.375rem 0.75rem 1.375rem 0px rgba(69, 90, 100, 0.35)"
        cursor="pointer"
        height="400px" // Example fixed height
        // overflow="auto"
      >
        <Flex justifyContent="space-between">
          <Text fontSize="12px">17 Jan 2024</Text>
          <Icon as={BsThreeDotsVertical} />
        </Flex>
        <LineChart
          chartData={lineChartData}
          chartOptions={lineChartOptionsData}
        />
      </Flex>
      <Flex
        p="0.8rem"
        mb="2rem"
        flexDirection="column"
        borderRadius="2rem"
        backgroundColor="#fff"
        boxShadow="0.375rem 0.75rem 1.375rem 0px rgba(69, 90, 100, 0.35)"
        cursor="pointer"
        height="400px"
      >
        <Flex justifyContent="space-between">
          <Text fontSize="12px">17 Jan 2024</Text>
          <Icon as={BsThreeDotsVertical} />
        </Flex>
        <ColumnChart
          chartData={columnChartData}
          chartOptions={columnChartOptionsData}
        />
      </Flex>
      <Box
        p="0.8rem"
        mb="2rem"
        borderRadius="1rem"
        backgroundColor="#fff"
        boxShadow="0.375rem 0.75rem 1.375rem 0px rgba(69, 90, 100, 0.35)"
        cursor="pointer"
      >
        <TableContainer>
          <ChartTable columnData={ColumnData} rowData={RowData} />
        </TableContainer>
      </Box>
      <Flex
        p="0.8rem"
        mb="2rem"
        borderRadius="2rem"
        flexDirection="column"
        backgroundColor="#fff"
        boxShadow="0.375rem 0.75rem 1.375rem 0px rgba(69, 90, 100, 0.35)"
        cursor="pointer"
      >
        <Flex justifyContent="space-between">
          <Text fontSize="12px">17 Jan 2024</Text>
          <Icon as={BsThreeDotsVertical} />
        </Flex>
        <PieChart chartData={pieChartData} chartOptions={pieChartOptionsData} />
      </Flex>
    </SimpleGrid>
  );
};
