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
  Text,
  Badge,
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
import { MdAdminPanelSettings } from "react-icons/md";

function SystemAdminSidebar(props) {
  const { routes } = props;
  const { isRTL } = useLanguage();
  const { toggleSidebar, setToggleSidebar } = useContext(SidebarContext);

  let variantChange = "0.3s cubic-bezier(0.4, 0, 0.2, 1)";
  let shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  // Chakra Color Mode - Using purple theme for System Admin
  let sidebarBg = useColorModeValue("white", "navy.800");
  let sidebarMargins = "0px";
  let toggleButtonBg = useColorModeValue("white", "navy.700");
  let toggleButtonColor = useColorModeValue("purple.600", "purple.300");
  let toggleButtonShadow = useColorModeValue(
    "0px 4px 12px rgba(128, 90, 213, 0.2)",
    "0px 4px 12px rgba(128, 90, 213, 0.3)"
  );
  let toggleButtonHoverShadow = useColorModeValue(
    "0px 6px 20px rgba(128, 90, 213, 0.3)",
    "0px 6px 20px rgba(128, 90, 213, 0.4)"
  );
  let toggleButtonHoverBg = useColorModeValue("purple.50", "navy.600");
  let accentColor = useColorModeValue("purple.500", "purple.400");
  let accentGradient = "linear-gradient(135deg, #805AD5 0%, #B794F4 100%)";

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
          position="relative"
        >
          {/* System Admin Badge */}
          {toggleSidebar && (
            <Box
              position="absolute"
              top="100px"
              left="50%"
              transform="translateX(-50%)"
              zIndex="10"
            >
              <Flex
                align="center"
                justify="center"
                gap="8px"
                bgGradient={accentGradient}
                px="16px"
                py="8px"
                borderRadius="full"
                boxShadow="0 4px 12px rgba(128, 90, 213, 0.3)"
              >
                <Icon as={MdAdminPanelSettings} w="18px" h="18px" color="white" />
                <Text fontSize="xs" fontWeight="700" color="white" textTransform="uppercase" letterSpacing="1px">
                  System Admin
                </Text>
              </Flex>
            </Box>
          )}

          {toggleSidebar && (
            <Scrollbars
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}>
              <Box pt="50px">
                <Content routes={routes} isSystemAdmin={true} />
              </Box>
            </Scrollbars>
          )}
        </Box>
      </Box>
    </>
  );
}

// FUNCTIONS
export function SystemAdminSidebarResponsive(props) {
  let sidebarBackgroundColor = useColorModeValue("white", "navy.800");
  let menuColor = useColorModeValue("purple.500", "purple.300");
  const { isRTL } = useLanguage();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const { routes } = props;

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
              <Content routes={routes} isSystemAdmin={true} />
            </Scrollbars>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

// PROPS
SystemAdminSidebar.propTypes = {
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  variant: PropTypes.string,
};

export default SystemAdminSidebar;

