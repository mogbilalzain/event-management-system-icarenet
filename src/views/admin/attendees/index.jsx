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
  Flex,
  Card,
  IconButton,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuOptionGroup,
  Portal,
  Checkbox,
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import React, { useState } from "react";
// Language Context
import { useLanguage } from "contexts/LanguageContext";
import { SearchIcon } from "@chakra-ui/icons";
import { 
  MdAdd, 
  MdPeople,
  MdCloud,
  MdFilterList,
  MdDownload,
  MdConfirmationNumber,
  MdViewColumn,
  MdSort,
  MdCheckCircle,
  MdPending,
  MdPersonAdd,
  MdQrCodeScanner,
} from "react-icons/md";
// Components
import AttendeeRow from "./components/AttendeeRow";
import IconBox from "components/icons/IconBox";

export default function Attendees() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCheckIn, setShowCheckIn] = useState(true);

  // Mock attendees data
  const [attendees] = useState([
    {
      id: 1,
      attendeeId: "A-BE630R0",
      name: "Mohamed Ali",
      email: "mohamed.ali@example.com",
      ticketName: "VIP Ticket",
      orderId: "O-NGZIDKA",
      purchaseDate: new Date(Date.now() - 3600000).toISOString(),
      status: "active",
      checkIn: { checked: 1, total: 1 },
    },
    {
      id: 2,
      attendeeId: "A-XK492P1",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      ticketName: "General Admission",
      orderId: "O-ABC123",
      purchaseDate: new Date(Date.now() - 86400000).toISOString(),
      status: "active",
      checkIn: { checked: 0, total: 1 },
    },
    {
      id: 3,
      attendeeId: "A-LP783Q2",
      name: "John Smith",
      email: "john.smith@example.com",
      ticketName: "VIP Ticket",
      orderId: "O-XYZ789",
      purchaseDate: new Date(Date.now() - 172800000).toISOString(),
      status: "pending",
      checkIn: null,
    },
    {
      id: 4,
      attendeeId: "A-MN294S3",
      name: "Emily Davis",
      email: "emily.d@example.com",
      ticketName: "Early Bird",
      orderId: "O-DEF456",
      purchaseDate: new Date(Date.now() - 259200000).toISOString(),
      status: "active",
      checkIn: { checked: 1, total: 1 },
    },
    {
      id: 5,
      attendeeId: "A-QR105T4",
      name: "David Wilson",
      email: "david.w@example.com",
      ticketName: "General Admission",
      orderId: "O-GHI789",
      purchaseDate: new Date(Date.now() - 345600000).toISOString(),
      status: "cancelled",
      checkIn: null,
    },
  ]);

  // Filter and sort attendees
  const filteredAttendees = attendees.filter((attendee) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      attendee.name.toLowerCase().includes(searchLower) ||
      attendee.email.toLowerCase().includes(searchLower) ||
      attendee.attendeeId.toLowerCase().includes(searchLower) ||
      attendee.orderId.toLowerCase().includes(searchLower);
    
    const matchesStatus = statusFilter === "all" || attendee.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const sortedAttendees = [...filteredAttendees].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.purchaseDate) - new Date(a.purchaseDate);
      case "oldest":
        return new Date(a.purchaseDate) - new Date(b.purchaseDate);
      case "name":
        return a.name.localeCompare(b.name);
      case "email":
        return a.email.localeCompare(b.email);
      default:
        return 0;
    }
  });

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "secondaryGray.400");
  const cardBg = useColorModeValue("white", "navy.800");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.100");
  const inputBg = useColorModeValue("#f8fafc", "whiteAlpha.50");
  const inputBorderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const iconBg = useColorModeValue("#fff5ed", "rgba(231, 115, 36, 0.15)");
  const iconColor = useColorModeValue("#e77324", "#F99C58");
  const orangeGradient = "linear-gradient(135deg, #e77324 0%, #F99C58 100%)";
  const cardShadow = useColorModeValue(
    "0px 4px 20px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  const hoverShadow = useColorModeValue(
    "0px 8px 32px rgba(112, 144, 176, 0.15)",
    "0px 8px 32px rgba(0, 0, 0, 0.3)"
  );
  const focusColor = useColorModeValue("#e77324", "#F99C58");
  const tableHeaderBg = useColorModeValue(
    "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
    "whiteAlpha.50"
  );
  const sectionBg = useColorModeValue(
    "linear-gradient(180deg, #fafbfc 0%, white 100%)",
    "transparent"
  );

  // Stats
  const totalAttendees = attendees.length;
  const activeAttendees = attendees.filter(a => a.status === "active").length;
  const checkedInCount = attendees.filter(a => a.checkIn?.checked >= a.checkIn?.total).length;

  const hasAttendees = sortedAttendees.length > 0;

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <VStack align="stretch" spacing="24px">
        {/* Page Header */}
        <Flex 
          justify="space-between" 
          align={{ base: "stretch", md: "center" }}
          direction={{ base: "column", md: "row" }}
          gap="20px"
          mb="8px"
        >
          <HStack spacing="16px" align="center">
            <IconBox
              w="60px"
              h="60px"
              bg={iconBg}
              icon={
                <Icon
                  w="34px"
                  h="34px"
                  as={MdPeople}
                  color={iconColor}
                />
              }
            />
            <Box>
              <Text
                color={textColor}
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="800"
                letterSpacing="-0.5px"
                mb="4px"
              >
                {t("attendees.title")}
              </Text>
              <Text
                color={textColorSecondary}
                fontSize="md"
                fontWeight="400"
              >
                {t("attendees.subtitle")}
              </Text>
            </Box>
          </HStack>

          {/* Action Buttons - Desktop */}
          <HStack spacing="12px" display={{ base: "none", md: "flex" }}>
            <Button
              bgGradient={orangeGradient}
              color="white"
              leftIcon={<Icon as={MdAdd} w="20px" h="20px" />}
              borderRadius="16px"
              h="52px"
              px="24px"
              fontSize="md"
              fontWeight="600"
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
              {t("attendees.create")}
            </Button>
          </HStack>
        </Flex>

        {/* Stats Cards */}
        <HStack spacing="16px" display={{ base: "none", md: "flex" }}>
          {/* Total Attendees */}
          <Card
            p="20px"
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="20px"
            boxShadow={cardShadow}
            flex="1"
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            cursor="pointer"
            _hover={{ 
              transform: "translateY(-4px)", 
              boxShadow: hoverShadow,
              borderColor: iconColor,
            }}
            position="relative"
            overflow="hidden"
          >
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              h="4px"
              bgGradient={orangeGradient}
              borderRadius="20px 20px 0 0"
            />
            <HStack spacing="14px">
              <Flex
                w="52px"
                h="52px"
                bgGradient={orangeGradient}
                borderRadius="14px"
                align="center"
                justify="center"
                boxShadow="0 4px 12px rgba(231, 115, 36, 0.25)"
              >
                <Icon as={MdPeople} w="26px" h="26px" color="white" />
              </Flex>
              <Box>
                <Text color={textColorSecondary} fontSize="xs" fontWeight="600" textTransform="uppercase" letterSpacing="0.5px">
                  {t("attendees.stats.total")}
                </Text>
                <Text color={textColor} fontSize="2xl" fontWeight="800" letterSpacing="-1px">
                  {totalAttendees}
                </Text>
              </Box>
            </HStack>
          </Card>

          {/* Active Attendees */}
          <Card
            p="20px"
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="20px"
            boxShadow={cardShadow}
            flex="1"
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            cursor="pointer"
            _hover={{ 
              transform: "translateY(-4px)", 
              boxShadow: hoverShadow,
              borderColor: "#16a34a",
            }}
            position="relative"
            overflow="hidden"
          >
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              h="4px"
              bg="linear-gradient(135deg, #16a34a 0%, #22c55e 100%)"
              borderRadius="20px 20px 0 0"
            />
            <HStack spacing="14px">
              <Flex
                w="52px"
                h="52px"
                bg="linear-gradient(135deg, #16a34a 0%, #22c55e 100%)"
                borderRadius="14px"
                align="center"
                justify="center"
                boxShadow="0 4px 12px rgba(22, 163, 74, 0.25)"
              >
                <Icon as={MdCheckCircle} w="26px" h="26px" color="white" />
              </Flex>
              <Box>
                <Text color={textColorSecondary} fontSize="xs" fontWeight="600" textTransform="uppercase" letterSpacing="0.5px">
                  {t("attendees.stats.active")}
                </Text>
                <Text color={textColor} fontSize="2xl" fontWeight="800" letterSpacing="-1px">
                  {activeAttendees}
                </Text>
              </Box>
            </HStack>
          </Card>

          {/* Checked In */}
          <Card
            p="20px"
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="20px"
            boxShadow={cardShadow}
            flex="1"
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            cursor="pointer"
            _hover={{ 
              transform: "translateY(-4px)", 
              boxShadow: hoverShadow,
              borderColor: "#2563eb",
            }}
            position="relative"
            overflow="hidden"
          >
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              h="4px"
              bg="linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)"
              borderRadius="20px 20px 0 0"
            />
            <HStack spacing="14px">
              <Flex
                w="52px"
                h="52px"
                bg="linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)"
                borderRadius="14px"
                align="center"
                justify="center"
                boxShadow="0 4px 12px rgba(37, 99, 235, 0.25)"
              >
                <Icon as={MdQrCodeScanner} w="26px" h="26px" color="white" />
              </Flex>
              <Box>
                <Text color={textColorSecondary} fontSize="xs" fontWeight="600" textTransform="uppercase" letterSpacing="0.5px">
                  {t("attendees.stats.checkedIn")}
                </Text>
                <Text color={textColor} fontSize="2xl" fontWeight="800" letterSpacing="-1px">
                  {checkedInCount}
                </Text>
              </Box>
            </HStack>
          </Card>
        </HStack>

        {/* Top Controls Bar */}
        <Card
          p={{ base: "16px", md: "24px" }}
          bg={cardBg}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="24px"
          boxShadow={cardShadow}
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            gap="16px"
            align={{ base: "stretch", md: "center" }}
          >
            {/* Search Input */}
            <InputGroup flex={{ base: "1", md: "0 0 380px" }}>
              <InputLeftElement pointerEvents="none" h="56px" pl="18px">
                <SearchIcon color={textColorSecondary} w="20px" h="20px" />
              </InputLeftElement>
              <Input
                placeholder={t("attendees.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                bg={inputBg}
                border="2px solid"
                borderColor={inputBorderColor}
                borderRadius="18px"
                h="56px"
                pl="52px"
                fontSize="md"
                fontWeight="500"
                _placeholder={{ color: textColorSecondary, fontWeight: "400" }}
                _hover={{ borderColor: "gray.300" }}
                _focus={{
                  borderColor: focusColor,
                  boxShadow: `0 0 0 4px rgba(231, 115, 36, 0.1)`,
                }}
                transition="all 0.2s"
              />
            </InputGroup>

            <HStack spacing="12px" flex="1" justify={{ base: "stretch", md: "flex-end" }}>
              {/* Sort Dropdown */}
              <HStack spacing="8px" display={{ base: "none", md: "flex" }}>
                <Icon as={MdSort} w="18px" h="18px" color={textColorSecondary} />
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  bg={inputBg}
                  border="2px solid"
                  borderColor={inputBorderColor}
                  borderRadius="14px"
                  h="52px"
                  w="180px"
                  fontSize="sm"
                  fontWeight="600"
                  cursor="pointer"
                  _hover={{ borderColor: "gray.300" }}
                  _focus={{
                    borderColor: focusColor,
                    boxShadow: `0 0 0 3px rgba(231, 115, 36, 0.1)`,
                  }}
                >
                  <option value="newest">{t("attendees.sort.newest")}</option>
                  <option value="oldest">{t("attendees.sort.oldest")}</option>
                  <option value="name">{t("attendees.sort.name")}</option>
                  <option value="email">{t("attendees.sort.email")}</option>
                </Select>
              </HStack>

              {/* Status Filter */}
              <Menu closeOnSelect={true}>
                <MenuButton
                  as={Button}
                  variant="outline"
                  leftIcon={<Icon as={MdFilterList} w="18px" h="18px" />}
                  rightIcon={
                    statusFilter !== "all" && (
                      <Badge 
                        bg={iconBg} 
                        color={iconColor} 
                        borderRadius="full"
                        ml="4px"
                        fontSize="10px"
                      >
                        1
                      </Badge>
                    )
                  }
                  borderColor={statusFilter !== "all" ? iconColor : borderColor}
                  color={statusFilter !== "all" ? iconColor : textColor}
                  bg={statusFilter !== "all" ? iconBg : "transparent"}
                  borderRadius="14px"
                  h="52px"
                  px="20px"
                  fontSize="sm"
                  fontWeight="600"
                  _hover={{ bg: iconBg, borderColor: iconColor, color: iconColor }}
                  display={{ base: "none", md: "flex" }}
                >
                  {t("attendees.filters")}
                </MenuButton>
                <Portal>
                  <MenuList
                    bg={cardBg}
                    borderColor={borderColor}
                    borderRadius="16px"
                    boxShadow={hoverShadow}
                    py="12px"
                    minW="200px"
                    zIndex="modal"
                  >
                    <MenuOptionGroup 
                      value={statusFilter} 
                      type="radio"
                      onChange={(val) => setStatusFilter(val)}
                    >
                      <MenuItemOption value="all" fontSize="sm" fontWeight="500" borderRadius="8px" mx="8px">
                        {t("attendees.filter.all")}
                      </MenuItemOption>
                      <MenuItemOption value="active" fontSize="sm" fontWeight="500" borderRadius="8px" mx="8px">
                        <HStack spacing="8px">
                          <Box w="8px" h="8px" borderRadius="full" bg="#16a34a" />
                          <Text>{t("attendees.status.active")}</Text>
                        </HStack>
                      </MenuItemOption>
                      <MenuItemOption value="pending" fontSize="sm" fontWeight="500" borderRadius="8px" mx="8px">
                        <HStack spacing="8px">
                          <Box w="8px" h="8px" borderRadius="full" bg="#d97706" />
                          <Text>{t("attendees.status.pending")}</Text>
                        </HStack>
                      </MenuItemOption>
                      <MenuItemOption value="cancelled" fontSize="sm" fontWeight="500" borderRadius="8px" mx="8px">
                        <HStack spacing="8px">
                          <Box w="8px" h="8px" borderRadius="full" bg="#dc2626" />
                          <Text>{t("attendees.status.cancelled")}</Text>
                        </HStack>
                      </MenuItemOption>
                    </MenuOptionGroup>
                  </MenuList>
                </Portal>
              </Menu>

              {/* Export Button */}
              <Button
                bgGradient={orangeGradient}
                color="white"
                leftIcon={<Icon as={MdDownload} w="18px" h="18px" />}
                borderRadius="14px"
                h="52px"
                px="20px"
                fontSize="sm"
                fontWeight="600"
                boxShadow="0 4px 12px rgba(231, 115, 36, 0.25)"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 20px rgba(231, 115, 36, 0.35)",
                }}
                _active={{
                  transform: "translateY(0px)",
                  boxShadow: "0 4px 12px rgba(231, 115, 36, 0.3)",
                }}
                transition="all 0.3s"
                display={{ base: "none", md: "flex" }}
              >
                {t("attendees.export")}
              </Button>

              {/* Results Badge */}
              <Badge
                bg={iconBg}
                color={iconColor}
                fontSize="sm"
                fontWeight="700"
                px="16px"
                py="14px"
                borderRadius="full"
                display={{ base: "none", lg: "flex" }}
              >
                {sortedAttendees.length} {sortedAttendees.length === 1 ? "attendee" : "attendees"}
              </Badge>

              {/* Mobile Buttons */}
              <HStack spacing="8px" display={{ base: "flex", md: "none" }} w="100%">
                <Button
                  bgGradient={orangeGradient}
                  color="white"
                  leftIcon={<Icon as={MdAdd} w="18px" h="18px" />}
                  borderRadius="14px"
                  h="52px"
                  fontSize="sm"
                  fontWeight="600"
                  flex="1"
                >
                  {t("attendees.create")}
                </Button>
                <Button
                  variant="outline"
                  leftIcon={<Icon as={MdDownload} w="18px" h="18px" />}
                  borderColor={iconColor}
                  color={iconColor}
                  borderRadius="14px"
                  h="52px"
                  fontSize="sm"
                  fontWeight="600"
                  flex="1"
                  _hover={{ bg: iconBg }}
                >
                  {t("attendees.export")}
                </Button>
              </HStack>
            </HStack>
          </Flex>
        </Card>

        {/* Attendees Table */}
        <Card
          bg={cardBg}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="24px"
          boxShadow={cardShadow}
          overflow="hidden"
        >
          {/* Table Header */}
          <Flex
            bg={sectionBg}
            px={{ base: "20px", md: "28px" }}
            py="18px"
            align="center"
            justify="space-between"
            borderBottom="1px solid"
            borderColor={borderColor}
          >
            <HStack spacing="12px">
              <Flex
                w="40px"
                h="40px"
                bgGradient={orangeGradient}
                borderRadius="12px"
                align="center"
                justify="center"
                boxShadow="0 4px 12px rgba(231, 115, 36, 0.2)"
              >
                <Icon as={MdPeople} w="20px" h="20px" color="white" />
              </Flex>
              <VStack align="flex-start" spacing="2px">
                <Text
                  color={textColor}
                  fontSize="lg"
                  fontWeight="700"
                  letterSpacing="-0.3px"
                >
                  {t("attendees.allAttendees")}
                </Text>
                <Text
                  color={textColorSecondary}
                  fontSize="sm"
                  fontWeight="400"
                >
                  {sortedAttendees.length} {t("attendees.recordsFound")}
                </Text>
              </VStack>
            </HStack>

            <HStack spacing="16px">
              {/* Show Check-In Toggle */}
              <FormControl display="flex" alignItems="center" w="auto">
                <FormLabel htmlFor="show-checkin" mb="0" fontSize="sm" fontWeight="500" color={textColorSecondary}>
                  {t("attendees.showCheckIn")}
                </FormLabel>
                <Switch 
                  id="show-checkin" 
                  colorScheme="orange" 
                  isChecked={showCheckIn}
                  onChange={(e) => setShowCheckIn(e.target.checked)}
                />
              </FormControl>

              {/* Column Selector */}
              <Menu placement="bottom-end" closeOnSelect={false}>
                <Tooltip label={t("attendees.columns")} hasArrow>
                  <MenuButton
                    as={IconButton}
                    icon={<Icon as={MdViewColumn} w="20px" h="20px" />}
                    variant="ghost"
                    color={textColorSecondary}
                    borderRadius="full"
                    _hover={{ bg: iconBg, color: iconColor }}
                    size="md"
                    aria-label="Columns"
                  />
                </Tooltip>
                <Portal>
                  <MenuList
                    bg={cardBg}
                    borderColor={borderColor}
                    borderRadius="16px"
                    boxShadow={hoverShadow}
                    py="12px"
                    minW="200px"
                    zIndex="modal"
                  >
                    <Text px="16px" py="8px" fontSize="xs" fontWeight="700" color={textColorSecondary} textTransform="uppercase">
                      {t("attendees.columns")}
                    </Text>
                    <MenuItem fontSize="sm" fontWeight="500" borderRadius="8px" mx="8px" py="10px">
                      <Checkbox colorScheme="orange" defaultChecked mr="12px" />
                      {t("attendees.table.attendeeDetails")}
                    </MenuItem>
                    <MenuItem fontSize="sm" fontWeight="500" borderRadius="8px" mx="8px" py="10px">
                      <Checkbox colorScheme="orange" defaultChecked mr="12px" />
                      {t("attendees.table.orderTicket")}
                    </MenuItem>
                    <MenuItem fontSize="sm" fontWeight="500" borderRadius="8px" mx="8px" py="10px">
                      <Checkbox colorScheme="orange" defaultChecked mr="12px" />
                      {t("attendees.table.status")}
                    </MenuItem>
                    <MenuItem fontSize="sm" fontWeight="500" borderRadius="8px" mx="8px" py="10px">
                      <Checkbox colorScheme="orange" isChecked={showCheckIn} onChange={(e) => setShowCheckIn(e.target.checked)} mr="12px" />
                      {t("attendees.table.checkIn")}
                    </MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            </HStack>
          </Flex>

          {/* Table */}
          <Box overflowX="auto">
            <Table variant="simple" size="md">
              <Thead position="sticky" top="0" zIndex="10" bgGradient={tableHeaderBg}>
                <Tr>
                  <Th
                    color={textColor}
                    fontSize="xs"
                    fontWeight="800"
                    textTransform="uppercase"
                    letterSpacing="0.5px"
                    px="20px"
                    py="18px"
                    borderBottom="2px solid"
                    borderColor={borderColor}
                  >
                    {t("attendees.table.attendeeDetails")}
                  </Th>
                  <Th
                    color={textColor}
                    fontSize="xs"
                    fontWeight="800"
                    textTransform="uppercase"
                    letterSpacing="0.5px"
                    px="20px"
                    py="18px"
                    borderBottom="2px solid"
                    borderColor={borderColor}
                  >
                    {t("attendees.table.orderTicket")}
                  </Th>
                  <Th
                    color={textColor}
                    fontSize="xs"
                    fontWeight="800"
                    textTransform="uppercase"
                    letterSpacing="0.5px"
                    px="20px"
                    py="18px"
                    borderBottom="2px solid"
                    borderColor={borderColor}
                  >
                    {t("attendees.table.status")}
                  </Th>
                  {showCheckIn && (
                    <Th
                      color={textColor}
                      fontSize="xs"
                      fontWeight="800"
                      textTransform="uppercase"
                      letterSpacing="0.5px"
                      px="20px"
                      py="18px"
                      borderBottom="2px solid"
                      borderColor={borderColor}
                    >
                      {t("attendees.table.checkIn")}
                    </Th>
                  )}
                  <Th
                    color={textColor}
                    fontSize="xs"
                    fontWeight="800"
                    textTransform="uppercase"
                    letterSpacing="0.5px"
                    px="20px"
                    py="18px"
                    borderBottom="2px solid"
                    borderColor={borderColor}
                    textAlign="center"
                  >
                    {t("attendees.table.actions")}
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {hasAttendees ? (
                  sortedAttendees.map((attendee) => (
                    <AttendeeRow 
                      key={attendee.id} 
                      attendee={attendee} 
                      t={t} 
                      showCheckIn={showCheckIn}
                    />
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={showCheckIn ? 5 : 4} textAlign="center" py="80px">
                      <EmptyState
                        t={t}
                        iconBg={iconBg}
                        iconColor={iconColor}
                        textColor={textColor}
                        textColorSecondary={textColorSecondary}
                        orangeGradient={orangeGradient}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                      />
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </Box>
        </Card>
      </VStack>
    </Box>
  );
}

// Empty State Component
function EmptyState({
  t,
  iconBg,
  iconColor,
  textColor,
  textColorSecondary,
  orangeGradient,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <VStack spacing="24px" py="20px">
      <Flex
        w="100px"
        h="100px"
        bgGradient={orangeGradient}
        borderRadius="24px"
        align="center"
        justify="center"
        boxShadow="0 8px 24px rgba(231, 115, 36, 0.25)"
        animation="float 3s ease-in-out infinite"
        sx={{
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-8px)" },
          },
        }}
      >
        <Icon as={MdPeople} w="50px" h="50px" color="white" />
      </Flex>
      <VStack spacing="12px">
        <Text color={textColor} fontSize="xl" fontWeight="700">
          {t("attendees.emptyState.title")}
        </Text>
        <Text color={textColorSecondary} fontSize="sm" maxW="360px" textAlign="center" lineHeight="1.7">
          {t("attendees.emptyState.description")}
        </Text>
      </VStack>
      <HStack spacing="12px">
        {statusFilter !== "all" && (
          <Button
            variant="outline"
            leftIcon={<Icon as={MdFilterList} w="16px" h="16px" />}
            borderColor={iconColor}
            color={iconColor}
            borderRadius="14px"
            size="md"
            onClick={() => setStatusFilter("all")}
            _hover={{ bg: iconBg }}
          >
            Clear Filters
          </Button>
        )}
        <Button
          bgGradient={orangeGradient}
          color="white"
          leftIcon={<Icon as={MdAdd} w="18px" h="18px" />}
          borderRadius="14px"
          size="md"
          boxShadow="0 4px 12px rgba(231, 115, 36, 0.25)"
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "0 8px 20px rgba(231, 115, 36, 0.35)",
          }}
        >
          {t("attendees.emptyState.addAttendee")}
        </Button>
      </HStack>
    </VStack>
  );
}
