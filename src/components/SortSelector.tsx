import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { SORT_OPTIONS, SortOption } from "../hooks/usePets";

interface Props {
  onSortChange: (sortOption: SortOption) => void;
}

const SortSelector = ({ onSortChange }: Props) => {
  const [sortOption, setSortOption] =
    useState<keyof typeof SORT_OPTIONS>("NAME_ASC");

  const handleSortChange = (key: keyof typeof SORT_OPTIONS) => {
    setSortOption(key);
    onSortChange(SORT_OPTIONS[key]);
  };
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />} size="sm">
        Order by: {SORT_OPTIONS[sortOption].field}{" "}
        {SORT_OPTIONS[sortOption].direction}
      </MenuButton>
      <MenuList fontSize="sm">
        {Object.entries(SORT_OPTIONS).map(([key, { field, direction }]) => (
          <MenuItem
            key={key}
            onClick={() => handleSortChange(key as keyof typeof SORT_OPTIONS)}
          >
            {field} {direction}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SortSelector;
