import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PetCardContainer = ({ children }: Props) => {
  return (
    <Box display="flex" flexDirection="column" height="100%">
      {children}
    </Box>
  );
};

export default PetCardContainer;
