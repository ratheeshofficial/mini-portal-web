import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { FiLock } from "react-icons/fi";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCreatePassword, setShowCreatePassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const params = useParams();
  const token = params.token;

  const toast = useToast();

  const handleClickCreatePassword = () =>
    setShowCreatePassword(!showCreatePassword);

  const handleClickConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  function handleSubmit() {
    if (confirmPassword !== newPassword) {
      return toast({
        status: "warning",
        position: "top-right",
        title: "Password does not match",
      });
    }
    setIsLoading(true);
    axios
      .post(`/admin/reset-password/${token}`, { password: newPassword })
      .then((res) =>
        toast({
          status: "success",
          position: "top-right",
          title: "Password changed successfull",
        })
      )
      .catch((err) => console.log("err.message", err.message))
      .finally(setIsLoading(false));
    navigate("/");
  }

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={6} mx={"auto"} w={"sm"} py={12}>
        <Stack align={"center"}>
          {/* <Image src={TesarkLogo} alt="logo" boxSize="20" /> */}
          <Heading fontSize={"4xl"}>Create New Password</Heading>
        </Stack>
        <Box>
          <form>
            <Stack spacing={4}>
              <FormControl id="createPassword">
                <FormLabel>Create Password</FormLabel>
                <InputGroup>
                  <Input
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                    // LeftIcon={FiLock}
                    type={showCreatePassword ? "text" : "password"}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={handleClickCreatePassword}
                    >
                      {showCreatePassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="reEnterPassword">
                <FormLabel>Re-Enter Password</FormLabel>
                <InputGroup>
                  <Input
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    // LeftIcon={FiLock}
                    type={showConfirmPassword ? "text" : "password"}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={handleClickConfirmPassword}
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack pt="2">
                <Button
                  isLoading={isLoading}
                  onClick={handleSubmit}
                  children="Confirm Password"
                  float="right"
                />
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
    </Flex>
  );
};

export default ChangePassword;
