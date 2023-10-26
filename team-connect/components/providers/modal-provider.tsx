"use client";

import { useEffect, useState } from "react";
import { CreateCommunityModal } from "@/components/modals/create-community-modal";
import { InviteModal } from "@/components/modals/invite-modal";
import { EditCommunityModal } from "../modals/edit-community-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateCommunityModal />
      <InviteModal />
      <EditCommunityModal />
    </>
  );
};
