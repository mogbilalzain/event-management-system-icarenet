// Chakra imports
import {
  Box,
  Text,
  VStack,
  HStack,
  Input,
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
  SimpleGrid,
  IconButton,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Badge,
  Progress,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
// Language Context
import { useLanguage } from "contexts/LanguageContext";
import { CloseIcon } from "@chakra-ui/icons";
import { 
  MdCalendarToday, 
  MdCelebration, 
  MdEvent,
  MdAccessTime,
  MdCategory,
  MdDescription,
  MdArrowForward,
} from "react-icons/md";
// React Quill
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreateEventModal({
  isOpen,
  onClose,
  eventName,
  setEventName,
  eventCategory,
  setEventCategory,
  eventDescription,
  setEventDescription,
  startDate,
  setStartDate,
  startTime,
  setStartTime,
  endDate,
  setEndDate,
  endTime,
  setEndTime,
  orangeGradient,
  cardBg,
  borderColor,
  inputBg,
  textColor,
  textColorSecondary,
  iconColor,
}) {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);

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

  // Quill modules configuration
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
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
    "align",
    "link",
  ];

  // Quill editor styles
  const quillTextColor = useColorModeValue("gray.900", "white");

  // Calculate form progress
  const calculateProgress = () => {
    let progress = 0;
    if (eventName) progress += 25;
    if (eventCategory) progress += 25;
    if (startDate && startTime) progress += 25;
    if (eventDescription) progress += 25;
    return progress;
  };

  const handleContinue = () => {
    console.log("Continue setup", {
      eventName,
      eventCategory,
      eventDescription,
      startDate,
      startTime,
      endDate,
      endTime,
    });
    onClose();
  };

  const isFormValid = eventName && startDate && startTime;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size="2xl" 
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay 
        bg="blackAlpha.600" 
        backdropFilter="blur(12px)" 
      />
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
              <Icon as={MdCelebration} w="28px" h="28px" color="white" />
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
              {t("events.createModal.title")}
            </ModalHeader>
            <Text
              color="whiteAlpha.900"
              fontSize="md"
              textAlign="center"
              fontWeight="500"
            >
              {t("events.createModal.subtitle")}
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
            {/* Event Name */}
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
                <Icon as={MdEvent} w="16px" h="16px" color={iconColor} />
                {t("events.createModal.eventName")}
              </FormLabel>
              <Input
                placeholder={t("events.createModal.eventNamePlaceholder")}
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
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

            {/* Event Category */}
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
                {t("events.createModal.eventCategory")}
              </FormLabel>
              <Select
                placeholder={t("events.createModal.categoryPlaceholder")}
                value={eventCategory}
                onChange={(e) => setEventCategory(e.target.value)}
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
                <option value="music">{t("events.createModal.categories.music")}</option>
                <option value="sports">{t("events.createModal.categories.sports")}</option>
                <option value="business">{t("events.createModal.categories.business")}</option>
                <option value="technology">{t("events.createModal.categories.technology")}</option>
                <option value="arts">{t("events.createModal.categories.arts")}</option>
                <option value="food">{t("events.createModal.categories.food")}</option>
                <option value="education">{t("events.createModal.categories.education")}</option>
                <option value="other">{t("events.createModal.categories.other")}</option>
              </Select>
            </FormControl>

            {/* Date & Time Section */}
            <Box>
              <FormLabel 
                color={labelColor} 
                fontWeight="600" 
                fontSize="sm"
                mb="10px"
                display="flex"
                alignItems="center"
                gap="8px"
              >
                <Icon as={MdAccessTime} w="16px" h="16px" color={iconColor} />
                {t("events.createModal.startDate")}
                <Badge colorScheme="orange" fontSize="xs" ml="4px">Required</Badge>
              </FormLabel>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing="16px">
                <InputGroup>
                  <InputLeftElement 
                    pointerEvents="none" 
                    h="52px"
                  >
                    <Icon as={MdCalendarToday} color={textColorSecondary} />
                  </InputLeftElement>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    bg={inputBgColor}
                    border="2px solid"
                    borderColor={inputBorder}
                    borderRadius="14px"
                    h="52px"
                    pl="44px"
                    fontSize="md"
                    fontWeight="500"
                    _hover={{ borderColor: "gray.300" }}
                    _focus={{
                      borderColor: focusBorderColor,
                      boxShadow: `0 0 0 3px rgba(231, 115, 36, 0.1)`,
                    }}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement 
                    pointerEvents="none" 
                    h="52px"
                  >
                    <Icon as={MdAccessTime} color={textColorSecondary} />
                  </InputLeftElement>
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    bg={inputBgColor}
                    border="2px solid"
                    borderColor={inputBorder}
                    borderRadius="14px"
                    h="52px"
                    pl="44px"
                    fontSize="md"
                    fontWeight="500"
                    _hover={{ borderColor: "gray.300" }}
                    _focus={{
                      borderColor: focusBorderColor,
                      boxShadow: `0 0 0 3px rgba(231, 115, 36, 0.1)`,
                    }}
                  />
                </InputGroup>
              </SimpleGrid>
            </Box>

            {/* End Date (Optional) */}
            <Box>
              <FormLabel 
                color={labelColor} 
                fontWeight="600" 
                fontSize="sm"
                mb="10px"
                display="flex"
                alignItems="center"
                gap="8px"
              >
                <Icon as={MdAccessTime} w="16px" h="16px" color={textColorSecondary} />
                {t("events.createModal.endDate")}
                <Text as="span" color={textColorSecondary} fontWeight="400" fontSize="xs">
                  ({t("events.createModal.endDateOptional")})
                </Text>
              </FormLabel>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing="16px">
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
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
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
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
              </SimpleGrid>
            </Box>

            {/* Event Description */}
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
                {t("events.createModal.eventDescription")}
              </FormLabel>
              <Box
                sx={{
                  ".quill": {
                    bg: inputBgColor,
                    borderRadius: "14px",
                    border: `2px solid`,
                    borderColor: inputBorder,
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
                    minHeight: "150px",
                    border: "none",
                  },
                  ".ql-editor": {
                    minHeight: "150px",
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
                    borderColor: inputBorder,
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
                    border: `1px solid ${inputBorder}`,
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <ReactQuill
                  theme="snow"
                  value={eventDescription}
                  onChange={setEventDescription}
                  modules={modules}
                  formats={formats}
                  placeholder="Describe your event..."
                />
              </Box>
            </FormControl>

            {/* Continue Setup Button */}
            <Button
              bgGradient={orangeGradient}
              color="white"
              fontWeight="700"
              fontSize="md"
              borderRadius="16px"
              py="16px"
              h="56px"
              rightIcon={<Icon as={MdArrowForward} w="20px" h="20px" />}
              onClick={handleContinue}
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
              {t("events.createModal.continueSetup")}
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
