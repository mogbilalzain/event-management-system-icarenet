import React, { useContext } from "react";

// chakra imports
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  Icon,
  useColorModeValue,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import Content from "components/sidebar/components/Content";
import {
  renderThumb,
  renderTrack,
  renderView,
} from "components/scrollbar/Scrollbar";
import { Scrollbars } from "react-custom-scrollbars-2";
import PropTypes from "prop-types";
import { useLanguage } from "contexts/LanguageContext";
import { SidebarContext } from "contexts/SidebarContext";

// Assets
import { IoMenuOutline } from "react-icons/io5";
import { HiMenuAlt3, HiX } from "react-icons/hi";

function Sidebar(props) {
  const { routes } = props;
  const { isRTL } = useLanguage();
  const { toggleSidebar, setToggleSidebar } = useContext(SidebarContext);

  let variantChange = "0.3s cubic-bezier(0.4, 0, 0.2, 1)";
  let shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  // Chakra Color Mode
  let sidebarBg = useColorModeValue("white", "navy.800");
  let sidebarMargins = "0px";
  let toggleButtonBg = useColorModeValue("white", "navy.700");
  let toggleButtonColor = useColorModeValue("gray.700", "white");
  let toggleButtonShadow = useColorModeValue(
    "0px 4px 12px rgba(0, 0, 0, 0.15)",
    "0px 4px 12px rgba(0, 0, 0, 0.3)"
  );
  let toggleButtonHoverShadow = useColorModeValue(
    "0px 6px 20px rgba(0, 0, 0, 0.2)",
    "0px 6px 20px rgba(0, 0, 0, 0.4)"
  );
  let toggleButtonHoverBg = useColorModeValue("gray.50", "navy.600");

  // SIDEBAR
  return (
    <>
      {/* Toggle Button */}
      <Box
        display={{ sm: "none", xl: "block" }}
        position="fixed"
        top="20px"
        zIndex="1000"
        {...(isRTL 
          ? { right: toggleSidebar ? "10px" : "20px" }
          : { left: toggleSidebar ? "10px" : "20px" }
          // ? { right: toggleSidebar ? "320px" : "20px" }
          // : { left: toggleSidebar ? "320px" : "20px" }
        )}
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      >
        <Tooltip 
          label={toggleSidebar ? (isRTL ? "إغلاق القائمة" : "Close Menu") : (isRTL ? "فتح القائمة" : "Open Menu")}
          placement={isRTL ? "left" : "right"}
          hasArrow
        >
          <IconButton
            aria-label="Toggle Sidebar"
            icon={toggleSidebar ? <HiX size="24px" /> : <HiMenuAlt3 size="24px" />}
            onClick={() => setToggleSidebar(!toggleSidebar)}
            bg={toggleButtonBg}
            color={toggleButtonColor}
            size="lg"
            borderRadius="full"
            boxShadow={toggleButtonShadow}
            backdropFilter="blur(10px)"
            _hover={{
              transform: "scale(1.1) rotate(90deg)",
              boxShadow: toggleButtonHoverShadow,
              bg: toggleButtonHoverBg,
            }}
            _active={{
              transform: "scale(0.95)",
            }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            w="56px"
            h="56px"
            className="sidebar-toggle-button"
          />
        </Tooltip>
      </Box>

      {/* Sidebar */}
      <Box 
        display={{ sm: "none", xl: "block" }} 
        w="100%" 
        position='fixed' 
        minH='100%'
        {...(isRTL ? { right: "0px", left: "auto" } : { left: "0px", right: "auto" })}
      >
        <Box
          bg={sidebarBg}
          transition={variantChange}
          w={toggleSidebar ? '300px' : '0px'}
          h='100vh'
          m={sidebarMargins}
          minH='100%'
          overflowX='hidden'
          overflowY={toggleSidebar ? 'auto' : 'hidden'}
          boxShadow={shadow}
          borderRadius={isRTL ? "50px 0px 0px 50px" : "0px 50px 50px 0px"}
          opacity={toggleSidebar ? 1 : 0}
          visibility={toggleSidebar ? "visible" : "hidden"}
          transform={toggleSidebar 
            ? "translateX(0)" 
            : isRTL 
              ? "translateX(100%)" 
              : "translateX(-100%)"
          }
          className={toggleSidebar ? "sidebar-slide-in" : ""}
        >
          {toggleSidebar && (
            <Scrollbars
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}>
              <Content routes={routes} />
            </Scrollbars>
          )}
        </Box>
      </Box>
    </>
  );
}

// FUNCTIONS
export function SidebarResponsive(props) {
  let sidebarBackgroundColor = useColorModeValue("white", "navy.800");
  let menuColor = useColorModeValue("gray.400", "white");
  const { isRTL } = useLanguage();
  // // SIDEBAR
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const { routes } = props;
  // let isWindows = navigator.platform.startsWith("Win");
  //  BRAND

  return (
    <Flex display={{ sm: "flex", xl: "none" }} alignItems='center'>
      <Flex ref={btnRef} w='max-content' h='max-content' onClick={onOpen}>
        <Icon
          as={IoMenuOutline}
          color={menuColor}
          my='auto'
          w='20px'
          h='20px'
          me='10px'
          _hover={{ cursor: "pointer" }}
        />
      </Flex>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={isRTL ? "right" : "left"}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent w='285px' maxW='285px' bg={sidebarBackgroundColor}>
          <DrawerCloseButton
            zIndex='3'
            onClose={onClose}
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW='285px' px='0rem' pb='0'>
            <Scrollbars
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}>
              <Content routes={routes} />
            </Scrollbars>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
// PROPS

Sidebar.propTypes = {
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  variant: PropTypes.string,
};

export default Sidebar;
