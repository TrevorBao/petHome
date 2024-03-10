import {
  Card,
  CardBody,
  Text,
  Flex,
  Box,
  Tooltip,
  Icon,
} from "@chakra-ui/react";
import DataOrangeIcon from "../assets/dataOrange.svg";
import usePetsByUserId from "../hooks/usePetsByUserId";
import { QuestionIcon } from "@chakra-ui/icons";

interface Props {
  userId: string;
}

const AdoptedCounts = ({ userId }: Props) => {
  const { petsCount } = usePetsByUserId({ userId });

  return (
    <Card
      borderRadius="3xl"
      shadow="lg"
      overflow="hidden"
      variant="elevated"
      maxW={{ base: "80vw", md: "fit-content" }}
      p={1}
      pl={4}
      pb={0}
      display="flex"
      justifyContent="center"
    >
      <CardBody>
        <Flex alignItems="center" justifyContent="center" wrap="wrap">
          <Box>
            <Text fontSize="3xl" fontWeight={500} color="#e59661">
              {petsCount.adoptedCount}
            </Text>
            <Text py="2">Adopted Pets</Text>
          </Box>
          <Box
            flexShrink={0}
            position="relative"
            maxW={{ base: "200px", sm: "220px" }}
            height="auto"
          >
            <Tooltip
              hasArrow
              label="The number of pets you have successfully adopted"
              bg="#e6e6e6"
              color="black"
            >
              <Icon
                as={QuestionIcon}
                color="#e3e3e3"
                position="absolute"
                right="6"
                top="0"
              />
            </Tooltip>
            <img
              src={DataOrangeIcon}
              alt="Decoration Image"
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default AdoptedCounts;
