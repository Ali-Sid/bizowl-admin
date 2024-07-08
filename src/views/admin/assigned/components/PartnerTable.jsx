import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";
import { getDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { Experience, Options, Portfolio } from "../data/AssignedData";
import { collection, addDoc, doc } from "firebase/firestore";
import { partnerDB } from "config/firebase"; // Adjust the path according to your project structure

const PartnerTable = ({ columnData, tableData }) => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortOptions, setSortOptions] = useState([]);
  const [sortExperience, setSortExperience] = useState([]);
  const [sortPortfolio, setSortPortfolio] = useState([]);
  const [selectedValue, setSelectedValue] = useState("default");
  const [selectedExperience, setSelectedExperience] = useState("0-3");
  const [selectedPortfolio, setSelectedPortfolio] = useState("yes");
  const pageCount = Math.ceil(tableData.length / pageSize);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return tableData.slice(startIndex, endIndex);
  }, [tableData, currentPage, pageSize]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, pageCount));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  
  const handlePageSizeChange = (e) => {
    const newSize = Number(e.target.value);
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const handleCheckBoxChange = (rowId) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(rowId)) {
        return prevSelected.filter((id) => id !== rowId);
      } else {
        return [...prevSelected, rowId];
      }
    });
  };

  useEffect(() => {
    setSortOptions(Options);
    setSortExperience(Experience);
    setSortPortfolio(Portfolio);
  }, []);

  const handleSelect = (value) => {
    setSelectedValue(value);
    setSelectedExperience(value);
  };

  const handleAssign = async () => {
    const assignedLeadCollectionRef = collection(partnerDB, "assignedLead");
  
    for (let rowId of selectedRows) {

      // Calculate the actual index in the original tableData array
    const dataIndex = (currentPage - 1) * pageSize + rowId;
    
    // Get the data for the selected row
    const selectedRowData = tableData[dataIndex];

      const xdata = tableData[rowId];
      const assignedLeadData = {
        partnerId: xdata.uid,
        partnerName: xdata.firstName,
        partnerService: xdata.service,
        customerId: selectedRowData.id,
        customerFirstName: selectedRowData.firstName,
        customerLastName: selectedRowData.lastName,
        customerBudget: selectedRowData.budget,
        customerCompany: selectedRowData.companyName,
        customerProjectType: selectedRowData.projectType,
        customerRequirements: selectedRowData.requirements,
        customerServices: selectedRowData.services,
        customerStart: selectedRowData.startDate,
        customerTimeline: selectedRowData.timeline,
        customerUID: selectedRowData.uid

      };
      // // Assuming rowId contains the data of the partner to be assigned
      // const assignedLeadData = {
      //   // Populate this object with the data of the partner and any additional information needed
      //   partnerName: rowId.name, 
      //   partnerService: rowId.service, 
      // };
      console.log(assignedLeadData);
      try {
        // Add the document to the assignedLeads collection with a server-generated ID
        const docRef = await addDoc(assignedLeadCollectionRef, assignedLeadData);
        console.log(`Document added successfully with ID: ${docRef.id}`);
        
      } catch (error) {
        console.error("Failed to add document to assignedLeads:", error);
      }
    }
  
    // Optionally, clear selected rows after processing
    setSelectedRows([]);
  };
  
  

  return (
    <>
      <div>
        <TableContainer whiteSpace="normal">
          <Flex justifyContent="space-between">
            <Flex
              alignItems="center"
              fontWeight="bold"
              fontSize="1.1rem"
              gap={5}
            >
              <Text>Partners</Text>
              <select value={pageSize} onChange={handlePageSizeChange}>
                {[5, 10, 20, 50, 100].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </Flex>
            <Flex>
              <Button
                backgroundColor="#407BFF"
                color="#fff"
                onClick={handleAssign}
              >
                Assign
              </Button>
            </Flex>
          </Flex>
          <Flex justifyContent="space-between" gap={2} mt={4}>
            <Menu>
              <>
                <MenuButton
                  as={Box}
                  backgroundColor="#D7E9FD"
                  padding={2}
                  height="2.4rem"
                  borderRadius="30px"
                  boxShadow="0px 0.25rem 0.25rem 0px #817c7c"
                  width="100%"
                  cursor="pointer"
                >
                  <Flex justifyContent="space-evenly" alignItems="center">
                    <Text fontSize="15px">Sort By</Text>
                    <ChevronDownIcon
                      marginLeft="0.2rem"
                      fontSize="1.25rem"
                      borderRadius="1rem"
                      backgroundColor="#D9D9D9"
                      cursor="pointer"
                      boxShadow="0px 0.25rem 0.25rem 0px #407BFF"
                    />
                  </Flex>
                </MenuButton>
                <MenuList padding={3}>
                  <RadioGroup value={selectedValue} onChange={handleSelect}>
                    <Stack direction="column">
                      {sortOptions.map(({ label, value }) => (
                        <Radio
                          key={value}
                          value={value}
                          isChecked={selectedValue === value}
                          isOpen={true}
                        >
                          {label}
                        </Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                </MenuList>
              </>
            </Menu>

            <Box
              backgroundColor="#D7E9FD"
              padding={2}
              height="2.4rem"
              borderRadius="30px"
              boxShadow="0px 0.25rem 0.25rem 0px #817c7c"
              width="100%"
            >
              <Flex justifyContent="space-evenly" alignItems="center">
                <Text fontSize="15px">City</Text>
                <ChevronDownIcon
                  marginLeft="0.2rem"
                  fontSize="1.25rem"
                  borderRadius="1rem"
                  backgroundColor="#D9D9D9"
                  cursor="pointer"
                  boxShadow="0px 0.25rem 0.25rem 0px #407BFF"
                />
              </Flex>
            </Box>
            <Box
              backgroundColor="#D7E9FD"
              padding={2}
              height="2.4rem"
              borderRadius="30px"
              boxShadow="0px 0.25rem 0.25rem 0px #817c7c"
              width="100%"
            >
              <Flex justifyContent="space-evenly" alignItems="center">
                <Text fontSize="15px">Services</Text>
                <ChevronDownIcon
                  marginLeft="0.2rem"
                  fontSize="1.25rem"
                  borderRadius="1rem"
                  backgroundColor="#D9D9D9"
                  cursor="pointer"
                  boxShadow="0px 0.25rem 0.25rem 0px #407BFF"
                />
              </Flex>
            </Box>
            <Menu>
              <>
                <MenuButton
                  as={Box}
                  backgroundColor="#D7E9FD"
                  padding={2}
                  height="2.4rem"
                  borderRadius="30px"
                  boxShadow="0px 0.25rem 0.25rem 0px #817c7c"
                  width="100%"
                  cursor="pointer"
                >
                  <Flex justifyContent="space-evenly" alignItems="center">
                    <Text fontSize="15px">Budget</Text>
                    <ChevronDownIcon
                      marginLeft="0.2rem"
                      fontSize="1.25rem"
                      borderRadius="1rem"
                      backgroundColor="#D9D9D9"
                      cursor="pointer"
                      boxShadow="0px 0.25rem 0.25rem 0px #407BFF"
                    />
                  </Flex>
                </MenuButton>
                <MenuList padding={3}>
                  <Flex gap={5}>
                    <Button
                      backgroundColor="#F7FCFB"
                      border="1px solid #455A64"
                      fontSize="12px"
                      height={8}
                      width="5rem"
                      justifyContent="start"
                    >
                      ₹ 0
                    </Button>
                    <Button
                      backgroundColor="#F7FCFB"
                      border="1px solid #455A64"
                      fontSize="12px"
                      height={8}
                      width="8rem"
                      justifyContent="start"
                    >
                      ₹ 99,99,99,999
                    </Button>
                  </Flex>
                  <Slider aria-label="slider-ex-1" defaultValue={30} mt={5}>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </MenuList>
              </>
            </Menu>
            <Menu>
              <>
                <MenuButton
                  as={Box}
                  backgroundColor="#D7E9FD"
                  padding={2}
                  height="2.4rem"
                  borderRadius="30px"
                  boxShadow="0px 0.25rem 0.25rem 0px #817c7c"
                  width="100%"
                  cursor="pointer"
                >
                  <Flex justifyContent="space-evenly" alignItems="center">
                    <Text fontSize="15px">Experience</Text>
                    <ChevronDownIcon
                      marginLeft="0.2rem"
                      fontSize="1.25rem"
                      borderRadius="1rem"
                      backgroundColor="#D9D9D9"
                      cursor="pointer"
                      boxShadow="0px 0.25rem 0.25rem 0px #407BFF"
                    />
                  </Flex>
                </MenuButton>
                <MenuList padding={3}>
                  <RadioGroup>
                    <Stack
                      direction="column"
                      value={selectedExperience}
                      onChange={handleSelect}
                    >
                      {sortExperience.map(({ label, value }) => (
                        <Radio
                          key={value}
                          value={value}
                          isChecked={selectedExperience === value}
                          isOpen={true}
                        >
                          {label}
                        </Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                </MenuList>
              </>
            </Menu>
            <Menu>
              <>
                <MenuButton
                  as={Box}
                  backgroundColor="#D7E9FD"
                  padding={2}
                  height="2.4rem"
                  borderRadius="30px"
                  boxShadow="0px 0.25rem 0.25rem 0px #817c7c"
                  width="100%"
                  cursor="pointer"
                >
                  <Flex justifyContent="space-evenly" alignItems="center">
                    <Text fontSize="15px">Portfolio</Text>
                    <ChevronDownIcon
                      marginLeft="0.2rem"
                      fontSize="1.25rem"
                      borderRadius="1rem"
                      backgroundColor="#D9D9D9"
                      cursor="pointer"
                      boxShadow="0px 0.25rem 0.25rem 0px #407BFF"
                    />
                  </Flex>
                </MenuButton>
                <MenuList padding={3}>
                  <RadioGroup>
                    <Stack
                      direction="column"
                      value={selectedPortfolio}
                      onChange={handleSelect}
                    >
                      {sortPortfolio.map(({ label, value }) => (
                        <Radio
                          key={value}
                          value={value}
                          isChecked={selectedPortfolio === value}
                          isOpen={true}
                        >
                          {label}
                        </Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                </MenuList>
              </>
            </Menu>
          </Flex>
          <Table
            variant="simple"
            overflow="hidden"
            style={{ borderCollapse: "separate", borderSpacing: "0 1rem" }}
          >
            <Thead height="4rem">
              <Tr backgroundColor="#D0E3F3">
                <Th>
                  <Checkbox
                    border="0.1px #263238"
                    isChecked={selectedRows.length === tableData.length}
                    onChange={() => {
                      if (selectedRows.length === paginatedData.length) {
                        setSelectedRows([]);
                      } else {
                        setSelectedRows(
                          Array.from(
                            { length: tableData.length },
                            (_, index) => index
                          )
                        );
                      }
                    }}
                  />
                </Th>
                {columnData?.map((item, index) => (
                  <Th key={index}>{item?.Header}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {paginatedData.map((item, index) => {
                const rowId = (currentPage - 1) * pageSize + index;
                return (
                  <Tr
                    key={rowId}
                    backgroundColor="#EBF2FA"
                    boxShadow="0rem 0.25rem 0.25rem 0rem #00000040"
                  >
                    <Td>
                      <Checkbox
                        border="0.1px #263238"
                        isChecked={selectedRows.includes(rowId)}
                        onChange={() => handleCheckBoxChange(rowId)}
                      />
                    </Td>
                    <Td>
                      <Text fontWeight="bold">
                        {item?.firstName} {item?.lastName}
                      </Text>
                    </Td>
                    <Td>
                      <Text fontWeight="bold">{item?.name}</Text>
                    </Td>
                    <Td fontWeight="bold">{item?.service}</Td>
                    <Td fontWeight="bold">{item?.industry}</Td>
                    <Td fontWeight="bold">{item?.city}</Td>
                    <Td fontWeight="bold">{item?.status}</Td>
                    <Td fontWeight="bold">{item?.delivery}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex justifyContent="space-between" alignItems="center" m="1rem 2rem">
          <Button
            onClick={handlePreviousPage}
            backgroundColor="#9BC5EF"
            border="1px solid #000000"
            borderRadius="5px"
          >
            Back
          </Button>
          <Text>
            Page {currentPage} of {pageCount}
          </Text>
          <Button
            onClick={handleNextPage}
            backgroundColor="#9BC5EF"
            border="1px solid #000000"
            borderRadius="5px"
          >
            Next
          </Button>
        </Flex>
      </div>

      {/* Action Modal Opening */}
    </>
  );
};

export default PartnerTable;
