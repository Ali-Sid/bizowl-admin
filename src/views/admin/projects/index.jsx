import {
  Box,
  Button,
  Flex,
  Icon,
  Img,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaSackDollar } from "react-icons/fa6";
import { Cards, OngoingProjects } from "./data/ProjectData";
import CustomCard from "./components/CustomCard";
import { VSeparator } from "components/separator/Separator";
import ProjectCard from "./components/ProjectCard";
import { CiCirclePlus } from "react-icons/ci";
import {
  BsChevronBarLeft,
  BsChevronBarRight,
  BsThreeDotsVertical,
} from "react-icons/bs";
import LineChart from "components/chartsFunctionalComponent/LineChart";
import { LineChartData, LineChartOptionsData } from "./data/ProjectData";
import ComplexTable from "../marketplace/components/ComplexTable";
import PaymentStatusBox from "components/paymentTable/paymentStatusBox";

const Projects = () => {
  const [cards, setCards] = useState([]);
  const [ongoingProjectsData, setOngoingProjectsData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [lineChartOptionsData, setLineChartOptionsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(ongoingProjectsData.length / itemsPerPage);

  useEffect(() => {
    setCards(Cards);
    setOngoingProjectsData(OngoingProjects);
    setLineChartData(LineChartData);
    setLineChartOptionsData(LineChartOptionsData);
  }, []);

  const handlePrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayData = ongoingProjectsData.slice(startIndex, endIndex);

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
      accessor: "srNo",
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
    {
      Header: "STATUS",
      accessor: (rowData) => rowData.status || "Pending", // Custom accessor function
    },
    {
      Header: "CREATED-AT",
      accessor: (rowData) => {
        const timestamp = rowData.createdAt;
        if (timestamp) {
          const date = new Date(timestamp.seconds * 1000);
          return date.toLocaleString();
        }

        return getCurrentDateWithoutSeconds();
      },
    },
    {
      Header: "ACTION",
      accessor: "action",
    },
  ];

  return (
    <div>
      <Text fontWeight="bold">Overview</Text>
      <Flex mt="2rem" flexWrap="wrap" justifyContent="space-between">
        {cards.map((item, index) => {
          return <CustomCard key={index} card={item} />;
        })}
      </Flex>
      <Flex
        mt="1rem"
        flexDirection="column"
        backgroundColor="#FFFFFF"
        minHeight="15rem"
        borderRadius="2rem"
        boxShadow="0px 4px 38px 0px #407BFF26"
      >
        <Flex p="0.7rem" justifyContent="space-between" alignItems="center">
          <Flex fontSize="xs" mt="1rem" ml="1rem">
            <Text mr="1rem">Enquiries</Text>
            <VSeparator height="1.5rem" />
            <Text ml="1rem">Current Week</Text>
            <Text ml="1rem">Previous Week</Text>
          </Flex>
          <Flex>
            <Icon as={BsThreeDotsVertical} />
          </Flex>
        </Flex>
        <LineChart
          chartData={lineChartData}
          chartOptions={lineChartOptionsData}
        />
      </Flex>
      <Flex
        mt="2rem"
        backgroundColor="#FFFFFF"
        minHeight="15rem"
        borderRadius="2rem"
        boxShadow="0px 4px 38px 0px #407BFF26"
      >
        <Tabs>
          <Flex mt="1rem" alignItems="center">
            <TabList variant="unstyle">
              <Tab>Ongoing Projects</Tab>
              <Tab>Completed Projects</Tab>
            </TabList>
            <Button
              ml="22rem"
              alignItems="center"
              backgroundColor="#407BFF"
              color="#FFFFFF"
              cursor="pointer"
              borderRadius="2rem"
            >
              <Icon as={CiCirclePlus} w="2rem" h="2rem" />
              <Text ml="1rem">Add Project</Text>
            </Button>
            <Icon as={BsThreeDotsVertical} ml="1rem" />
          </Flex>
          <TabPanels>
            <TabPanel>
              <Flex mt="2rem" flexWrap="wrap" justifyContent="space-between">
                {displayData.map((item, index) => (
                  <ProjectCard key={index} props={item} />
                ))}
              </Flex>
              <Flex justifyContent="center" alignItems="center">
                <Icon
                  as={BsChevronBarLeft}
                  onClick={handlePrev}
                  backgroundColor="#3965FF"
                  borderRadius="2rem"
                  color="#FFFFFF"
                  padding="5px"
                  width="2rem"
                  height="2rem"
                />
                <Text m="0 1rem">
                  Page {currentPage} of {totalPages}
                </Text>
                <Icon
                  as={BsChevronBarRight}
                  onClick={handleNext}
                  backgroundColor="#3965FF"
                  borderRadius="2rem"
                  color="#FFFFFF"
                  padding="5px"
                  width="2rem"
                  height="2rem"
                />
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex mt="2rem" flexWrap="wrap" justifyContent="space-between">
                {displayData.map((item, index) => (
                  <ProjectCard key={index} props={item} />
                ))}
              </Flex>
              <Flex justifyContent="center" alignItems="center">
                <Icon
                  as={BsChevronBarLeft}
                  onClick={handlePrev}
                  backgroundColor="#3965FF"
                  borderRadius="2rem"
                  color="#FFFFFF"
                  padding="5px"
                  width="2rem"
                  height="2rem"
                />
                <Text m="0 1rem">
                  Page {currentPage} of {totalPages}
                </Text>
                <Icon
                  as={BsChevronBarRight}
                  onClick={handleNext}
                  backgroundColor="#3965FF"
                  borderRadius="2rem"
                  color="#FFFFFF"
                  padding="5px"
                  width="2rem"
                  height="2rem"
                />
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
      <Flex
        mt="2rem"
        backgroundColor="#FFFFFF"
        minHeight="15rem"
        borderRadius="2rem"
        boxShadow="0px 4px 38px 0px #407BFF26"
      >
        <PaymentStatusBox />
      </Flex>
    </div>
  );
};

export default Projects;
