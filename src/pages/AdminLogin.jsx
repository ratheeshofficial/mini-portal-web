import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

export default function AdminLogin() {
  const [show, setShow] = useState(false);
  const toast = useToast();

  const handleClick = () => {
    setShow(!show);
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Log in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Welcome back! Please enter your details.
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Required"),

                password: Yup.string()
                  .max(15, "Must be 15 characters or less")
                  .required("Required"),
              })}
            >
              {({ values }) => (
                <Form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await axios
                      .post("/admin/login", values)
                      .then((res) =>
                        localStorage.setItem(
                          "loginDetails",
                          JSON.stringify(res.data)
                        )
                      )
                      .catch((err) => {
                        toast({
                          status: "error",
                          position: "top-right",
                          title: err.response.data,
                        });
                      });
                  }}
                >
                  <Stack spacing={4}>
                    <Field id="emal" name="email">
                      {({ field, form }) => (
                        <FormControl isRequired>
                          <FormLabel>Email</FormLabel>
                          <Input
                            {...field}
                            placeholder="Your good name"
                            bg={"gray.100"}
                            border={0}
                            color={"gray.500"}
                            _placeholder={{
                              color: "gray.500",
                            }}
                          />
                          <ErrorMessage name="email">
                            {(error) => (
                              <Text as="span" color="red">
                                {error}
                              </Text>
                            )}
                          </ErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field id="password" name="password">
                      {({ field, form }) => (
                        <FormControl isRequired>
                          <FormLabel>Password</FormLabel>
                          <InputGroup>
                            <Input
                              type={show ? "text" : "password"}
                              {...field}
                              placeholder="password"
                              bg={"gray.100"}
                              border={0}
                              color={"gray.500"}
                              _placeholder={{
                                color: "gray.500",
                              }}
                            />
                            <InputRightElement width="4.5rem">
                              <Button
                                h="1.75rem"
                                size="sm"
                                onClick={handleClick}
                              >
                                {show ? "Hide" : "Show"}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                          <ErrorMessage name="password">
                            {(error) => (
                              <Text as="span" color="red">
                                {error}
                              </Text>
                            )}
                          </ErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Stack>

                  <Stack spacing={5} mt="5">
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                    >
                      <Checkbox>Remember me</Checkbox>
                      <Link color={"purple.400"} to="/forgot-password">
                        Forgot password?
                      </Link>
                    </Stack>
                    <Button
                      bg={"purple.400"}
                      color={"white"}
                      _hover={{
                        bg: "purple.500",
                      }}
                      type="submit"
                    >
                      Sign in
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
