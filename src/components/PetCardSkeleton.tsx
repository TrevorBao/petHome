import {
  AspectRatio,
  Card,
  CardBody,
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
      <AspectRatio ratio={3 / 2}>
        <Skeleton objectFit="cover" borderRadius="lg" />
      </AspectRatio>
      <CardBody p={4}>
        <VStack spacing={4} align="stretch">
          <Skeleton height="21px" />
          <Skeleton height="21px" />
          <Skeleton height="21px" />
        </VStack>
      </CardBody>
      <Skeleton height="30px" mt="auto" />
    </Card>
  );
};

export default PetCardSkeleton;
