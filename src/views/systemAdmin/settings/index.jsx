// Chakra imports
import {
  Box,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Input,
  Button,
  Icon,
  Flex,
  Card,
  Switch,
  FormControl,
  FormLabel,
  Divider,
  SimpleGrid,
  Textarea,
  Select,
  Badge,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useLanguage } from "contexts/LanguageContext";
import { 
  MdSettings,
  MdSecurity,
  MdNotifications,
  MdEmail,
  MdPayment,
  MdPeople,
  MdSave,
  MdRefresh,
} from "react-icons/md";
import IconBox from "components/icons/IconBox";

export default function SystemSettings() {
  const { t } = useLanguage();
  
  // Settings state
  const [settings, setSettings] = useState({
    siteName: "Event Management System",
    siteEmail: "admin@eventmanagement.com",
    maxOrganizers: 1000,
    maxEventsPerOrganizer: 50,
    enableRegistration: true,
    requireEmailVerification: true,
    enableTwoFactor: false,
    maintenanceMode: false,
    emailNotifications: true,
    slackNotifications: false,
    defaultCurrency: "USD",
    platformFee: 5,
    paymentGateway: "stripe",
  });

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "secondaryGray.400");
  const cardBg = useColorModeValue("white", "navy.800");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.100");
  const inputBg = useColorModeValue("#f8fafc", "whiteAlpha.50");
  const inputBorderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const iconBg = useColorModeValue("purple.50", "rgba(128, 90, 213, 0.15)");
  const iconColor = useColorModeValue("purple.500", "purple.400");
  const purpleGradient = "linear-gradient(135deg, #805AD5 0%, #B794F4 100%)";
  const cardShadow = useColorModeValue("0px 4px 20px rgba(112, 144, 176, 0.08)", "unset");
  const sectionBg = useColorModeValue("gray.50", "whiteAlpha.50");

  const handleSave = () => {
    console.log("Saving settings:", settings);
    // Add save logic here
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <VStack align="stretch" spacing="24px">
        {/* Page Header */}
        <Flex justify="space-between" align={{ base: "stretch", md: "center" }} direction={{ base: "column", md: "row" }} gap="20px" mb="8px">
          <HStack spacing="16px" align="center">
            <IconBox w="60px" h="60px" bg={iconBg} icon={<Icon w="34px" h="34px" as={MdSettings} color={iconColor} />} />
            <Box>
              <Text color={textColor} fontSize={{ base: "2xl", md: "3xl" }} fontWeight="800" letterSpacing="-0.5px" mb="4px">
                {t("systemAdmin.settings.title")}
              </Text>
              <Text color={textColorSecondary} fontSize="md" fontWeight="400">
                {t("systemAdmin.settings.subtitle")}
              </Text>
            </Box>
          </HStack>
          <HStack spacing="12px">
            <Button
              variant="outline"
              leftIcon={<Icon as={MdRefresh} w="18px" h="18px" />}
              borderColor={borderColor}
              color={textColor}
              borderRadius="14px"
              h="48px"
              px="20px"
              _hover={{ bg: sectionBg }}
            >
              {t("systemAdmin.settings.reset")}
            </Button>
            <Button
              bgGradient={purpleGradient}
              color="white"
              leftIcon={<Icon as={MdSave} w="18px" h="18px" />}
              borderRadius="14px"
              h="48px"
              px="24px"
              fontSize="md"
              fontWeight="600"
              boxShadow="0 4px 16px rgba(128, 90, 213, 0.25)"
              _hover={{ transform: "translateY(-2px)" }}
              onClick={handleSave}
            >
              {t("systemAdmin.settings.save")}
            </Button>
          </HStack>
        </Flex>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="24px">
          {/* General Settings */}
          <Card p="28px" bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="24px" boxShadow={cardShadow}>
            <HStack spacing="12px" mb="24px">
              <Flex w="44px" h="44px" bgGradient={purpleGradient} borderRadius="12px" align="center" justify="center">
                <Icon as={MdSettings} w="22px" h="22px" color="white" />
              </Flex>
              <VStack align="flex-start" spacing="0">
                <Text color={textColor} fontSize="lg" fontWeight="700">General Settings</Text>
                <Text color={textColorSecondary} fontSize="sm">Basic system configuration</Text>
              </VStack>
            </HStack>

            <VStack spacing="20px" align="stretch">
              <FormControl>
                <FormLabel color={textColor} fontSize="sm" fontWeight="600">Site Name</FormLabel>
                <Input
                  value={settings.siteName}
                  onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                  bg={inputBg}
                  border="2px solid"
                  borderColor={inputBorderColor}
                  borderRadius="14px"
                  h="52px"
                  fontSize="md"
                  _focus={{ borderColor: iconColor }}
                />
              </FormControl>
              <FormControl>
                <FormLabel color={textColor} fontSize="sm" fontWeight="600">Admin Email</FormLabel>
                <Input
                  value={settings.siteEmail}
                  onChange={(e) => setSettings({...settings, siteEmail: e.target.value})}
                  bg={inputBg}
                  border="2px solid"
                  borderColor={inputBorderColor}
                  borderRadius="14px"
                  h="52px"
                  fontSize="md"
                  _focus={{ borderColor: iconColor }}
                />
              </FormControl>
              <HStack spacing="16px">
                <FormControl>
                  <FormLabel color={textColor} fontSize="sm" fontWeight="600">Max Organizers</FormLabel>
                  <Input
                    type="number"
                    value={settings.maxOrganizers}
                    onChange={(e) => setSettings({...settings, maxOrganizers: parseInt(e.target.value)})}
                    bg={inputBg}
                    border="2px solid"
                    borderColor={inputBorderColor}
                    borderRadius="14px"
                    h="52px"
                    fontSize="md"
                    _focus={{ borderColor: iconColor }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel color={textColor} fontSize="sm" fontWeight="600">Max Events/Organizer</FormLabel>
                  <Input
                    type="number"
                    value={settings.maxEventsPerOrganizer}
                    onChange={(e) => setSettings({...settings, maxEventsPerOrganizer: parseInt(e.target.value)})}
                    bg={inputBg}
                    border="2px solid"
                    borderColor={inputBorderColor}
                    borderRadius="14px"
                    h="52px"
                    fontSize="md"
                    _focus={{ borderColor: iconColor }}
                  />
                </FormControl>
              </HStack>
            </VStack>
          </Card>

          {/* Security Settings */}
          <Card p="28px" bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="24px" boxShadow={cardShadow}>
            <HStack spacing="12px" mb="24px">
              <Flex w="44px" h="44px" bg="linear-gradient(135deg, #16a34a 0%, #22c55e 100%)" borderRadius="12px" align="center" justify="center">
                <Icon as={MdSecurity} w="22px" h="22px" color="white" />
              </Flex>
              <VStack align="flex-start" spacing="0">
                <Text color={textColor} fontSize="lg" fontWeight="700">Security</Text>
                <Text color={textColorSecondary} fontSize="sm">Authentication & access control</Text>
              </VStack>
            </HStack>

            <VStack spacing="20px" align="stretch">
              <Flex justify="space-between" align="center" p="16px" bg={sectionBg} borderRadius="14px">
                <VStack align="flex-start" spacing="2px">
                  <Text color={textColor} fontSize="sm" fontWeight="600">Enable Registration</Text>
                  <Text color={textColorSecondary} fontSize="xs">Allow new users to register</Text>
                </VStack>
                <Switch
                  colorScheme="purple"
                  isChecked={settings.enableRegistration}
                  onChange={(e) => setSettings({...settings, enableRegistration: e.target.checked})}
                />
              </Flex>
              <Flex justify="space-between" align="center" p="16px" bg={sectionBg} borderRadius="14px">
                <VStack align="flex-start" spacing="2px">
                  <Text color={textColor} fontSize="sm" fontWeight="600">Email Verification</Text>
                  <Text color={textColorSecondary} fontSize="xs">Require email verification for new accounts</Text>
                </VStack>
                <Switch
                  colorScheme="purple"
                  isChecked={settings.requireEmailVerification}
                  onChange={(e) => setSettings({...settings, requireEmailVerification: e.target.checked})}
                />
              </Flex>
              <Flex justify="space-between" align="center" p="16px" bg={sectionBg} borderRadius="14px">
                <VStack align="flex-start" spacing="2px">
                  <Text color={textColor} fontSize="sm" fontWeight="600">Two-Factor Authentication</Text>
                  <Text color={textColorSecondary} fontSize="xs">Require 2FA for admin accounts</Text>
                </VStack>
                <Switch
                  colorScheme="purple"
                  isChecked={settings.enableTwoFactor}
                  onChange={(e) => setSettings({...settings, enableTwoFactor: e.target.checked})}
                />
              </Flex>
              <Flex justify="space-between" align="center" p="16px" bg="red.50" borderRadius="14px" border="1px solid" borderColor="red.200">
                <VStack align="flex-start" spacing="2px">
                  <HStack spacing="8px">
                    <Text color="red.600" fontSize="sm" fontWeight="600">Maintenance Mode</Text>
                    <Badge bg="red.100" color="red.700" fontSize="xs" px="8px" py="2px" borderRadius="full">Danger</Badge>
                  </HStack>
                  <Text color="red.500" fontSize="xs">Disable site access for all users</Text>
                </VStack>
                <Switch
                  colorScheme="red"
                  isChecked={settings.maintenanceMode}
                  onChange={(e) => setSettings({...settings, maintenanceMode: e.target.checked})}
                />
              </Flex>
            </VStack>
          </Card>

          {/* Notification Settings */}
          <Card p="28px" bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="24px" boxShadow={cardShadow}>
            <HStack spacing="12px" mb="24px">
              <Flex w="44px" h="44px" bg="linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)" borderRadius="12px" align="center" justify="center">
                <Icon as={MdNotifications} w="22px" h="22px" color="white" />
              </Flex>
              <VStack align="flex-start" spacing="0">
                <Text color={textColor} fontSize="lg" fontWeight="700">Notifications</Text>
                <Text color={textColorSecondary} fontSize="sm">Admin notification preferences</Text>
              </VStack>
            </HStack>

            <VStack spacing="20px" align="stretch">
              <Flex justify="space-between" align="center" p="16px" bg={sectionBg} borderRadius="14px">
                <VStack align="flex-start" spacing="2px">
                  <HStack spacing="8px">
                    <Icon as={MdEmail} w="16px" h="16px" color={iconColor} />
                    <Text color={textColor} fontSize="sm" fontWeight="600">Email Notifications</Text>
                  </HStack>
                  <Text color={textColorSecondary} fontSize="xs">Receive email alerts for important events</Text>
                </VStack>
                <Switch
                  colorScheme="purple"
                  isChecked={settings.emailNotifications}
                  onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                />
              </Flex>
              <Flex justify="space-between" align="center" p="16px" bg={sectionBg} borderRadius="14px">
                <VStack align="flex-start" spacing="2px">
                  <Text color={textColor} fontSize="sm" fontWeight="600">Slack Notifications</Text>
                  <Text color={textColorSecondary} fontSize="xs">Send alerts to Slack channel</Text>
                </VStack>
                <Switch
                  colorScheme="purple"
                  isChecked={settings.slackNotifications}
                  onChange={(e) => setSettings({...settings, slackNotifications: e.target.checked})}
                />
              </Flex>
            </VStack>
          </Card>

          {/* Payment Settings */}
          <Card p="28px" bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="24px" boxShadow={cardShadow}>
            <HStack spacing="12px" mb="24px">
              <Flex w="44px" h="44px" bg="linear-gradient(135deg, #e77324 0%, #F99C58 100%)" borderRadius="12px" align="center" justify="center">
                <Icon as={MdPayment} w="22px" h="22px" color="white" />
              </Flex>
              <VStack align="flex-start" spacing="0">
                <Text color={textColor} fontSize="lg" fontWeight="700">Payment Settings</Text>
                <Text color={textColorSecondary} fontSize="sm">Configure payment processing</Text>
              </VStack>
            </HStack>

            <VStack spacing="20px" align="stretch">
              <HStack spacing="16px">
                <FormControl>
                  <FormLabel color={textColor} fontSize="sm" fontWeight="600">Default Currency</FormLabel>
                  <Select
                    value={settings.defaultCurrency}
                    onChange={(e) => setSettings({...settings, defaultCurrency: e.target.value})}
                    bg={inputBg}
                    border="2px solid"
                    borderColor={inputBorderColor}
                    borderRadius="14px"
                    h="52px"
                    fontSize="md"
                    _focus={{ borderColor: iconColor }}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="SAR">SAR (ر.س)</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel color={textColor} fontSize="sm" fontWeight="600">Platform Fee (%)</FormLabel>
                  <Input
                    type="number"
                    value={settings.platformFee}
                    onChange={(e) => setSettings({...settings, platformFee: parseFloat(e.target.value)})}
                    bg={inputBg}
                    border="2px solid"
                    borderColor={inputBorderColor}
                    borderRadius="14px"
                    h="52px"
                    fontSize="md"
                    _focus={{ borderColor: iconColor }}
                  />
                </FormControl>
              </HStack>
              <FormControl>
                <FormLabel color={textColor} fontSize="sm" fontWeight="600">Payment Gateway</FormLabel>
                <Select
                  value={settings.paymentGateway}
                  onChange={(e) => setSettings({...settings, paymentGateway: e.target.value})}
                  bg={inputBg}
                  border="2px solid"
                  borderColor={inputBorderColor}
                  borderRadius="14px"
                  h="52px"
                  fontSize="md"
                  _focus={{ borderColor: iconColor }}
                >
                  <option value="stripe">Stripe</option>
                  <option value="paypal">PayPal</option>
                  <option value="square">Square</option>
                </Select>
              </FormControl>
            </VStack>
          </Card>
        </SimpleGrid>
      </VStack>
    </Box>
  );
}

