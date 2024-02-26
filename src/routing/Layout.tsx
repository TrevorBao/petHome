import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import useUsers from "../hooks/useUsers";

function Layout() {
  const { currentUser } = useUsers();

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
        zIndex="10"
      >
        {currentUser && <NavBar user={currentUser} />}
      </GridItem>
      <GridItem area="main" bg="gray.50" pt="4rem">
        <Outlet />
      </GridItem>
    </Grid>
  );
}

export default Layout;
