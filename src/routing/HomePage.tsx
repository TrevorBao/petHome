import { Grid, GridItem } from "@chakra-ui/react";
import PetGrid from "../components/PetGrid";
import PetUtilityPanel from "../components/PetUtilityPanel";

function App() {
  return (
    <>
      <Grid
        templateAreas={`
        "nav"
        "main"
      `}
        templateRows={"auto 1fr"}
        h="100vh"
      >
        <GridItem area="nav">
          <PetUtilityPanel />
        </GridItem>
        <GridItem area="main" bg="gray.50">
          <PetGrid />
        </GridItem>
      </Grid>
      {/* <PetGrid /> */}
    </>
  );
}

export default App;
