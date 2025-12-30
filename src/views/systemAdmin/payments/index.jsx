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
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useLanguage } from "contexts/LanguageContext";
import { SearchIcon } from "@chakra-ui/icons";
import { 
  MdPayments,
  MdDownload,
  MdAttachMoney,
  MdCheckCircle,
  MdPending,
  MdTrendingUp,
} from "react-icons/md";
import IconBox from "components/icons/IconBox";

export default function Payments() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock payments data
  const [payments] = useState([
    {
      id: 1,
      transactionId: "TXN-ABC123",
      organizer: "Tech Events Inc",
      amount: 2500,
      fee: 125,
      net: 2375,
      status: "completed",
      date: "2024-12-30",
      method: "Stripe",
    },
    {
      id: 2,
      transactionId: "TXN-DEF456",
      organizer: "Music Festival Co",
      amount: 5000,
      fee: 250,
      net: 4750,
      status: "completed",
      date: "2024-12-29",
      method: "PayPal",
    },
    {
      id: 3,
      transactionId: "TXN-GHI789",
      organizer: "Conference Hub",
      amount: 1200,
      fee: 60,
      net: 1140,
      status: "pending",
      date: "2024-12-28",
      method: "Stripe",
    },
    {
      id: 4,
      transactionId: "TXN-JKL012",
      organizer: "Workshop World",
      amount: 800,
      fee: 40,
      net: 760,
      status: "failed",
      date: "2024-12-27",
      method: "Stripe",
    },
  ]);

  // Filter payments
  const filteredPayments = payments.filter((payment) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      payment.transactionId.toLowerCase().includes(searchLower) ||
      payment.organizer.toLowerCase().includes(searchLower);
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "secondaryGray.400");
  const cardBg = useColorModeValue("white", "navy.800");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.100");
  const inputBg = useColorModeValue("#f8fafc", "whiteAlpha.50");
  const inputBorderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const iconBg = useColorModeValue("purple.50", "rgba(128, 90, 213, 0.15)");
  const iconColor = useColorModeValue("purple.500", "purple.400");
  const purpleGradient = "linear-gradient(135deg, #805AD5 0%, #B794F4 100%)";
  const cardShadow = useColorModeValue("0px 4px 20px rgba(112, 144, 176, 0.08)", "unset");
  const hoverShadow = useColorModeValue("0px 8px 32px rgba(112, 144, 176, 0.15)", "0px 8px 32px rgba(0, 0, 0, 0.3)");
  const tableHeaderBg = useColorModeValue("linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)", "whiteAlpha.50");
  const hoverBg = useColorModeValue("gray.50", "whiteAlpha.50");

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return { bg: "green.100", color: "green.700", label: "Completed" };
      case "pending":
        return { bg: "yellow.100", color: "yellow.700", label: "Pending" };
      case "failed":
        return { bg: "red.100", color: "red.700", label: "Failed" };
      default:
        return { bg: "gray.100", color: "gray.700", label: status };
    }
  };

  // Stats
  const totalTransactions = payments.length;
  const totalAmount = payments.filter(p => p.status === "completed").reduce((sum, p) => sum + p.amount, 0);
  const totalFees = payments.filter(p => p.status === "completed").reduce((sum, p) => sum + p.fee, 0);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <VStack align="stretch" spacing="24px">
        {/* Page Header */}
        <Flex justify="space-between" align={{ base: "stretch", md: "center" }} direction={{ base: "column", md: "row" }} gap="20px" mb="8px">
          <HStack spacing="16px" align="center">
            <IconBox w="60px" h="60px" bg={iconBg} icon={<Icon w="34px" h="34px" as={MdPayments} color={iconColor} />} />
            <Box>
              <Text color={textColor} fontSize={{ base: "2xl", md: "3xl" }} fontWeight="800" letterSpacing="-0.5px" mb="4px">
                {t("systemAdmin.payments.title")}
              </Text>
              <Text color={textColorSecondary} fontSize="md" fontWeight="400">
                {t("systemAdmin.payments.subtitle")}
              </Text>
            </Box>
          </HStack>
          <Button
            bgGradient={purpleGradient}
            color="white"
            leftIcon={<Icon as={MdDownload} w="20px" h="20px" />}
            borderRadius="16px"
            h="52px"
            px="28px"
            fontSize="md"
            fontWeight="600"
            boxShadow="0 8px 24px rgba(128, 90, 213, 0.25)"
            _hover={{ transform: "translateY(-2px)" }}
          >
            Export Transactions
          </Button>
        </Flex>

        {/* Stats Cards */}
        <HStack spacing="16px" display={{ base: "none", md: "flex" }}>
          <Card p="20px" bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="20px" boxShadow={cardShadow} flex="1" transition="all 0.3s" _hover={{ transform: "translateY(-4px)", boxShadow: hoverShadow }} position="relative" overflow="hidden">
            <Box position="absolute" top="0" left="0" right="0" h="4px" bgGradient={purpleGradient} />
            <HStack spacing="14px">
              <Flex w="52px" h="52px" bgGradient={purpleGradient} borderRadius="14px" align="center" justify="center">
                <Icon as={MdPayments} w="26px" h="26px" color="white" />
              </Flex>
              <Box>
                <Text color={textColorSecondary} fontSize="xs" fontWeight="600" textTransform="uppercase">Total Transactions</Text>
                <Text color={textColor} fontSize="2xl" fontWeight="800">{totalTransactions}</Text>
              </Box>
            </HStack>
          </Card>
          <Card p="20px" bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="20px" boxShadow={cardShadow} flex="1" transition="all 0.3s" _hover={{ transform: "translateY(-4px)", boxShadow: hoverShadow }} position="relative" overflow="hidden">
            <Box position="absolute" top="0" left="0" right="0" h="4px" bg="linear-gradient(135deg, #16a34a 0%, #22c55e 100%)" />
            <HStack spacing="14px">
              <Flex w="52px" h="52px" bg="linear-gradient(135deg, #16a34a 0%, #22c55e 100%)" borderRadius="14px" align="center" justify="center">
                <Icon as={MdAttachMoney} w="26px" h="26px" color="white" />
              </Flex>
              <Box>
                <Text color={textColorSecondary} fontSize="xs" fontWeight="600" textTransform="uppercase">Total Processed</Text>
                <Text color={textColor} fontSize="2xl" fontWeight="800">${totalAmount.toLocaleString()}</Text>
              </Box>
            </HStack>
          </Card>
          <Card p="20px" bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="20px" boxShadow={cardShadow} flex="1" transition="all 0.3s" _hover={{ transform: "translateY(-4px)", boxShadow: hoverShadow }} position="relative" overflow="hidden">
            <Box position="absolute" top="0" left="0" right="0" h="4px" bg="linear-gradient(135deg, #e77324 0%, #F99C58 100%)" />
            <HStack spacing="14px">
              <Flex w="52px" h="52px" bg="linear-gradient(135deg, #e77324 0%, #F99C58 100%)" borderRadius="14px" align="center" justify="center">
                <Icon as={MdTrendingUp} w="26px" h="26px" color="white" />
              </Flex>
              <Box>
                <Text color={textColorSecondary} fontSize="xs" fontWeight="600" textTransform="uppercase">Platform Fees</Text>
                <Text color={textColor} fontSize="2xl" fontWeight="800">${totalFees.toLocaleString()}</Text>
              </Box>
            </HStack>
          </Card>
        </HStack>

        {/* Controls Bar */}
        <Card p="24px" bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="24px" boxShadow={cardShadow}>
          <Flex direction={{ base: "column", md: "row" }} gap="16px" align={{ base: "stretch", md: "center" }}>
            <InputGroup flex={{ base: "1", md: "0 0 380px" }}>
              <InputLeftElement pointerEvents="none" h="56px" pl="18px">
                <SearchIcon color={textColorSecondary} w="20px" h="20px" />
              </InputLeftElement>
              <Input
                placeholder="Search by transaction ID or organizer..."
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
                _focus={{ borderColor: iconColor, boxShadow: `0 0 0 4px rgba(128, 90, 213, 0.1)` }}
              />
            </InputGroup>
            <HStack spacing="12px" flex="1" justify={{ base: "stretch", md: "flex-end" }}>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                bg={inputBg}
                border="2px solid"
                borderColor={inputBorderColor}
                borderRadius="14px"
                h="52px"
                w="180px"
                fontSize="sm"
                fontWeight="600"
                display={{ base: "none", md: "block" }}
                _focus={{ borderColor: iconColor }}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </Select>
              <Badge bg={iconBg} color={iconColor} fontSize="sm" fontWeight="700" px="16px" py="14px" borderRadius="full" display={{ base: "none", lg: "flex" }}>
                {filteredPayments.length} transactions
              </Badge>
            </HStack>
          </Flex>
        </Card>

        {/* Payments Table */}
        <Card bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="24px" boxShadow={cardShadow} overflow="hidden">
          <Box overflowX="auto">
            <Table variant="simple" size="md">
              <Thead bgGradient={tableHeaderBg}>
                <Tr>
                  <Th color={textColor} fontSize="xs" fontWeight="800" textTransform="uppercase" px="20px" py="18px" borderBottom="2px solid" borderColor={borderColor}>Transaction</Th>
                  <Th color={textColor} fontSize="xs" fontWeight="800" textTransform="uppercase" px="20px" py="18px" borderBottom="2px solid" borderColor={borderColor}>Organizer</Th>
                  <Th color={textColor} fontSize="xs" fontWeight="800" textTransform="uppercase" px="20px" py="18px" borderBottom="2px solid" borderColor={borderColor}>Amount</Th>
                  <Th color={textColor} fontSize="xs" fontWeight="800" textTransform="uppercase" px="20px" py="18px" borderBottom="2px solid" borderColor={borderColor}>Fee</Th>
                  <Th color={textColor} fontSize="xs" fontWeight="800" textTransform="uppercase" px="20px" py="18px" borderBottom="2px solid" borderColor={borderColor}>Net</Th>
                  <Th color={textColor} fontSize="xs" fontWeight="800" textTransform="uppercase" px="20px" py="18px" borderBottom="2px solid" borderColor={borderColor}>Status</Th>
                  <Th color={textColor} fontSize="xs" fontWeight="800" textTransform="uppercase" px="20px" py="18px" borderBottom="2px solid" borderColor={borderColor}>Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredPayments.map((payment) => {
                  const statusBadge = getStatusBadge(payment.status);
                  return (
                    <Tr key={payment.id} _hover={{ bg: hoverBg }} transition="all 0.2s" cursor="pointer">
                      <Td px="20px" py="18px">
                        <VStack align="flex-start" spacing="2px">
                          <Text color={textColor} fontSize="sm" fontWeight="700" fontFamily="mono">{payment.transactionId}</Text>
                          <Text color={textColorSecondary} fontSize="xs">{payment.method}</Text>
                        </VStack>
                      </Td>
                      <Td px="20px" py="18px">
                        <HStack spacing="10px">
                          <Avatar size="sm" name={payment.organizer} bgGradient={purpleGradient} color="white" />
                          <Text color={textColor} fontSize="sm" fontWeight="600">{payment.organizer}</Text>
                        </HStack>
                      </Td>
                      <Td px="20px" py="18px">
                        <Text color={textColor} fontSize="sm" fontWeight="700">${payment.amount.toLocaleString()}</Text>
                      </Td>
                      <Td px="20px" py="18px">
                        <Text color="red.500" fontSize="sm" fontWeight="600">-${payment.fee}</Text>
                      </Td>
                      <Td px="20px" py="18px">
                        <Text color="green.500" fontSize="sm" fontWeight="700">${payment.net.toLocaleString()}</Text>
                      </Td>
                      <Td px="20px" py="18px">
                        <Badge bg={statusBadge.bg} color={statusBadge.color} fontSize="xs" fontWeight="700" px="12px" py="6px" borderRadius="full" textTransform="uppercase">
                          {statusBadge.label}
                        </Badge>
                      </Td>
                      <Td px="20px" py="18px">
                        <Text color={textColorSecondary} fontSize="sm">{new Date(payment.date).toLocaleDateString()}</Text>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Box>
        </Card>
      </VStack>
    </Box>
  );
}

