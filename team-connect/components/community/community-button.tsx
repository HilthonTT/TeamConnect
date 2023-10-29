"use client";

import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, MailPlus } from "lucide-react";

interface CommunityButtonProps {
  type: "create" | "join";
}

const iconMap = {
  create: <Plus />,
  join: <MailPlus />,
};

export const CommunityButton = ({ type }: CommunityButtonProps) => {
  const router = useRouter();
  const { onOpen } = useModal();

  const onClick = () => {
    router.push("/community");

    if (type === "create") {
      onOpen("createCommunity");
    }

    if (type === "join") {
      onOpen("joinCommunity");
    }
  };

  const text = type === "create" ? "Create now" : "Join now";
  const icon = iconMap[type];

  return (
    <Button
      onClick={onClick}
      className="bg-transparent text-indigo-500 hover:bg-transparent hover:text-indigo-600 transition mt-16">
      {icon} <span className="ml-2">{text}</span>
    </Button>
  );
};
