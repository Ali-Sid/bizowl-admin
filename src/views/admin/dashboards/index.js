import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Img, Text, useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CustomCard from "../dashboards/components/CustomCard";
import EnquiryTable from "./components/EnquiryTable";
import ProjectCard from "./components/ProjectCard";
import {
  Cards,
  ColumnData,
  EnquiryColumn,
  EnquiryRow,
  OngoingProjects,
  RowData,
} from "./data/DashboardData";

import CardTimeline from "../dashboards/assets/img/system-uicons_card-timeline.png";
import { Chart } from "./components/Chart";

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [ongoingProjects, setOngoingProjects] = useState([]);
  const [columnData, setColumnData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [enquiryColumnData, setEnquiryColumnData] = useState([]);
  const [enquiryRowData, setEnquiryRowData] = useState([]);
  const [theme, setTheme] = useState("light");
  const { colorMode, toggleColorMode } = useColorMode();
  let bgButton = "linear-gradient(135deg, #868CFF 0%, #4318FF 100%)";

  // const itemsPerPage=6;
  // const [currentPage,setCurrentPage] = useState(1);

  useEffect(() => {
    setCards(Cards);
    setOngoingProjects(OngoingProjects);
    setColumnData(ColumnData);
    setRowData(RowData);
    setEnquiryColumnData(EnquiryColumn);
    setEnquiryRowData(EnquiryRow);
  });
  //   const totalPages = Math.ceil(ongoingProjects.length/itemsPerPage);
  //   const handleNext =()=>{
  //     setCurrentPage((prevPage)=>Math.min(prevPage+1,totalPages))
  //   }
  //   const handlePrev =()=>{
  //     setCurrentPage((prevPage)=>Math.max(prevPage-1,1))
  //   }
  //  const startIndex = (currentPage-1)*itemsPerPage;
  //  const endIndex = startIndex+itemsPerPage;
  //  const displayedProjects  = ongoingProjects.slice(startIndex,endIndex)

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div>
      <Flex maxW="100%" justifyContent="space-between">
        <Text fontWeight="bold" fontSize="25px">
          Hi,{" "}
          <span style={{ fontWeight: "bold", fontSize: "25px" }}>Admin </span>,{" "}
          <span
            style={{ fontWeight: "bold", fontSize: "25px", color: "#407BFF" }}
          >
            Welcome Back
          </span>
        </Text>


        {/* ----------------ignore this------------------- */}
        {/* <Button onClick={toggleTheme}>Switch Theme</Button> */}
        {/* <Button
          h="60px"
          w="60px"
          zIndex="99"
          bg={bgButton}
          position="fixed"
          variant="no-effects"
          left={document.documentElement.dir === "rtl" ? "35px" : ""}
          right={document.documentElement.dir === "rtl" ? "" : "35px"}
          bottom="30px"
          border="1px solid"
          borderColor="#6A53FF"
          borderRadius="50px"
          onClick={toggleColorMode}
          display="flex"
          p="0px"
          align="center"
          justify="center"
        >
          Switch Color
        </Button> */}
        {/* ignore the above component */}

        
        <Flex
          w="20%"
          borderRadius="0.7rem"
          justifyContent="center"
          alignItems="center"
          backgroundColor="#fff"
          boxShadow="0px 1px 3px 1px #ccc"
        >
          <Img
            src={CardTimeline}
            alt="CardTimeline"
            style={{ width: "20px", height: "20px", marginRight: "0.6rem" }}
          />
          <Text
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span>Filter Period</span>
            <span style={{ fontSize: "10px" }}>17 Jan 2023 To 08 Feb 2024</span>
          </Text>
          <ChevronDownIcon
            marginLeft="0.2rem"
            fontSize="1rem"
            borderRadius="1rem"
            backgroundColor="#D9D9D9"
            boxShadow="0px 0.25rem 0.25rem 0px #407BFF"
          />
        </Flex>
      </Flex>
      <Flex padding="1rem" flexWrap="wrap" justifyContent="space-between">
        {cards.map((item, index) => (
          <CustomCard key={index} card={item} />
        ))}
      </Flex>
      <Flex>
        <Chart />
      </Flex>
      <Flex mt="3rem" justifyContent="space-between">
        <Box
          backgroundColor="#FFFFFF"
          width="100%"
          height="100%"
          borderRadius="0.6rem"
        >
          <Flex justifyContent="space-between" padding="0.5rem">
            <Text fontSize="20px" fontWeight="bold" color="#455A64">
              Projects
            </Text>
            <Flex
              w="20%"
              borderRadius="0.7rem"
              justifyContent="center"
              alignItems="center"
              backgroundColor="#fff"
              boxShadow="0px 1px 3px 1px #ccc"
            >
              <Img
                src={CardTimeline}
                alt="CardTimeline"
                style={{ width: "20px", height: "20px", marginRight: "0.6rem" }}
              />
              <Text
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span>Filter Period</span>
                <span style={{ fontSize: "10px" }}>
                  17 Jan 2023 To 08 Feb 2024
                </span>
              </Text>
              <ChevronDownIcon
                marginLeft="0.2rem"
                fontSize="1rem"
                borderRadius="1rem"
                backgroundColor="#D9D9D9"
                boxShadow="0px 0.25rem 0.25rem 0px #407BFF"
              />
            </Flex>
          </Flex>
          <Flex padding="1rem" flexWrap="wrap" justifyContent="space-between">
            {ongoingProjects.map((item, index) => (
              <ProjectCard key={index} props={item} />
            ))}
          </Flex>

          <Flex justifyContent="center" alignItems="center" marginBottom="1rem">
            <Button
              backgroundColor="#D7E9FD"
              borderRadius="10px"
              boxShadow="3px 5px 5px 0px #ccc"
            >
              View All
            </Button>
          </Flex>
        </Box>
      </Flex>
      <Box marginTop="1rem">
        <EnquiryTable columnData={enquiryColumnData} rowData={enquiryRowData} />
      </Box>
    </div>
  );
};

export default Dashboard;
