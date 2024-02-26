import { Center, Heading, HStack } from "@chakra-ui/react";

interface Props {
  opponentUserName: string;
}

const ChatHeader = ({ opponentUserName }: Props) => {
  return (
    <HStack
      zIndex="sticky"
      width="full"
      px={8}
      justifyContent="center"
      backgroundColor="gray.100"
    >
      <Center>
        <Heading>{opponentUserName}</Heading>
      </Center>
    </HStack>
  );
};

export default ChatHeader;
