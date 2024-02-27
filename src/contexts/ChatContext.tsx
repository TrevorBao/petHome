import { createContext, useEffect, useState } from "react";

export const ChatContext = createContext<{
  activeChatId: string | null;
  setActiveChatId: React.Dispatch<React.SetStateAction<string | null>>;
} | null>(null);

interface Props {
  children: React.ReactNode;
}

export const ChatProvider = ({ children }: Props) => {
  const [activeChatId, setActiveChatId] = useState<string | null>(() => {
    const savedChatId = sessionStorage.getItem("activeChatId");
    return savedChatId !== null ? savedChatId : null;
  });

  useEffect(() => {
    if (activeChatId === null) {
      sessionStorage.removeItem("activeChatId");
    } else {
      sessionStorage.setItem("activeChatId", activeChatId);
    }
  }, [activeChatId]);

  return (
    <ChatContext.Provider value={{ activeChatId, setActiveChatId }}>
      {children}
    </ChatContext.Provider>
  );
};
