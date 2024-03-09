import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import MyAdoptionProcess from "../components/MyAdoptionProcess";
import useUsers from "../hooks/useUsers";
import AdoptionRequestProcess from "../components/AdoptionRequestProcess";

const AdoptionPage = () => {
  const { currentUser } = useUsers();
  if (currentUser) {
    return (
      <Box w="100%" minH="100vh">
        <Tabs
          isFitted
          position="relative"
          variant="soft-rounded"
          colorScheme="green"
        >
          <TabList px={12} pt={4}>
            <Tab>Adoption</Tab>
            <Tab>Rehoming</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <MyAdoptionProcess userId={currentUser.userId} />
            </TabPanel>
            <TabPanel>
              <AdoptionRequestProcess userId={currentUser.userId} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    );
  }
};

export default AdoptionPage;
