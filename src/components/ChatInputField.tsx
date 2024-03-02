import { FormEvent, Dispatch } from "react";
import { Button, HStack, Input } from "@chakra-ui/react";

interface Props {
  newMessage: string;
  setNewMessage: Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: FormEvent<HTMLDivElement>) => void;
}

const ChatInputField = ({ newMessage, setNewMessage, handleSubmit }: Props) => {
  return (
    <HStack
      as="form"
      onSubmit={handleSubmit}
      width="100%"
      w="100%"
      px={5}
      py={4}
      bg="white"
      borderTop="1px solid"
      borderTopColor="gray.200"
      zIndex={1}
    >
      <Input
        flexGrow="1"
        variant="filled"
        placeholder="Type your message here..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <Button type="submit">Send</Button>
    </HStack>
  );
};

export default ChatInputField;
