import { Button, HStack, Input } from "@chakra-ui/react";

interface Props {
  newMessage: string;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent<HTMLDivElement>) => void;
}

const ChatInputField = ({ newMessage, setNewMessage, handleSubmit }: Props) => {
  return (
    <HStack as="form" onSubmit={handleSubmit} mt={4} width="full" px={8} pb={8}>
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
