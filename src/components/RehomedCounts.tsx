import {
  Card,
  CardBody,
  Text,
  Flex,
  Box,
  Tooltip,
  Icon,
} from "@chakra-ui/react";
import DataBlueIcon from "../assets/dataBlue.svg";
import usePetsByUserId from "../hooks/usePetsByUserId";
import { QuestionIcon } from "@chakra-ui/icons";

interface Props {
  userId: string;
}

const RehomedCounts = ({ userId }: Props) => {
  const { petsCount } = usePetsByUserId({ userId });

  return (
    <Card
      borderRadius="3xl"
      shadow="lg"
      overflow="hidden"
      variant="elevated"
      maxW={{ base: "100%", md: "fit-content" }}
      p={1}
      pl={4}
      pb={0}
      display="flex"
      justifyContent="center"
      mb={6}
    >
      <CardBody>
        <Flex alignItems="center" justifyContent="center" wrap="wrap">
          <Box>
            <Text fontSize="3xl" fontWeight={500} color="#90c1dd">
              {petsCount.rehomedCount}
            </Text>
            <Text fontSize={{ base: "sm", sm: "md" }} fontWeight={500} py="2">
              Rehomed Pets
            </Text>
          </Box>
          <Box
            flexShrink={0}
            position="relative"
            maxW={{ base: "100px", sm: "220px" }}
            height="auto"
          >
            <Tooltip
              hasArrow
              label="The number of your rehoming pets that has been successfully adopted"
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
              src={DataBlueIcon}
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

export default RehomedCounts;
