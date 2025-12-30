// Chakra imports
import {
  Box,
  Flex,
  Icon,
  SimpleGrid,
  Text,
  HStack,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import IconBox from "components/icons/IconBox";
import React from "react";
// Language Context
import { useLanguage } from "contexts/LanguageContext";
import {
  MdPeople,
  MdAttachMoney,
  MdTrendingUp,
  MdShoppingCart,
  MdGroup,
  MdEvent,
  MdDashboard,
} from "react-icons/md";
import RecentOrders from "views/admin/default/components/RecentOrders";
import UpcomingEvents from "views/admin/default/components/UpcomingEvents";

// Enhanced Stat Card Component
function StatCard({ icon, iconBg, iconColor, label, value, growth, growthLabel }) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "secondaryGray.400");
  const cardBg = useColorModeValue("white", "navy.800");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.100");
  const cardShadow = useColorModeValue(
    "0px 4px 20px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  const hoverShadow = useColorModeValue(
    "0px 8px 30px rgba(112, 144, 176, 0.15)",
    "0px 8px 30px rgba(0, 0, 0, 0.3)"
  );

  return (
    <Card
      p="24px"
      bg={cardBg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="20px"
      boxShadow={cardShadow}
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: hoverShadow,
      }}
      position="relative"
      overflow="hidden"
    >
      {/* Decorative gradient */}
      <Box
        position="absolute"
        top="0"
        right="0"
        w="100px"
        h="100px"
        bg={iconBg}
        opacity="0.1"
        borderRadius="full"
        transform="translate(30%, -30%)"
      />

      <Flex align="center" justify="space-between">
        <Stat>
          <StatLabel
            color={textColorSecondary}
            fontSize="sm"
            fontWeight="500"
            mb="8px"
          >
            {label}
          </StatLabel>
          <StatNumber
            color={textColor}
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="700"
            letterSpacing="-1px"
          >
            {value}
          </StatNumber>
          {growth && (
            <StatHelpText
              m="0"
              mt="8px"
              display="flex"
              alignItems="center"
              gap="4px"
            >
              <StatArrow type={growth.startsWith("+") ? "increase" : "decrease"} />
              <Text
                color={growth.startsWith("+") ? "green.500" : "red.500"}
                fontSize="sm"
                fontWeight="600"
              >
                {growth}
              </Text>
              {growthLabel && (
                <Text color={textColorSecondary} fontSize="xs" fontWeight="400">
                  {growthLabel}
                </Text>
              )}
            </StatHelpText>
          )}
        </Stat>

        <IconBox
          w="60px"
          h="60px"
          bg={iconBg}
          borderRadius="16px"
          icon={<Icon w="28px" h="28px" as={icon} color={iconColor} />}
          boxShadow={`0 8px 20px ${iconBg}40`}
        />
      </Flex>
    </Card>
  );
}

export default function Dashboard() {
  const { t } = useLanguage();
  
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "secondaryGray.400");
  const iconBg = useColorModeValue("#fff5ed", "rgba(231, 115, 36, 0.15)");
  const iconColor = useColorModeValue("#e77324", "#F99C58");
  const orangeGradient = "linear-gradient(135deg, #e77324 0%, #F99C58 100%)";

  // Stats data
  const stats = [
    {
      icon: MdPeople,
      iconBg: "#fff5ed",
      iconColor: "#e77324",
      label: t("dashboard.attendees"),
      value: "350",
      growth: "+12%",
      growthLabel: t("dashboard.sinceLastMonth") || "since last month",
    },
    {
      icon: MdShoppingCart,
      iconBg: "#e8f5e9",
      iconColor: "#4caf50",
      label: t("dashboard.productsSold"),
      value: "642",
      growth: "+8%",
      growthLabel: t("dashboard.sinceLastMonth") || "since last month",
    },
    {
      icon: MdAttachMoney,
      iconBg: "#e3f2fd",
      iconColor: "#2196f3",
      label: t("dashboard.grossSales"),
      value: "$574.34",
      growth: "+23%",
      growthLabel: t("dashboard.sinceLastMonth") || "since last month",
    },
    {
      icon: MdTrendingUp,
      iconBg: "#fce4ec",
      iconColor: "#e91e63",
      label: t("dashboard.totalOrders"),
      value: "1,000",
      growth: "+15%",
      growthLabel: t("dashboard.sinceLastMonth") || "since last month",
    },
    {
      icon: MdGroup,
      iconBg: "#ede7f6",
      iconColor: "#673ab7",
      label: t("dashboard.crewMembers"),
      value: "3",
    },
    {
      icon: MdEvent,
      iconBg: "#fff3e0",
      iconColor: "#ff9800",
      label: t("dashboard.totalEvents"),
      value: "10",
      growth: "+2",
      growthLabel: t("dashboard.thisMonth") || "this month",
    },
  ];

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Page Header */}
      <Flex
        justify="space-between"
        align={{ base: "stretch", md: "center" }}
        direction={{ base: "column", md: "row" }}
        gap="16px"
        mb="28px"
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
              <Icon as={MdDashboard} w="22px" h="22px" color={iconColor} />
            </Flex>
            <Text
              color={textColor}
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="700"
              letterSpacing="-0.5px"
            >
              {t("dashboard.title") || "Dashboard"}
            </Text>
          </HStack>
          <Text
            color={textColorSecondary}
            fontSize="md"
            fontWeight="400"
            pl="54px"
          >
            {t("dashboard.subtitle") || "Welcome back! Here's your overview."}
          </Text>
        </Box>
      </Flex>

      {/* Stats Grid */}
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap="20px"
        mb="28px"
      >
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            iconBg={stat.iconBg}
            iconColor={stat.iconColor}
            label={stat.label}
            value={stat.value}
            growth={stat.growth}
            growthLabel={stat.growthLabel}
          />
        ))}
      </SimpleGrid>

      {/* Recent Orders & Upcoming Events */}
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <RecentOrders />
        <UpcomingEvents />
      </SimpleGrid>
    </Box>
  );
}
