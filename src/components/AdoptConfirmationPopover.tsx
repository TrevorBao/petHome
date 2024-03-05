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
  Portal,
  Flex,
  Box,
} from "@chakra-ui/react";
import { IoPaw } from "react-icons/io5";
import { useRef } from "react";

interface Props {
  isAdoptionInProgress: boolean;
  onAdopt: () => void;
}

const AdoptConfirmationPopover = ({ isAdoptionInProgress, onAdopt }: Props) => {
  const initRef = useRef<HTMLButtonElement>(null);

  return (
    <Popover closeOnBlur={false} initialFocusRef={initRef}>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Flex align="center" borderRadius="full" ml={4} mb={4}>
              <Box
                as={IoPaw}
                p="2.5"
                border="2px solid"
                borderRadius="full"
                color={isAdoptionInProgress ? "black" : "white"}
                bg={isAdoptionInProgress ? "white" : "black"}
                _hover={{
                  bg: isAdoptionInProgress ? "black" : "white",
                  color: isAdoptionInProgress ? "white" : "black",
                }}
                boxSize="12"
                mr="4"
                cursor="pointer"
                transition="background 0.4s ease-in-out, color 0.4s ease-in-out"
              />
              <Button colorScheme="black" variant="link" size="lg">
                {isAdoptionInProgress ? "Cancel Adoption" : "Adopt"}
              </Button>
            </Flex>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Confirmation</PopoverHeader>
              <PopoverBody>
                Are you sure you want to adopt this pet?
              </PopoverBody>
              <PopoverFooter>
                <ButtonGroup size="sm">
                  <Button colorScheme="green" onClick={onAdopt}>
                    Adopt
                  </Button>
                  <Button colorScheme="blue" ref={initRef} onClick={onClose}>
                    Cancel
                  </Button>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
};

export default AdoptConfirmationPopover;
