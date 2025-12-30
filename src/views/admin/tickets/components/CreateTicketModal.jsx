// Chakra imports
import {
  Box,
  Text,
  VStack,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Button,
  Icon,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  IconButton,
  Tooltip,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useColorModeValue,
  Badge,
  Progress,
} from "@chakra-ui/react";
import React, { useMemo, useState, useEffect } from "react";
// Language Context
import { useLanguage } from "contexts/LanguageContext";
import { CloseIcon } from "@chakra-ui/icons";
import { 
  MdInfoOutline, 
  MdConfirmationNumber, 
  MdCategory,
  MdAttachMoney,
  MdInventory,
  MdDescription,
  MdAdd,
} from "react-icons/md";
// React Quill
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreateTicketModal({
  isOpen,
  onClose,
  productName,
  setProductName,
  productDescription,
  setProductDescription,
  productCategory,
  setProductCategory,
  productPrice,
  setProductPrice,
  productQuantity,
  setProductQuantity,
  isUnlimited,
  setIsUnlimited,
  cardBg,
  borderColor,
  inputBg,
  textColor,
  textColorSecondary,
  iconColor,
}) {
  const { t } = useLanguage();

  // Color mode values
  const modalBg = useColorModeValue("white", "navy.800");
  const headerBg = useColorModeValue(
    "linear-gradient(135deg, #e77324 0%, #F99C58 50%, #FFB366 100%)",
    "linear-gradient(135deg, #e77324 0%, #F99C58 100%)"
  );
  const inputBgColor = useColorModeValue("#f8fafc", "whiteAlpha.50");
  const inputBorder = useColorModeValue("gray.200", "whiteAlpha.100");
  const focusBorderColor = useColorModeValue("#e77324", "#F99C58");
  const labelColor = useColorModeValue("gray.700", "gray.200");
  const iconBg = useColorModeValue("#fff5ed", "rgba(231, 115, 36, 0.15)");
  const progressTrackBg = useColorModeValue("gray.100", "whiteAlpha.100");
  const orangeGradient = "linear-gradient(135deg, #e77324 0%, #F99C58 100%)";

  // Quill modules configuration
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        ["clean"],
      ],
    }),
    []
  );

  // Quill formats
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
  ];

  // Quill editor styles
  const quillBg = useColorModeValue(inputBgColor, "whiteAlpha.50");
  const quillBorderColor = useColorModeValue(inputBorder, "whiteAlpha.100");
  const quillTextColor = useColorModeValue("gray.900", "white");

  // Validation
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(productName.trim().length > 0);
  }, [productName]);

  // Calculate form progress
  const calculateProgress = () => {
    let progress = 0;
    if (productName) progress += 40;
    if (productCategory) progress += 20;
    if (productPrice) progress += 20;
    if (productDescription) progress += 20;
    return progress;
  };

  const handleCreate = () => {
    if (!isFormValid) return;

    console.log("Create product", {
      name: productName,
      description: productDescription,
      category: productCategory,
      price: productPrice,
      quantity: isUnlimited ? "unlimited" : productQuantity,
    });
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size="2xl" 
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(12px)" />
      <ModalContent
        borderRadius="24px"
        overflow="hidden"
        bg={modalBg}
        boxShadow="0px 25px 80px rgba(0, 0, 0, 0.25)"
        mx="16px"
        maxH="90vh"
      >
        {/* Header with Gradient */}
        <Box
          bgGradient={headerBg}
          px={{ base: "24px", md: "40px" }}
          pt="32px"
          pb="28px"
          position="relative"
          overflow="hidden"
        >
          {/* Decorative circles */}
          <Box
            position="absolute"
            top="-40px"
            right="-40px"
            w="150px"
            h="150px"
            borderRadius="full"
            bg="whiteAlpha.100"
          />
          <Box
            position="absolute"
            bottom="-60px"
            left="-30px"
            w="120px"
            h="120px"
            borderRadius="full"
            bg="whiteAlpha.100"
          />

          {/* Header Content */}
          <VStack spacing="8px" position="relative" zIndex="1">
            <Flex
              w="56px"
              h="56px"
              bg="whiteAlpha.200"
              borderRadius="16px"
              align="center"
              justify="center"
              mb="8px"
            >
              <Icon as={MdConfirmationNumber} w="28px" h="28px" color="white" />
            </Flex>
            <ModalHeader
              color="white"
              fontSize={{ base: "24px", md: "28px" }}
              fontWeight="700"
              textAlign="center"
              px="0"
              py="0"
              letterSpacing="-0.5px"
            >
              {t("tickets.createModal.title")}
            </ModalHeader>
            <Text
              color="whiteAlpha.900"
              fontSize="md"
              textAlign="center"
              fontWeight="500"
            >
              {t("tickets.subtitle")}
            </Text>
          </VStack>

          {/* Close Button */}
          <IconButton
            aria-label="Close"
            icon={<CloseIcon w="10px" h="10px" />}
            position="absolute"
            top="20px"
            right="20px"
            variant="ghost"
            color="white"
            bg="whiteAlpha.200"
            _hover={{ bg: "whiteAlpha.300" }}
            onClick={onClose}
            size="sm"
            borderRadius="full"
          />

          {/* Progress Bar */}
          <Box mt="20px" px="20px">
            <Progress
              value={calculateProgress()}
              size="xs"
              borderRadius="full"
              bg={progressTrackBg}
              sx={{
                "& > div": {
                  bgGradient: "linear(to-r, white, whiteAlpha.800)",
                },
              }}
            />
            <Text
              color="whiteAlpha.800"
              fontSize="xs"
              textAlign="center"
              mt="8px"
              fontWeight="500"
            >
              {calculateProgress()}% Complete
            </Text>
          </Box>
        </Box>

        <ModalBody p={{ base: "24px", md: "32px" }} overflowY="auto">
          <VStack spacing="24px" align="stretch">
            {/* Name Field */}
            <FormControl isRequired>
              <FormLabel 
                color={labelColor} 
                fontWeight="600" 
                fontSize="sm"
                mb="10px"
                display="flex"
                alignItems="center"
                gap="8px"
              >
                <Icon as={MdConfirmationNumber} w="16px" h="16px" color={iconColor} />
                {t("tickets.createModal.name")}
                <Badge colorScheme="orange" fontSize="xs" ml="4px">Required</Badge>
              </FormLabel>
              <Input
                placeholder={t("tickets.createModal.namePlaceholder")}
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                bg={inputBgColor}
                border="2px solid"
                borderColor={inputBorder}
                borderRadius="14px"
                h="52px"
                fontSize="md"
                fontWeight="500"
                _placeholder={{ color: textColorSecondary, fontWeight: "400" }}
                _hover={{ borderColor: "gray.300" }}
                _focus={{
                  borderColor: focusBorderColor,
                  boxShadow: `0 0 0 3px rgba(231, 115, 36, 0.1)`,
                }}
                transition="all 0.2s"
              />
            </FormControl>

            {/* Description Field */}
            <FormControl>
              <FormLabel 
                color={labelColor} 
                fontWeight="600" 
                fontSize="sm"
                mb="10px"
                display="flex"
                alignItems="center"
                gap="8px"
              >
                <Icon as={MdDescription} w="16px" h="16px" color={iconColor} />
                {t("tickets.createModal.description")}
              </FormLabel>
              <Box
                sx={{
                  ".quill": {
                    bg: quillBg,
                    borderRadius: "14px",
                    border: `2px solid`,
                    borderColor: quillBorderColor,
                    overflow: "hidden",
                    transition: "all 0.2s",
                    "&:focus-within": {
                      borderColor: focusBorderColor,
                      boxShadow: `0 0 0 3px rgba(231, 115, 36, 0.1)`,
                    },
                  },
                  ".ql-container": {
                    bg: "transparent",
                    color: quillTextColor,
                    fontSize: "14px",
                    minHeight: "120px",
                    border: "none",
                  },
                  ".ql-editor": {
                    minHeight: "120px",
                    padding: "16px",
                    color: quillTextColor,
                    "&.ql-blank::before": {
                      color: textColorSecondary,
                      fontStyle: "normal",
                      left: "16px",
                    },
                  },
                  ".ql-toolbar": {
                    bg: "transparent",
                    border: "none",
                    borderBottom: `1px solid`,
                    borderColor: quillBorderColor,
                    padding: "12px 16px",
                  },
                  ".ql-toolbar .ql-stroke": {
                    stroke: textColorSecondary,
                  },
                  ".ql-toolbar .ql-fill": {
                    fill: textColorSecondary,
                  },
                  ".ql-toolbar .ql-picker-label": {
                    color: textColorSecondary,
                  },
                  ".ql-toolbar button:hover .ql-stroke": {
                    stroke: iconColor,
                  },
                  ".ql-toolbar button.ql-active .ql-stroke": {
                    stroke: iconColor,
                  },
                  ".ql-toolbar .ql-picker-options": {
                    bg: cardBg,
                    border: `1px solid ${quillBorderColor}`,
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <ReactQuill
                  theme="snow"
                  value={productDescription}
                  onChange={setProductDescription}
                  modules={modules}
                  formats={formats}
                  placeholder="Describe your product..."
                />
              </Box>
            </FormControl>

            {/* Product Category */}
            <FormControl>
              <FormLabel 
                color={labelColor} 
                fontWeight="600" 
                fontSize="sm"
                mb="10px"
                display="flex"
                alignItems="center"
                gap="8px"
              >
                <Icon as={MdCategory} w="16px" h="16px" color={iconColor} />
                {t("tickets.createModal.category")}
                <Tooltip
                  label={t("tickets.createModal.categoryTooltip")}
                  placement="top"
                  hasArrow
                  bg={iconBg}
                  color={iconColor}
                >
                  <Icon
                    as={MdInfoOutline}
                    w="14px"
                    h="14px"
                    color={textColorSecondary}
                    cursor="help"
                  />
                </Tooltip>
              </FormLabel>
              <Select
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                bg={inputBgColor}
                border="2px solid"
                borderColor={inputBorder}
                borderRadius="14px"
                h="52px"
                fontSize="md"
                fontWeight="500"
                cursor="pointer"
                _hover={{ borderColor: "gray.300" }}
                _focus={{
                  borderColor: focusBorderColor,
                  boxShadow: `0 0 0 3px rgba(231, 115, 36, 0.1)`,
                }}
              >
                <option value="tickets">{t("tickets.createModal.categories.tickets")}</option>
                <option value="merchandise">{t("tickets.createModal.categories.merchandise")}</option>
                <option value="addons">{t("tickets.createModal.categories.addons")}</option>
                <option value="donations">{t("tickets.createModal.categories.donations")}</option>
              </Select>
            </FormControl>

            {/* Price and Quantity Row */}
            <Flex direction={{ base: "column", md: "row" }} gap="20px">
              {/* Price */}
              <FormControl flex="1">
                <FormLabel 
                  color={labelColor} 
                  fontWeight="600" 
                  fontSize="sm"
                  mb="10px"
                  display="flex"
                  alignItems="center"
                  gap="8px"
                >
                  <Icon as={MdAttachMoney} w="16px" h="16px" color={iconColor} />
                  {t("tickets.createModal.price")}
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" h="52px">
                    <Text color={textColorSecondary} fontWeight="600">$</Text>
                  </InputLeftElement>
                  <Input
                    type="number"
                    placeholder={t("tickets.createModal.pricePlaceholder")}
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    bg={inputBgColor}
                    border="2px solid"
                    borderColor={inputBorder}
                    borderRadius="14px"
                    h="52px"
                    pl="40px"
                    fontSize="md"
                    fontWeight="500"
                    _hover={{ borderColor: "gray.300" }}
                    _focus={{
                      borderColor: focusBorderColor,
                      boxShadow: `0 0 0 3px rgba(231, 115, 36, 0.1)`,
                    }}
                  />
                </InputGroup>
              </FormControl>

              {/* Quantity */}
              <FormControl flex="1">
                <FormLabel 
                  color={labelColor} 
                  fontWeight="600" 
                  fontSize="sm"
                  mb="10px"
                  display="flex"
                  alignItems="center"
                  gap="8px"
                >
                  <Icon as={MdInventory} w="16px" h="16px" color={iconColor} />
                  {t("tickets.createModal.quantity")}
                </FormLabel>
                <VStack spacing="12px" align="stretch">
                  <Select
                    value={isUnlimited ? "unlimited" : "limited"}
                    onChange={(e) => setIsUnlimited(e.target.value === "unlimited")}
                    bg={inputBgColor}
                    border="2px solid"
                    borderColor={inputBorder}
                    borderRadius="14px"
                    h="52px"
                    fontSize="md"
                    fontWeight="500"
                    cursor="pointer"
                    _hover={{ borderColor: "gray.300" }}
                    _focus={{
                      borderColor: focusBorderColor,
                      boxShadow: `0 0 0 3px rgba(231, 115, 36, 0.1)`,
                    }}
                  >
                    <option value="unlimited">{t("tickets.createModal.quantityUnlimited")}</option>
                    <option value="limited">Limited</option>
                  </Select>
                  {!isUnlimited && (
                    <NumberInput
                      value={productQuantity}
                      onChange={(value) => setProductQuantity(value)}
                      min={1}
                    >
                      <NumberInputField
                        bg={inputBgColor}
                        border="2px solid"
                        borderColor={inputBorder}
                        borderRadius="14px"
                        h="52px"
                        fontSize="md"
                        fontWeight="500"
                        _hover={{ borderColor: "gray.300" }}
                        _focus={{
                          borderColor: focusBorderColor,
                          boxShadow: `0 0 0 3px rgba(231, 115, 36, 0.1)`,
                        }}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  )}
                </VStack>
              </FormControl>
            </Flex>

            {/* Create Product Button */}
            <Button
              bgGradient={orangeGradient}
              color="white"
              fontWeight="700"
              fontSize="md"
              borderRadius="16px"
              py="16px"
              h="56px"
              rightIcon={<Icon as={MdAdd} w="20px" h="20px" />}
              onClick={handleCreate}
              isDisabled={!isFormValid}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "0 12px 28px rgba(231, 115, 36, 0.4)",
              }}
              _active={{
                transform: "translateY(0px)",
                boxShadow: "0 6px 16px rgba(231, 115, 36, 0.3)",
              }}
              _disabled={{
                opacity: 0.6,
                cursor: "not-allowed",
                _hover: {
                  transform: "none",
                  boxShadow: "none",
                },
              }}
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              mt="8px"
            >
              {t("tickets.createModal.createProduct")}
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
