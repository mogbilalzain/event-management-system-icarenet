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
  Progress,
  Divider,
  Portal,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
// Icons
import { 
  MdMoreVert, 
  MdEdit, 
  MdContentCopy, 
  MdVisibilityOff,
  MdDelete,
  MdConfirmationNumber,
  MdShoppingBag,
  MdCardGiftcard,
  MdVolunteerActivism,
  MdAccessTime,
  MdAllInclusive,
} from "react-icons/md";

export default function TicketRow({ ticket, t }) {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "secondaryGray.400");
  const cardBg = useColorModeValue("white", "navy.800");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.100");
  const hoverBorderColor = useColorModeValue("#e77324", "#F99C58");
  const iconBg = useColorModeValue("#fff5ed", "rgba(231, 115, 36, 0.15)");
  const iconColor = useColorModeValue("#e77324", "#F99C58");
  const labelColor = useColorModeValue("gray.500", "gray.400");
  const menuShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.15)",
    "0px 18px 40px rgba(0, 0, 0, 0.4)"
  );
  const rowHoverBg = useColorModeValue("gray.50", "whiteAlpha.50");
  const statsBg = useColorModeValue("gray.50", "whiteAlpha.50");
  const hoverShadow = useColorModeValue(
    "0px 8px 24px rgba(231, 115, 36, 0.12)",
    "0px 8px 24px rgba(231, 115, 36, 0.2)"
  );
  const progressBg = useColorModeValue("gray.200", "whiteAlpha.200");

  // Badge colors based on category
  const getCategoryIcon = (category) => {
    switch (category) {
      case "tickets":
        return MdConfirmationNumber;
      case "merchandise":
        return MdShoppingBag;
      case "addons":
        return MdCardGiftcard;
      case "donations":
        return MdVolunteerActivism;
      default:
        return MdConfirmationNumber;
    }
  };

  const getCategoryBadgeColor = (category) => {
    switch (category) {
      case "tickets":
        return { bg: "#fff5ed", color: "#e77324", darkBg: "rgba(231, 115, 36, 0.15)" };
      case "merchandise":
        return { bg: "#e8f5e9", color: "#4caf50", darkBg: "rgba(76, 175, 80, 0.15)" };
      case "addons":
        return { bg: "#e3f2fd", color: "#2196f3", darkBg: "rgba(33, 150, 243, 0.15)" };
      case "donations":
        return { bg: "#fce4ec", color: "#e91e63", darkBg: "rgba(233, 30, 99, 0.15)" };
      default:
        return { bg: "#fff5ed", color: "#e77324", darkBg: "rgba(231, 115, 36, 0.15)" };
    }
  };

  // Status badge colors
  const getStatusBadge = (status) => {
    switch (status) {
      case "on_sale":
        return { bg: "#dcfce7", color: "#16a34a", label: t("tickets.ticketRow.onSale") };
      case "sold_out":
        return { bg: "#fee2e2", color: "#dc2626", label: t("tickets.ticketRow.soldOut") };
      case "hidden":
        return { bg: "#f3f4f6", color: "#6b7280", label: t("tickets.ticketRow.hidden") };
      case "scheduled":
        return { bg: "#dbeafe", color: "#2563eb", label: t("tickets.ticketRow.scheduled") };
      default:
        return { bg: "#dcfce7", color: "#16a34a", label: t("tickets.ticketRow.onSale") };
    }
  };

  // Price display
  const getPriceDisplay = (price) => {
    if (price === 0 || price === "0" || price === "0.00") {
      return { text: t("tickets.ticketRow.free"), color: "#16a34a", isFree: true };
    }
    return { text: `$${price}`, color: textColor, isFree: false };
  };

  // Calculate remaining
  const getRemaining = () => {
    if (ticket.isUnlimited) {
      return { remaining: "∞", label: t("tickets.ticketRow.unlimited"), isUnlimited: true };
    }
    const remaining = ticket.quantity - ticket.sold;
    return { 
      remaining, 
      label: `${remaining} ${t("tickets.ticketRow.left")}`,
      isUnlimited: false,
    };
  };

  const categoryColors = getCategoryBadgeColor(ticket.category);
  const categoryBadgeBg = useColorModeValue(categoryColors.bg, categoryColors.darkBg);
  const statusBadge = getStatusBadge(ticket.status);
  const priceDisplay = getPriceDisplay(ticket.price);
  const remainingInfo = getRemaining();
  const progressPercent = ticket.isUnlimited ? 0 : (ticket.sold / ticket.quantity) * 100;
  const CategoryIcon = getCategoryIcon(ticket.category);

  return (
    <Box
      w="100%"
      p={{ base: "16px", md: "20px" }}
      bg={cardBg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="20px"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      cursor="pointer"
      position="relative"
      _hover={{
        borderColor: hoverBorderColor,
        bg: rowHoverBg,
        transform: "translateY(-2px)",
        boxShadow: hoverShadow,
      }}
    >
      {/* Decorative gradient line */}
      <Box
        position="absolute"
        top="0"
        left="20px"
        right="20px"
        h="3px"
        bg={categoryColors.color}
        opacity="0"
        borderRadius="full"
        transition="opacity 0.3s"
        sx={{
          ".chakra-box:hover > &": {
            opacity: 0.6,
          },
        }}
      />

      <Flex
        direction={{ base: "column", lg: "row" }}
        gap={{ base: "16px", lg: "24px" }}
        align={{ base: "stretch", lg: "center" }}
      >
        {/* Left Area - Category Badge & Name */}
        <Flex
          direction="row"
          align="center"
          gap="16px"
          minW={{ lg: "260px" }}
          flex={{ lg: "0 0 260px" }}
        >
          {/* Category Icon */}
          <Flex
            w="52px"
            h="52px"
            bg={categoryBadgeBg}
            borderRadius="14px"
            align="center"
            justify="center"
            flexShrink={0}
            boxShadow={`0 4px 12px ${categoryColors.color}20`}
            transition="all 0.3s"
            _groupHover={{
              transform: "scale(1.05)",
            }}
          >
            <Icon as={CategoryIcon} w="26px" h="26px" color={categoryColors.color} />
          </Flex>

          <VStack align="flex-start" spacing="6px">
            {/* Category Badge */}
            <Badge
              bg={categoryBadgeBg}
              color={categoryColors.color}
              fontSize="10px"
              fontWeight="700"
              px="10px"
              py="3px"
              borderRadius="full"
              textTransform="uppercase"
              letterSpacing="0.5px"
            >
              {t(`tickets.ticketRow.categories.${ticket.category}`)}
            </Badge>
            {/* Ticket Name */}
            <Text
              color={textColor}
              fontSize="md"
              fontWeight="700"
              noOfLines={1}
              letterSpacing="-0.2px"
            >
              {ticket.name}
            </Text>
          </VStack>
        </Flex>

        {/* Middle Area - Stats */}
        <Flex
          flex="1"
          direction={{ base: "column", md: "row" }}
          gap={{ base: "12px", md: "16px" }}
          align={{ base: "stretch", md: "center" }}
        >
          {/* Stats Cards Container */}
          <HStack
            spacing="0"
            bg={statsBg}
            borderRadius="14px"
            overflow="hidden"
            flex="1"
            divider={<Divider orientation="vertical" h="40px" />}
          >
            {/* Price */}
            <Tooltip label={t("tickets.ticketRow.price")} placement="top" hasArrow>
              <VStack 
                align="center" 
                spacing="2px" 
                px={{ base: "12px", md: "20px" }} 
                py="10px"
                flex="1"
              >
                <Text
                  color={labelColor}
                  fontSize="10px"
                  fontWeight="600"
                  textTransform="uppercase"
                  letterSpacing="0.5px"
                >
                  {t("tickets.ticketRow.price")}
                </Text>
                <Text
                  color={priceDisplay.color}
                  fontSize="md"
                  fontWeight="700"
                >
                  {priceDisplay.isFree ? (
                    <Badge
                      bg="#dcfce7"
                      color="#16a34a"
                      fontSize="sm"
                      fontWeight="700"
                      px="10px"
                      py="2px"
                      borderRadius="full"
                    >
                      {priceDisplay.text}
                    </Badge>
                  ) : (
                    priceDisplay.text
                  )}
                </Text>
              </VStack>
            </Tooltip>

            {/* Attendees / Quantity */}
            <Tooltip label={t("tickets.ticketRow.attendees")} placement="top" hasArrow>
              <VStack 
                align="center" 
                spacing="4px" 
                px={{ base: "12px", md: "20px" }} 
                py="10px"
                flex="1.5"
              >
                <Text
                  color={labelColor}
                  fontSize="10px"
                  fontWeight="600"
                  textTransform="uppercase"
                  letterSpacing="0.5px"
                >
                  {t("tickets.ticketRow.attendees")}
                </Text>
                <HStack spacing="8px">
                  <Text
                    color={textColor}
                    fontSize="md"
                    fontWeight="700"
                  >
                    {ticket.sold} / {remainingInfo.isUnlimited ? (
                      <Icon as={MdAllInclusive} w="16px" h="16px" mb="-2px" />
                    ) : ticket.quantity}
                  </Text>
                </HStack>
                {!remainingInfo.isUnlimited && (
                  <HStack spacing="6px" w="100%">
                    <Progress
                      value={progressPercent}
                      size="xs"
                      w="100%"
                      maxW="80px"
                      borderRadius="full"
                      bg={progressBg}
                      sx={{
                        "& > div": {
                          bg: progressPercent > 80 ? "#dc2626" : progressPercent > 50 ? "#f59e0b" : "#16a34a",
                        },
                      }}
                    />
                    <Text
                      color={textColorSecondary}
                      fontSize="10px"
                      fontWeight="600"
                      whiteSpace="nowrap"
                    >
                      {remainingInfo.label}
                    </Text>
                  </HStack>
                )}
              </VStack>
            </Tooltip>

            {/* Sale Period */}
            <Tooltip label={t("tickets.ticketRow.salePeriod")} placement="top" hasArrow>
              <VStack 
                align="center" 
                spacing="2px" 
                px={{ base: "12px", md: "20px" }} 
                py="10px"
                flex="1"
                display={{ base: "none", md: "flex" }}
              >
                <HStack spacing="4px">
                  <Icon as={MdAccessTime} w="12px" h="12px" color={labelColor} />
                  <Text
                    color={labelColor}
                    fontSize="10px"
                    fontWeight="600"
                    textTransform="uppercase"
                    letterSpacing="0.5px"
                  >
                    {t("tickets.ticketRow.salePeriod")}
                  </Text>
                </HStack>
                <Text
                  color={textColor}
                  fontSize="sm"
                  fontWeight="600"
                  noOfLines={1}
                >
                  {ticket.salePeriod || t("tickets.ticketRow.alwaysAvailable")}
                </Text>
              </VStack>
            </Tooltip>
          </HStack>
        </Flex>

        {/* Right Area - Status & Actions */}
        <Flex
          direction="row"
          align="center"
          gap="12px"
          justify={{ base: "space-between", lg: "flex-end" }}
        >
          {/* Status Badge */}
          <Badge
            bg={statusBadge.bg}
            color={statusBadge.color}
            fontSize="xs"
            fontWeight="700"
            px="14px"
            py="8px"
            borderRadius="full"
            textTransform="uppercase"
            letterSpacing="0.5px"
            boxShadow={`0 2px 8px ${statusBadge.color}20`}
          >
            {statusBadge.label}
          </Badge>

          {/* Actions Menu */}
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
                borderRadius="16px"
                boxShadow={menuShadow}
                py="8px"
                minW="180px"
                zIndex="modal"
              >
                <MenuItem
                  icon={<Icon as={MdEdit} w="18px" h="18px" />}
                  fontSize="sm"
                  fontWeight="500"
                  borderRadius="10px"
                  mx="8px"
                  py="10px"
                  _hover={{ bg: iconBg, color: iconColor }}
                  _focus={{ bg: iconBg, color: iconColor }}
                >
                  {t("tickets.ticketRow.edit")}
                </MenuItem>
                <MenuItem
                  icon={<Icon as={MdContentCopy} w="18px" h="18px" />}
                  fontSize="sm"
                  fontWeight="500"
                  borderRadius="10px"
                  mx="8px"
                  py="10px"
                  _hover={{ bg: iconBg, color: iconColor }}
                  _focus={{ bg: iconBg, color: iconColor }}
                >
                  {t("tickets.ticketRow.duplicate")}
                </MenuItem>
                <MenuItem
                  icon={<Icon as={MdVisibilityOff} w="18px" h="18px" />}
                  fontSize="sm"
                  fontWeight="500"
                  borderRadius="10px"
                  mx="8px"
                  py="10px"
                  _hover={{ bg: iconBg, color: iconColor }}
                  _focus={{ bg: iconBg, color: iconColor }}
                >
                  {t("tickets.ticketRow.hide")}
                </MenuItem>
                <Divider my="6px" />
                <MenuItem
                  icon={<Icon as={MdDelete} w="18px" h="18px" />}
                  fontSize="sm"
                  fontWeight="500"
                  borderRadius="10px"
                  mx="8px"
                  py="10px"
                  color="red.500"
                  _hover={{ bg: "red.50", color: "red.600" }}
                  _focus={{ bg: "red.50", color: "red.600" }}
                >
                  {t("tickets.ticketRow.delete")}
                </MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
}
