import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";
import logo from "assets/img/logo/logo.png";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      {/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} />
      <HSeparator mb='20px' /> */}
      <div style={{height: "60px"}}>
        <img src={logo} alt="logo" style={{ width: "150px", height: "auto" }} className="mb-4" />
      </div>
    </Flex>
  );
}

export default SidebarBrand;
