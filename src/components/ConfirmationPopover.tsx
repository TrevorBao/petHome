import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import useEditPet from "../hooks/useEditPet";
import { PetProps } from "../hooks/usePets";

interface Props {
  onClose: () => void;
  pet: PetProps;
}

const ConfirmationPopover = ({ onClose, pet }: Props) => {
  const { handleDelete } = useEditPet({ pet, onClose });

  return (
    <Popover returnFocusOnClose={false} closeOnBlur={false}>
      <PopoverTrigger>
        <Button colorScheme="red" leftIcon={<DeleteIcon />}>
          Delete
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          Are you sure you want to remove this pet from the rehoming list?
        </PopoverBody>
        <PopoverFooter display="flex" justifyContent="flex-end">
          <ButtonGroup size="sm">
            <Button colorScheme="red" onClick={() => handleDelete()}>
              Confirm
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default ConfirmationPopover;
