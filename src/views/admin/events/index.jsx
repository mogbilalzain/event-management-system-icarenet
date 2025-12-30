// Chakra imports
import {
  Box,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Button,
  Icon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Card,
  Badge,
  Skeleton,
} from "@chakra-ui/react";
import React, { useState } from "react";
// Language Context
import { useLanguage } from "contexts/LanguageContext";
import { SearchIcon } from "@chakra-ui/icons";
import { 
  MdAdd, 
  MdCalendarToday, 
  MdCloud, 
  MdEvent,
  MdSchedule,
  MdArchive,
} from "react-icons/md";
import { useDisclosure } from "@chakra-ui/react";
// Components
import CreateEventModal from "./components/CreateEventModal";
import EventCard from "./components/EventCard";

export default function Events() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("closest");
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Form state
  const [eventName, setEventName] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  
  // Mock events data
  const [events] = useState([
    {
      id: 1,
      name: "Event Name : design",
      startDate: "2025-12-30T21:00:00",
      type: "online",
      organizer: "Organizer Name",
      status: "draft",
      attendees: 0,
      revenue: "0.00",
    },
    {
      id: 2,
      name: "Summer Music Festival 2025",
      startDate: "2025-06-15T18:00:00",
      type: "offline",
      organizer: "Music Events Co.",
      status: "published",
      attendees: 150,
      revenue: "15,000.00",
    },
    {
      id: 3,
      name: "Tech Conference 2025",
      startDate: "2025-08-20T09:00:00",
      type: "online",
      organizer: "Tech Hub",
      status: "published",
      attendees: 320,
      revenue: "32,000.00",
    },
  ]);

  // Filter events based on active tab
  const getFilteredEvents = () => {
    const now = new Date();
    return events.filter((event) => {
      const eventDate = new Date(event.startDate);
      if (activeTab === 0) {
        // Upcoming
        return eventDate > now;
      } else if (activeTab === 1) {
        // Ended
        return eventDate < now;
      } else {
        // Archived
        return event.status === "archived";
      }
    });
  };

  const filteredEvents = getFilteredEvents();
  
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "secondaryGray.400");
  const brandColor = useColorModeValue("brand.500", "white");
  const buttonOrange = useColorModeValue("#e77324", "#e77324");
  const buttonOrangeHover = useColorModeValue("#c55a1a", "#c55a1a");
  const tabActiveBg = useColorModeValue("#fff5ed", "rgba(231, 115, 36, 0.15)");
  const tabActiveColor = useColorModeValue("#e77324", "#F99C58");
  const tabHoverBg = useColorModeValue("gray.50", "whiteAlpha.50");
  const iconBg = useColorModeValue("#fff5ed", "rgba(231, 115, 36, 0.15)");
  const iconColor = useColorModeValue("#e77324", "#F99C58");
  const orangeGradient = "linear-gradient(135deg, #e77324 0%, #F99C58 100%)";
  const cardBg = useColorModeValue("white", "navy.800");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.100");
  const inputBg = useColorModeValue("#f8fafc", "whiteAlpha.50");
  const inputBorderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const cardShadow = useColorModeValue(
    "0px 4px 20px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  const focusColor = useColorModeValue("#e77324", "#F99C58");

  // Tab icons
  const tabIcons = [MdEvent, MdSchedule, MdArchive];
  const tabCounts = [
    filteredEvents.length,
    events.filter((e) => new Date(e.startDate) < new Date()).length,
    events.filter((e) => e.status === "archived").length,
  ];

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <VStack align="stretch" spacing="24px">
        {/* Page Header */}
        <Flex 
          justify="space-between" 
          align={{ base: "stretch", md: "center" }}
          direction={{ base: "column", md: "row" }}
          gap="16px"
        >
          <Box>
            <HStack spacing="12px" mb="8px">
              <Flex
                w="42px"
                h="42px"
                bg={iconBg}
                borderRadius="12px"
                align="center"
                justify="center"
              >
                <Icon as={MdCalendarToday} w="22px" h="22px" color={iconColor} />
              </Flex>
              <Text
                color={textColor}
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="700"
                letterSpacing="-0.5px"
              >
                {t("events.title")}
              </Text>
            </HStack>
            <Text
              color={textColorSecondary}
              fontSize="md"
              fontWeight="400"
              pl="54px"
            >
              {t("events.subtitle") || "Manage and organize your events"}
            </Text>
          </Box>

          {/* Create Event Button - Desktop */}
          <Button
            display={{ base: "none", md: "flex" }}
            bgGradient={orangeGradient}
            color="white"
            fontWeight="600"
            borderRadius="14px"
            px="28px"
            py="14px"
            h="52px"
            leftIcon={<Icon as={MdAdd} w="20px" h="20px" />}
            onClick={onOpen}
            boxShadow="0 8px 24px rgba(231, 115, 36, 0.25)"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "0 12px 32px rgba(231, 115, 36, 0.35)",
            }}
            _active={{
              transform: "translateY(0px)",
              boxShadow: "0 6px 16px rgba(231, 115, 36, 0.3)",
            }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          >
            {t("events.createEvent")}
          </Button>
        </Flex>

        {/* Top Controls Bar */}
        <Card 
          p={{ base: "16px", md: "20px" }}
          borderRadius="20px"
          bg={cardBg}
          border="1px solid"
          borderColor={borderColor}
          boxShadow={cardShadow}
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            gap="16px"
            align={{ base: "stretch", md: "center" }}
          >
            {/* Search Input */}
            <InputGroup 
              flex={{ base: "1", md: "0 0 340px" }}
            >
              <InputLeftElement pointerEvents="none" h="48px" pl="16px">
                <SearchIcon color={textColorSecondary} w="18px" h="18px" />
              </InputLeftElement>
              <Input
                placeholder={t("events.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                bg={inputBg}
                border="2px solid"
                borderColor={inputBorderColor}
                borderRadius="14px"
                h="48px"
                pl="48px"
                fontSize="sm"
                fontWeight="500"
                _placeholder={{ color: textColorSecondary, fontWeight: "400" }}
                _hover={{ borderColor: "gray.300" }}
                _focus={{
                  borderColor: focusColor,
                  boxShadow: `0 0 0 3px rgba(231, 115, 36, 0.1)`,
                }}
                transition="all 0.2s"
              />
            </InputGroup>

            <HStack
              spacing="12px"
              flex="1"
              justify={{ base: "stretch", md: "flex-end" }}
            >
              {/* Sort Dropdown */}
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                bg={inputBg}
                border="2px solid"
                borderColor={inputBorderColor}
                borderRadius="14px"
                h="48px"
                w={{ base: "100%", md: "200px" }}
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                cursor="pointer"
                _hover={{ borderColor: "gray.300" }}
                _focus={{
                  borderColor: focusColor,
                  boxShadow: `0 0 0 3px rgba(231, 115, 36, 0.1)`,
                }}
                transition="all 0.2s"
              >
                <option value="closest">{t("events.sort.closest")}</option>
                <option value="newest">{t("events.sort.newest")}</option>
                <option value="oldest">{t("events.sort.oldest")}</option>
                <option value="name">{t("events.sort.name")}</option>
              </Select>

              {/* Create Event Button - Mobile */}
              <Button
                display={{ base: "flex", md: "none" }}
                bgGradient={orangeGradient}
                color="white"
                fontWeight="600"
                borderRadius="14px"
                px="20px"
                h="48px"
                leftIcon={<Icon as={MdAdd} w="20px" h="20px" />}
                onClick={onOpen}
                boxShadow="0 4px 12px rgba(231, 115, 36, 0.25)"
                _hover={{
                  boxShadow: "0 8px 20px rgba(231, 115, 36, 0.35)",
                }}
                transition="all 0.3s"
                w="100%"
              >
                {t("events.createEvent")}
              </Button>
            </HStack>
          </Flex>
        </Card>

        {/* Tabs Navigation */}
        <Card
          borderRadius="20px"
          bg={cardBg}
          border="1px solid"
          borderColor={borderColor}
          boxShadow={cardShadow}
          overflow="hidden"
        >
          <Tabs
            index={activeTab}
            onChange={setActiveTab}
            colorScheme="orange"
            variant="unstyled"
          >
            <TabList
              bg={useColorModeValue("gray.50", "whiteAlpha.50")}
              p="8px"
              gap="8px"
              borderBottom="1px solid"
              borderColor={borderColor}
            >
              {[t("events.tabs.upcoming"), t("events.tabs.ended"), t("events.tabs.archived")].map((label, index) => (
                <Tab
                  key={index}
                  color={textColorSecondary}
                  borderRadius="12px"
                  px={{ base: "16px", md: "24px" }}
                  py="12px"
                  fontSize="sm"
                  fontWeight="600"
                  transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                  _hover={{
                    color: tabActiveColor,
                    bg: tabHoverBg,
                  }}
                  _selected={{
                    color: tabActiveColor,
                    bg: tabActiveBg,
                    boxShadow: "0 2px 8px rgba(231, 115, 36, 0.1)",
                  }}
                >
                  <HStack spacing="8px">
                    <Icon as={tabIcons[index]} w="18px" h="18px" />
                    <Text display={{ base: "none", sm: "block" }}>{label}</Text>
                    {tabCounts[index] > 0 && (
                      <Badge
                        bg={activeTab === index ? iconColor : "gray.200"}
                        color={activeTab === index ? "white" : "gray.600"}
                        fontSize="xs"
                        fontWeight="700"
                        borderRadius="full"
                        px="8px"
                        py="2px"
                        minW="24px"
                        textAlign="center"
                      >
                        {tabCounts[index]}
                      </Badge>
                    )}
                  </HStack>
                </Tab>
              ))}
            </TabList>

            <TabPanels>
              {/* Upcoming Tab */}
              <TabPanel p={{ base: "16px", md: "24px" }}>
                {filteredEvents.length > 0 ? (
                  <VStack spacing="16px" align="stretch">
                    {filteredEvents.map((event) => (
                      <EventCard key={event.id} event={event} t={t} />
                    ))}
                  </VStack>
                ) : (
                  <EmptyState
                    t={t}
                    iconBg={iconBg}
                    iconColor={iconColor}
                    textColor={textColor}
                    textColorSecondary={textColorSecondary}
                    buttonOrange={buttonOrange}
                    orangeGradient={orangeGradient}
                    onOpen={onOpen}
                  />
                )}
              </TabPanel>

              {/* Ended Tab */}
              <TabPanel p={{ base: "16px", md: "24px" }}>
                {filteredEvents.length > 0 ? (
                  <VStack spacing="16px" align="stretch">
                    {filteredEvents.map((event) => (
                      <EventCard key={event.id} event={event} t={t} />
                    ))}
                  </VStack>
                ) : (
                  <EmptyState
                    t={t}
                    iconBg={iconBg}
                    iconColor={iconColor}
                    textColor={textColor}
                    textColorSecondary={textColorSecondary}
                    buttonOrange={buttonOrange}
                    orangeGradient={orangeGradient}
                    onOpen={onOpen}
                  />
                )}
              </TabPanel>

              {/* Archived Tab */}
              <TabPanel p={{ base: "16px", md: "24px" }}>
                {filteredEvents.length > 0 ? (
                  <VStack spacing="16px" align="stretch">
                    {filteredEvents.map((event) => (
                      <EventCard key={event.id} event={event} t={t} />
                    ))}
                  </VStack>
                ) : (
                  <EmptyState
                    t={t}
                    iconBg={iconBg}
                    iconColor={iconColor}
                    textColor={textColor}
                    textColorSecondary={textColorSecondary}
                    buttonOrange={buttonOrange}
                    orangeGradient={orangeGradient}
                    onOpen={onOpen}
                  />
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Card>
      </VStack>

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={isOpen}
        onClose={onClose}
        eventName={eventName}
        setEventName={setEventName}
        eventCategory={eventCategory}
        setEventCategory={setEventCategory}
        eventDescription={eventDescription}
        setEventDescription={setEventDescription}
        startDate={startDate}
        setStartDate={setStartDate}
        startTime={startTime}
        setStartTime={setStartTime}
        endDate={endDate}
        setEndDate={setEndDate}
        endTime={endTime}
        setEndTime={setEndTime}
        orangeGradient={orangeGradient}
        cardBg={cardBg}
        borderColor={borderColor}
        inputBg={inputBg}
        textColor={textColor}
        textColorSecondary={textColorSecondary}
        iconColor={iconColor}
      />
    </Box>
  );
}

// Empty State Component
function EmptyState({ t, iconBg, iconColor, textColor, textColorSecondary, orangeGradient, onOpen }) {
  const emptyStateShadow = useColorModeValue(
    "0px 8px 32px rgba(231, 115, 36, 0.12)",
    "0px 8px 32px rgba(231, 115, 36, 0.25)"
  );
  const emptyStateHoverShadow = useColorModeValue(
    "0px 16px 48px rgba(231, 115, 36, 0.18)",
    "0px 16px 48px rgba(231, 115, 36, 0.35)"
  );

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="400px"
      py={{ base: "40px", md: "60px" }}
      px="20px"
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap="28px"
        w="100%"
        maxW="420px"
      >
        {/* Illustration */}
        <Box 
          position="relative" 
          animation="float 3s ease-in-out infinite"
          sx={{
            "@keyframes float": {
              "0%, 100%": {
                transform: "translateY(0px)",
              },
              "50%": {
                transform: "translateY(-12px)",
              },
            },
          }}
        >
          {/* Main Icon Container */}
          <Box
            w={{ base: "110px", md: "130px" }}
            h={{ base: "110px", md: "130px" }}
            borderRadius="28px"
            bgGradient={orangeGradient}
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            boxShadow={emptyStateShadow}
            transition="all 0.4s"
            _hover={{
              transform: "scale(1.05) rotate(2deg)",
              boxShadow: emptyStateHoverShadow,
            }}
          >
            <Icon
              as={MdCalendarToday}
              w={{ base: "50px", md: "60px" }}
              h={{ base: "50px", md: "60px" }}
              color="white"
            />
            
            {/* Decorative elements */}
            <Box
              position="absolute"
              top="-8px"
              right="-8px"
              w="28px"
              h="28px"
              borderRadius="10px"
              bg="white"
              boxShadow="0 4px 12px rgba(0,0,0,0.1)"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={MdAdd} w="18px" h="18px" color={iconColor} />
            </Box>
            
            {/* Cloud Icons */}
            <Icon
              as={MdCloud}
              w="36px"
              h="36px"
              color={iconColor}
              position="absolute"
              top="-18px"
              left="-16px"
              opacity="0.5"
              animation="floatCloud1 4s ease-in-out infinite"
              sx={{
                "@keyframes floatCloud1": {
                  "0%, 100%": {
                    transform: "translate(0, 0)",
                  },
                  "50%": {
                    transform: "translate(8px, -8px)",
                  },
                },
              }}
            />
            <Icon
              as={MdCloud}
              w="28px"
              h="28px"
              color={iconColor}
              position="absolute"
              bottom="-14px"
              right="-14px"
              opacity="0.4"
              animation="floatCloud2 3.5s ease-in-out infinite"
              sx={{
                "@keyframes floatCloud2": {
                  "0%, 100%": {
                    transform: "translate(0, 0)",
                  },
                  "50%": {
                    transform: "translate(-6px, 6px)",
                  },
                },
              }}
            />
          </Box>
        </Box>

        {/* Text Content */}
        <VStack spacing="12px" align="center">
          <Text
            color={textColor}
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="700"
            textAlign="center"
            letterSpacing="-0.5px"
          >
            {t("events.emptyState.title")}
          </Text>
          <Text
            color={textColorSecondary}
            fontSize={{ base: "sm", md: "md" }}
            fontWeight="400"
            textAlign="center"
            lineHeight="1.7"
            maxW="360px"
          >
            {t("events.emptyState.description")}
          </Text>
        </VStack>

        {/* CTA Button */}
        <Button
          bgGradient={orangeGradient}
          color="white"
          fontWeight="600"
          borderRadius="16px"
          px={{ base: "32px", md: "40px" }}
          py={{ base: "14px", md: "16px" }}
          h="auto"
          fontSize={{ base: "sm", md: "md" }}
          leftIcon={<Icon as={MdAdd} w="22px" h="22px" />}
          onClick={onOpen}
          boxShadow="0 8px 24px rgba(231, 115, 36, 0.3)"
          _hover={{
            transform: "translateY(-3px)",
            boxShadow: "0 12px 32px rgba(231, 115, 36, 0.4)",
          }}
          _active={{
            transform: "translateY(-1px)",
            boxShadow: "0 6px 16px rgba(231, 115, 36, 0.35)",
          }}
          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        >
          {t("events.createEvent")}
        </Button>
      </Flex>
    </Flex>
  );
}
