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
  Tooltip,
  Divider,
} from "@chakra-ui/react";
import React, { useState } from "react";
// Language Context
import { useLanguage } from "contexts/LanguageContext";
import { SearchIcon } from "@chakra-ui/icons";
import { 
  MdPeople,
  MdAdd,
  MdFilterList,
  MdDownload,
  MdMoreVert,
  MdEdit,
  MdBlock,
  MdDelete,
  MdCheckCircle,
  MdVisibility,
  MdSort,
  MdPersonAdd,
} from "react-icons/md";
// Components
import IconBox from "components/icons/IconBox";

export default function UsersManagement() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [roleFilter, setRoleFilter] = useState("all");

  // Mock users data
  const [users] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "user",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "organizer",
      status: "active",
      joinDate: "2024-02-20",
      lastActive: "5 minutes ago",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.j@example.com",
      role: "admin",
      status: "active",
      joinDate: "2023-11-10",
      lastActive: "1 day ago",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah.w@example.com",
      role: "user",
      status: "suspended",
      joinDate: "2024-03-05",
      lastActive: "1 week ago",
    },
    {
      id: 5,
      name: "David Brown",
      email: "david.b@example.com",
      role: "organizer",
      status: "pending",
      joinDate: "2024-12-28",
      lastActive: "Just now",
    },
  ]);

  // Filter users
  const filteredUsers = users.filter((user) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower);
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
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
  const cardShadow = useColorModeValue(
    "0px 4px 20px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  const hoverShadow = useColorModeValue(
    "0px 8px 32px rgba(112, 144, 176, 0.15)",
    "0px 8px 32px rgba(0, 0, 0, 0.3)"
  );
  const tableHeaderBg = useColorModeValue(
    "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
    "whiteAlpha.50"
  );
  const hoverBg = useColorModeValue("gray.50", "whiteAlpha.50");
  const menuShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.15)",
    "0px 18px 40px rgba(0, 0, 0, 0.4)"
  );

  // Get role badge
  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return { bg: "purple.100", color: "purple.700", label: "Admin" };
      case "organizer":
        return { bg: "blue.100", color: "blue.700", label: "Organizer" };
      case "user":
        return { bg: "gray.100", color: "gray.700", label: "User" };
      default:
        return { bg: "gray.100", color: "gray.700", label: role };
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return { bg: "green.100", color: "green.700", label: "Active" };
      case "suspended":
        return { bg: "red.100", color: "red.700", label: "Suspended" };
      case "pending":
        return { bg: "yellow.100", color: "yellow.700", label: "Pending" };
      default:
        return { bg: "gray.100", color: "gray.700", label: status };
    }
  };

  // Stats
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === "active").length;
  const organizers = users.filter(u => u.role === "organizer").length;

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
                {t("systemAdmin.users.title")}
              </Text>
              <Text
                color={textColorSecondary}
                fontSize="md"
                fontWeight="400"
              >
                {t("systemAdmin.users.subtitle")}
              </Text>
            </Box>
          </HStack>

          <Button
            bgGradient={purpleGradient}
            color="white"
            leftIcon={<Icon as={MdPersonAdd} w="20px" h="20px" />}
            borderRadius="16px"
            h="52px"
            px="28px"
            fontSize="md"
            fontWeight="600"
            boxShadow="0 8px 24px rgba(128, 90, 213, 0.25)"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "0 12px 32px rgba(128, 90, 213, 0.35)",
            }}
            _active={{
              transform: "translateY(0px)",
              boxShadow: "0 6px 16px rgba(128, 90, 213, 0.3)",
            }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          >
            {t("systemAdmin.users.addUser")}
          </Button>
        </Flex>

        {/* Stats Cards */}
        <HStack spacing="16px" display={{ base: "none", md: "flex" }}>
          <Card
            p="20px"
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="20px"
            boxShadow={cardShadow}
            flex="1"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-4px)", boxShadow: hoverShadow }}
            position="relative"
            overflow="hidden"
          >
            <Box position="absolute" top="0" left="0" right="0" h="4px" bgGradient={purpleGradient} />
            <HStack spacing="14px">
              <Flex w="52px" h="52px" bgGradient={purpleGradient} borderRadius="14px" align="center" justify="center">
                <Icon as={MdPeople} w="26px" h="26px" color="white" />
              </Flex>
              <Box>
                <Text color={textColorSecondary} fontSize="xs" fontWeight="600" textTransform="uppercase">
                  {t("systemAdmin.users.totalUsers")}
                </Text>
                <Text color={textColor} fontSize="2xl" fontWeight="800">{totalUsers}</Text>
              </Box>
            </HStack>
          </Card>
          <Card
            p="20px"
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="20px"
            boxShadow={cardShadow}
            flex="1"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-4px)", boxShadow: hoverShadow }}
            position="relative"
            overflow="hidden"
          >
            <Box position="absolute" top="0" left="0" right="0" h="4px" bg="linear-gradient(135deg, #16a34a 0%, #22c55e 100%)" />
            <HStack spacing="14px">
              <Flex w="52px" h="52px" bg="linear-gradient(135deg, #16a34a 0%, #22c55e 100%)" borderRadius="14px" align="center" justify="center">
                <Icon as={MdCheckCircle} w="26px" h="26px" color="white" />
              </Flex>
              <Box>
                <Text color={textColorSecondary} fontSize="xs" fontWeight="600" textTransform="uppercase">
                  {t("systemAdmin.users.activeUsers")}
                </Text>
                <Text color={textColor} fontSize="2xl" fontWeight="800">{activeUsers}</Text>
              </Box>
            </HStack>
          </Card>
          <Card
            p="20px"
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="20px"
            boxShadow={cardShadow}
            flex="1"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-4px)", boxShadow: hoverShadow }}
            position="relative"
            overflow="hidden"
          >
            <Box position="absolute" top="0" left="0" right="0" h="4px" bg="linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)" />
            <HStack spacing="14px">
              <Flex w="52px" h="52px" bg="linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)" borderRadius="14px" align="center" justify="center">
                <Icon as={MdPeople} w="26px" h="26px" color="white" />
              </Flex>
              <Box>
                <Text color={textColorSecondary} fontSize="xs" fontWeight="600" textTransform="uppercase">
                  {t("systemAdmin.users.organizers")}
                </Text>
                <Text color={textColor} fontSize="2xl" fontWeight="800">{organizers}</Text>
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
                placeholder={t("systemAdmin.users.searchPlaceholder")}
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
              <HStack spacing="8px" display={{ base: "none", md: "flex" }}>
                <Icon as={MdSort} w="18px" h="18px" color={textColorSecondary} />
                <Select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  bg={inputBg}
                  border="2px solid"
                  borderColor={inputBorderColor}
                  borderRadius="14px"
                  h="52px"
                  w="160px"
                  fontSize="sm"
                  fontWeight="600"
                  _focus={{ borderColor: iconColor }}
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admins</option>
                  <option value="organizer">Organizers</option>
                  <option value="user">Users</option>
                </Select>
              </HStack>

              <Button
                bgGradient={purpleGradient}
                color="white"
                leftIcon={<Icon as={MdDownload} w="18px" h="18px" />}
                borderRadius="14px"
                h="52px"
                px="20px"
                fontSize="sm"
                fontWeight="600"
                boxShadow="0 4px 12px rgba(128, 90, 213, 0.25)"
                _hover={{ transform: "translateY(-2px)" }}
              >
                {t("systemAdmin.users.export")}
              </Button>

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
                {filteredUsers.length} users
              </Badge>
            </HStack>
          </Flex>
        </Card>

        {/* Users Table */}
        <Card bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="24px" boxShadow={cardShadow} overflow="hidden">
          <Box overflowX="auto">
            <Table variant="simple" size="md">
              <Thead bgGradient={tableHeaderBg}>
                <Tr>
                  <Th color={textColor} fontSize="xs" fontWeight="800" textTransform="uppercase" px="20px" py="18px" borderBottom="2px solid" borderColor={borderColor}>
                    {t("systemAdmin.users.table.user")}
                  </Th>
                  <Th color={textColor} fontSize="xs" fontWeight="800" textTransform="uppercase" px="20px" py="18px" borderBottom="2px solid" borderColor={borderColor}>
                    {t("systemAdmin.users.table.role")}
                  </Th>
                  <Th color={textColor} fontSize="xs" fontWeight="800" textTransform="uppercase" px="20px" py="18px" borderBottom="2px solid" borderColor={borderColor}>
                    {t("systemAdmin.users.table.status")}
                  </Th>
                  <Th color={textColor} fontSize="xs" fontWeight="800" textTransform="uppercase" px="20px" py="18px" borderBottom="2px solid" borderColor={borderColor}>
                    {t("systemAdmin.users.table.lastActive")}
                  </Th>
                  <Th color={textColor} fontSize="xs" fontWeight="800" textTransform="uppercase" px="20px" py="18px" borderBottom="2px solid" borderColor={borderColor} textAlign="center">
                    {t("systemAdmin.users.table.actions")}
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredUsers.map((user) => {
                  const roleBadge = getRoleBadge(user.role);
                  const statusBadge = getStatusBadge(user.status);
                  return (
                    <Tr key={user.id} _hover={{ bg: hoverBg }} transition="all 0.2s" cursor="pointer">
                      <Td px="20px" py="18px">
                        <HStack spacing="14px">
                          <Avatar
                            size="md"
                            name={user.name}
                            bgGradient={purpleGradient}
                            color="white"
                            fontWeight="700"
                          />
                          <VStack align="flex-start" spacing="2px">
                            <Text color={textColor} fontSize="sm" fontWeight="700">{user.name}</Text>
                            <Text color={textColorSecondary} fontSize="xs">{user.email}</Text>
                          </VStack>
                        </HStack>
                      </Td>
                      <Td px="20px" py="18px">
                        <Badge bg={roleBadge.bg} color={roleBadge.color} fontSize="xs" fontWeight="700" px="12px" py="6px" borderRadius="full" textTransform="uppercase">
                          {roleBadge.label}
                        </Badge>
                      </Td>
                      <Td px="20px" py="18px">
                        <Badge bg={statusBadge.bg} color={statusBadge.color} fontSize="xs" fontWeight="700" px="12px" py="6px" borderRadius="full" textTransform="uppercase">
                          {statusBadge.label}
                        </Badge>
                      </Td>
                      <Td px="20px" py="18px">
                        <Text color={textColorSecondary} fontSize="sm">{user.lastActive}</Text>
                      </Td>
                      <Td px="20px" py="18px" textAlign="center">
                        <Menu placement="bottom-end" isLazy>
                          <MenuButton
                            as={IconButton}
                            icon={<Icon as={MdMoreVert} w="20px" h="20px" />}
                            variant="ghost"
                            color={textColorSecondary}
                            borderRadius="full"
                            _hover={{ bg: iconBg, color: iconColor }}
                          />
                          <Portal>
                            <MenuList bg={cardBg} borderColor={borderColor} borderRadius="16px" boxShadow={menuShadow} py="10px" minW="200px" zIndex="modal">
                              <MenuItem icon={<Icon as={MdVisibility} w="18px" h="18px" />} fontSize="sm" fontWeight="600" borderRadius="10px" mx="8px" py="12px" _hover={{ bg: iconBg, color: iconColor }}>
                                View Profile
                              </MenuItem>
                              <MenuItem icon={<Icon as={MdEdit} w="18px" h="18px" />} fontSize="sm" fontWeight="600" borderRadius="10px" mx="8px" py="12px" _hover={{ bg: iconBg, color: iconColor }}>
                                Edit User
                              </MenuItem>
                              <MenuItem icon={<Icon as={MdBlock} w="18px" h="18px" />} fontSize="sm" fontWeight="600" borderRadius="10px" mx="8px" py="12px" _hover={{ bg: iconBg, color: iconColor }}>
                                {user.status === "active" ? "Suspend" : "Activate"}
                              </MenuItem>
                              <Divider my="8px" />
                              <MenuItem icon={<Icon as={MdDelete} w="18px" h="18px" />} fontSize="sm" fontWeight="600" borderRadius="10px" mx="8px" py="12px" color="red.500" _hover={{ bg: "red.50", color: "red.600" }}>
                                Delete User
                              </MenuItem>
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

