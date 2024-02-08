
import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";


function Layout() {


  return (
    <Grid
      templateAreas={{
        base: `"nav nav" "main main"`,
        md: `"nav nav" "aside main"`,
      }}
    >
      <GridItem area="nav" bg="coral">
        <NavBar />
      </GridItem>
      <Show above="md">
        <GridItem area="aside" bg="gold">
          Aside
        </GridItem>
      </Show>
      <GridItem area="main" bg="dodgerblue">
        <Outlet />

      </GridItem>
    </Grid>
  );
}

export default Layout;
