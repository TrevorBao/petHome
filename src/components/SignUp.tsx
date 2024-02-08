import logoWithText from "../assets/logowithtext.svg";
import { Link as ReactRouterLink } from "react-router-dom";
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
  Center,
  Card,
  Text,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { UserDetails } from "../hooks/useSignUp";

interface SignUpProps {
  userDetails: UserDetails;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  tabIndex: number;
  setTabIndex: (index: number) => void;
  show: boolean;
  view: boolean;
  handleClick: () => void;
  handleClick2: () => void;
  handleInputChange: (event: never) => void;
  signUp: () => Promise<void>;
}

const SignUp = ({
  userDetails,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  tabIndex,
  setTabIndex,
  show,
  view,
  handleClick,
  handleClick2,
  handleInputChange,
  signUp,
}: SignUpProps) => {
  return (
    <Card
      bg="white"
      p={6}
      rounded="lg"
      boxShadow="lg"
      w="full"
      maxW="xl"
      padding="40px"
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
                  autoComplete="true"
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
                  autoComplete="true"
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
                    type={view ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick2}>
                      {view ? <ViewOffIcon /> : <ViewIcon />}
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
                  autoComplete="true"
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
