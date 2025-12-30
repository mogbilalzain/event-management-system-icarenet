// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Textarea,
  Switch,
  Radio,
  RadioGroup,
  Stack,
  useColorModeValue,
  VStack,
  HStack,
  Badge,
  Alert,
  AlertIcon,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React, { useState } from "react";
// Language Context
import { useLanguage } from "contexts/LanguageContext";
import { MdSettings, MdExpandMore, MdExpandLess } from "react-icons/md";

export default function Settings() {
  const { t } = useLanguage();
  
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "secondaryGray.400");
  const cardBg = useColorModeValue("white", "navy.800");
  const borderColor = useColorModeValue("secondaryGray.200", "whiteAlpha.100");
  const buttonBg = useColorModeValue("#e77324", "#e77324");
  const buttonHover = useColorModeValue("#C55A1A", "#C55A1A");
  const infoBoxBg = useColorModeValue("secondaryGray.100", "navy.700");
  
  // States
  const [currency, setCurrency] = useState("usd");
  const [timezone, setTimezone] = useState("utc");
  const [defaultAttendeeInfo, setDefaultAttendeeInfo] = useState("basic");
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [feeHandling, setFeeHandling] = useState("absorb");
  const [searchIndexing, setSearchIndexing] = useState(true);
  const { isOpen: isMorePlatformsOpen, onToggle: onMorePlatformsToggle } = useDisclosure();

  return (
    <Box
      pt={{ base: "130px", md: "80px", xl: "80px" }}
      pb={{ base: "50px", md: "80px" }}
      px={{ base: "20px", md: "40px" }}
      maxW="1200px"
      mx="auto"
    >
      {/* Page Title */}
      <VStack align="start" spacing="8px" mb="40px">
        <Text
          color={textColor}
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="700"
        >
          {t("settings.title")}
        </Text>
        <Text color={textColorSecondary} fontSize="md">
          {t("settings.subtitle")}
        </Text>
      </VStack>

      <VStack spacing="24px" align="stretch">
        {/* Section 1: Basic Information */}
        <Card p={{ base: "24px", md: "32px" }} borderRadius="16px" bg={cardBg}>
          <VStack align="stretch" spacing="20px">
            <VStack align="start" spacing="4px">
              <Text color={textColor} fontSize="xl" fontWeight="700">
                {t("settings.basicInformation.title")}
              </Text>
              <Text color={textColorSecondary} fontSize="sm">
                {t("settings.basicInformation.description")}
              </Text>
            </VStack>

            <FormControl>
              <FormLabel color={textColor} fontWeight="600">
                {t("settings.basicInformation.organizerName")}
              </FormLabel>
              <Input
                placeholder={t("settings.basicInformation.organizerNamePlaceholder")}
                borderRadius="12px"
                borderColor={borderColor}
              />
            </FormControl>

            <FormControl>
              <FormLabel color={textColor} fontWeight="600">
                {t("settings.basicInformation.email")}
              </FormLabel>
              <Input
                type="email"
                placeholder={t("settings.basicInformation.emailPlaceholder")}
                borderRadius="12px"
                borderColor={borderColor}
              />
            </FormControl>

            <FormControl>
              <FormLabel color={textColor} fontWeight="600">
                {t("settings.basicInformation.description")}
              </FormLabel>
              <Textarea
                placeholder={t("settings.basicInformation.descriptionPlaceholder")}
                borderRadius="12px"
                borderColor={borderColor}
                rows={4}
              />
            </FormControl>

            <FormControl>
              <FormLabel color={textColor} fontWeight="600">
                {t("settings.basicInformation.phone")}
              </FormLabel>
              <Input
                placeholder={t("settings.basicInformation.phonePlaceholder")}
                borderRadius="12px"
                borderColor={borderColor}
              />
            </FormControl>

            <FormControl>
              <FormLabel color={textColor} fontWeight="600">
                {t("settings.basicInformation.website")}
              </FormLabel>
              <Input
                type="url"
                placeholder={t("settings.basicInformation.websitePlaceholder")}
                borderRadius="12px"
                borderColor={borderColor}
              />
            </FormControl>

            <HStack spacing="20px">
              <FormControl flex="1">
                <FormLabel color={textColor} fontWeight="600">
                  {t("settings.basicInformation.currency")}
                </FormLabel>
                <Select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  borderRadius="12px"
                  borderColor={borderColor}
                >
                  <option value="usd">USD</option>
                  <option value="eur">EUR</option>
                  <option value="gbp">GBP</option>
                  <option value="sar">SAR</option>
                </Select>
              </FormControl>

              <FormControl flex="1">
                <FormLabel color={textColor} fontWeight="600">
                  {t("settings.basicInformation.timezone")}
                </FormLabel>
                <Select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  borderRadius="12px"
                  borderColor={borderColor}
                >
                  <option value="utc">UTC</option>
                  <option value="est">EST</option>
                  <option value="pst">PST</option>
                  <option value="gmt">GMT</option>
                </Select>
              </FormControl>
            </HStack>

            <Button
              bg={buttonBg}
              color="white"
              fontWeight="600"
              borderRadius="12px"
              px="32px"
              py="14px"
              _hover={{ bg: buttonHover }}
              alignSelf="flex-start"
            >
              {t("settings.save")}
            </Button>
          </VStack>
        </Card>

        {/* Section 2: Event Defaults */}
        <Card p={{ base: "24px", md: "32px" }} borderRadius="16px" bg={cardBg}>
          <VStack align="stretch" spacing="20px">
            <VStack align="start" spacing="4px">
              <Text color={textColor} fontSize="xl" fontWeight="700">
                {t("settings.eventDefaults.title")}
              </Text>
              <Text color={textColorSecondary} fontSize="sm">
                {t("settings.eventDefaults.description")}
              </Text>
            </VStack>

            <FormControl>
              <FormLabel color={textColor} fontWeight="600">
                {t("settings.eventDefaults.defaultAttendeeInfo")}
              </FormLabel>
              <Select
                value={defaultAttendeeInfo}
                onChange={(e) => setDefaultAttendeeInfo(e.target.value)}
                borderRadius="12px"
                borderColor={borderColor}
              >
                <option value="basic">{t("settings.eventDefaults.basic")}</option>
                <option value="full">{t("settings.eventDefaults.full")}</option>
                <option value="minimal">{t("settings.eventDefaults.minimal")}</option>
              </Select>
            </FormControl>

            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <FormLabel color={textColor} fontWeight="600" mb="0">
                  {t("settings.eventDefaults.marketingOptIn")}
                </FormLabel>
                <Text color={textColorSecondary} fontSize="sm">
                  {t("settings.eventDefaults.marketingOptInDescription")}
                </Text>
              </Box>
              <Switch
                isChecked={marketingOptIn}
                onChange={(e) => setMarketingOptIn(e.target.checked)}
                colorScheme="orange"
              />
            </FormControl>

            <Button
              bg={buttonBg}
              color="white"
              fontWeight="600"
              borderRadius="12px"
              px="32px"
              py="14px"
              _hover={{ bg: buttonHover }}
              alignSelf="flex-start"
            >
              {t("settings.save")}
            </Button>
          </VStack>
        </Card>

        {/* Section 3: Platform Fees */}
        <Card p={{ base: "24px", md: "32px" }} borderRadius="16px" bg={cardBg}>
          <VStack align="stretch" spacing="20px">
            <VStack align="start" spacing="4px">
              <Text color={textColor} fontSize="xl" fontWeight="700">
                {t("settings.platformFees.title")}
              </Text>
            </VStack>

            <Box
              p="16px"
              borderRadius="12px"
              bg={infoBoxBg}
            >
              <Text color={textColor} fontSize="sm" fontWeight="600">
                {t("settings.platformFees.currentPlan")}: <Badge colorScheme="green">Free</Badge>
              </Text>
            </Box>

            <FormControl>
              <FormLabel color={textColor} fontWeight="600" mb="16px">
                {t("settings.platformFees.feeHandling")}
              </FormLabel>
              <RadioGroup value={feeHandling} onChange={setFeeHandling}>
                <Stack spacing="12px">
                  <Radio value="pass" colorScheme="orange">
                    {t("settings.platformFees.passToBuyer")}
                  </Radio>
                  <Radio value="absorb" colorScheme="orange">
                    {t("settings.platformFees.absorbFee")}
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            {feeHandling === "pass" && (
              <Box
                p="16px"
                borderRadius="12px"
                bg={infoBoxBg}
              >
                <Text color={textColor} fontSize="sm">
                  <strong>{t("settings.platformFees.buyerPays")}:</strong> $100.00
                </Text>
                <Text color={textColorSecondary} fontSize="sm" mt="4px">
                  <strong>{t("settings.platformFees.youReceive")}:</strong> $95.00
                </Text>
              </Box>
            )}

            <Button
              bg={buttonBg}
              color="white"
              fontWeight="600"
              borderRadius="12px"
              px="32px"
              py="14px"
              _hover={{ bg: buttonHover }}
              alignSelf="flex-start"
            >
              {t("settings.save")}
            </Button>
          </VStack>
        </Card>

        {/* Section 4: Address */}
        <Card p={{ base: "24px", md: "32px" }} borderRadius="16px" bg={cardBg}>
          <VStack align="stretch" spacing="20px">
            <VStack align="start" spacing="4px">
              <Text color={textColor} fontSize="xl" fontWeight="700">
                {t("settings.address.title")}
              </Text>
            </VStack>

            <FormControl>
              <FormLabel color={textColor} fontWeight="600">
                {t("settings.address.officeName")}
              </FormLabel>
              <Input
                placeholder={t("settings.address.officeNamePlaceholder")}
                borderRadius="12px"
                borderColor={borderColor}
              />
            </FormControl>

            <FormControl>
              <FormLabel color={textColor} fontWeight="600">
                {t("settings.address.addressLine1")}
              </FormLabel>
              <Input
                placeholder={t("settings.address.addressLine1Placeholder")}
                borderRadius="12px"
                borderColor={borderColor}
              />
            </FormControl>

            <FormControl>
              <FormLabel color={textColor} fontWeight="600">
                {t("settings.address.addressLine2")}
              </FormLabel>
              <Input
                placeholder={t("settings.address.addressLine2Placeholder")}
                borderRadius="12px"
                borderColor={borderColor}
              />
            </FormControl>

            <HStack spacing="20px">
              <FormControl flex="1">
                <FormLabel color={textColor} fontWeight="600">
                  {t("settings.address.city")}
                </FormLabel>
                <Input
                  placeholder={t("settings.address.cityPlaceholder")}
                  borderRadius="12px"
                  borderColor={borderColor}
                />
              </FormControl>

              <FormControl flex="1">
                <FormLabel color={textColor} fontWeight="600">
                  {t("settings.address.state")}
                </FormLabel>
                <Input
                  placeholder={t("settings.address.statePlaceholder")}
                  borderRadius="12px"
                  borderColor={borderColor}
                />
              </FormControl>
            </HStack>

            <HStack spacing="20px">
              <FormControl flex="1">
                <FormLabel color={textColor} fontWeight="600">
                  {t("settings.address.zip")}
                </FormLabel>
                <Input
                  placeholder={t("settings.address.zipPlaceholder")}
                  borderRadius="12px"
                  borderColor={borderColor}
                />
              </FormControl>

              <FormControl flex="1">
                <FormLabel color={textColor} fontWeight="600">
                  {t("settings.address.country")}
                </FormLabel>
                <Select borderRadius="12px" borderColor={borderColor}>
                  <option value="us">United States</option>
                  <option value="sa">Saudi Arabia</option>
                  <option value="ae">United Arab Emirates</option>
                  <option value="eg">Egypt</option>
                </Select>
              </FormControl>
            </HStack>

            <Button
              bg={buttonBg}
              color="white"
              fontWeight="600"
              borderRadius="12px"
              px="32px"
              py="14px"
              _hover={{ bg: buttonHover }}
              alignSelf="flex-start"
            >
              {t("settings.save")}
            </Button>
          </VStack>
        </Card>

        {/* Section 5: Social Links & Website */}
        <Card p={{ base: "24px", md: "32px" }} borderRadius="16px" bg={cardBg}>
          <VStack align="stretch" spacing="20px">
            <VStack align="start" spacing="4px">
              <Text color={textColor} fontSize="xl" fontWeight="700">
                {t("settings.socialLinks.title")}
              </Text>
            </VStack>

            <FormControl>
              <FormLabel color={textColor} fontWeight="600">
                Facebook
              </FormLabel>
              <Input
                placeholder="https://facebook.com/yourpage"
                borderRadius="12px"
                borderColor={borderColor}
              />
            </FormControl>

            <FormControl>
              <FormLabel color={textColor} fontWeight="600">
                Instagram
              </FormLabel>
              <Input
                placeholder="https://instagram.com/yourpage"
                borderRadius="12px"
                borderColor={borderColor}
              />
            </FormControl>

            <FormControl>
              <FormLabel color={textColor} fontWeight="600">
                X (Twitter)
              </FormLabel>
              <Input
                placeholder="https://twitter.com/yourpage"
                borderRadius="12px"
                borderColor={borderColor}
              />
            </FormControl>

            <FormControl>
              <FormLabel color={textColor} fontWeight="600">
                LinkedIn
              </FormLabel>
              <Input
                placeholder="https://linkedin.com/company/yourpage"
                borderRadius="12px"
                borderColor={borderColor}
              />
            </FormControl>

            <FormControl>
              <FormLabel color={textColor} fontWeight="600">
                YouTube
              </FormLabel>
              <Input
                placeholder="https://youtube.com/yourchannel"
                borderRadius="12px"
                borderColor={borderColor}
              />
            </FormControl>

            <FormControl>
              <FormLabel color={textColor} fontWeight="600">
                TikTok
              </FormLabel>
              <Input
                placeholder="https://tiktok.com/@yourpage"
                borderRadius="12px"
                borderColor={borderColor}
              />
            </FormControl>

            <Button
              onClick={onMorePlatformsToggle}
              variant="ghost"
              leftIcon={isMorePlatformsOpen ? <MdExpandLess /> : <MdExpandMore />}
              alignSelf="flex-start"
              color={textColorSecondary}
            >
              {t("settings.socialLinks.showMore")}
            </Button>

            <Collapse in={isMorePlatformsOpen} animateOpacity>
              <VStack spacing="16px" align="stretch">
                <FormControl>
                  <FormLabel color={textColor} fontWeight="600">
                    Snapchat
                  </FormLabel>
                  <Input
                    placeholder="https://snapchat.com/add/yourpage"
                    borderRadius="12px"
                    borderColor={borderColor}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel color={textColor} fontWeight="600">
                    Pinterest
                  </FormLabel>
                  <Input
                    placeholder="https://pinterest.com/yourpage"
                    borderRadius="12px"
                    borderColor={borderColor}
                  />
                </FormControl>
              </VStack>
            </Collapse>

            <Button
              bg={buttonBg}
              color="white"
              fontWeight="600"
              borderRadius="12px"
              px="32px"
              py="14px"
              _hover={{ bg: buttonHover }}
              alignSelf="flex-start"
            >
              {t("settings.socialLinks.saveButton")}
            </Button>
          </VStack>
        </Card>

        {/* Section 6: SEO Settings */}
        <Card p={{ base: "24px", md: "32px" }} borderRadius="16px" bg={cardBg}>
          <VStack align="stretch" spacing="20px">
            <VStack align="start" spacing="4px">
              <Text color={textColor} fontSize="xl" fontWeight="700">
                {t("settings.seo.title")}
              </Text>
            </VStack>

            <FormControl>
              <FormLabel color={textColor} fontWeight="600">
                {t("settings.seo.seoTitle")}
              </FormLabel>
              <Input
                placeholder={t("settings.seo.seoTitlePlaceholder")}
                borderRadius="12px"
                borderColor={borderColor}
              />
            </FormControl>

            <FormControl>
              <FormLabel color={textColor} fontWeight="600">
                {t("settings.seo.seoDescription")}
              </FormLabel>
              <Textarea
                placeholder={t("settings.seo.seoDescriptionPlaceholder")}
                borderRadius="12px"
                borderColor={borderColor}
                rows={4}
              />
            </FormControl>

            <FormControl>
              <FormLabel color={textColor} fontWeight="600">
                {t("settings.seo.seoKeywords")}
              </FormLabel>
              <Input
                placeholder={t("settings.seo.seoKeywordsPlaceholder")}
                borderRadius="12px"
                borderColor={borderColor}
              />
            </FormControl>

            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <FormLabel color={textColor} fontWeight="600" mb="0">
                  {t("settings.seo.allowIndexing")}
                </FormLabel>
                <Text color={textColorSecondary} fontSize="sm">
                  {t("settings.seo.allowIndexingDescription")}
                </Text>
              </Box>
              <Switch
                isChecked={searchIndexing}
                onChange={(e) => setSearchIndexing(e.target.checked)}
                colorScheme="orange"
              />
            </FormControl>

            <Button
              bg={buttonBg}
              color="white"
              fontWeight="600"
              borderRadius="12px"
              px="32px"
              py="14px"
              _hover={{ bg: buttonHover }}
              alignSelf="flex-start"
            >
              {t("settings.save")}
            </Button>
          </VStack>
        </Card>

        {/* Section 7: Email Templates */}
        <Card p={{ base: "24px", md: "32px" }} borderRadius="16px" bg={cardBg}>
          <VStack align="stretch" spacing="20px">
            <VStack align="start" spacing="4px">
              <Text color={textColor} fontSize="xl" fontWeight="700">
                {t("settings.emailTemplates.title")}
              </Text>
            </VStack>

            <Alert status="warning" borderRadius="12px">
              <AlertIcon />
              {t("settings.emailTemplates.stripeWarning")}
            </Alert>

            <VStack align="stretch" spacing="16px">
              <Flex justify="space-between" align="center" p="16px" borderRadius="12px" bg={infoBoxBg}>
                <Box>
                  <Text color={textColor} fontWeight="600">
                    {t("settings.emailTemplates.orderConfirmation")}
                  </Text>
                  <Badge colorScheme="gray" mt="4px">
                    {t("settings.emailTemplates.defaultTemplate")}
                  </Badge>
                </Box>
                <Button
                  size="sm"
                  variant="outline"
                  isDisabled
                  borderRadius="12px"
                >
                  {t("settings.emailTemplates.createCustom")}
                </Button>
              </Flex>

              <Flex justify="space-between" align="center" p="16px" borderRadius="12px" bg={infoBoxBg}>
                <Box>
                  <Text color={textColor} fontWeight="600">
                    {t("settings.emailTemplates.attendeeTicket")}
                  </Text>
                  <Badge colorScheme="gray" mt="4px">
                    {t("settings.emailTemplates.defaultTemplate")}
                  </Badge>
                </Box>
                <Button
                  size="sm"
                  variant="outline"
                  isDisabled
                  borderRadius="12px"
                >
                  {t("settings.emailTemplates.createCustom")}
                </Button>
              </Flex>
            </VStack>
          </VStack>
        </Card>
      </VStack>
    </Box>
  );
}

