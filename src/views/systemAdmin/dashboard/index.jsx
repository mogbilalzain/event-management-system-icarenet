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
  Button,
  Badge,
  Avatar,
  AvatarGroup,
  Progress,
} from "@chakra-ui/react";
import React from "react";
// Language Context
import { useLanguage } from "contexts/LanguageContext";
import { 
  MdDashboard,
  MdPeople,
  MdBusiness,
  MdEvent,
  MdTrendingUp,
  MdAttachMoney,
  MdAnalytics,
  MdArrowUpward,
  MdArrowDownward,
  MdCheckCircle,
  MdPending,
  MdWarning,
} from "react-icons/md";
// Components
import IconBox from "components/icons/IconBox";

export default function SystemDashboard() {
  const { t } = useLanguage();

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "secondaryGray.400");
  const cardBg = useColorModeValue("white", "navy.800");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.100");
  const iconBg = useColorModeValue("purple.50", "rgba(128, 90, 213, 0.15)");
  const iconColor = useColorModeValue("purple.500", "purple.400");
  const purpleGradient = "linear-gradient(135deg, #805AD5 0%, #B794F4 100%)";
  const greenGradient = "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)";
  const blueGradient = "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)";
  const orangeGradient = "linear-gradient(135deg, #e77324 0%, #F99C58 100%)";
  const cardShadow = useColorModeValue(
    "0px 4px 20px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  const hoverShadow = useColorModeValue(
    "0px 8px 32px rgba(112, 144, 176, 0.15)",
    "0px 8px 32px rgba(0, 0, 0, 0.3)"
  );
  const sectionBg = useColorModeValue("gray.50", "whiteAlpha.50");
  const hoverBg = useColorModeValue("gray.100", "whiteAlpha.100");
  const pendingBg = useColorModeValue("yellow.50", "rgba(236, 201, 75, 0.1)");

  // Mock stats data
  const stats = {
    totalUsers: 12458,
    totalOrganizers: 234,
    totalEvents: 1567,
    totalRevenue: 458920,
    activeEvents: 89,
    pendingApprovals: 12,
  };

  // Recent activities
  const recentActivities = [
    { type: "organizer", name: "Tech Events Inc", action: "registered", time: "2 minutes ago", status: "pending" },
    { type: "event", name: "Summer Music Festival", action: "created", time: "15 minutes ago", status: "approved" },
    { type: "payment", name: "$2,500 processed", action: "completed", time: "1 hour ago", status: "completed" },
    { type: "user", name: "John Doe", action: "joined", time: "2 hours ago", status: "active" },
  ];

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
                  as={MdDashboard}
                  color={iconColor}
                />
              }
            />
            <Box>
              <HStack spacing="12px" mb="4px">
                <Text
                  color={textColor}
                  fontSize={{ base: "2xl", md: "3xl" }}
                  fontWeight="800"
                  letterSpacing="-0.5px"
                >
                  {t("systemAdmin.dashboard.title")}
                </Text>
                <Badge
                  bgGradient={purpleGradient}
                  color="white"
                  fontSize="xs"
                  fontWeight="700"
                  px="12px"
                  py="4px"
                  borderRadius="full"
                  textTransform="uppercase"
                >
                  Admin
                </Badge>
              </HStack>
              <Text
                color={textColorSecondary}
                fontSize="md"
                fontWeight="400"
              >
                {t("systemAdmin.dashboard.subtitle")}
              </Text>
            </Box>
          </HStack>

          <Button
            bgGradient={purpleGradient}
            color="white"
            leftIcon={<Icon as={MdAnalytics} w="20px" h="20px" />}
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
            {t("systemAdmin.dashboard.viewAnalytics")}
          </Button>
        </Flex>

        {/* Stats Cards */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing="16px">
          {/* Total Users */}
          <Card
            p="20px"
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="20px"
            boxShadow={cardShadow}
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
              bgGradient={purpleGradient}
              borderRadius="20px 20px 0 0"
            />
            <HStack justify="space-between" align="flex-start">
              <VStack align="flex-start" spacing="4px">
                <Text color={textColorSecondary} fontSize="xs" fontWeight="600" textTransform="uppercase" letterSpacing="0.5px">
                  {t("systemAdmin.dashboard.totalUsers")}
                </Text>
                <Text color={textColor} fontSize="2xl" fontWeight="800" letterSpacing="-1px">
                  {stats.totalUsers.toLocaleString()}
                </Text>
                <HStack spacing="4px">
                  <Icon as={MdArrowUpward} w="14px" h="14px" color="green.500" />
                  <Text color="green.500" fontSize="xs" fontWeight="600">+12.5%</Text>
                  <Text color={textColorSecondary} fontSize="xs">{t("systemAdmin.dashboard.thisMonth")}</Text>
                </HStack>
              </VStack>
              <Flex
                w="52px"
                h="52px"
                bgGradient={purpleGradient}
                borderRadius="14px"
                align="center"
                justify="center"
                boxShadow="0 4px 12px rgba(128, 90, 213, 0.25)"
              >
                <Icon as={MdPeople} w="26px" h="26px" color="white" />
              </Flex>
            </HStack>
          </Card>

          {/* Total Organizers */}
          <Card
            p="20px"
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="20px"
            boxShadow={cardShadow}
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
              bgGradient={greenGradient}
              borderRadius="20px 20px 0 0"
            />
            <HStack justify="space-between" align="flex-start">
              <VStack align="flex-start" spacing="4px">
                <Text color={textColorSecondary} fontSize="xs" fontWeight="600" textTransform="uppercase" letterSpacing="0.5px">
                  {t("systemAdmin.dashboard.totalOrganizers")}
                </Text>
                <Text color={textColor} fontSize="2xl" fontWeight="800" letterSpacing="-1px">
                  {stats.totalOrganizers.toLocaleString()}
                </Text>
                <HStack spacing="4px">
                  <Icon as={MdArrowUpward} w="14px" h="14px" color="green.500" />
                  <Text color="green.500" fontSize="xs" fontWeight="600">+8.3%</Text>
                  <Text color={textColorSecondary} fontSize="xs">{t("systemAdmin.dashboard.thisMonth")}</Text>
                </HStack>
              </VStack>
              <Flex
                w="52px"
                h="52px"
                bgGradient={greenGradient}
                borderRadius="14px"
                align="center"
                justify="center"
                boxShadow="0 4px 12px rgba(22, 163, 74, 0.25)"
              >
                <Icon as={MdBusiness} w="26px" h="26px" color="white" />
              </Flex>
            </HStack>
          </Card>

          {/* Total Events */}
          <Card
            p="20px"
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="20px"
            boxShadow={cardShadow}
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
              bgGradient={blueGradient}
              borderRadius="20px 20px 0 0"
            />
            <HStack justify="space-between" align="flex-start">
              <VStack align="flex-start" spacing="4px">
                <Text color={textColorSecondary} fontSize="xs" fontWeight="600" textTransform="uppercase" letterSpacing="0.5px">
                  {t("systemAdmin.dashboard.totalEvents")}
                </Text>
                <Text color={textColor} fontSize="2xl" fontWeight="800" letterSpacing="-1px">
                  {stats.totalEvents.toLocaleString()}
                </Text>
                <HStack spacing="4px">
                  <Badge bg="blue.100" color="blue.600" fontSize="10px" px="8px" py="2px" borderRadius="full">
                    {stats.activeEvents} {t("systemAdmin.dashboard.active")}
                  </Badge>
                </HStack>
              </VStack>
              <Flex
                w="52px"
                h="52px"
                bgGradient={blueGradient}
                borderRadius="14px"
                align="center"
                justify="center"
                boxShadow="0 4px 12px rgba(37, 99, 235, 0.25)"
              >
                <Icon as={MdEvent} w="26px" h="26px" color="white" />
              </Flex>
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
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            cursor="pointer"
            _hover={{ 
              transform: "translateY(-4px)", 
              boxShadow: hoverShadow,
              borderColor: "#e77324",
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
            <HStack justify="space-between" align="flex-start">
              <VStack align="flex-start" spacing="4px">
                <Text color={textColorSecondary} fontSize="xs" fontWeight="600" textTransform="uppercase" letterSpacing="0.5px">
                  {t("systemAdmin.dashboard.totalRevenue")}
                </Text>
                <Text color={textColor} fontSize="2xl" fontWeight="800" letterSpacing="-1px">
                  ${stats.totalRevenue.toLocaleString()}
                </Text>
                <HStack spacing="4px">
                  <Icon as={MdArrowUpward} w="14px" h="14px" color="green.500" />
                  <Text color="green.500" fontSize="xs" fontWeight="600">+24.8%</Text>
                  <Text color={textColorSecondary} fontSize="xs">{t("systemAdmin.dashboard.thisMonth")}</Text>
                </HStack>
              </VStack>
              <Flex
                w="52px"
                h="52px"
                bgGradient={orangeGradient}
                borderRadius="14px"
                align="center"
                justify="center"
                boxShadow="0 4px 12px rgba(231, 115, 36, 0.25)"
              >
                <Icon as={MdAttachMoney} w="26px" h="26px" color="white" />
              </Flex>
            </HStack>
          </Card>
        </SimpleGrid>

        {/* Content Grid */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="24px">
          {/* Recent Activities */}
          <Card
            p="24px"
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="24px"
            boxShadow={cardShadow}
          >
            <Flex justify="space-between" align="center" mb="20px">
              <HStack spacing="12px">
                <Flex
                  w="40px"
                  h="40px"
                  bgGradient={purpleGradient}
                  borderRadius="12px"
                  align="center"
                  justify="center"
                  boxShadow="0 4px 12px rgba(128, 90, 213, 0.2)"
                >
                  <Icon as={MdTrendingUp} w="20px" h="20px" color="white" />
                </Flex>
                <VStack align="flex-start" spacing="0">
                  <Text color={textColor} fontSize="lg" fontWeight="700">
                    {t("systemAdmin.dashboard.recentActivity")}
                  </Text>
                  <Text color={textColorSecondary} fontSize="sm">
                    {t("systemAdmin.dashboard.latestUpdates")}
                  </Text>
                </VStack>
              </HStack>
              <Button
                variant="ghost"
                color={iconColor}
                fontSize="sm"
                fontWeight="600"
                _hover={{ bg: iconBg }}
              >
                {t("systemAdmin.dashboard.viewAll")}
              </Button>
            </Flex>

            <VStack spacing="16px" align="stretch">
              {recentActivities.map((activity, index) => (
                <Flex
                  key={index}
                  p="16px"
                  bg={sectionBg}
                  borderRadius="16px"
                  align="center"
                  justify="space-between"
                  transition="all 0.2s"
                  _hover={{ bg: hoverBg }}
                >
                  <HStack spacing="12px">
                    <Flex
                      w="40px"
                      h="40px"
                      bg={
                        activity.type === "organizer" ? "purple.100" :
                        activity.type === "event" ? "blue.100" :
                        activity.type === "payment" ? "green.100" : "orange.100"
                      }
                      borderRadius="12px"
                      align="center"
                      justify="center"
                    >
                      <Icon
                        as={
                          activity.type === "organizer" ? MdBusiness :
                          activity.type === "event" ? MdEvent :
                          activity.type === "payment" ? MdAttachMoney : MdPeople
                        }
                        w="20px"
                        h="20px"
                        color={
                          activity.type === "organizer" ? "purple.500" :
                          activity.type === "event" ? "blue.500" :
                          activity.type === "payment" ? "green.500" : "orange.500"
                        }
                      />
                    </Flex>
                    <VStack align="flex-start" spacing="2px">
                      <Text color={textColor} fontSize="sm" fontWeight="600">
                        {activity.name}
                      </Text>
                      <Text color={textColorSecondary} fontSize="xs">
                        {activity.action} • {activity.time}
                      </Text>
                    </VStack>
                  </HStack>
                  <Badge
                    bg={
                      activity.status === "pending" ? "yellow.100" :
                      activity.status === "approved" ? "green.100" :
                      activity.status === "completed" ? "blue.100" : "gray.100"
                    }
                    color={
                      activity.status === "pending" ? "yellow.700" :
                      activity.status === "approved" ? "green.700" :
                      activity.status === "completed" ? "blue.700" : "gray.700"
                    }
                    fontSize="xs"
                    fontWeight="600"
                    px="10px"
                    py="4px"
                    borderRadius="full"
                    textTransform="capitalize"
                  >
                    {activity.status}
                  </Badge>
                </Flex>
              ))}
            </VStack>
          </Card>

          {/* Pending Approvals */}
          <Card
            p="24px"
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="24px"
            boxShadow={cardShadow}
          >
            <Flex justify="space-between" align="center" mb="20px">
              <HStack spacing="12px">
                <Flex
                  w="40px"
                  h="40px"
                  bg="yellow.100"
                  borderRadius="12px"
                  align="center"
                  justify="center"
                >
                  <Icon as={MdPending} w="20px" h="20px" color="yellow.600" />
                </Flex>
                <VStack align="flex-start" spacing="0">
                  <HStack spacing="8px">
                    <Text color={textColor} fontSize="lg" fontWeight="700">
                      {t("systemAdmin.dashboard.pendingApprovals")}
                    </Text>
                    <Badge
                      bg="yellow.100"
                      color="yellow.700"
                      fontSize="xs"
                      fontWeight="700"
                      px="8px"
                      py="2px"
                      borderRadius="full"
                    >
                      {stats.pendingApprovals}
                    </Badge>
                  </HStack>
                  <Text color={textColorSecondary} fontSize="sm">
                    {t("systemAdmin.dashboard.requiresAttention")}
                  </Text>
                </VStack>
              </HStack>
              <Button
                bgGradient={purpleGradient}
                color="white"
                fontSize="sm"
                fontWeight="600"
                borderRadius="12px"
                px="16px"
                h="40px"
                _hover={{ transform: "translateY(-2px)" }}
              >
                {t("systemAdmin.dashboard.reviewAll")}
              </Button>
            </Flex>

            <VStack spacing="16px" align="stretch">
              {/* Sample pending items */}
              {[1, 2, 3].map((item, index) => (
                <Flex
                  key={index}
                  p="16px"
                  bg={pendingBg}
                  borderRadius="16px"
                  border="1px dashed"
                  borderColor="yellow.300"
                  align="center"
                  justify="space-between"
                >
                  <HStack spacing="12px">
                    <Avatar
                      size="sm"
                      name={`Organizer ${index + 1}`}
                      bg="yellow.500"
                      color="white"
                    />
                    <VStack align="flex-start" spacing="2px">
                      <Text color={textColor} fontSize="sm" fontWeight="600">
                        New Organizer Registration
                      </Text>
                      <Text color={textColorSecondary} fontSize="xs">
                        Submitted {index + 1} hours ago
                      </Text>
                    </VStack>
                  </HStack>
                  <HStack spacing="8px">
                    <Button
                      size="sm"
                      colorScheme="green"
                      variant="ghost"
                      leftIcon={<Icon as={MdCheckCircle} w="16px" h="16px" />}
                    >
                      {t("systemAdmin.dashboard.approve")}
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                      leftIcon={<Icon as={MdWarning} w="16px" h="16px" />}
                    >
                      {t("systemAdmin.dashboard.reject")}
                    </Button>
                  </HStack>
                </Flex>
              ))}
            </VStack>
          </Card>
        </SimpleGrid>

        {/* System Overview */}
        <Card
          p="24px"
          bg={cardBg}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="24px"
          boxShadow={cardShadow}
        >
          <Flex justify="space-between" align="center" mb="20px">
            <HStack spacing="12px">
              <Flex
                w="40px"
                h="40px"
                bgGradient={blueGradient}
                borderRadius="12px"
                align="center"
                justify="center"
              >
                <Icon as={MdAnalytics} w="20px" h="20px" color="white" />
              </Flex>
              <VStack align="flex-start" spacing="0">
                <Text color={textColor} fontSize="lg" fontWeight="700">
                  {t("systemAdmin.dashboard.systemHealth")}
                </Text>
                <Text color={textColorSecondary} fontSize="sm">
                  {t("systemAdmin.dashboard.allServicesOperational")}
                </Text>
              </VStack>
            </HStack>
            <Badge
              bg="green.100"
              color="green.700"
              fontSize="sm"
              fontWeight="700"
              px="16px"
              py="8px"
              borderRadius="full"
              display="flex"
              alignItems="center"
              gap="6px"
            >
              <Box w="8px" h="8px" borderRadius="full" bg="green.500" />
              {t("systemAdmin.dashboard.operational")}
            </Badge>
          </Flex>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing="16px">
            <Box p="16px" bg={sectionBg} borderRadius="16px">
              <Text color={textColorSecondary} fontSize="xs" fontWeight="600" textTransform="uppercase" mb="8px">
                Server Uptime
              </Text>
              <Text color={textColor} fontSize="2xl" fontWeight="700" mb="8px">99.99%</Text>
              <Progress value={99.99} size="sm" colorScheme="green" borderRadius="full" />
            </Box>
            <Box p="16px" bg={sectionBg} borderRadius="16px">
              <Text color={textColorSecondary} fontSize="xs" fontWeight="600" textTransform="uppercase" mb="8px">
                API Response Time
              </Text>
              <Text color={textColor} fontSize="2xl" fontWeight="700" mb="8px">45ms</Text>
              <Progress value={90} size="sm" colorScheme="blue" borderRadius="full" />
            </Box>
            <Box p="16px" bg={sectionBg} borderRadius="16px">
              <Text color={textColorSecondary} fontSize="xs" fontWeight="600" textTransform="uppercase" mb="8px">
                Storage Usage
              </Text>
              <Text color={textColor} fontSize="2xl" fontWeight="700" mb="8px">67.3%</Text>
              <Progress value={67.3} size="sm" colorScheme="orange" borderRadius="full" />
            </Box>
          </SimpleGrid>
        </Card>
      </VStack>
    </Box>
  );
}

