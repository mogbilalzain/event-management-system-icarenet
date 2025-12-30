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
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
  Divider,
  Progress,
} from "@chakra-ui/react";
import React, { useState } from "react";
// Language Context
import { useLanguage } from "contexts/LanguageContext";
import { SearchIcon } from "@chakra-ui/icons";
import { 
  MdBusiness,
  MdAdd,
  MdFilterList,
  MdDownload,
  MdMoreVert,
  MdEdit,
  MdBlock,
  MdDelete,
  MdCheckCircle,
  MdVisibility,
  MdEvent,
  MdPeople,
  MdAttachMoney,
} from "react-icons/md";
// Components
import IconBox from "components/icons/IconBox";

export default function OrganizersManagement() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock organizers data
  const [organizers] = useState([
    {
      id: 1,
      name: "Tech Events Inc",
      email: "contact@techevents.com",
      status: "verified",
      totalEvents: 45,
      totalAttendees: 12500,
      revenue: 125000,
      joinDate: "2023-06-15",
      planType: "premium",
    },
    {
      id: 2,
      name: "Music Festival Co",
      email: "info@musicfestival.com",
      status: "verified",
      totalEvents: 23,
      totalAttendees: 8500,
      revenue: 85000,
      joinDate: "2023-09-20",
      planType: "business",
    },
    {
      id: 3,
      name: "Sports Arena LLC",
      email: "hello@sportsarena.com",
      status: "pending",
      totalEvents: 0,
      totalAttendees: 0,
      revenue: 0,
      joinDate: "2024-12-28",
      planType: "starter",
    },
    {
      id: 4,
      name: "Conference Hub",
      email: "team@conferencehub.com",
      status: "verified",
      totalEvents: 67,
      totalAttendees: 25000,
      revenue: 350000,
      joinDate: "2022-11-10",
      planType: "enterprise",
    },
    {
      id: 5,
      name: "Workshop World",
      email: "support@workshopworld.com",
      status: "suspended",
      totalEvents: 12,
      totalAttendees: 1500,
      revenue: 15000,
      joinDate: "2024-03-05",
      planType: "business",
    },
  ]);

  // Filter organizers
  const filteredOrganizers = organizers.filter((org) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      org.name.toLowerCase().includes(searchLower) ||
      org.email.toLowerCase().includes(searchLower);
    const matchesStatus = statusFilter === "all" || org.status === statusFilter;
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
  const menuShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.15)", "0px 18px 40px rgba(0, 0, 0, 0.4)");

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "verified":
        return { bg: "green.100", color: "green.700", label: "Verified" };
      case "pending":
        return { bg: "yellow.100", color: "yellow.700", label: "Pending" };
      case "suspended":
        return { bg: "red.100", color: "red.700", label: "Suspended" };
      default:
        return { bg: "gray.100", color: "gray.700", label: status };
    }
  };

  // Get plan badge
  const getPlanBadge = (plan) => {
    switch (plan) {
      case "enterprise":
        return { bg: "purple.100", color: "purple.700", label: "Enterprise" };
      case "premium":
        return { bg: "blue.100", color: "blue.700", label: "Premium" };
      case "business":
        return { bg: "green.100", color: "green.700", label: "Business" };
      case "starter":
        return { bg: "gray.100", color: "gray.700", label: "Starter" };
      default:
        return { bg: "gray.100", color: "gray.700", label: plan };
    }
  };

  // Stats
  const totalOrganizers = organizers.length;
  const verifiedOrganizers = organizers.filter(o => o.status === "verified").length;
  const totalRevenue = organizers.reduce((sum, o) => sum + o.revenue, 0);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <VStack align="stretch" spacing="24px">
        {/* Page Header */}
        <Flex justify="space-between" align={{ base: "stretch", md: "center" }} direction={{ base: "column", md: "row" }} gap="20px" mb="8px">
          <HStack spacing="16px" align="center">
            <IconBox w="60px" h="60px" bg={iconBg} icon={<Icon w="34px" h="34px" as={MdBusiness} color={iconColor} />} />
            <Box>
              <Text color={textColor} fontSize={{ base: "2xl", md: "3xl" }} fontWeight="800" letterSpacing="-0.5px" mb="4px">
                {t("systemAdmin.organizers.title")}
              </Text>
              <Text color={textColorSecondary} fontSize="md" fontWeight="400">
                {t("systemAdmin.organizers.subtitle")}
              </Text>
            </Box>
          </HStack>
          <Button
            bgGradient={purpleGradient}
            color="white"
            leftIcon={<Icon as={MdAdd} w="20px" h="20px" />}
            borderRadius="16px"
            h="52px"
            px="28px"
            fontSize="md"
            fontWeight="600"
            boxShadow="0 8px 24px rgba(128, 90, 213, 0.25)"
            _hover={{ transform: "translateY(-2px)", boxShadow: "0 12px 32px rgba(128, 90, 213, 0.35)" }}
          >
            {t("systemAdmin.organizers.addOrganizer")}
          </Button>
        </Flex>

        {/* Stats Cards */}
        <HStack spacing="16px" display={{ base: "none", md: "flex" }}>
          <Card p="20px" bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="20px" boxShadow={cardShadow} flex="1" transition="all 0.3s" _hover={{ transform: "translateY(-4px)", boxShadow: hoverShadow }} position="relative" overflow="hidden">
            <Box position="absolute" top="0" left="0" right="0" h="4px" bgGradient={purpleGradient} />
            <HStack spacing="14px">
              <Flex w="52px" h="52px" bgGradient={purpleGradient} borderRadius="14px" align="center" justify="center">
                <Icon as={MdBusiness} w="26px" h="26px" color="white" />
              </Flex>
              <Box>
                <Text color={textColorSecondary} fontSize="xs" fontWeight="600" textTransform="uppercase">{t("systemAdmin.organizers.total")}</Text>
                <Text color={textColor} fontSize="2xl" fontWeight="800">{totalOrganizers}</Text>
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
                <Text color={textColorSecondary} fontSize="xs" fontWeight="600" textTransform="uppercase">{t("systemAdmin.organizers.verified")}</Text>
                <Text color={textColor} fontSize="2xl" fontWeight="800">{verifiedOrganizers}</Text>
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
                <Text color={textColorSecondary} fontSize="xs" fontWeight="600" textTransform="uppercase">{t("systemAdmin.organizers.revenue")}</Text>
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
                placeholder={t("systemAdmin.organizers.searchPlaceholder")}
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
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </Select>
              <Button bgGradient={purpleGradient} color="white" leftIcon={<Icon as={MdDownload} w="18px" h="18px" />} borderRadius="14px" h="52px" px="20px" fontSize="sm" fontWeight="600" _hover={{ transform: "translateY(-2px)" }}>
                {t("systemAdmin.organizers.export")}
              </Button>
              <Badge bg={iconBg} color={iconColor} fontSize="sm" fontWeight="700" px="16px" py="14px" borderRadius="full" display={{ base: "none", lg: "flex" }}>
                {filteredOrganizers.length} organizers
              </Badge>
            </HStack>
          </Flex>
        </Card>

        {/* Organizers Table */}
        <Card bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="24px" boxShadow={cardShadow} overflow="hidden">
          <Box overflowX="auto">
            <Table variant="simple" size="md">
              <Thead bgGradient={tableHeaderBg}>
                <Tr>
                  <Th color={textColor} fontSize="xs" fontWeight="800" textTransform="uppercase" px="20px" py="18px" borderBottom="2px solid" borderColor={borderColor}>
                    Organizer
                  </Th>
                  <Th color={textColor} fontSize="xs" fontWeight="800" textTransform="uppercase" px="20px" py="18px" borderBottom="2px solid" borderColor={borderColor}>
                    Plan
                  </Th>
                  <Th color={textColor} fontSize="xs" fontWeight="800" textTransform="uppercase" px="20px" py="18px" borderBottom="2px solid" borderColor={borderColor}>
                    Status
                  </Th>
                  <Th color={textColor} fontSize="xs" fontWeight="800" textTransform="uppercase" px="20px" py="18px" borderBottom="2px solid" borderColor={borderColor}>
                    Events
                  </Th>
                  <Th color={textColor} fontSize="xs" fontWeight="800" textTransform="uppercase" px="20px" py="18px" borderBottom="2px solid" borderColor={borderColor}>
                    Revenue
                  </Th>
                  <Th color={textColor} fontSize="xs" fontWeight="800" textTransform="uppercase" px="20px" py="18px" borderBottom="2px solid" borderColor={borderColor} textAlign="center">
                    Actions
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredOrganizers.map((org) => {
                  const statusBadge = getStatusBadge(org.status);
                  const planBadge = getPlanBadge(org.planType);
                  return (
                    <Tr key={org.id} _hover={{ bg: hoverBg }} transition="all 0.2s" cursor="pointer">
                      <Td px="20px" py="18px">
                        <HStack spacing="14px">
                          <Avatar size="md" name={org.name} bgGradient={purpleGradient} color="white" fontWeight="700" />
                          <VStack align="flex-start" spacing="2px">
                            <Text color={textColor} fontSize="sm" fontWeight="700">{org.name}</Text>
                            <Text color={textColorSecondary} fontSize="xs">{org.email}</Text>
                          </VStack>
                        </HStack>
                      </Td>
                      <Td px="20px" py="18px">
                        <Badge bg={planBadge.bg} color={planBadge.color} fontSize="xs" fontWeight="700" px="12px" py="6px" borderRadius="full" textTransform="uppercase">
                          {planBadge.label}
                        </Badge>
                      </Td>
                      <Td px="20px" py="18px">
                        <Badge bg={statusBadge.bg} color={statusBadge.color} fontSize="xs" fontWeight="700" px="12px" py="6px" borderRadius="full" textTransform="uppercase">
                          {statusBadge.label}
                        </Badge>
                      </Td>
                      <Td px="20px" py="18px">
                        <HStack spacing="6px">
                          <Icon as={MdEvent} w="16px" h="16px" color={textColorSecondary} />
                          <Text color={textColor} fontSize="sm" fontWeight="600">{org.totalEvents}</Text>
                        </HStack>
                      </Td>
                      <Td px="20px" py="18px">
                        <Text color={textColor} fontSize="sm" fontWeight="700">${org.revenue.toLocaleString()}</Text>
                      </Td>
                      <Td px="20px" py="18px" textAlign="center">
                        <Menu placement="bottom-end" isLazy>
                          <MenuButton as={IconButton} icon={<Icon as={MdMoreVert} w="20px" h="20px" />} variant="ghost" color={textColorSecondary} borderRadius="full" _hover={{ bg: iconBg, color: iconColor }} />
                          <Portal>
                            <MenuList bg={cardBg} borderColor={borderColor} borderRadius="16px" boxShadow={menuShadow} py="10px" minW="200px" zIndex="modal">
                              <MenuItem icon={<Icon as={MdVisibility} w="18px" h="18px" />} fontSize="sm" fontWeight="600" borderRadius="10px" mx="8px" py="12px" _hover={{ bg: iconBg, color: iconColor }}>View Profile</MenuItem>
                              <MenuItem icon={<Icon as={MdEdit} w="18px" h="18px" />} fontSize="sm" fontWeight="600" borderRadius="10px" mx="8px" py="12px" _hover={{ bg: iconBg, color: iconColor }}>Edit</MenuItem>
                              <MenuItem icon={<Icon as={MdBlock} w="18px" h="18px" />} fontSize="sm" fontWeight="600" borderRadius="10px" mx="8px" py="12px" _hover={{ bg: iconBg, color: iconColor }}>{org.status === "suspended" ? "Activate" : "Suspend"}</MenuItem>
                              <Divider my="8px" />
                              <MenuItem icon={<Icon as={MdDelete} w="18px" h="18px" />} fontSize="sm" fontWeight="600" borderRadius="10px" mx="8px" py="12px" color="red.500" _hover={{ bg: "red.50", color: "red.600" }}>Delete</MenuItem>
                            </MenuList>
                          </Portal>
                        </Menu>
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

