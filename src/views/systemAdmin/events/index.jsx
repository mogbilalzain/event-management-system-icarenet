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
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useLanguage } from "contexts/LanguageContext";
import { SearchIcon } from "@chakra-ui/icons";
import { 
  MdEvent,
  MdFilterList,
  MdDownload,
  MdCalendarToday,
  MdPeople,
  MdAttachMoney,
  MdCheckCircle,
  MdPending,
  MdCancel,
} from "react-icons/md";
import IconBox from "components/icons/IconBox";

export default function AllEvents() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock events data
  const [events] = useState([
    {
      id: 1,
      name: "Tech Conference 2025",
      organizer: "Tech Events Inc",
      date: "2025-01-15",
      status: "live",
      attendees: 450,
      revenue: 22500,
      category: "Technology",
    },
    {
      id: 2,
      name: "Summer Music Festival",
      organizer: "Music Festival Co",
      date: "2025-06-20",
      status: "upcoming",
      attendees: 1200,
      revenue: 60000,
      category: "Music",
    },
    {
      id: 3,
      name: "Business Summit",
      organizer: "Conference Hub",
      date: "2025-03-10",
      status: "upcoming",
      attendees: 320,
      revenue: 32000,
      category: "Business",
    },
    {
      id: 4,
      name: "Art Exhibition",
      organizer: "Workshop World",
      date: "2024-12-15",
      status: "ended",
      attendees: 180,
      revenue: 9000,
      category: "Arts",
    },
    {
      id: 5,
      name: "Sports Championship",
      organizer: "Sports Arena LLC",
      date: "2024-11-30",
      status: "cancelled",
      attendees: 0,
      revenue: 0,
      category: "Sports",
    },
  ]);

  // Filter events
  const filteredEvents = events.filter((event) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      event.name.toLowerCase().includes(searchLower) ||
      event.organizer.toLowerCase().includes(searchLower);
    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
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

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "live":
        return { bg: "green.100", color: "green.700", label: "Live", icon: MdCheckCircle };
      case "upcoming":
        return { bg: "blue.100", color: "blue.700", label: "Upcoming", icon: MdCalendarToday };
      case "ended":
        return { bg: "gray.100", color: "gray.700", label: "Ended", icon: MdPending };
      case "cancelled":
        return { bg: "red.100", color: "red.700", label: "Cancelled", icon: MdCancel };
      default:
        return { bg: "gray.100", color: "gray.700", label: status, icon: MdPending };
    }
  };

  // Stats
  const totalEvents = events.length;
  const liveEvents = events.filter(e => e.status === "live").length;
  const totalRevenue = events.reduce((sum, e) => sum + e.revenue, 0);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <VStack align="stretch" spacing="24px">
        {/* Page Header */}
        <Flex justify="space-between" align={{ base: "stretch", md: "center" }} direction={{ base: "column", md: "row" }} gap="20px" mb="8px">
          <HStack spacing="16px" align="center">
            <IconBox w="60px" h="60px" bg={iconBg} icon={<Icon w="34px" h="34px" as={MdEvent} color={iconColor} />} />
            <Box>
              <Text color={textColor} fontSize={{ base: "2xl", md: "3xl" }} fontWeight="800" letterSpacing="-0.5px" mb="4px">
                {t("systemAdmin.events.title")}
              </Text>
              <Text color={textColorSecondary} fontSize="md" fontWeight="400">
                {t("systemAdmin.events.subtitle")}
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
            _hover={{ transform: "translateY(-2px)", boxShadow: "0 12px 32px rgba(128, 90, 213, 0.35)" }}
          >
            {t("systemAdmin.events.exportReport")}
          </Button>
        </Flex>

        {/* Stats Cards */}
        <HStack spacing="16px" display={{ base: "none", md: "flex" }}>
          <Card p="20px" bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="20px" boxShadow={cardShadow} flex="1" transition="all 0.3s" _hover={{ transform: "translateY(-4px)", boxShadow: hoverShadow }} position="relative" overflow="hidden">
            <Box position="absolute" top="0" left="0" right="0" h="4px" bgGradient={purpleGradient} />
            <HStack spacing="14px">
              <Flex w="52px" h="52px" bgGradient={purpleGradient} borderRadius="14px" align="center" justify="center">
                <Icon as={MdEvent} w="26px" h="26px" color="white" />
              </Flex>
              <Box>
                <Text color={textColorSecondary} fontSize="xs" fontWeight="600" textTransform="uppercase">{t("systemAdmin.events.totalEvents")}</Text>
                <Text color={textColor} fontSize="2xl" fontWeight="800">{totalEvents}</Text>
              </Box>
            </HStack>
          </Card>
          <Card p="20px" bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="20px" boxShadow={cardShadow} flex="1" transition="all 0.3s" _hover={{ transform: "translateY(-4px)", boxShadow: hoverShadow }} position="relative" overflow="hidden">
            <Box position="absolute" top="0" left="0" right="0" h="4px" bg="linear-gradient(135deg, #16a34a 0%, #22c55e 100%)" />
            <HStack spacing="14px">
              <Flex w="52px" h="52px" bg="linear-gradient(135deg, #16a34a 0%, #22c55e 100%)" borderRadius="14px" align="center" justify="center">
                <Icon as={MdCheckCircle} w="26px" h="26px" color="white" />
              </Flex>
              <Box>
                <Text color={textColorSecondary} fontSize="xs" fontWeight="600" textTransform="uppercase">{t("systemAdmin.events.liveEvents")}</Text>
                <Text color={textColor} fontSize="2xl" fontWeight="800">{liveEvents}</Text>
              </Box>
            </HStack>
          </Card>
          <Card p="20px" bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="20px" boxShadow={cardShadow} flex="1" transition="all 0.3s" _hover={{ transform: "translateY(-4px)", boxShadow: hoverShadow }} position="relative" overflow="hidden">
            <Box position="absolute" top="0" left="0" right="0" h="4px" bg="linear-gradient(135deg, #e77324 0%, #F99C58 100%)" />
            <HStack spacing="14px">
              <Flex w="52px" h="52px" bg="linear-gradient(135deg, #e77324 0%, #F99C58 100%)" borderRadius="14px" align="center" justify="center">
                <Icon as={MdAttachMoney} w="26px" h="26px" color="white" />
              </Flex>
              <Box>
                <Text color={textColorSecondary} fontSize="xs" fontWeight="600" textTransform="uppercase">{t("systemAdmin.events.totalRevenue")}</Text>
                <Text color={textColor} fontSize="2xl" fontWeight="800">${totalRevenue.toLocaleString()}</Text>
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
                placeholder={t("systemAdmin.events.searchPlaceholder")}
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
                <option value="live">Live</option>
                <option value="upcoming">Upcoming</option>
                <option value="ended">Ended</option>
                <option value="cancelled">Cancelled</option>
              </Select>
              <Badge bg={iconBg} color={iconColor} fontSize="sm" fontWeight="700" px="16px" py="14px" borderRadius="full" display={{ base: "none", lg: "flex" }}>
                {filteredEvents.length} events
              </Badge>
            </HStack>
          </Flex>
        </Card>

        {/* Events Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing="20px">
          {filteredEvents.map((event) => {
            const statusBadge = getStatusBadge(event.status);
            const StatusIcon = statusBadge.icon;
            return (
              <Card
                key={event.id}
                p="20px"
                bg={cardBg}
                border="1px solid"
                borderColor={borderColor}
                borderRadius="20px"
                boxShadow={cardShadow}
                transition="all 0.3s"
                cursor="pointer"
                _hover={{ transform: "translateY(-4px)", boxShadow: hoverShadow, borderColor: iconColor }}
              >
                <VStack align="stretch" spacing="16px">
                  {/* Event Header */}
                  <Flex justify="space-between" align="flex-start">
                    <VStack align="flex-start" spacing="4px">
                      <Badge bg={statusBadge.bg} color={statusBadge.color} fontSize="xs" fontWeight="700" px="10px" py="4px" borderRadius="full" display="flex" alignItems="center" gap="4px">
                        <Icon as={StatusIcon} w="12px" h="12px" />
                        {statusBadge.label}
                      </Badge>
                      <Text color={textColor} fontSize="lg" fontWeight="700" noOfLines={2}>
                        {event.name}
                      </Text>
                    </VStack>
                    <Badge bg="gray.100" color="gray.600" fontSize="xs" fontWeight="600" px="8px" py="4px" borderRadius="full">
                      {event.category}
                    </Badge>
                  </Flex>

                  {/* Organizer */}
                  <Text color={textColorSecondary} fontSize="sm" fontWeight="500">
                    by {event.organizer}
                  </Text>

                  {/* Stats */}
                  <HStack justify="space-between" pt="8px" borderTop="1px solid" borderColor={borderColor}>
                    <VStack align="flex-start" spacing="2px">
                      <HStack spacing="4px">
                        <Icon as={MdPeople} w="14px" h="14px" color={textColorSecondary} />
                        <Text color={textColorSecondary} fontSize="xs" fontWeight="600">Attendees</Text>
                      </HStack>
                      <Text color={textColor} fontSize="md" fontWeight="700">{event.attendees}</Text>
                    </VStack>
                    <VStack align="flex-start" spacing="2px">
                      <HStack spacing="4px">
                        <Icon as={MdAttachMoney} w="14px" h="14px" color={textColorSecondary} />
                        <Text color={textColorSecondary} fontSize="xs" fontWeight="600">Revenue</Text>
                      </HStack>
                      <Text color={textColor} fontSize="md" fontWeight="700">${event.revenue.toLocaleString()}</Text>
                    </VStack>
                    <VStack align="flex-start" spacing="2px">
                      <HStack spacing="4px">
                        <Icon as={MdCalendarToday} w="14px" h="14px" color={textColorSecondary} />
                        <Text color={textColorSecondary} fontSize="xs" fontWeight="600">Date</Text>
                      </HStack>
                      <Text color={textColor} fontSize="md" fontWeight="700">{new Date(event.date).toLocaleDateString()}</Text>
                    </VStack>
                  </HStack>
                </VStack>
              </Card>
            );
          })}
        </SimpleGrid>
      </VStack>
    </Box>
  );
}

