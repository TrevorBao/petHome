import { AddIcon } from "@chakra-ui/icons";
import { Flex, HStack, IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import SortSelector from "./SortSelector";
import { SortOption } from "../hooks/usePets";

interface Props {
  onSearch: (searchText: string) => void;
  onSortChange: (sortOption: SortOption) => void;
}

const PetUtilityPanel = ({ onSearch, onSortChange }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <Flex
        justifyContent="flex-end"
        px={{ base: "15px", md: "40px", lg: "50px", xl: "60px" }}
        mx={5}
        mt={{ base: "10px", lg: "15px", xl: "25px" }}
      >
        <SearchInput onSearch={onSearch} />
      </Flex>
      <Flex
        justifyContent="flex-end"
        px={{ base: "15px", md: "40px", lg: "50px", xl: "60px" }}
        mx={5}
        mt={{ base: "18px", lg: "23px", xl: "28px" }}
      >
        <HStack spacing={3}>
          <SortSelector onSortChange={onSortChange} />
          <IconButton
            size="sm"
            icon={<AddIcon />}
            aria-label="Add image"
            onClick={() => navigate(`/pet/add`)}
          />
        </HStack>
      </Flex>
    </>
  );
};

export default PetUtilityPanel;
