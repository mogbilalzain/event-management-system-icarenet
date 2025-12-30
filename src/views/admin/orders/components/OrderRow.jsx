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
  MdReceipt,
  MdRefresh,
  MdDelete,
  MdCreditCard,
  MdAccountBalanceWallet,
  MdPayment,
  MdCheckCircle,
  MdSchedule,
  MdCancel,
  MdAccessTime,
  MdEmail,
  MdPrint,
} from "react-icons/md";

export default function OrderRow({ order, t }) {
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

  // Get status badge with enhanced styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return { 
          bg: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)", 
          color: "#16a34a",
          borderColor: "#bbf7d0",
          label: t("orders.status.completed"),
          icon: MdCheckCircle,
        };
      case "pending":
        return { 
          bg: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)", 
          color: "#d97706",
          borderColor: "#fde68a",
          label: t("orders.status.pending"),
          icon: MdSchedule,
        };
      case "cancelled":
        return { 
          bg: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)", 
          color: "#dc2626",
          borderColor: "#fecaca",
          label: t("orders.status.cancelled"),
          icon: MdCancel,
        };
      case "refunded":
        return { 
          bg: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)", 
          color: "#6366f1",
          borderColor: "#c7d2fe",
          label: t("orders.status.refunded"),
          icon: MdRefresh,
        };
      default:
        return { 
          bg: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)", 
          color: "#16a34a",
          borderColor: "#bbf7d0",
          label: t("orders.status.completed"),
          icon: MdCheckCircle,
        };
    }
  };

  // Get payment method icon and color
  const getPaymentInfo = (method) => {
    const methodLower = method?.toLowerCase();
    if (methodLower?.includes("credit") || methodLower?.includes("card")) {
      return { icon: MdCreditCard, color: "#3b82f6", bg: "#dbeafe" };
    }
    if (methodLower?.includes("paypal")) {
      return { icon: MdAccountBalanceWallet, color: "#0070ba", bg: "#e0f2fe" };
    }
    return { icon: MdPayment, color: "#6b7280", bg: "#f3f4f6" };
  };

  // Calculate time ago with more detail
  const getTimeAgo = (dateString) => {
    if (!dateString) return t("orders.timeAgo.unknown");
    const now = new Date();
    const orderDate = new Date(dateString);
    const diffMs = now - orderDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return t("orders.timeAgo.justNow");
    if (diffMins < 60) return `${diffMins} ${t("orders.timeAgo.minutesAgo")}`;
    if (diffHours < 24) return `${diffHours} ${t("orders.timeAgo.hoursAgo")}`;
    if (diffDays < 7) return `${diffDays} ${t("orders.timeAgo.daysAgo")}`;
    return orderDate.toLocaleDateString();
  };

  const statusBadge = getStatusBadge(order.status);
  const StatusIcon = statusBadge.icon;
  const paymentInfo = getPaymentInfo(order.paymentMethod);
  const PaymentIcon = paymentInfo.icon;
  const timeAgo = getTimeAgo(order.orderDate);

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
      {/* Customer Column */}
      <Box as="td" px="20px" py="18px">
        <HStack spacing="14px">
          <Box position="relative">
            <Avatar
              size="md"
              name={order.customerName}
              bgGradient={avatarBg}
              color="white"
              fontWeight="700"
              fontSize="sm"
              boxShadow="0 4px 12px rgba(231, 115, 36, 0.25)"
            />
            {/* Online indicator */}
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
          </Box>
          <VStack align="flex-start" spacing="4px">
            <Text
              color={textColor}
              fontSize="sm"
              fontWeight="700"
              noOfLines={1}
              letterSpacing="-0.2px"
            >
              {order.customerName}
            </Text>
            <HStack spacing="6px">
              <Icon as={MdEmail} w="12px" h="12px" color={textColorSecondary} />
              <Text
                color={textColorSecondary}
                fontSize="xs"
                noOfLines={1}
              >
                {order.customerEmail}
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </Box>

      {/* Order Details Column */}
      <Box as="td" px="20px" py="18px">
        <VStack align="flex-start" spacing="6px">
          <Badge
            bg={iconBg}
            color={iconColor}
            fontSize="xs"
            fontWeight="700"
            px="10px"
            py="4px"
            borderRadius="8px"
            fontFamily="mono"
            letterSpacing="0.5px"
          >
            {order.orderId}
          </Badge>
          <HStack spacing="8px">
            <HStack 
              spacing="4px" 
              bg={useColorModeValue("gray.100", "whiteAlpha.100")}
              px="8px"
              py="4px"
              borderRadius="6px"
            >
              <Icon as={MdAccessTime} w="12px" h="12px" color={textColorSecondary} />
              <Text color={textColorSecondary} fontSize="xs" fontWeight="500">
                {timeAgo}
              </Text>
            </HStack>
          </HStack>
          
        </VStack>
      </Box>

      {/* Items Column */}
      <Box as="td" px="20px" py="18px">
        <Flex
          bg={iconBg}
          color={iconColor}
          w="fit-content"
          px="14px"
          py="8px"
          borderRadius="12px"
          align="center"
          gap="6px"
          boxShadow={`0 2px 8px ${iconColor}20`}
        >
          <Text fontSize="lg" fontWeight="800">
            {order.itemsCount}
          </Text>
          <Text fontSize="xs" fontWeight="600" opacity="0.9">
            {order.itemsCount === 1 ? t("orders.item") : t("orders.items")}
          </Text>
        </Flex>
      </Box>

      {/* Amount Column */}
      <Box as="td" px="20px" py="18px">
        <VStack align="flex-start" spacing="4px">
          <Text
            color={textColor}
            fontSize="lg"
            fontWeight="800"
            letterSpacing="-0.5px"
          >
            ${order.totalAmount}
          </Text>
          <HStack 
            spacing="4px"
            bg={useColorModeValue("gray.100", "whiteAlpha.100")}
            px="8px"
            py="3px"
            borderRadius="6px"
          >
            <Text color={textColorSecondary} fontSize="10px" fontWeight="600">
              {t("orders.taxFees")}:
            </Text>
            <Text color={textColorSecondary} fontSize="10px" fontWeight="700">
              ${order.tax || "0.00"}
            </Text>
          </HStack>
        </VStack>
      </Box>

      {/* Payment Column */}
      <Box as="td" px="20px" py="18px">
        <HStack spacing="10px">
          <Flex
            w="36px"
            h="36px"
            bg={paymentInfo.bg}
            borderRadius="10px"
            align="center"
            justify="center"
          >
            <Icon as={PaymentIcon} w="18px" h="18px" color={paymentInfo.color} />
          </Flex>
          <Text
            color={textColor}
            fontSize="sm"
            fontWeight="600"
          >
            {order.paymentMethod || t("orders.payment.other")}
          </Text>
        </HStack>
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
          <Icon as={StatusIcon} w="14px" h="14px" />
          {statusBadge.label}
        </Badge>
      </Box>

      {/* Actions Column */}
      <Box as="td" px="20px" py="18px" textAlign="center">
        <Menu placement="bottom-end" isLazy>
          <Tooltip label={t("orders.actions.view")} hasArrow placement="top">
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
              aria-label="Order actions"
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
                {t("orders.actions.view")}
              </MenuItem>
              <MenuItem
                icon={<Icon as={MdReceipt} w="18px" h="18px" />}
                fontSize="sm"
                fontWeight="600"
                borderRadius="10px"
                mx="8px"
                py="12px"
                _hover={{ bg: iconBg, color: iconColor }}
                _focus={{ bg: iconBg, color: iconColor }}
              >
                {t("orders.actions.resendConfirmation")}
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
                Print Invoice
              </MenuItem>
              <MenuItem
                icon={<Icon as={MdRefresh} w="18px" h="18px" />}
                fontSize="sm"
                fontWeight="600"
                borderRadius="10px"
                mx="8px"
                py="12px"
                _hover={{ bg: iconBg, color: iconColor }}
                _focus={{ bg: iconBg, color: iconColor }}
              >
                {t("orders.actions.issueRefund")}
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
                {t("orders.actions.delete")}
              </MenuItem>
            </MenuList>
          </Portal>
        </Menu>
      </Box>
    </Box>
  );
}
