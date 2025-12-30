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
} from "@chakra-ui/react";
import React, { useState } from "react";
// Language Context
import { useLanguage } from "contexts/LanguageContext";
import { SearchIcon } from "@chakra-ui/icons";
import { 
  MdShoppingCart,
  MdFilterList,
  MdDownload,
  MdViewColumn,
  MdCheckCircle,
  MdPending,
  MdTrendingUp,
  MdReceipt,
  MdRefresh,
  MdSort,
} from "react-icons/md";
// Components
import OrderRow from "./components/OrderRow";
import IconBox from "components/icons/IconBox";

export default function Orders() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock orders data
  const [orders] = useState([
    {
      id: 1,
      orderId: "O-NGZIDKA",
      customerName: "John Doe",
      customerEmail: "john.doe@example.com",
      orderDate: new Date(Date.now() - 3600000).toISOString(),
      invoiceStatus: null,
      itemsCount: 2,
      totalAmount: "125.00",
      tax: "12.50",
      paymentMethod: "Credit Card",
      status: "completed",
    },
    {
      id: 2,
      orderId: "O-ABC123",
      customerName: "Jane Smith",
      customerEmail: "jane.smith@example.com",
      orderDate: new Date(Date.now() - 7200000).toISOString(),
      invoiceStatus: "Invoice sent",
      itemsCount: 1,
      totalAmount: "75.00",
      tax: "7.50",
      paymentMethod: "PayPal",
      status: "pending",
    },
    {
      id: 3,
      orderId: "O-XYZ789",
      customerName: "Mike Johnson",
      customerEmail: "mike.j@example.com",
      orderDate: new Date(Date.now() - 86400000).toISOString(),
      invoiceStatus: null,
      itemsCount: 3,
      totalAmount: "250.00",
      tax: "25.00",
      paymentMethod: "Other",
      status: "completed",
    },
    {
      id: 4,
      orderId: "O-DEF456",
      customerName: "Sarah Williams",
      customerEmail: "sarah.w@example.com",
      orderDate: new Date(Date.now() - 172800000).toISOString(),
      invoiceStatus: "Invoice sent",
      itemsCount: 1,
      totalAmount: "50.00",
      tax: "5.00",
      paymentMethod: "Credit Card",
      status: "cancelled",
    },
    {
      id: 5,
      orderId: "O-GHI789",
      customerName: "David Brown",
      customerEmail: "david.b@example.com",
      orderDate: new Date(Date.now() - 259200000).toISOString(),
      invoiceStatus: null,
      itemsCount: 4,
      totalAmount: "300.00",
      tax: "30.00",
      paymentMethod: "PayPal",
      status: "refunded",
    },
  ]);

  // Filter and sort orders
  const filteredOrders = orders.filter((order) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchLower) ||
      order.customerEmail.toLowerCase().includes(searchLower) ||
      order.orderId.toLowerCase().includes(searchLower);
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.orderDate) - new Date(a.orderDate);
      case "oldest":
        return new Date(a.orderDate) - new Date(b.orderDate);
      case "amount_high":
        return parseFloat(b.totalAmount) - parseFloat(a.totalAmount);
      case "amount_low":
        return parseFloat(a.totalAmount) - parseFloat(b.totalAmount);
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
  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === "completed").length;
  const pendingOrders = orders.filter(o => o.status === "pending").length;
  const totalRevenue = orders
    .filter(o => o.status === "completed")
    .reduce((sum, o) => sum + parseFloat(o.totalAmount), 0)
    .toFixed(2);

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
                  as={MdShoppingCart}
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
                {t("orders.title")}
              </Text>
              <Text
                color={textColorSecondary}
                fontSize="md"
                fontWeight="400"
              >
                {t("orders.subtitle")}
              </Text>
            </Box>
          </HStack>

          {/* Export Button - Desktop */}
          <Button
            display={{ base: "none", md: "flex" }}
            bgGradient={orangeGradient}
            color="white"
            leftIcon={<Icon as={MdDownload} w="20px" h="20px" />}
            borderRadius="16px"
            h="52px"
            px="28px"
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
            {t("orders.export")}
          </Button>
        </Flex>

        {/* Stats Cards */}
        <HStack spacing="16px" display={{ base: "none", md: "flex" }}>
          {/* Total Orders */}
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
            {/* Decorative gradient line */}
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
                <Icon as={MdReceipt} w="26px" h="26px" color="white" />
              </Flex>
              <Box>
                <Text color={textColorSecondary} fontSize="xs" fontWeight="600" textTransform="uppercase" letterSpacing="0.5px">
                  {t("orders.stats.totalOrders")}
                </Text>
                <Text color={textColor} fontSize="2xl" fontWeight="800" letterSpacing="-1px">
                  {totalOrders}
                </Text>
              </Box>
            </HStack>
          </Card>

          {/* Completed Orders */}
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
                  {t("orders.stats.completed")}
                </Text>
                <Text color={textColor} fontSize="2xl" fontWeight="800" letterSpacing="-1px">
                  {completedOrders}
                </Text>
              </Box>
            </HStack>
          </Card>

          {/* Pending Orders */}
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
              borderColor: "#d97706",
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
              bg="linear-gradient(135deg, #d97706 0%, #f59e0b 100%)"
              borderRadius="20px 20px 0 0"
            />
            <HStack spacing="14px">
              <Flex
                w="52px"
                h="52px"
                bg="linear-gradient(135deg, #d97706 0%, #f59e0b 100%)"
                borderRadius="14px"
                align="center"
                justify="center"
                boxShadow="0 4px 12px rgba(217, 119, 6, 0.25)"
              >
                <Icon as={MdPending} w="26px" h="26px" color="white" />
              </Flex>
              <Box>
                <Text color={textColorSecondary} fontSize="xs" fontWeight="600" textTransform="uppercase" letterSpacing="0.5px">
                  Pending
                </Text>
                <Text color={textColor} fontSize="2xl" fontWeight="800" letterSpacing="-1px">
                  {pendingOrders}
                </Text>
              </Box>
            </HStack>
          </Card>

          {/* Total Revenue */}
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
                <Icon as={MdTrendingUp} w="26px" h="26px" color="white" />
              </Flex>
              <Box>
                <Text color={textColorSecondary} fontSize="xs" fontWeight="600" textTransform="uppercase" letterSpacing="0.5px">
                  {t("orders.stats.totalRevenue")}
                </Text>
                <Text color={textColor} fontSize="2xl" fontWeight="800" letterSpacing="-1px">
                  ${totalRevenue}
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
                placeholder={t("orders.searchPlaceholder")}
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
                  w="200px"
                  fontSize="sm"
                  fontWeight="600"
                  cursor="pointer"
                  _hover={{ borderColor: "gray.300" }}
                  _focus={{
                    borderColor: focusColor,
                    boxShadow: `0 0 0 3px rgba(231, 115, 36, 0.1)`,
                  }}
                >
                  <option value="newest">{t("orders.sort.newest")}</option>
                  <option value="oldest">{t("orders.sort.oldest")}</option>
                  <option value="amount_high">{t("orders.sort.amountHigh")}</option>
                  <option value="amount_low">{t("orders.sort.amountLow")}</option>
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
                  {t("orders.filters")}
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
                        All Orders
                      </MenuItemOption>
                      <MenuItemOption value="completed" fontSize="sm" fontWeight="500" borderRadius="8px" mx="8px">
                        <HStack spacing="8px">
                          <Box w="8px" h="8px" borderRadius="full" bg="#16a34a" />
                          <Text>{t("orders.status.completed")}</Text>
                        </HStack>
                      </MenuItemOption>
                      <MenuItemOption value="pending" fontSize="sm" fontWeight="500" borderRadius="8px" mx="8px">
                        <HStack spacing="8px">
                          <Box w="8px" h="8px" borderRadius="full" bg="#d97706" />
                          <Text>{t("orders.status.pending")}</Text>
                        </HStack>
                      </MenuItemOption>
                      <MenuItemOption value="cancelled" fontSize="sm" fontWeight="500" borderRadius="8px" mx="8px">
                        <HStack spacing="8px">
                          <Box w="8px" h="8px" borderRadius="full" bg="#dc2626" />
                          <Text>{t("orders.status.cancelled")}</Text>
                        </HStack>
                      </MenuItemOption>
                      <MenuItemOption value="refunded" fontSize="sm" fontWeight="500" borderRadius="8px" mx="8px">
                        <HStack spacing="8px">
                          <Box w="8px" h="8px" borderRadius="full" bg="#6366f1" />
                          <Text>{t("orders.status.refunded")}</Text>
                        </HStack>
                      </MenuItemOption>
                    </MenuOptionGroup>
                  </MenuList>
                </Portal>
              </Menu>

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
                {sortedOrders.length} {sortedOrders.length === 1 ? "order" : "orders"}
              </Badge>

              {/* Export Button - Mobile */}
              <Button
                display={{ base: "flex", md: "none" }}
                bgGradient={orangeGradient}
                color="white"
                leftIcon={<Icon as={MdDownload} w="18px" h="18px" />}
                borderRadius="14px"
                h="52px"
                px="20px"
                fontSize="sm"
                fontWeight="600"
                boxShadow="0 4px 12px rgba(231, 115, 36, 0.25)"
                w="100%"
              >
                {t("orders.export")}
              </Button>
            </HStack>
          </Flex>
        </Card>

        {/* Orders Table */}
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
                <Icon as={MdReceipt} w="20px" h="20px" color="white" />
              </Flex>
              <VStack align="flex-start" spacing="2px">
                <Text
                  color={textColor}
                  fontSize="lg"
                  fontWeight="700"
                  letterSpacing="-0.3px"
                >
                  All Orders
                </Text>
                <Text
                  color={textColorSecondary}
                  fontSize="sm"
                  fontWeight="400"
                >
                  {sortedOrders.length} records found
                </Text>
              </VStack>
            </HStack>

            {/* Column Selector */}
            <Menu placement="bottom-end" closeOnSelect={false}>
              <Tooltip label={t("orders.columns")} hasArrow>
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
                  minW="180px"
                  zIndex="modal"
                >
                  <Text px="16px" py="8px" fontSize="xs" fontWeight="700" color={textColorSecondary} textTransform="uppercase">
                    {t("orders.columns")}
                  </Text>
                  <MenuItem fontSize="sm" fontWeight="500" borderRadius="8px" mx="8px" py="10px">
                    <Checkbox colorScheme="orange" defaultChecked mr="12px" />
                    {t("orders.table.customer")}
                  </MenuItem>
                  <MenuItem fontSize="sm" fontWeight="500" borderRadius="8px" mx="8px" py="10px">
                    <Checkbox colorScheme="orange" defaultChecked mr="12px" />
                    {t("orders.table.orderDetails")}
                  </MenuItem>
                  <MenuItem fontSize="sm" fontWeight="500" borderRadius="8px" mx="8px" py="10px">
                    <Checkbox colorScheme="orange" defaultChecked mr="12px" />
                    {t("orders.table.items")}
                  </MenuItem>
                  <MenuItem fontSize="sm" fontWeight="500" borderRadius="8px" mx="8px" py="10px">
                    <Checkbox colorScheme="orange" defaultChecked mr="12px" />
                    {t("orders.table.amount")}
                  </MenuItem>
                  <MenuItem fontSize="sm" fontWeight="500" borderRadius="8px" mx="8px" py="10px">
                    <Checkbox colorScheme="orange" defaultChecked mr="12px" />
                    {t("orders.table.payment")}
                  </MenuItem>
                  <MenuItem fontSize="sm" fontWeight="500" borderRadius="8px" mx="8px" py="10px">
                    <Checkbox colorScheme="orange" defaultChecked mr="12px" />
                    {t("orders.table.status")}
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
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
                    {t("orders.table.customer")}
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
                    {t("orders.table.orderDetails")}
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
                    {t("orders.table.items")}
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
                    {t("orders.table.amount")}
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
                    {t("orders.table.payment")}
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
                    {t("orders.table.status")}
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
                    textAlign="center"
                  >
                    {t("orders.table.actions")}
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {sortedOrders.length > 0 ? (
                  sortedOrders.map((order) => (
                    <OrderRow key={order.id} order={order} t={t} />
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={7} textAlign="center" py="80px">
                      <VStack spacing="20px">
                        <Flex
                          w="80px"
                          h="80px"
                          bg={iconBg}
                          borderRadius="20px"
                          align="center"
                          justify="center"
                        >
                          <Icon as={MdReceipt} w="40px" h="40px" color={iconColor} opacity="0.6" />
                        </Flex>
                        <VStack spacing="8px">
                          <Text color={textColor} fontSize="lg" fontWeight="700">
                            {t("orders.noOrders")}
                          </Text>
                          <Text color={textColorSecondary} fontSize="sm" maxW="300px" textAlign="center">
                            No orders match your current filters. Try adjusting your search or filters.
                          </Text>
                        </VStack>
                        {statusFilter !== "all" && (
                          <Button
                            variant="outline"
                            leftIcon={<Icon as={MdRefresh} w="16px" h="16px" />}
                            borderColor={iconColor}
                            color={iconColor}
                            borderRadius="12px"
                            size="sm"
                            onClick={() => setStatusFilter("all")}
                            _hover={{ bg: iconBg }}
                          >
                            Clear Filters
                          </Button>
                        )}
                      </VStack>
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
