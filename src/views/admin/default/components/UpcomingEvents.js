// Chakra imports
import {
  Box,
  Button,
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
import { MdCelebration, MdEvent, MdCloud, MdAdd } from "react-icons/md";
// Language Context
import { useLanguage } from "contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

export default function UpcomingEvents() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "secondaryGray.400");
  const cardBg = useColorModeValue("white", "navy.800");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.100");
  const iconBg = useColorModeValue("#fff5ed", "rgba(231, 115, 36, 0.15)");
  const iconColor = useColorModeValue("#e77324", "#F99C58");
  const headerBg = useColorModeValue("gray.50", "whiteAlpha.50");
  const orangeGradient = "linear-gradient(135deg, #e77324 0%, #F99C58 100%)";
  const cardShadow = useColorModeValue(
    "0px 4px 20px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  const emptyStateShadow = useColorModeValue(
    "0px 8px 24px rgba(231, 115, 36, 0.12)",
    "0px 8px 24px rgba(231, 115, 36, 0.25)"
  );

  const handleCreateEvent = () => {
    navigate("/admin/events");
  };

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
            <Icon as={MdEvent} w="18px" h="18px" color={iconColor} />
          </Flex>
          <Text
            color={textColor}
            fontSize="lg"
            fontWeight="700"
          >
            {t("dashboard.upcomingEvents")}
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
          0 {t("dashboard.events") || "events"}
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
        <VStack spacing="24px">
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
              bgGradient={orangeGradient}
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow={emptyStateShadow}
              position="relative"
            >
              <Icon
                as={MdCelebration}
                w="45px"
                h="45px"
                color="white"
              />
              {/* Decorative add icon */}
              <Box
                position="absolute"
                top="-8px"
                right="-8px"
                w="28px"
                h="28px"
                bg="white"
                borderRadius="10px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxShadow="0 4px 12px rgba(0,0,0,0.1)"
              >
                <Icon as={MdAdd} w="16px" h="16px" color={iconColor} />
              </Box>
              {/* Decorative clouds */}
              <Icon
                as={MdCloud}
                w="24px"
                h="24px"
                color={iconColor}
                position="absolute"
                top="-14px"
                left="-14px"
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
                bottom="-10px"
                right="-10px"
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
              {t("dashboard.noEventsYet")}
            </Text>
            <Text
              color={textColorSecondary}
              fontSize="sm"
              fontWeight="400"
              maxW="300px"
              lineHeight="1.6"
            >
              {t("dashboard.noEventsDescription")}
            </Text>
          </VStack>

          {/* CTA Button */}
          <Button
            bgGradient={orangeGradient}
            color="white"
            fontSize="sm"
            fontWeight="600"
            borderRadius="14px"
            px="28px"
            py="12px"
            h="auto"
            leftIcon={<Icon as={MdAdd} w="18px" h="18px" />}
            onClick={handleCreateEvent}
            boxShadow="0 8px 20px rgba(231, 115, 36, 0.25)"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "0 12px 28px rgba(231, 115, 36, 0.35)",
            }}
            _active={{
              transform: "translateY(0px)",
              boxShadow: "0 6px 16px rgba(231, 115, 36, 0.3)",
            }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          >
            {t("dashboard.createEvent")}
          </Button>
        </VStack>
      </Flex>
    </Card>
  );
}
