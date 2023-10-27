import { ChatSibebar } from "@/components/chat/chat-sidebar";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex">
      <div className="hidden md:flex h-full w-60 z-20 flex-col">
        <ChatSibebar />
      </div>
      <main className="h-full w-full">{children}</main>
    </div>
  );
};

export default ChatLayout;
