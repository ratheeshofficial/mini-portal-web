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
  Select,
  Radio,
  RadioGroup,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ROUTES from "../constants/Routes";

export default function Student() {
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Student</Heading>
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
                name: "",
                description: "",
                country: "",
                gender: "",
                file: "",
              }}
              //   validationSchema={Yup.object({
              //     email: Yup.string()
              //       .email("Invalid email address")
              //       .required("Required"),

              //     password: Yup.string()
              //       .max(15, "Must be 15 characters or less")
              //       .required("Required"),
              //   })}
            >
              {({ values, resetForm }) => (
                <Form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsLoading(true);
                    // console.log("values", values);
                    // setIsLoading(false);
                    await axios
                      .post("/student", values)
                      .then((res) =>
                        toast({
                          status: "success",
                          position: "top-right",
                          title: "Student Created",
                        })
                      )
                      .catch((err) => console.log("err.message", err.message))
                      .finally(() => {
                        setIsLoading(false);
                        navigate(ROUTES.DASHBOARD);
                      });
                  }}
                >
                  <Stack spacing={4}>
                    <Field id="name" name="name">
                      {({ field, form }) => (
                        <FormControl isRequired>
                          <FormLabel>Name</FormLabel>
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
                          <ErrorMessage name="name">
                            {(error) => (
                              <Text as="span" color="red">
                                {error}
                              </Text>
                            )}
                          </ErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field id="desc" name="desc">
                      {({ field, form }) => (
                        <FormControl isRequired>
                          <FormLabel>Description</FormLabel>
                          <Textarea
                            {...field}
                            placeholder="Your Description"
                            bg={"gray.100"}
                            border={0}
                            color={"gray.500"}
                            _placeholder={{
                              color: "gray.500",
                            }}
                          />
                          <ErrorMessage name="description">
                            {(error) => (
                              <Text as="span" color="red">
                                {error}
                              </Text>
                            )}
                          </ErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field id="country" name="country">
                      {({ field, form }) => (
                        <FormControl isRequired>
                          <FormLabel>Country</FormLabel>
                          <Select {...field}>
                            <option value="">Select One</option>
                            <option value="us">United States</option>
                            <option value="ca">Canada</option>
                            <option value="uk">United Kingdom</option>
                          </Select>
                        </FormControl>
                      )}
                    </Field>
                    <Field id="gender" name="gender">
                      {({ field, form }) => (
                        <FormControl isRequired>
                          <FormLabel>Gender</FormLabel>
                          <RadioGroup defaultValue="female" {...field}>
                            <Stack direction="row" {...field}>
                              <Radio value="male">Male</Radio>
                              <Radio value="female">Female</Radio>
                            </Stack>
                          </RadioGroup>
                        </FormControl>
                      )}
                    </Field>
                    <Field id="file" name="file">
                      {({ field, form }) => (
                        <Input
                          type="file"
                          {...field}
                          accept=".pdf, .doc, .docx"
                        />
                      )}
                    </Field>
                    <Field id="acceptedTerms" name="acceptedTerms">
                      {({ field, form }) => (
                        <FormControl isRequired>
                          <Checkbox {...field}>
                            {" "}
                            I accept the terms and conditions
                          </Checkbox>
                        </FormControl>
                      )}
                    </Field>
                  </Stack>

                  <Stack spacing={5} mt="5">
                    {/* <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                    >
                      <Checkbox>Remember me</Checkbox>
                      <Link color={"purple.400"} to="/forgot-password">
                        Forgot password?
                      </Link>
                    </Stack> */}
                    <Button
                      isLoading={isLoading}
                      bg={"purple.400"}
                      color={"white"}
                      _hover={{
                        bg: "purple.500",
                      }}
                      type="submit"
                    >
                      Submit
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
