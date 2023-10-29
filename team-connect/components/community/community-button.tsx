"use client";

import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, Camera } from "lucide-react";

interface CommunityButtonProps {
  type: "create" | "invite";
}

const iconMap = {
  create: <Plus />,
  invite: <Camera />,
};

export const CommunityButton = ({ type }: CommunityButtonProps) => {
  const router = useRouter();
  const { onOpen } = useModal();

  const onClick = () => {
    router.push("/community");

    if (type === "create") {
      onOpen("createCommunity");
    }

    if (type === "invite") {
      onOpen("invite");
    }
  };

  const text = type === "create" ? "Create now" : "Invite now";
  const icon = iconMap[type];

  return (
    <Button
      onClick={onClick}
      className="bg-transparent text-indigo-500 hover:bg-transparent hover:text-indigo-600 transition mt-16">
      {icon} <span className="ml-2">{text}</span>
    </Button>
  );
};
