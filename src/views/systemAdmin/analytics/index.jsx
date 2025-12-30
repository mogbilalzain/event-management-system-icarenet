// Chakra imports
import {
  Box,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Icon,
  Flex,
  Card,
  SimpleGrid,
  Select,
  Button,
  Badge,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useLanguage } from "contexts/LanguageContext";
import { 
  MdAnalytics,
  MdTrendingUp,
  MdPeople,
  MdEvent,
  MdAttachMoney,
  MdDownload,
  MdCalendarToday,
  MdArrowUpward,
  MdArrowDownward,
} from "react-icons/md";
import IconBox from "components/icons/IconBox";

export default function Analytics() {
  const { t } = useLanguage();
  const [timeRange, setTimeRange] = useState("30days");

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
  const greenGradient = "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)";
  const blueGradient = "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)";
  const orangeGradient = "linear-gradient(135deg, #e77324 0%, #F99C58 100%)";
  const cardShadow = useColorModeValue("0px 4px 20px rgba(112, 144, 176, 0.08)", "unset");
  const hoverShadow = useColorModeValue("0px 8px 32px rgba(112, 144, 176, 0.15)", "0px 8px 32px rgba(0, 0, 0, 0.3)");
  const chartBg = useColorModeValue("gray.50", "whiteAlpha.50");
  const hoverBg = useColorModeValue("gray.100", "whiteAlpha.100");

  // Mock analytics data
  const stats = {
    totalRevenue: 458920,
    revenueGrowth: 24.8,
    totalUsers: 12458,
    usersGrowth: 12.5,
    totalEvents: 1567,
    eventsGrowth: 8.3,
    avgTicketPrice: 45.50,
    ticketGrowth: 5.2,
  };

  const topOrganizers = [
    { name: "Tech Events Inc", events: 45, revenue: 125000 },
    { name: "Conference Hub", events: 67, revenue: 350000 },
    { name: "Music Festival Co", events: 23, revenue: 85000 },
    { name: "Sports Arena LLC", events: 34, revenue: 156000 },
  ];

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <VStack align="stretch" spacing="24px">
        {/* Page Header */}
        <Flex justify="space-between" align={{ base: "stretch", md: "center" }} direction={{ base: "column", md: "row" }} gap="20px" mb="8px">
          <HStack spacing="16px" align="center">
            <IconBox w="60px" h="60px" bg={iconBg} icon={<Icon w="34px" h="34px" as={MdAnalytics} color={iconColor} />} />
            <Box>
              <Text color={textColor} fontSize={{ base: "2xl", md: "3xl" }} fontWeight="800" letterSpacing="-0.5px" mb="4px">
                {t("systemAdmin.analytics.title")}
              </Text>
              <Text color={textColorSecondary} fontSize="md" fontWeight="400">
                {t("systemAdmin.analytics.subtitle")}
              </Text>
            </Box>
          </HStack>
          <HStack spacing="12px">
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              bg={inputBg}
              border="2px solid"
              borderColor={inputBorderColor}
              borderRadius="14px"
              h="48px"
              w="180px"
              fontSize="sm"
              fontWeight="600"
              _focus={{ borderColor: iconColor }}
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="year">This Year</option>
            </Select>
            <Button
              bgGradient={purpleGradient}
              color="white"
              leftIcon={<Icon as={MdDownload} w="18px" h="18px" />}
              borderRadius="14px"
              h="48px"
              px="24px"
              fontSize="md"
              fontWeight="600"
              boxShadow="0 4px 16px rgba(128, 90, 213, 0.25)"
              _hover={{ transform: "translateY(-2px)" }}
            >
              Export Report
            </Button>
          </HStack>
        </Flex>

        {/* Stats Cards */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing="16px">
          <Card p="20px" bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="20px" boxShadow={cardShadow} transition="all 0.3s" _hover={{ transform: "translateY(-4px)", boxShadow: hoverShadow }} position="relative" overflow="hidden">
            <Box position="absolute" top="0" left="0" right="0" h="4px" bgGradient={orangeGradient} />
            <HStack justify="space-between" align="flex-start">
              <VStack align="flex-start" spacing="4px">
                <Text color={textColorSecondary} fontSize="xs" fontWeight="600" textTransform="uppercase">Total Revenue</Text>
                <Text color={textColor} fontSize="2xl" fontWeight="800">${stats.totalRevenue.toLocaleString()}</Text>
                <HStack spacing="4px">
                  <Icon as={MdArrowUpward} w="14px" h="14px" color="green.500" />
                  <Text color="green.500" fontSize="xs" fontWeight="600">+{stats.revenueGrowth}%</Text>
                </HStack>
              </VStack>
              <Flex w="48px" h="48px" bgGradient={orangeGradient} borderRadius="12px" align="center" justify="center">
                <Icon as={MdAttachMoney} w="24px" h="24px" color="white" />
              </Flex>
            </HStack>
          </Card>

          <Card p="20px" bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="20px" boxShadow={cardShadow} transition="all 0.3s" _hover={{ transform: "translateY(-4px)", boxShadow: hoverShadow }} position="relative" overflow="hidden">
            <Box position="absolute" top="0" left="0" right="0" h="4px" bgGradient={purpleGradient} />
            <HStack justify="space-between" align="flex-start">
              <VStack align="flex-start" spacing="4px">
                <Text color={textColorSecondary} fontSize="xs" fontWeight="600" textTransform="uppercase">Total Users</Text>
                <Text color={textColor} fontSize="2xl" fontWeight="800">{stats.totalUsers.toLocaleString()}</Text>
                <HStack spacing="4px">
                  <Icon as={MdArrowUpward} w="14px" h="14px" color="green.500" />
                  <Text color="green.500" fontSize="xs" fontWeight="600">+{stats.usersGrowth}%</Text>
                </HStack>
              </VStack>
              <Flex w="48px" h="48px" bgGradient={purpleGradient} borderRadius="12px" align="center" justify="center">
                <Icon as={MdPeople} w="24px" h="24px" color="white" />
              </Flex>
            </HStack>
          </Card>

          <Card p="20px" bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="20px" boxShadow={cardShadow} transition="all 0.3s" _hover={{ transform: "translateY(-4px)", boxShadow: hoverShadow }} position="relative" overflow="hidden">
            <Box position="absolute" top="0" left="0" right="0" h="4px" bgGradient={blueGradient} />
            <HStack justify="space-between" align="flex-start">
              <VStack align="flex-start" spacing="4px">
                <Text color={textColorSecondary} fontSize="xs" fontWeight="600" textTransform="uppercase">Total Events</Text>
                <Text color={textColor} fontSize="2xl" fontWeight="800">{stats.totalEvents.toLocaleString()}</Text>
                <HStack spacing="4px">
                  <Icon as={MdArrowUpward} w="14px" h="14px" color="green.500" />
                  <Text color="green.500" fontSize="xs" fontWeight="600">+{stats.eventsGrowth}%</Text>
                </HStack>
              </VStack>
              <Flex w="48px" h="48px" bgGradient={blueGradient} borderRadius="12px" align="center" justify="center">
                <Icon as={MdEvent} w="24px" h="24px" color="white" />
              </Flex>
            </HStack>
          </Card>

          <Card p="20px" bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="20px" boxShadow={cardShadow} transition="all 0.3s" _hover={{ transform: "translateY(-4px)", boxShadow: hoverShadow }} position="relative" overflow="hidden">
            <Box position="absolute" top="0" left="0" right="0" h="4px" bgGradient={greenGradient} />
            <HStack justify="space-between" align="flex-start">
              <VStack align="flex-start" spacing="4px">
                <Text color={textColorSecondary} fontSize="xs" fontWeight="600" textTransform="uppercase">Avg Ticket Price</Text>
                <Text color={textColor} fontSize="2xl" fontWeight="800">${stats.avgTicketPrice}</Text>
                <HStack spacing="4px">
                  <Icon as={MdArrowUpward} w="14px" h="14px" color="green.500" />
                  <Text color="green.500" fontSize="xs" fontWeight="600">+{stats.ticketGrowth}%</Text>
                </HStack>
              </VStack>
              <Flex w="48px" h="48px" bgGradient={greenGradient} borderRadius="12px" align="center" justify="center">
                <Icon as={MdTrendingUp} w="24px" h="24px" color="white" />
              </Flex>
            </HStack>
          </Card>
        </SimpleGrid>

        {/* Charts Area */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="24px">
          {/* Revenue Chart Placeholder */}
          <Card p="24px" bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="24px" boxShadow={cardShadow}>
            <HStack justify="space-between" mb="20px">
              <VStack align="flex-start" spacing="0">
                <Text color={textColor} fontSize="lg" fontWeight="700">Revenue Overview</Text>
                <Text color={textColorSecondary} fontSize="sm">Monthly revenue trends</Text>
              </VStack>
              <Badge bg={iconBg} color={iconColor} fontSize="xs" fontWeight="600" px="10px" py="4px" borderRadius="full">
                +24.8% this month
              </Badge>
            </HStack>
            <Flex h="250px" bg={chartBg} borderRadius="16px" align="center" justify="center">
              <VStack spacing="8px">
                <Icon as={MdAnalytics} w="40px" h="40px" color={textColorSecondary} opacity="0.5" />
                <Text color={textColorSecondary} fontSize="sm">Revenue Chart Placeholder</Text>
              </VStack>
            </Flex>
          </Card>

          {/* Top Organizers */}
          <Card p="24px" bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="24px" boxShadow={cardShadow}>
            <HStack justify="space-between" mb="20px">
              <VStack align="flex-start" spacing="0">
                <Text color={textColor} fontSize="lg" fontWeight="700">Top Organizers</Text>
                <Text color={textColorSecondary} fontSize="sm">By revenue generated</Text>
              </VStack>
              <Button variant="ghost" color={iconColor} fontSize="sm" fontWeight="600" _hover={{ bg: iconBg }}>
                View All
              </Button>
            </HStack>
            <VStack spacing="16px" align="stretch">
              {topOrganizers.map((org, index) => (
                <Flex
                  key={index}
                  p="16px"
                  bg={chartBg}
                  borderRadius="16px"
                  justify="space-between"
                  align="center"
                  transition="all 0.2s"
                  _hover={{ bg: hoverBg }}
                >
                  <HStack spacing="12px">
                    <Flex w="36px" h="36px" bgGradient={purpleGradient} borderRadius="10px" align="center" justify="center">
                      <Text color="white" fontSize="sm" fontWeight="700">#{index + 1}</Text>
                    </Flex>
                    <VStack align="flex-start" spacing="2px">
                      <Text color={textColor} fontSize="sm" fontWeight="600">{org.name}</Text>
                      <Text color={textColorSecondary} fontSize="xs">{org.events} events</Text>
                    </VStack>
                  </HStack>
                  <Text color={textColor} fontSize="sm" fontWeight="700">${org.revenue.toLocaleString()}</Text>
                </Flex>
              ))}
            </VStack>
          </Card>
        </SimpleGrid>
      </VStack>
    </Box>
  );
}

