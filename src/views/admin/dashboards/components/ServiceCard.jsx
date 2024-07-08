import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import Card from "components/card/Card";
import React, { useEffect, useState } from "react";
import ProfilePic from "../assets/62b32a768fc657321f1193070e9c28b5.png";
import { ServiceCards } from "../data/DashboardData";
import { MdKeyboardArrowRight } from "react-icons/md";
const ServiceCard = () => {
  const [cardData, setCardData] = useState([]);
  useEffect(() => {
    setCardData(ServiceCards);
  });
  return (
    <div>
      <Box backgroundColor="#FFFFFF" w="100%" h="100%" borderRadius="10px">
        <Flex justifyContent="space-evenly">
          <Flex
            flexDirection="column"
            p="1rem"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontWeight="bold" fontSize="25px" color="#6E9BFE">
              Popular
            </Text>
            <Text fontWeight="bold" fontSize="25px">
              Service
            </Text>
            <Text fontWeight="bold" fontSize="10px" textAlign="center">
              Explore the best services,<br></br> most useful to users.
            </Text>
          </Flex>
          <Flex
            flexDirection="row"
            p="1rem"
            width="100%"
            height="100%"
            gap="15px"
          >
            {cardData.map((item, index) => (
              <Card
                key={index}
                style={{
                  boxShadow: "#E5A8CC",
                  marginTop: "1rem",
                  marginBottom: "2rem",
                  boxShadow: "2px 4px 14px 0px #6E9BFE"
                }}
              >
                <div>
                  <Flex
                    backgroundColor={item?.backgroundColor}
                    justifyContent="center"
                    alignItems="center"
                    position="absolute"
                    top="-30px"
                    right="40px"
                    margin="0 auto"
                    height="50px"
                    width="50px"
                    borderRadius="50%"
                  >
                    <img
                      style={{ height: "20px", width: "20px" }}
                      src={item?.img}
                      alt="Profile Pic"
                    ></img>
                  </Flex>
                </div>

                <Text
                  color={item?.color}
                  fontWeight="bold"
                  fontSize="0.9rem"
                  textAlign="center"
                >
                  {item?.name}
                </Text>
                <Text
                  color="#1B2559"
                  fontWeight="500"
                  fontSize="10px"
                  textAlign="center"
                >
                  {item?.message}
                </Text>
              </Card>
            ))}
            <Card
              style={{
                boxShadow: "#E5A8CC",
                marginTop: "1rem",
                marginBottom: "2rem",
                backgroundColor: "#DAEAFD",
                boxShadow: "2px 4px 14px 0px #6E9BFE"
              }}
            >
              <Text
                color="#407BFF"
                fontWeight="bold"
                fontSize="1.25rem"
               
              >
                All Services
              </Text>
              <Button
                style={{
                  backgroundColor: "#fff",
                  height: "25px",
                  width: "25px",
                  borderRadius: "80%",
                }}
              > <Text fontSize="30px" color="#407BFF"><MdKeyboardArrowRight /></Text></Button>
            </Card>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
};

export default ServiceCard;
