import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <Grid
      templateAreas={{
        base: `"nav nav" "main main"`,
        md: `"nav nav" "main main"`,
      }}
      templateRows={"auto 1fr"}
    >
      <GridItem
        area="nav"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex="sticky"
      >
        <NavBar />
      </GridItem>
      {/* <Show above="md">
        <GridItem area="aside" bg="gold">
          Aside
        </GridItem>
      </Show> */}
      <GridItem area="main" bg="gray.50" pt="4rem">
        <Outlet />
      </GridItem>
    </Grid>
  );
}

export default Layout;
