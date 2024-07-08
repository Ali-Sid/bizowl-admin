import React from "react";
import logo from "assets/img/layout/logo.png"

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
// import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  // let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      {/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
      <img src={logo} alt="" height="26px" width="175px" style={{margin: "32px 0"}} />
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
