import { Grid, GridItem } from "@chakra-ui/react";
import PetGrid from "../components/PetGrid";
import PetUtilityPanel from "../components/PetUtilityPanel";
import { useState } from "react";

export interface PetQuery {
  searchText: string;
}

function App() {
  const [petQuery, setPetQuery] = useState<PetQuery>({} as PetQuery);
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
          <PetUtilityPanel
            onSearch={(searchText) => setPetQuery({ ...petQuery, searchText })}
          />
        </GridItem>
        <GridItem area="main" bg="gray.50">
          <PetGrid searchText={petQuery.searchText} />
        </GridItem>
      </Grid>
      {/* <PetGrid /> */}
    </>
  );
}

export default App;
