// Chakra imports
import {
  Box,
  Text,
  Flex,
  HStack,
  VStack,
  Badge,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Tooltip,
  Avatar,
  Divider,
  Portal,
} from "@chakra-ui/react";
import React from "react";
// Icons
import { 
  MdMoreVert, 
  MdEdit, 
  MdContentCopy, 
  MdArchive, 
  MdDelete,
  MdAccessTime,
  MdLocationOn,
  MdVideocam,
  MdPeople,
  MdAttachMoney,
} from "react-icons/md";

export default function EventCard({ event, t }) {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "secondaryGray.400");
  const cardBg = useColorModeValue("white", "navy.800");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.100");
  const hoverBorderColor = useColorModeValue("#e77324", "#F99C58");
  const iconBg = useColorModeValue("#fff5ed", "rgba(231, 115, 36, 0.15)");
  const iconColor = useColorModeValue("#e77324", "#F99C58");
  const statsBg = useColorModeValue("gray.50", "whiteAlpha.50");
  const draftBadgeBg = useColorModeValue("orange.100", "orange.900");
  const draftBadgeColor = useColorModeValue("orange.700", "orange.200");
  const publishedBadgeBg = useColorModeValue("green.100", "green.900");
  const publishedBadgeColor = useColorModeValue("green.700", "green.200");
  const menuShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "0px 18px 40px rgba(0, 0, 0, 0.3)"
  );
  const cardShadow = useColorModeValue(
    "0px 4px 20px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  const hoverShadow = useColorModeValue(
    "0px 12px 32px rgba(231, 115, 36, 0.15)",
    "0px 12px 32px rgba(231, 115, 36, 0.25)"
  );

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return { day: "01", month: "JAN" };
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
    return { day, month };
  };

  // Format full date time
  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Calculate relative time
  const getRelativeTime = (dateString) => {
    if (!dateString) return "";
    const now = new Date();
    const eventDate = new Date(dateString);
    const diff = eventDate - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (diff < 0) {
      return t("events.eventCard.ago");
    }
    if (days > 0) {
      return `${t("events.eventCard.in")} ${days} ${days === 1 ? t("events.eventCard.day") : t("events.eventCard.days")}`;
    } else if (hours > 0) {
      return `${t("events.eventCard.in")} ${hours} ${hours === 1 ? t("events.eventCard.hour") : t("events.eventCard.hours")}`;
    } else {
      return t("events.eventCard.in") + " < 1 " + t("events.eventCard.hour");
    }
  };

  const dateInfo = formatDate(event.startDate);
  const dateTimeString = formatDateTime(event.startDate);
  const relativeTime = getRelativeTime(event.startDate);

  return (
    <Box
      w="100%"
      borderRadius="20px"
      border="1px solid"
      borderColor={borderColor}
      bg={cardBg}
      p={{ base: "16px", md: "24px" }}
      boxShadow={cardShadow}
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      cursor="pointer"
      _hover={{
        borderColor: hoverBorderColor,
        boxShadow: hoverShadow,
        transform: "translateY(-4px)",
      }}
      position="relative"
    >
      {/* Decorative gradient line at top */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        borderRadius="20px 20px 0 0"
        h="4px"
        bgGradient="linear(to-r, #e77324, #F99C58, #e77324)"
        opacity="0.8"
      />

      <Flex
        direction={{ base: "column", lg: "row" }}
        gap={{ base: "16px", md: "24px" }}
        align={{ base: "stretch", lg: "center" }}
      >
        {/* Left Section - Date Card */}
        <Flex
          direction="row"
          align="center"
          gap="20px"
        >
          <Box
            w={{ base: "80px", md: "90px" }}
            h={{ base: "80px", md: "90px" }}
            minW={{ base: "80px", md: "90px" }}
            borderRadius="16px"
            bgGradient="linear(135deg, #e77324 0%, #F99C58 100%)"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            color="white"
            position="relative"
            boxShadow="0 8px 24px rgba(231, 115, 36, 0.25)"
          >
            {/* Status Badge */}
            {event.status === "draft" && (
              <Badge
                position="absolute"
                top="-8px"
                right="-8px"
                bg={draftBadgeBg}
                color={draftBadgeColor}
                fontSize="9px"
                fontWeight="700"
                px="8px"
                py="3px"
                borderRadius="full"
                textTransform="uppercase"
                boxShadow="0 2px 8px rgba(0,0,0,0.1)"
              >
                {t("events.eventCard.draft")}
              </Badge>
            )}
            {event.status === "published" && (
              <Badge
                position="absolute"
                top="-8px"
                right="-8px"
                bg={publishedBadgeBg}
                color={publishedBadgeColor}
                fontSize="9px"
                fontWeight="700"
                px="8px"
                py="3px"
                borderRadius="full"
                textTransform="uppercase"
                boxShadow="0 2px 8px rgba(0,0,0,0.1)"
              >
                {t("events.eventCard.live")}
              </Badge>
            )}

            <Text fontSize={{ base: "28px", md: "32px" }} fontWeight="800" lineHeight="1">
              {dateInfo.day}
            </Text>
            <Text fontSize={{ base: "11px", md: "12px" }} fontWeight="600" letterSpacing="1.5px" mt="2px">
              {dateInfo.month}
            </Text>
          </Box>
        </Flex>

        {/* Center Section - Event Info */}
        <VStack
          align="stretch"
          flex="1"
          spacing={{ base: "10px", md: "12px" }}
        >
          {/* Event Title */}
          <Text
            color={textColor}
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="700"
            lineHeight="1.3"
            noOfLines={2}
          >
            {event.name}
          </Text>

          {/* Event Meta Info */}
          <HStack spacing="16px" flexWrap="wrap" gap="8px">
            {/* Date & Time */}
            <HStack spacing="6px" color={textColorSecondary}>
              <Icon as={MdAccessTime} w="16px" h="16px" />
              <Text fontSize="sm" fontWeight="500">
                {dateTimeString}
              </Text>
            </HStack>

            {/* Relative Time Badge */}
            <Badge
              bg={iconBg}
              color={iconColor}
              fontSize="xs"
              fontWeight="600"
              px="10px"
              py="4px"
              borderRadius="full"
            >
              {relativeTime}
            </Badge>
          </HStack>

          {/* Location & Organizer */}
          <HStack spacing="16px" flexWrap="wrap" gap="8px">
            {/* Event Type */}
            <HStack spacing="6px" color={textColorSecondary}>
              <Icon 
                as={event.type === "online" ? MdVideocam : MdLocationOn} 
                w="16px" 
                h="16px" 
                color={iconColor}
              />
              <Text fontSize="sm" fontWeight="500">
                {event.type === "online" ? t("events.eventCard.online") : t("events.eventCard.offline")}
              </Text>
            </HStack>

            {/* Organizer */}
            {event.organizer && (
              <HStack spacing="8px">
                <Avatar size="xs" name={event.organizer} bg={iconBg} color={iconColor} />
                <Text color={textColorSecondary} fontSize="sm" fontWeight="500">
                  {event.organizer}
                </Text>
              </HStack>
            )}
          </HStack>
        </VStack>

        {/* Right Section - Stats & Actions */}
        <Flex
          direction={{ base: "row", lg: "column" }}
          align={{ base: "center", lg: "flex-end" }}
          justify={{ base: "space-between", lg: "center" }}
          gap="16px"
          minW={{ lg: "180px" }}
        >
          {/* Stats Grid */}
          <HStack
            spacing="0"
            bg={statsBg}
            borderRadius="14px"
            overflow="hidden"
            divider={<Divider orientation="vertical" h="40px" />}
          >
            {/* Attendees */}
            <Tooltip label={t("events.eventCard.attendees")} placement="top" hasArrow>
              <VStack spacing="2px" px="16px" py="10px" cursor="default">
                <HStack spacing="4px">
                  <Icon as={MdPeople} w="14px" h="14px" color={iconColor} />
                  <Text color={textColor} fontSize="md" fontWeight="700">
                    {event.attendees || 0}
                  </Text>
                </HStack>
                <Text color={textColorSecondary} fontSize="xs" fontWeight="500">
                  {t("events.eventCard.attendees")}
                </Text>
              </VStack>
            </Tooltip>

            {/* Revenue */}
            <Tooltip label={t("events.eventCard.revenue")} placement="top" hasArrow>
              <VStack spacing="2px" px="16px" py="10px" cursor="default">
                <HStack spacing="4px">
                  <Icon as={MdAttachMoney} w="14px" h="14px" color="green.500" />
                  <Text color={textColor} fontSize="md" fontWeight="700">
                    ${event.revenue || "0"}
                  </Text>
                </HStack>
                <Text color={textColorSecondary} fontSize="xs" fontWeight="500">
                  {t("events.eventCard.revenue")}
                </Text>
              </VStack>
            </Tooltip>
          </HStack>

          {/* More Actions Menu */}
          <Menu placement="bottom-end" isLazy>
            <MenuButton
              as={IconButton}
              icon={<Icon as={MdMoreVert} w="20px" h="20px" />}
              variant="ghost"
              color={textColorSecondary}
              borderRadius="full"
              _hover={{ bg: iconBg, color: iconColor }}
              size="md"
              aria-label="More actions"
            />
            <Portal>
              <MenuList
                bg={cardBg}
                borderColor={borderColor}
                borderRadius="14px"
                boxShadow={menuShadow}
                py="8px"
                minW="160px"
                zIndex="modal"
              >
                <MenuItem
                  icon={<Icon as={MdEdit} w="16px" h="16px" />}
                  fontSize="sm"
                  fontWeight="500"
                  borderRadius="8px"
                  mx="8px"
                  _hover={{ bg: iconBg, color: iconColor }}
                  _focus={{ bg: iconBg, color: iconColor }}
                >
                  {t("events.eventCard.edit")}
                </MenuItem>
                <MenuItem
                  icon={<Icon as={MdContentCopy} w="16px" h="16px" />}
                  fontSize="sm"
                  fontWeight="500"
                  borderRadius="8px"
                  mx="8px"
                  _hover={{ bg: iconBg, color: iconColor }}
                  _focus={{ bg: iconBg, color: iconColor }}
                >
                  {t("events.eventCard.duplicate")}
                </MenuItem>
                <MenuItem
                  icon={<Icon as={MdArchive} w="16px" h="16px" />}
                  fontSize="sm"
                  fontWeight="500"
                  borderRadius="8px"
                  mx="8px"
                  _hover={{ bg: iconBg, color: iconColor }}
                  _focus={{ bg: iconBg, color: iconColor }}
                >
                  {t("events.eventCard.archive")}
                </MenuItem>
                <Divider my="4px" />
                <MenuItem
                  icon={<Icon as={MdDelete} w="16px" h="16px" />}
                  fontSize="sm"
                  fontWeight="500"
                  borderRadius="8px"
                  mx="8px"
                  color="red.500"
                  _hover={{ bg: "red.50", color: "red.600" }}
                  _focus={{ bg: "red.50", color: "red.600" }}
                >
                  {t("events.eventCard.delete")}
                </MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
}
