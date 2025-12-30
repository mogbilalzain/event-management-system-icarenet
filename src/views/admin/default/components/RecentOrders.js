// Chakra imports
import {
  Box,
  Flex,
  Text,
  Icon,
  useColorModeValue,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
import { MdInventory, MdShoppingBag, MdCloud } from "react-icons/md";
// Language Context
import { useLanguage } from "contexts/LanguageContext";

export default function RecentOrders() {
  const { t } = useLanguage();
  
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "secondaryGray.400");
  const cardBg = useColorModeValue("white", "navy.800");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.100");
  const iconBg = useColorModeValue("#fff5ed", "rgba(231, 115, 36, 0.15)");
  const iconColor = useColorModeValue("#e77324", "#F99C58");
  const headerBg = useColorModeValue("gray.50", "whiteAlpha.50");
  const cardShadow = useColorModeValue(
    "0px 4px 20px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  const emptyStateShadow = useColorModeValue(
    "0px 8px 24px rgba(231, 115, 36, 0.12)",
    "0px 8px 24px rgba(231, 115, 36, 0.25)"
  );

  return (
    <Card
      bg={cardBg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="20px"
      boxShadow={cardShadow}
      overflow="hidden"
      h="100%"
    >
      {/* Header */}
      <Flex
        bg={headerBg}
        px="24px"
        py="18px"
        align="center"
        justify="space-between"
        borderBottom="1px solid"
        borderColor={borderColor}
      >
        <HStack spacing="12px">
          <Flex
            w="36px"
            h="36px"
            bg={iconBg}
            borderRadius="10px"
            align="center"
            justify="center"
          >
            <Icon as={MdShoppingBag} w="18px" h="18px" color={iconColor} />
          </Flex>
          <Text
            color={textColor}
            fontSize="lg"
            fontWeight="700"
          >
            {t("dashboard.recentOrders")}
          </Text>
        </HStack>
        <Badge
          bg={iconBg}
          color={iconColor}
          fontSize="xs"
          fontWeight="600"
          px="10px"
          py="4px"
          borderRadius="full"
        >
          0 {t("dashboard.orders") || "orders"}
        </Badge>
      </Flex>

      {/* Content - Empty State */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        p={{ base: "32px", md: "48px" }}
        minH="280px"
      >
        <VStack spacing="20px">
          {/* Animated Icon */}
          <Box
            position="relative"
            animation="float 3s ease-in-out infinite"
            sx={{
              "@keyframes float": {
                "0%, 100%": { transform: "translateY(0px)" },
                "50%": { transform: "translateY(-10px)" },
              },
            }}
          >
            <Box
              w="90px"
              h="90px"
              borderRadius="24px"
              bg={iconBg}
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow={emptyStateShadow}
              position="relative"
            >
              <Icon
                as={MdInventory}
                w="45px"
                h="45px"
                color={iconColor}
              />
              {/* Decorative clouds */}
              <Icon
                as={MdCloud}
                w="24px"
                h="24px"
                color={iconColor}
                position="absolute"
                top="-10px"
                right="-10px"
                opacity="0.5"
                animation="floatCloud 4s ease-in-out infinite"
                sx={{
                  "@keyframes floatCloud": {
                    "0%, 100%": { transform: "translate(0, 0)" },
                    "50%": { transform: "translate(5px, -5px)" },
                  },
                }}
              />
              <Icon
                as={MdCloud}
                w="18px"
                h="18px"
                color={iconColor}
                position="absolute"
                bottom="-8px"
                left="-8px"
                opacity="0.4"
                animation="floatCloud2 3.5s ease-in-out infinite"
                sx={{
                  "@keyframes floatCloud2": {
                    "0%, 100%": { transform: "translate(0, 0)" },
                    "50%": { transform: "translate(-4px, 4px)" },
                  },
                }}
              />
            </Box>
          </Box>

          {/* Text Content */}
          <VStack spacing="8px" textAlign="center">
            <Text
              color={textColor}
              fontSize={{ base: "md", md: "lg" }}
              fontWeight="700"
            >
              {t("dashboard.noOrdersYet")}
            </Text>
            <Text
              color={textColorSecondary}
              fontSize="sm"
              fontWeight="400"
              maxW="280px"
              lineHeight="1.6"
            >
              {t("dashboard.noOrdersDescription")}
            </Text>
          </VStack>
        </VStack>
      </Flex>
    </Card>
  );
}
