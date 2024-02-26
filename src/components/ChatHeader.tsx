import { Center, Flex, Heading } from "@chakra-ui/react";

interface Props {
  chatPartnerName: string;
}

const ChatHeader = ({ chatPartnerName }: Props) => {
  return (
    <Flex
      width="full"
      px={5}
      py={3.5}
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <Center>
        <Heading size="md">{chatPartnerName}</Heading>
      </Center>
    </Flex>
  );
};

export default ChatHeader;
