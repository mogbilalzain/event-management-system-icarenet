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
  Divider,
  Portal,
  Avatar,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
// Icons
import { 
  MdMoreVert, 
  MdVisibility,
  MdEdit,
  MdEmail,
  MdDelete,
  MdCheckCircle,
  MdAccessTime,
  MdConfirmationNumber,
  MdReceipt,
  MdPersonAdd,
  MdQrCode,
  MdPrint,
} from "react-icons/md";

export default function AttendeeRow({ attendee, t, showCheckIn = true }) {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "secondaryGray.400");
  const cardBg = useColorModeValue("white", "navy.800");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.100");
  const hoverBg = useColorModeValue("gray.50", "whiteAlpha.50");
  const iconBg = useColorModeValue("#fff5ed", "rgba(231, 115, 36, 0.15)");
  const iconColor = useColorModeValue("#e77324", "#F99C58");
  const menuShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.15)",
    "0px 18px 40px rgba(0, 0, 0, 0.4)"
  );
  const rowBorderColor = useColorModeValue("gray.100", "whiteAlpha.100");
  const avatarBg = useColorModeValue(
    "linear-gradient(135deg, #e77324 0%, #F99C58 100%)",
    "linear-gradient(135deg, #e77324 0%, #F99C58 100%)"
  );

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return { 
          bg: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)", 
          color: "#16a34a",
          borderColor: "#bbf7d0",
          label: t("attendees.status.active"),
          icon: MdCheckCircle,
        };
      case "pending":
        return { 
          bg: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)", 
          color: "#d97706",
          borderColor: "#fde68a",
          label: t("attendees.status.pending"),
          icon: MdAccessTime,
        };
      case "cancelled":
        return { 
          bg: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)", 
          color: "#dc2626",
          borderColor: "#fecaca",
          label: t("attendees.status.cancelled"),
          icon: null,
        };
      default:
        return { 
          bg: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)", 
          color: "#16a34a",
          borderColor: "#bbf7d0",
          label: t("attendees.status.active"),
          icon: MdCheckCircle,
        };
    }
  };

  // Get check-in badge
  const getCheckInBadge = (checkIn) => {
    if (!checkIn) return null;
    
    const { checked, total } = checkIn;
    const isComplete = checked >= total;
    
    return {
      bg: isComplete 
        ? "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)"
        : "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
      color: isComplete ? "#16a34a" : "#6b7280",
      borderColor: isComplete ? "#bbf7d0" : "#e5e7eb",
      label: `${t("attendees.checkedIn")} (${checked}/${total})`,
      isComplete,
    };
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const statusBadge = getStatusBadge(attendee.status);
  const StatusIcon = statusBadge.icon;
  const checkInBadge = getCheckInBadge(attendee.checkIn);

  return (
    <Box
      as="tr"
      borderBottom="1px solid"
      borderColor={rowBorderColor}
      transition="all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{ 
        bg: hoverBg,
        transform: "scale(1.002)",
      }}
      cursor="pointer"
    >
      {/* Attendee Details Column */}
      <Box as="td" px="20px" py="18px">
        <HStack spacing="14px">
          <Box position="relative">
            <Avatar
              size="md"
              name={attendee.name}
              bgGradient={avatarBg}
              color="white"
              fontWeight="700"
              fontSize="sm"
              boxShadow="0 4px 12px rgba(231, 115, 36, 0.25)"
            >
              <Text>{getInitials(attendee.name)}</Text>
            </Avatar>
            {attendee.status === "active" && (
              <Box
                position="absolute"
                bottom="2px"
                right="2px"
                w="10px"
                h="10px"
                borderRadius="full"
                bg="#16a34a"
                border="2px solid white"
              />
            )}
          </Box>
          <VStack align="flex-start" spacing="4px">
            <Text
              color={textColor}
              fontSize="sm"
              fontWeight="700"
              noOfLines={1}
              letterSpacing="-0.2px"
            >
              {attendee.name}
            </Text>
            <Badge
              bg={iconBg}
              color={iconColor}
              fontSize="10px"
              fontWeight="700"
              px="8px"
              py="2px"
              borderRadius="6px"
              fontFamily="mono"
            >
              {attendee.attendeeId}
            </Badge>
            <HStack spacing="6px">
              <Icon as={MdEmail} w="12px" h="12px" color={textColorSecondary} />
              <Text
                color={textColorSecondary}
                fontSize="xs"
                noOfLines={1}
              >
                {attendee.email}
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </Box>

      {/* Order & Ticket Column */}
      <Box as="td" px="20px" py="18px">
        <VStack align="flex-start" spacing="8px">
          {/* Ticket Name */}
          <HStack spacing="8px">
            <Flex
              w="32px"
              h="32px"
              bg={iconBg}
              borderRadius="8px"
              align="center"
              justify="center"
            >
              <Icon as={MdConfirmationNumber} w="16px" h="16px" color={iconColor} />
            </Flex>
            <Text
              color={textColor}
              fontSize="sm"
              fontWeight="600"
            >
              {attendee.ticketName}
            </Text>
          </HStack>
          
          {/* Order ID */}
          <HStack spacing="8px">
            <Flex
              w="32px"
              h="32px"
              bg={useColorModeValue("gray.100", "whiteAlpha.100")}
              borderRadius="8px"
              align="center"
              justify="center"
            >
              <Icon as={MdReceipt} w="16px" h="16px" color={textColorSecondary} />
            </Flex>
            <VStack align="flex-start" spacing="0">
              <Text
                color={textColor}
                fontSize="xs"
                fontWeight="600"
                fontFamily="mono"
              >
                {attendee.orderId}
              </Text>
              <Text
                color={textColorSecondary}
                fontSize="xs"
              >
                {formatDate(attendee.purchaseDate)}
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </Box>

      {/* Status Column */}
      <Box as="td" px="20px" py="18px">
        <Badge
          bgGradient={statusBadge.bg}
          color={statusBadge.color}
          fontSize="xs"
          fontWeight="700"
          px="14px"
          py="8px"
          borderRadius="full"
          display="flex"
          alignItems="center"
          gap="6px"
          w="fit-content"
          border="1px solid"
          borderColor={statusBadge.borderColor}
          boxShadow={`0 2px 8px ${statusBadge.color}15`}
          textTransform="uppercase"
          letterSpacing="0.5px"
        >
          {StatusIcon && <Icon as={StatusIcon} w="14px" h="14px" />}
          {statusBadge.label}
        </Badge>
      </Box>

      {/* Check-In Status Column (Optional) */}
      {showCheckIn && (
        <Box as="td" px="20px" py="18px">
          {checkInBadge ? (
            <Badge
              bgGradient={checkInBadge.bg}
              color={checkInBadge.color}
              fontSize="xs"
              fontWeight="700"
              px="14px"
              py="8px"
              borderRadius="full"
              display="flex"
              alignItems="center"
              gap="6px"
              w="fit-content"
              border="1px solid"
              borderColor={checkInBadge.borderColor}
              boxShadow={`0 2px 8px ${checkInBadge.color}15`}
            >
              {checkInBadge.isComplete && <Icon as={MdCheckCircle} w="14px" h="14px" />}
              {checkInBadge.label}
            </Badge>
          ) : (
            <Text color={textColorSecondary} fontSize="sm">—</Text>
          )}
        </Box>
      )}

      {/* Actions Column */}
      <Box as="td" px="20px" py="18px" textAlign="center">
        <Menu placement="bottom-end" isLazy>
          <Tooltip label={t("attendees.actions.more")} hasArrow placement="top">
            <MenuButton
              as={IconButton}
              icon={<Icon as={MdMoreVert} w="20px" h="20px" />}
              variant="ghost"
              color={textColorSecondary}
              borderRadius="full"
              _hover={{ 
                bg: iconBg, 
                color: iconColor,
                transform: "scale(1.1)",
              }}
              size="md"
              aria-label="Attendee actions"
              transition="all 0.2s"
            />
          </Tooltip>
          <Portal>
            <MenuList
              bg={cardBg}
              borderColor={borderColor}
              borderRadius="16px"
              boxShadow={menuShadow}
              py="10px"
              minW="220px"
              zIndex="modal"
            >
              <MenuItem
                icon={<Icon as={MdVisibility} w="18px" h="18px" />}
                fontSize="sm"
                fontWeight="600"
                borderRadius="10px"
                mx="8px"
                py="12px"
                _hover={{ bg: iconBg, color: iconColor }}
                _focus={{ bg: iconBg, color: iconColor }}
              >
                {t("attendees.actions.view")}
              </MenuItem>
              <MenuItem
                icon={<Icon as={MdEdit} w="18px" h="18px" />}
                fontSize="sm"
                fontWeight="600"
                borderRadius="10px"
                mx="8px"
                py="12px"
                _hover={{ bg: iconBg, color: iconColor }}
                _focus={{ bg: iconBg, color: iconColor }}
              >
                {t("attendees.actions.edit")}
              </MenuItem>
              <MenuItem
                icon={<Icon as={MdQrCode} w="18px" h="18px" />}
                fontSize="sm"
                fontWeight="600"
                borderRadius="10px"
                mx="8px"
                py="12px"
                _hover={{ bg: iconBg, color: iconColor }}
                _focus={{ bg: iconBg, color: iconColor }}
              >
                {t("attendees.actions.viewQR")}
              </MenuItem>
              <MenuItem
                icon={<Icon as={MdEmail} w="18px" h="18px" />}
                fontSize="sm"
                fontWeight="600"
                borderRadius="10px"
                mx="8px"
                py="12px"
                _hover={{ bg: iconBg, color: iconColor }}
                _focus={{ bg: iconBg, color: iconColor }}
              >
                {t("attendees.actions.resendEmail")}
              </MenuItem>
              <MenuItem
                icon={<Icon as={MdPrint} w="18px" h="18px" />}
                fontSize="sm"
                fontWeight="600"
                borderRadius="10px"
                mx="8px"
                py="12px"
                _hover={{ bg: iconBg, color: iconColor }}
                _focus={{ bg: iconBg, color: iconColor }}
              >
                {t("attendees.actions.printTicket")}
              </MenuItem>
              <Divider my="8px" />
              <MenuItem
                icon={<Icon as={MdDelete} w="18px" h="18px" />}
                fontSize="sm"
                fontWeight="600"
                borderRadius="10px"
                mx="8px"
                py="12px"
                color="red.500"
                _hover={{ bg: "red.50", color: "red.600" }}
                _focus={{ bg: "red.50", color: "red.600" }}
              >
                {t("attendees.actions.delete")}
              </MenuItem>
            </MenuList>
          </Portal>
        </Menu>
      </Box>
    </Box>
  );
}

