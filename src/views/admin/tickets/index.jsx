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
  Button,
  Icon,
  Flex,
  Card,
  IconButton,
  Badge,
  Collapse,
  Select,
  Tooltip,
} from "@chakra-ui/react";
import React, { useState } from "react";
// Language Context
import { useLanguage } from "contexts/LanguageContext";
import { SearchIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import { 
  MdAdd, 
  MdConfirmationNumber, 
  MdCloud,
  MdExpandMore,
  MdExpandLess,
  MdEdit,
  MdVisibilityOff,
  MdBlock,
  MdFilterList,
  MdSort,
} from "react-icons/md";
// Components
import CreateTicketModal from "./components/CreateTicketModal";
import TicketRow from "./components/TicketRow";
import IconBox from "components/icons/IconBox";

export default function Tickets() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  const [sortBy, setSortBy] = useState("name");
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Form state
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("tickets");
  const [productPrice, setProductPrice] = useState("0.00");
  const [productQuantity, setProductQuantity] = useState("1");
  const [isUnlimited, setIsUnlimited] = useState(true);

  // Mock tickets data
  const [tickets] = useState([
    {
      id: 1,
      name: "VIP Ticket",
      category: "tickets",
      price: "0",
      quantity: 10,
      sold: 0,
      isUnlimited: false,
      status: "on_sale",
      salePeriod: null,
    },
    {
      id: 2,
      name: "General Admission",
      category: "tickets",
      price: "25.00",
      quantity: 100,
      sold: 45,
      isUnlimited: false,
      status: "on_sale",
      salePeriod: null,
    },
    {
      id: 3,
      name: "Early Bird Special",
      category: "tickets",
      price: "15.00",
      quantity: 50,
      sold: 50,
      isUnlimited: false,
      status: "sold_out",
      salePeriod: "Dec 1 - Dec 15",
    },
    {
      id: 4,
      name: "Event T-Shirt",
      category: "merchandise",
      price: "20.00",
      quantity: 200,
      sold: 35,
      isUnlimited: false,
      status: "on_sale",
      salePeriod: null,
    },
    {
      id: 5,
      name: "Parking Pass",
      category: "addons",
      price: "10.00",
      quantity: 0,
      sold: 12,
      isUnlimited: true,
      status: "on_sale",
      salePeriod: null,
    },
  ]);

  // Filter tickets based on search
  const filteredTickets = tickets.filter((ticket) =>
    ticket.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort tickets
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "price":
        return parseFloat(a.price) - parseFloat(b.price);
      case "sold":
        return b.sold - a.sold;
      default:
        return 0;
    }
  });

  // Group tickets by category
  const ticketsByCategory = sortedTickets.reduce((acc, ticket) => {
    if (!acc[ticket.category]) {
      acc[ticket.category] = [];
    }
    acc[ticket.category].push(ticket);
    return acc;
  }, {});
  
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "secondaryGray.400");
  const cardBg = useColorModeValue("white", "navy.800");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.100");
  const inputBg = useColorModeValue("#f8fafc", "whiteAlpha.50");
  const inputBorderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const iconBg = useColorModeValue("#fff5ed", "rgba(231, 115, 36, 0.15)");
  const iconColor = useColorModeValue("#e77324", "#F99C58");
  const orangeGradient = "linear-gradient(135deg, #e77324 0%, #F99C58 100%)";
  const headerBg = useColorModeValue("linear-gradient(180deg, #fafbfc 0%, white 100%)", "whiteAlpha.50");
  const cardShadow = useColorModeValue(
    "0px 4px 20px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  const hoverShadow = useColorModeValue(
    "0px 8px 32px rgba(112, 144, 176, 0.15)",
    "0px 8px 32px rgba(0, 0, 0, 0.3)"
  );
  const focusColor = useColorModeValue("#e77324", "#F99C58");
  const sectionBorderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const hasTickets = sortedTickets.length > 0;

  // Stats
  const totalTickets = tickets.length;
  const onSaleCount = tickets.filter(t => t.status === "on_sale").length;
  const soldOutCount = tickets.filter(t => t.status === "sold_out").length;

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
              w="56px"
              h="56px"
              bg={iconBg}
              icon={
                <Icon
                  w="32px"
                  h="32px"
                  as={MdConfirmationNumber}
                  color={iconColor}
                />
              }
            />
            <Box>
              <Text
                color={textColor}
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="700"
                letterSpacing="-0.5px"
                mb="4px"
              >
                {t("tickets.title")}
              </Text>
              <Text
                color={textColorSecondary}
                fontSize="md"
                fontWeight="400"
              >
                {t("tickets.subtitle")}
              </Text>
            </Box>
          </HStack>

          {/* Create Button - Desktop */}
          <Button
            display={{ base: "none", md: "flex" }}
            bgGradient={orangeGradient}
            color="white"
            fontWeight="600"
            borderRadius="16px"
            px="32px"
            py="14px"
            h="56px"
            fontSize="md"
            leftIcon={<Icon as={MdAdd} w="22px" h="22px" />}
            onClick={onOpen}
            boxShadow="0 8px 24px rgba(231, 115, 36, 0.25)"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "0 12px 32px rgba(231, 115, 36, 0.35)",
            }}
            _active={{
              transform: "translateY(0px)",
              boxShadow: "0 6px 16px rgba(231, 115, 36, 0.3)",
            }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          >
            {t("tickets.createTicket")}
          </Button>
        </Flex>

        {/* Stats Cards */}
        <HStack spacing="16px" display={{ base: "none", md: "flex" }}>
          <Card
            p="16px"
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="16px"
            boxShadow={cardShadow}
            flex="1"
            transition="all 0.2s"
            _hover={{ boxShadow: hoverShadow, transform: "translateY(-2px)" }}
          >
            <HStack spacing="12px">
              <Flex
                w="44px"
                h="44px"
                bg={iconBg}
                borderRadius="12px"
                align="center"
                justify="center"
              >
                <Icon as={MdConfirmationNumber} w="22px" h="22px" color={iconColor} />
              </Flex>
              <Box>
                <Text color={textColorSecondary} fontSize="xs" fontWeight="500" textTransform="uppercase">
                  {t("tickets.products") || "Total Products"}
                </Text>
                <Text color={textColor} fontSize="xl" fontWeight="700">
                  {totalTickets}
                </Text>
              </Box>
            </HStack>
          </Card>
          <Card
            p="16px"
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="16px"
            boxShadow={cardShadow}
            flex="1"
            transition="all 0.2s"
            _hover={{ boxShadow: hoverShadow, transform: "translateY(-2px)" }}
          >
            <HStack spacing="12px">
              <Flex
                w="44px"
                h="44px"
                bg="#dcfce7"
                borderRadius="12px"
                align="center"
                justify="center"
              >
                <Box w="12px" h="12px" borderRadius="full" bg="#16a34a" />
              </Flex>
              <Box>
                <Text color={textColorSecondary} fontSize="xs" fontWeight="500" textTransform="uppercase">
                  {t("tickets.ticketRow.onSale")}
                </Text>
                <Text color={textColor} fontSize="xl" fontWeight="700">
                  {onSaleCount}
                </Text>
              </Box>
            </HStack>
          </Card>
          <Card
            p="16px"
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="16px"
            boxShadow={cardShadow}
            flex="1"
            transition="all 0.2s"
            _hover={{ boxShadow: hoverShadow, transform: "translateY(-2px)" }}
          >
            <HStack spacing="12px">
              <Flex
                w="44px"
                h="44px"
                bg="#fee2e2"
                borderRadius="12px"
                align="center"
                justify="center"
              >
                <Box w="12px" h="12px" borderRadius="full" bg="#dc2626" />
              </Flex>
              <Box>
                <Text color={textColorSecondary} fontSize="xs" fontWeight="500" textTransform="uppercase">
                  {t("tickets.ticketRow.soldOut")}
                </Text>
                <Text color={textColor} fontSize="xl" fontWeight="700">
                  {soldOutCount}
                </Text>
              </Box>
            </HStack>
          </Card>
        </HStack>

        {/* Top Action Bar */}
        <Card
          p={{ base: "16px", md: "20px" }}
          bg={cardBg}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="20px"
          boxShadow={cardShadow}
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            gap="16px"
            align={{ base: "stretch", md: "center" }}
          >
            {/* Search Input */}
            <InputGroup flex={{ base: "1", md: "0 0 360px" }}>
              <InputLeftElement pointerEvents="none" h="52px" pl="16px">
                <SearchIcon color={textColorSecondary} w="18px" h="18px" />
              </InputLeftElement>
              <Input
                placeholder={t("tickets.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                bg={inputBg}
                border="2px solid"
                borderColor={inputBorderColor}
                borderRadius="16px"
                h="52px"
                pl="48px"
                fontSize="md"
                fontWeight="500"
                _placeholder={{ color: textColorSecondary, fontWeight: "400" }}
                _hover={{ borderColor: "gray.300" }}
                _focus={{
                  borderColor: focusColor,
                  boxShadow: `0 0 0 3px rgba(231, 115, 36, 0.1)`,
                }}
                transition="all 0.2s"
              />
            </InputGroup>

            <HStack spacing="12px" flex="1" justify={{ base: "stretch", md: "flex-end" }}>
              {/* Sort Dropdown */}
              <HStack spacing="8px" display={{ base: "none", md: "flex" }}>
                <Icon as={MdSort} w="18px" h="18px" color={textColorSecondary} />
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  bg={inputBg}
                  border="2px solid"
                  borderColor={inputBorderColor}
                  borderRadius="14px"
                  h="48px"
                  w="160px"
                  fontSize="sm"
                  fontWeight="500"
                  cursor="pointer"
                  _hover={{ borderColor: "gray.300" }}
                  _focus={{
                    borderColor: focusColor,
                    boxShadow: `0 0 0 3px rgba(231, 115, 36, 0.1)`,
                  }}
                >
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="sold">Best Selling</option>
                </Select>
              </HStack>

              {/* Stats Badge */}
              <Badge
                bg={iconBg}
                color={iconColor}
                fontSize="sm"
                fontWeight="600"
                px="16px"
                py="12px"
                borderRadius="full"
                display={{ base: "none", lg: "flex" }}
              >
                {sortedTickets.length} {t("tickets.products") || "products"}
              </Badge>

              {/* Create Button - Mobile */}
              <Button
                display={{ base: "flex", md: "none" }}
                bgGradient={orangeGradient}
                color="white"
                fontWeight="600"
                borderRadius="14px"
                px="20px"
                h="52px"
                leftIcon={<Icon as={MdAdd} w="20px" h="20px" />}
                onClick={onOpen}
                boxShadow="0 4px 12px rgba(231, 115, 36, 0.25)"
                _hover={{
                  boxShadow: "0 8px 20px rgba(231, 115, 36, 0.35)",
                }}
                transition="all 0.3s"
                w="100%"
              >
                {t("tickets.createTicket")}
              </Button>
            </HStack>
          </Flex>
        </Card>

        {/* Tickets Section */}
        <Card
          bg={cardBg}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="24px"
          boxShadow={cardShadow}
          overflow="hidden"
        >
          {/* Section Header */}
          <Flex
            bg={headerBg}
            px={{ base: "20px", md: "28px" }}
            py="20px"
            align="center"
            justify="space-between"
            borderBottom="1px solid"
            borderColor={sectionBorderColor}
          >
            <HStack spacing="14px">
              <Flex
                w="42px"
                h="42px"
                bgGradient={orangeGradient}
                borderRadius="12px"
                align="center"
                justify="center"
                boxShadow="0 4px 12px rgba(231, 115, 36, 0.25)"
              >
                <Icon as={MdConfirmationNumber} w="22px" h="22px" color="white" />
              </Flex>
              <VStack align="flex-start" spacing="2px">
                <Text
                  color={textColor}
                  fontSize="lg"
                  fontWeight="700"
                  letterSpacing="-0.3px"
                >
                  {t("tickets.tickets.title")}
                </Text>
                <Text
                  color={textColorSecondary}
                  fontSize="sm"
                  fontWeight="400"
                >
                  {sortedTickets.length} products configured
                </Text>
              </VStack>
            </HStack>

            <HStack spacing="6px">
              <Tooltip label={isExpanded ? t("tickets.tickets.collapse") : t("tickets.tickets.expand")} hasArrow>
                <IconButton
                  aria-label={isExpanded ? t("tickets.tickets.collapse") : t("tickets.tickets.expand")}
                  icon={<Icon as={isExpanded ? MdExpandLess : MdExpandMore} w="22px" h="22px" />}
                  variant="ghost"
                  color={textColorSecondary}
                  borderRadius="full"
                  _hover={{ bg: iconBg, color: iconColor }}
                  onClick={() => setIsExpanded(!isExpanded)}
                  size="md"
                />
              </Tooltip>
              <Tooltip label={t("tickets.tickets.add")} hasArrow>
                <IconButton
                  aria-label={t("tickets.tickets.add")}
                  icon={<Icon as={MdAdd} w="22px" h="22px" />}
                  variant="ghost"
                  color={textColorSecondary}
                  borderRadius="full"
                  _hover={{ bg: iconBg, color: iconColor }}
                  onClick={onOpen}
                  size="md"
                />
              </Tooltip>
              <Tooltip label={t("tickets.tickets.edit")} hasArrow>
                <IconButton
                  aria-label={t("tickets.tickets.edit")}
                  icon={<Icon as={MdEdit} w="20px" h="20px" />}
                  variant="ghost"
                  color={textColorSecondary}
                  borderRadius="full"
                  _hover={{ bg: iconBg, color: iconColor }}
                  size="md"
                />
              </Tooltip>
              <Tooltip label={t("tickets.tickets.hide")} hasArrow>
                <IconButton
                  aria-label={t("tickets.tickets.hide")}
                  icon={<Icon as={MdVisibilityOff} w="20px" h="20px" />}
                  variant="ghost"
                  color={textColorSecondary}
                  borderRadius="full"
                  _hover={{ bg: iconBg, color: iconColor }}
                  size="md"
                />
              </Tooltip>
            </HStack>
          </Flex>

          {/* Content */}
          <Collapse in={isExpanded} animateOpacity>
            <Box p={{ base: "16px", md: "24px" }}>
              {hasTickets ? (
                <VStack spacing="12px" align="stretch">
                  {sortedTickets.map((ticket) => (
                    <TicketRow key={ticket.id} ticket={ticket} t={t} />
                  ))}
                </VStack>
              ) : (
                <EmptyState
                  t={t}
                  iconBg={iconBg}
                  iconColor={iconColor}
                  textColor={textColor}
                  textColorSecondary={textColorSecondary}
                  orangeGradient={orangeGradient}
                  onOpen={onOpen}
                />
              )}
            </Box>
          </Collapse>
        </Card>
      </VStack>

      {/* Create Ticket Modal */}
      <CreateTicketModal
        isOpen={isOpen}
        onClose={onClose}
        productName={productName}
        setProductName={setProductName}
        productDescription={productDescription}
        setProductDescription={setProductDescription}
        productCategory={productCategory}
        setProductCategory={setProductCategory}
        productPrice={productPrice}
        setProductPrice={setProductPrice}
        productQuantity={productQuantity}
        setProductQuantity={setProductQuantity}
        isUnlimited={isUnlimited}
        setIsUnlimited={setIsUnlimited}
        cardBg={cardBg}
        borderColor={borderColor}
        inputBg={inputBg}
        textColor={textColor}
        textColorSecondary={textColorSecondary}
        iconColor={iconColor}
      />
    </Box>
  );
}

// Empty State Component
function EmptyState({
  t,
  iconBg,
  iconColor,
  textColor,
  textColorSecondary,
  orangeGradient,
  onOpen,
}) {
  const emptyStateShadow = useColorModeValue(
    "0px 12px 32px rgba(231, 115, 36, 0.15)",
    "0px 12px 32px rgba(231, 115, 36, 0.3)"
  );

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="400px"
      py={{ base: "50px", md: "80px" }}
      px="20px"
    >
      <VStack spacing="28px" maxW="450px">
        {/* Animated Icon */}
        <Box
          position="relative"
          animation="float 3s ease-in-out infinite"
          sx={{
            "@keyframes float": {
              "0%, 100%": { transform: "translateY(0px)" },
              "50%": { transform: "translateY(-12px)" },
            },
          }}
        >
          <Box
            w="120px"
            h="120px"
            borderRadius="28px"
            bgGradient={orangeGradient}
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow={emptyStateShadow}
            position="relative"
          >
            <Icon
              as={MdConfirmationNumber}
              w="60px"
              h="60px"
              color="white"
            />
            {/* Decorative add icon */}
            <Box
              position="absolute"
              top="-10px"
              right="-10px"
              w="36px"
              h="36px"
              bg="white"
              borderRadius="12px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="0 6px 16px rgba(0,0,0,0.12)"
              animation="pulse 2s ease-in-out infinite"
              sx={{
                "@keyframes pulse": {
                  "0%, 100%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.1)" },
                },
              }}
            >
              <Icon as={MdAdd} w="20px" h="20px" color={iconColor} />
            </Box>
            {/* Clouds */}
            <Icon
              as={MdCloud}
              w="32px"
              h="32px"
              color={iconColor}
              position="absolute"
              top="-16px"
              left="-16px"
              opacity="0.5"
              animation="floatCloud 4s ease-in-out infinite"
              sx={{
                "@keyframes floatCloud": {
                  "0%, 100%": { transform: "translate(0, 0)" },
                  "50%": { transform: "translate(6px, -6px)" },
                },
              }}
            />
            <Icon
              as={MdCloud}
              w="24px"
              h="24px"
              color={iconColor}
              position="absolute"
              bottom="-8px"
              right="-20px"
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
        <VStack spacing="12px" textAlign="center">
          <Text
            color={textColor}
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="700"
            letterSpacing="-0.5px"
          >
            {t("tickets.tickets.emptyState.title")}
          </Text>
          <Text
            color={textColorSecondary}
            fontSize={{ base: "sm", md: "md" }}
            fontWeight="400"
            maxW="360px"
            lineHeight="1.7"
          >
            {t("tickets.tickets.emptyState.description")}
          </Text>
        </VStack>

        {/* CTA Button */}
        <Button
          bgGradient={orangeGradient}
          color="white"
          fontWeight="600"
          borderRadius="18px"
          px="36px"
          py="16px"
          h="auto"
          fontSize="md"
          leftIcon={<Icon as={MdAdd} w="22px" h="22px" />}
          onClick={onOpen}
          boxShadow="0 10px 28px rgba(231, 115, 36, 0.3)"
          _hover={{
            transform: "translateY(-3px)",
            boxShadow: "0 16px 40px rgba(231, 115, 36, 0.4)",
          }}
          _active={{
            transform: "translateY(-1px)",
            boxShadow: "0 8px 20px rgba(231, 115, 36, 0.35)",
          }}
          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        >
          {t("tickets.tickets.emptyState.addProduct")}
        </Button>
      </VStack>
    </Flex>
  );
}
