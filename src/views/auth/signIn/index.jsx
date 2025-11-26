/* eslint-disable */
import React, { useState } from "react";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import logoUser from "assets/img/logo/auth-logo.png";
import welcomeImg from "assets/img/auth/banner.svg";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { MdLanguage } from "react-icons/md";
// Language Context
import { useLanguage } from "contexts/LanguageContext";

function SignIn() {
  // Language
  const { t, toggleLanguage, isRTL, language } = useLanguage();

  // Chakra color mode
  const bgColor = useColorModeValue("white", "navy.800");
  const textColor = useColorModeValue("#4d4d4d", "white");
  const textColorSecondary = useColorModeValue("#7c7c7c", "gray.400");
  const brandColor = useColorModeValue("#e77324", "#e77324");
  const welcomeBg = useColorModeValue("#fcebdf", "navy.700");
  const welcomeHeadingColor = useColorModeValue("#005099", "white");
  const inputBg = useColorModeValue("#ffffff", "navy.700");
  const inputBorder = useColorModeValue("#e7e7e7", "whiteAlpha.300");
  const inputFocusBorder = useColorModeValue("#e77324", "brand.400");
  const langBtnBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const langBtnHover = useColorModeValue("gray.200", "whiteAlpha.300");
  
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPage, setSelectedPage] = useState("login");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    username: null,
    password: null,
    userCredentials: null,
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
    setErrorMessage((prev) => ({
      ...prev,
      [name]: null,
      userCredentials: null,
    }));

    if (value === null || value === "") {
      setErrorMessage((prev) => ({
        ...prev,
        [name]: t("login.required"),
      }));
    }
  };

  const handleForgotUsername = (event) => {
    const { value } = event.target;
    setUsername(value);
  };

  const isFormValid = () => {
    return (
      credentials?.password.trim() !== "" && credentials?.username.trim() !== ""
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add login logic here
    console.log("Login:", credentials);
  };

  const resetPassword = async (event) => {
    event.preventDefault();
    // Add reset password logic here
    console.log("Reset password for:", username);
  };

  return (
    <Flex minH="100vh" bg={bgColor} direction={isRTL ? "row-reverse" : "row"}>
      {/* Left Section - Login Form */}
      <Flex
        flex={{ base: "1", md: "1" }}
        direction="column"
        align="center"
        justify="center"
        p={{ base: "20px", md: "40px" }}
        w={{ base: "100%", md: "50%" }}
        position="relative"
      >
        {/* Language Toggle Button */}
        <Button
          position="absolute"
          top="20px"
          {...(isRTL ? { left: "20px" } : { right: "20px" })}
          onClick={toggleLanguage}
          bg={langBtnBg}
          _hover={{ bg: langBtnHover }}
          borderRadius="full"
          px="16px"
          py="8px"
          fontSize="14px"
          fontWeight="500"
          color={textColor}
          leftIcon={<Icon as={MdLanguage} w="18px" h="18px" />}
          transition="all 0.2s ease"
        >
          {t("common.language")}
        </Button>

        <Box w="80%" maxW="500px">
          {/* Logo */}
          <Box textAlign="center" mb="30px">
            <Image
              src={logoUser}
              alt="Logo"
              maxW="250px"
              mx="auto"
            />
          </Box>

          {/* Welcome Text */}
          <Text
            textAlign="center"
            fontSize="16px"
            fontWeight="400"
            color={textColorSecondary}
            mb="30px"
            fontFamily={isRTL ? "'Tajawal', 'Poppins', sans-serif" : "'Poppins', sans-serif"}
          >
            {t("login.welcomeBack")}
          </Text>

          {selectedPage === "login" ? (
            <form onSubmit={handleSubmit}>
              {errorMessage?.userCredentials && (
                <Text color="red.500" textAlign="center" mb="10px">
                  {errorMessage?.userCredentials}
                </Text>
              )}

              {/* Username Input */}
              <FormControl mb="20px">
                <Input
                  type="text"
                  name="username"
                  placeholder={t("login.username")}
                  value={credentials.username}
                  onChange={handleChange}
                  bg={inputBg}
                  border="1px solid"
                  borderColor={inputBorder}
                  borderRadius="6px"
                  p="10px"
                  fontSize="14px"
                  textAlign={isRTL ? "right" : "left"}
                  _hover={{ borderColor: inputFocusBorder }}
                  _focus={{
                    borderColor: inputFocusBorder,
                    boxShadow: "none",
                  }}
                  _placeholder={{
                    textAlign: isRTL ? "right" : "left",
                  }}
                />
                {errorMessage?.username && (
                  <Text color="red.500" fontSize="sm" mt="5px" textAlign={isRTL ? "right" : "left"}>
                    {errorMessage?.username}
                  </Text>
                )}
              </FormControl>

              {/* Password Input */}
              <FormControl mb="15px" position="relative">
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder={t("login.password")}
                    value={credentials.password}
                    onChange={handleChange}
                    bg={inputBg}
                    border="1px solid"
                    borderColor={inputBorder}
                    borderRadius="6px"
                    p="10px"
                    fontSize="14px"
                    textAlign={isRTL ? "right" : "left"}
                    {...(isRTL ? { ps: "40px" } : { pe: "40px" })}
                    _hover={{ borderColor: inputFocusBorder }}
                    _focus={{
                      borderColor: inputFocusBorder,
                      boxShadow: "none",
                    }}
                    _placeholder={{
                      textAlign: isRTL ? "right" : "left",
                    }}
                  />
                  <InputRightElement
                    {...(isRTL ? { left: "0", right: "auto" } : {})}
                  >
                    <Icon
                      as={showPassword ? MdOutlineRemoveRedEye : RiEyeCloseLine}
                      color={textColorSecondary}
                      cursor="pointer"
                      onClick={handleShowPassword}
                      w="20px"
                      h="20px"
                    />
                  </InputRightElement>
                </InputGroup>
                {errorMessage?.password && (
                  <Text color="red.500" fontSize="sm" mt="5px" textAlign={isRTL ? "right" : "left"}>
                    {errorMessage?.password}
                  </Text>
                )}
              </FormControl>

              {/* Forgot Password Link */}
              <Text
                fontSize="13px"
                color={textColor}
                cursor="pointer"
                mb="20px"
                textAlign={isRTL ? "right" : "left"}
                _hover={{ textDecoration: "underline" }}
                onClick={() => setSelectedPage("resetPassword")}
              >
                {t("login.forgotPassword")}
              </Text>

              {/* Login Button */}
              <Button
                type="submit"
                w="100%"
                bg={brandColor}
                color="white"
                borderRadius="6px"
                p="10px"
                fontSize="16px"
                fontWeight="500"
                isDisabled={!isFormValid()}
                _hover={{
                  bg: brandColor,
                  opacity: 0.9,
                }}
                _active={{
                  bg: brandColor,
                }}
              >
                {t("login.loginButton")}
              </Button>
            </form>
          ) : (
            <form onSubmit={resetPassword}>
              {/* Reset Password Form */}
              <FormControl mb="20px">
                <Input
                  type="text"
                  name="username"
                  placeholder={t("login.username")}
                  value={username}
                  onChange={handleForgotUsername}
                  bg={inputBg}
                  border="1px solid"
                  borderColor={inputBorder}
                  borderRadius="6px"
                  p="10px"
                  fontSize="14px"
                  textAlign={isRTL ? "right" : "left"}
                  _hover={{ borderColor: inputFocusBorder }}
                  _focus={{
                    borderColor: inputFocusBorder,
                    boxShadow: "none",
                  }}
                  _placeholder={{
                    textAlign: isRTL ? "right" : "left",
                  }}
                />
                {errorMessage?.username && (
                  <Text color="red.500" fontSize="sm" mt="5px" textAlign={isRTL ? "right" : "left"}>
                    {errorMessage?.username}
                  </Text>
                )}
              </FormControl>

              <Button
                type="submit"
                w="100%"
                bg={brandColor}
                color="white"
                borderRadius="6px"
                p="10px"
                fontSize="16px"
                fontWeight="500"
                _hover={{
                  bg: brandColor,
                  opacity: 0.9,
                }}
                _active={{
                  bg: brandColor,
                }}
              >
                {t("login.changePassword")}
              </Button>

              <Text
                fontSize="13px"
                color={textColor}
                cursor="pointer"
                mt="15px"
                textAlign="center"
                _hover={{ textDecoration: "underline" }}
                onClick={() => setSelectedPage("login")}
              >
                {t("login.backToLogin")}
              </Text>
            </form>
          )}
        </Box>
      </Flex>

      {/* Right Section - Welcome Image */}
      <Flex
        flex="1"
        display={{ base: "none", md: "flex" }}
        bg={welcomeBg}
        borderRadius="7px"
        m="20px"
        p="50px 15px"
        direction="column"
        align="center"
        justify="center"
      >
        {/* Welcome Header */}
        <Box 
          mb="35px" 
          {...(isRTL ? { mr: "22px" } : { ml: "22px" })}
          alignSelf={isRTL ? "flex-end" : "flex-start"}
          textAlign={isRTL ? "right" : "left"}
        >
          <Text
            fontSize="16px"
            fontWeight="400"
            color={textColorSecondary}
            mb="5px"
            fontFamily={isRTL ? "'Tajawal', 'Poppins', sans-serif" : "'Poppins', sans-serif"}
          >
            {t("welcome.hello")}
          </Text>
          <Heading
            fontSize="36px"
            fontWeight="600"
            color={welcomeHeadingColor}
            mb="5px"
            fontFamily={isRTL ? "'Tajawal', 'Poppins', sans-serif" : "'Poppins', sans-serif"}
          >
            {t("welcome.title")}
          </Heading>
          <Text
            fontSize="16px"
            fontWeight="400"
            color={textColorSecondary}
            fontFamily={isRTL ? "'Tajawal', 'Poppins', sans-serif" : "'Poppins', sans-serif"}
          >
            {t("welcome.subtitle")}
          </Text>
        </Box>

        {/* Welcome Image */}
        <Box textAlign="center">
          <Image
            src={welcomeImg}
            alt="Welcome"
            w="100%"
            maxW="500px"
          />
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;
