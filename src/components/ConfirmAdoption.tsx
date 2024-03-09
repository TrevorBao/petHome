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
import { CheckIcon } from "@chakra-ui/icons";

interface Props {
  acceptAdoption: () => void;
}

const ConfirmAdoption = ({ acceptAdoption }: Props) => {
  const initRef = useRef<HTMLButtonElement>(null);

  return (
    <Popover placement="auto" closeOnBlur={false} initialFocusRef={initRef}>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Center position="relative" mt={8}>
              <IconButton
                aria-label="Accept Adoption Request"
                colorScheme="green"
                size="sm"
                icon={<CheckIcon boxSize="2.5" />}
                isRound
              />
            </Center>
          </PopoverTrigger>
          <Portal>
            <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
              <PopoverArrow bg="blue.800" />
              <PopoverCloseButton />
              <PopoverHeader pt={4} fontWeight="bold" border="0">
                Rehoming Request
              </PopoverHeader>
              <PopoverBody>
                Do you want to proceed with allowing this individual to adopt
                your pet? This action cannot be undone.
              </PopoverBody>
              <PopoverFooter
                border="0"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                pb={4}
              >
                <ButtonGroup size="sm">
                  <Button colorScheme="green" onClick={acceptAdoption}>
                    Accept Adoption
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

export default ConfirmAdoption;
