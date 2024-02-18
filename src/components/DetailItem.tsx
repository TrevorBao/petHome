import { Box, Text } from "@chakra-ui/react";

interface Props {
  label: string;
  value: string;
}

const DetailItem = ({ label, value }: Props) => (
  <Box
    py={3}
    px={5}
    mt={{ "3xl": "10px" }}
    width="100%"
    bg="#F9FAFC"
    border="1px solid"
    borderColor="#E7E9EE"
    rounded="2xl"
  >
    <Text color="gray.500" mb={1.2}>
      {label}
    </Text>
    <Text fontWeight="bold" fontSize="md" color="#303030">
      {value}
    </Text>
  </Box>
);

export default DetailItem;
