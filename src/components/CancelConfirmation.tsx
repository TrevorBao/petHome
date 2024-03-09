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
  Center,
  IconButton,
} from "@chakra-ui/react";
import { useRef } from "react";
import { SmallCloseIcon } from "@chakra-ui/icons";

interface Props {
  declineAdoption: () => void;
}

const CancelConfirmation = ({ declineAdoption }: Props) => {
  const initRef = useRef<HTMLButtonElement>(null);

  return (
    <Popover placement="auto" closeOnBlur={false} initialFocusRef={initRef}>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Center position="relative" mt={8}>
              <IconButton
                aria-label="Cancel Adoption"
                colorScheme="red"
                size="sm"
                icon={<SmallCloseIcon />}
                isRound
              />
            </Center>
          </PopoverTrigger>
          <Portal>
            <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
              <PopoverArrow bg="blue.800" />
              <PopoverCloseButton />
              <PopoverHeader pt={4} fontWeight="bold" border="0">
                Cancel Confirmation
              </PopoverHeader>
              <PopoverBody>
                Are you sure you want to decline the adoption?
              </PopoverBody>
              <PopoverFooter
                border="0"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                pb={4}
              >
                <ButtonGroup size="sm">
                  <Button colorScheme="green" onClick={declineAdoption}>
                    Decline Adoption
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

export default CancelConfirmation;
