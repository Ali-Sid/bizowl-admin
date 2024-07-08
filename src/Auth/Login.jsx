// Login.js
import React, { useState } from "react";
import { primaryAuth } from "../config/firebase";
import { FormErrorMessage, useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

const signInSchema = Yup.object({
  email: Yup.string()
    .required("Email is Required")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      "Invalid email address"
    ),
  password: Yup.string()
    .required("Password is Required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
      "Password must be at least 8 characters 1 uppercase 1 lowercase 1 special and 1 number"
    ),
});

const Login = () => {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const history = useHistory();

  const handleLogin = async (values) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        primaryAuth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      console.log("User logged in:", user);
      history.push("/admin/home");
    } catch (error) {
      let errorMessage = "An error occurred during login.";
      if (error.code === "auth/invalid-credential") {
        errorMessage = "Invalid email or password.";
      }
      toast({
        description: errorMessage,
        status: "error",
        position: 'top',
        duration: 1000,
        isClosable: true,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: handleLogin,
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        //w='100%'
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Sign In
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your email and password to sign in!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <form onSubmit={formik.handleSubmit}>
            <FormControl  isInvalid={!!formik.errors.email && formik.touched.email}>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Email<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                // isRequired={true}
                onChange={formik.handleChange}
                variant="auth"
                name="email"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="text"
                value={formik.values.email}
                placeholder="hello@email.com"
                mb="24px"
                fontWeight="500"
                size="lg"
                // style={{ marginBottom: '0.2rem' }}
              />
               <FormErrorMessage style={{margin:'0.2rem',paddingLeft:'0.2rem'}}>{formik.errors.email}</FormErrorMessage>
              {/* {(formik.errors.email) && (
                <Text color="red" style={{ paddingLeft: '0.2rem', margin: '0.2rem' }}>{formik.errors.email}</Text>
              )} */}
            </FormControl>
            <FormControl  isInvalid={!!formik.errors.password && formik.touched.password}>
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  name="password"
                  // isRequired={true}
                  onChange={formik.handleChange}
                  fontSize="sm"
                  placeholder="Min. 8 characters"
                  mb="24px"
                  size="lg"
                  type={show ? "text" : "password"}
                  value={formik.values.password}
                  variant="auth"
                  // style={{ marginBottom: '0.2rem' }}
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage style={{margin:'0.2rem',paddingLeft:'0.2rem'}}>{formik.errors.password}</FormErrorMessage>
              {/* {(formik.errors.password) && (
                <Text color="red" style={{ paddingLeft: '0.2rem', margin: '0.2rem' }}>{formik.errors.password}</Text>
              )} */}
              <Flex justifyContent="space-between" align="center" mb="24px">
                <FormControl display="flex" alignItems="center">
                  <Checkbox
                    id="remember-login"
                    colorScheme="brandScheme"
                    me="10px"
                  />
                  <FormLabel
                    htmlFor="remember-login"
                    mb="0"
                    fontWeight="normal"
                    color={textColor}
                    fontSize="sm"
                  >
                    Keep me logged in
                  </FormLabel>
                </FormControl>
              </Flex>
              <Button
                type="submit"
                fontSize="sm"
                variant="brand"
                fontWeight="500"
                w="100%"
                h="50"
                mb="24px"
              >
                Sign In
              </Button>
            </FormControl>
          </form>
        </Flex>
      </Flex>
    </div>
  );
};

export default Login;
