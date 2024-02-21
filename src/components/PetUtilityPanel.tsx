import { AddIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SearchInput from "./searchInput";

interface Props {
  onSearch: (searchText: string) => void;
}

const PetUtilityPanel = ({ onSearch }: Props) => {
  const navigate = useNavigate();
  return (
    <Flex
      justifyContent="flex-end"
      px={{ base: "15px", md: "40px", lg: "50px", xl: "60px" }}
      mx={5}
      mt={{ base: "10px", lg: "15px", xl: "25px" }}
    >
      <SearchInput onSearch={onSearch} />
      <IconButton
        size="sm"
        icon={<AddIcon />}
        aria-label="Add image"
        onClick={() => navigate(`/pet/add`)}
      />
    </Flex>
  );
};

export default PetUtilityPanel;
