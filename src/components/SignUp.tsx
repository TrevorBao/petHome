import { useState } from "react";
import { auth, db, storage } from "../firebase";
import logoWithText from "../assets/logowithtext.svg";
import {
  createUserWithEmailAndPassword,
  browserSessionPersistence,
  setPersistence,
  sendEmailVerification,
} from "firebase/auth";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import {
  Link as ChakraLink,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
  Heading,
  useToast,
  Center,
  Card,
  Text,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FirebaseError } from "firebase/app";
import { getDownloadURL, ref } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    postCode: "",
    gender: "",
    birthday: "",
    job: "",
    avatarUrl: "",
  });
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const toast = useToast();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleAuthError = (error: unknown) => {
    let message;
    if (error instanceof FirebaseError) {
      message = error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }
    toast({
      title: "Authentication Error",
      description: message,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleAuthSuccess = () => {
    navigate("/");
  };

  const userCollectionRef = collection(db, "userInfo");

  const signUp = async () => {
    // Check if all required fields are filled
    const requiredFields = {
      username: userDetails.username,
      email: userDetails.email,
      password: password,
      confirmPassword: confirmPassword,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      gender: userDetails.gender,
      birthday: userDetails.birthday,
      address: userDetails.address,
      postCode: userDetails.postCode,
    };
    const allRequiredFilled = Object.values(requiredFields).every((value) =>
      value.trim()
    );
    if (!allRequiredFilled) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all the required fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "The passwords do not match.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userDetails.email,
        password
      );
      await sendEmailVerification(userCredential.user);

      const defaultAvatarPath =
        "gs://pet-home-1c0a2.appspot.com/avatar-default.png";
      const avatarRef = ref(storage, defaultAvatarPath);

      await getDownloadURL(avatarRef).then((url) => {
        setUserDetails({ ...userDetails, avatarUrl: url });
      });

      await addDoc(userCollectionRef, {
        address: userDetails.address,
        avatarUrl: userDetails.avatarUrl,
        birthday: userDetails.birthday,
        email: userDetails.email,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        gender: userDetails.gender,
        job: userDetails.job,
        postCode: userDetails.postCode,
        userName: userDetails.username,
        userId: auth?.currentUser?.uid,
      });

      toast({
        title: "Account Created",
        description:
          "Your account has been created successfully. A verification email has been sent to you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      handleAuthSuccess();
    } catch (err) {
      handleAuthError(err);
    }
  };

  return (
    <Card
      bg="white"
      p={6}
      rounded="lg"
      boxShadow="lg"
      w="100%"
      maxW="xl"
      padding={50}
      margin={10}
    >
      <Tabs isFitted index={tabIndex} onChange={(index) => setTabIndex(index)}>
        <TabPanels>
          <TabPanel>
            <VStack spacing={4} align="flex-start">
              <Center w="100%">
                <Image src={logoWithText} boxSize="20" />
              </Center>
              <Heading size="lg" textAlign="center" w="full">
                Join Us!
              </Heading>
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={userDetails.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  name="username"
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={userDetails.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  name="email"
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="confirmPassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    type={show ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing={4} align="flex-start">
              <FormControl id="firstName" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  value={userDetails.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                  name="firstName"
                />
              </FormControl>
              <FormControl id="lastName" isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  value={userDetails.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                  name="lastName"
                />
              </FormControl>
              <FormControl id="gender" isRequired>
                <FormLabel>Gender</FormLabel>
                <Select
                  value={userDetails.gender}
                  onChange={handleInputChange}
                  placeholder="Choose your gender"
                  name="gender"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="notTell">Prefer not to tell</option>
                </Select>
              </FormControl>
              <FormControl id="birthday" isRequired>
                <FormLabel>Date of Birth</FormLabel>
                <Input
                  type="date"
                  value={userDetails.birthday}
                  onChange={handleInputChange}
                  name="birthday"
                />
              </FormControl>
              <FormControl id="address" isRequired>
                <FormLabel>Address</FormLabel>
                <Input
                  type="text"
                  value={userDetails.address}
                  onChange={handleInputChange}
                  name="address"
                />
              </FormControl>
              <FormControl id="postCode" isRequired>
                <FormLabel>Postcode</FormLabel>
                <Input
                  type="text"
                  value={userDetails.postCode}
                  onChange={handleInputChange}
                  name="postCode"
                />
              </FormControl>
              <FormControl id="job">
                <FormLabel>Job</FormLabel>
                <Input
                  type="text"
                  value={userDetails.job}
                  onChange={handleInputChange}
                  name="job"
                />
              </FormControl>
            </VStack>
            <Button colorScheme="teal" w="full" mt={6} onClick={signUp}>
              Sign Up
            </Button>
          </TabPanel>
        </TabPanels>
        <TabList mb="1em">
          <Tab>Account</Tab>
          <Tab>User Details</Tab>
        </TabList>
      </Tabs>
      <VStack spacing={1} align="stretch" w="100%">
        <Text mt={6} fontSize="sm" align="center">
          Already have an account?
        </Text>

        <ChakraLink
          as={ReactRouterLink}
          color="teal"
          textAlign="center"
          fontWeight="bold"
          to="/auth"
        >
          Log In
        </ChakraLink>
      </VStack>
    </Card>
  );
};

export default SignUp;
