import { Grid, GridItem } from "@chakra-ui/react";
import PetGrid from "../components/PetGrid";
import PetUtilityPanel from "../components/PetUtilityPanel";
import { useState } from "react";
import { SORT_OPTIONS, SortOption } from "../hooks/usePets";

export interface PetQuery {
  searchText: string;
  sortOption: SortOption;
}

function App() {
  const [petQuery, setPetQuery] = useState<PetQuery>({
    searchText: "",
    sortOption: SORT_OPTIONS.NAME_ASC,
  } as PetQuery);
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
            onSortChange={(sortOption) =>
              setPetQuery({ ...petQuery, sortOption })
            }
          />
        </GridItem>
        <GridItem area="main" bg="gray.50">
          <PetGrid
            searchText={petQuery.searchText}
            sortOption={petQuery.sortOption}
          />
        </GridItem>
      </Grid>
      {/* <PetGrid /> */}
    </>
  );
}

export default App;
