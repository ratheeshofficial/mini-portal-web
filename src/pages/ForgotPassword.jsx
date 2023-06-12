import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(null);
  console.log('isLoading', isLoading)
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleResetPassword = async () => {
    setIsLoading(true);
    await axios
      .post("/admin/forgot-password", { email })
      .then((res) => setIsEmailSent(true))
      .catch((err) => setEmailError(err.response.data))
      .finally(()=>setIsLoading(false));
  };
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      {isEmailSent ? (
        <Stack
          boxShadow={"2xl"}
          bg="grey.700"
          rounded={"xl"}
          spacing={6}
          mx={"auto"}
          w={"md"}
          p={10}
        >
          <Stack align={"center"}>
            <Heading fontSize={"2xl"}>Reset Password Mail Sent</Heading>
          </Stack>
          <Stack align={"center"} spacing={2}>
            <Text fontSize={"lg"}>Request to reset password is success</Text>
            <Text fontSize={"sm"} color={"gray.800"}>
              Please check your mail
              <Link ml={1} color="brand.800" fontWeight="bold">
                {email}
              </Link>
            </Text>
          </Stack>
          <Alert status="info">
            <AlertIcon />
            Ensure check in spam
          </Alert>
        </Stack>
      ) : (
        <Stack spacing={6} mx={"auto"} w={"sm"} py={12}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Forgot Password</Heading>
          </Stack>
          <Box>
            <form>
              <Stack spacing={2}>
                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    // LeftIcon={HiOutlineMail}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </FormControl>
                <Stack spacing={4}>
                  <Text mt="1" color="red">
                    {emailError}
                  </Text>
                  <Button
                    onClick={handleResetPassword}
                    isLoading={isLoading}
                    loadingText="Loading"
                  >
                    Reset Password
                  </Button>
                </Stack>
                <Flex justifyContent="center" fontSize="sm">
                  <Text>Having issues? </Text>
                  <Link color="brand.700" fontWeight="semibold" ml="1">
                    Contact Admin!
                  </Link>
                </Flex>
              </Stack>
            </form>
          </Box>
        </Stack>
      )}
    </Flex>
  );
};

export default ForgotPassword;
