import {
  AspectRatio,
  Card,
  CardBody,
  Divider,
  Skeleton,
  VStack,
} from "@chakra-ui/react";

const PetCardSkeleton = () => {
  return (
    <Card
      borderRadius="lg"
      overflow="hidden"
      backgroundColor="white"
      padding={7}
      m={4}
    >
      <AspectRatio ratio={1.5}>
        <Skeleton borderRadius="lg" />
      </AspectRatio>
      <Divider my={4} />
      <CardBody p={4}>
        <VStack spacing={4} align="stretch">
          <Skeleton height="24px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </VStack>
      </CardBody>
      <Skeleton height="40px" mt="auto" />
    </Card>
  );
};

export default PetCardSkeleton;
