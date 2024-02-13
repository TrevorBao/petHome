import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  CardBody,
  Heading,
  List,
  ListIcon,
  ListItem,
  Image,
  Flex,
} from "@chakra-ui/react";
import { PetProps } from "../hooks/usePets";
import lines from "../assets/lines.png";

interface Props {
  pet: PetProps;
}

const PetInfoCard = ({ pet }: Props) => {
  const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);

  return (
    <Card
      direction={{ base: "column", md: "row" }}
      overflow="hidden"
      variant="elevated"
      padding={10}
      borderRadius="3xl"
      shadow="lg"
      mb={10}
      bg="#FEFEFE"
      position="relative"
    >
      <CardBody>
        <Heading size="xl">Highlight</Heading>
        <Box>
          <List spacing={3} mt={5}>
            {Object.entries(pet).map(([key, value]) => {
              // Check if the key is not one of the excluded fields and the value is truthy
              if (
                !["userId", "detail", "imageUrls", "id"].includes(key) &&
                value
              ) {
                return (
                  <ListItem key={key} fontSize="1rem">
                    <ListIcon as={ChevronRightIcon} color="#A774FD" />
                    <Box as="span" fontWeight="600" pr={1.5}>
                      {capitalize(key)}:
                    </Box>
                    {value}
                  </ListItem>
                );
              }
              return null;
            })}
          </List>
        </Box>
      </CardBody>
      <Flex
        position="absolute"
        right={-5}
        bottom={-10}
        height="100%"
        width="100%"
        pointerEvents="none"
      >
        <Image
          src={lines}
          alt="Decorative lines"
          position="absolute"
          right={-20}
          bottom={-20}
          maxW="80%"
          maxH="80%"
          pointerEvents="auto"
        />
      </Flex>
    </Card>
  );
};

export default PetInfoCard;
