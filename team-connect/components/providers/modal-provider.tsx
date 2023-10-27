"use client";

import { useEffect, useState } from "react";

import { CreateCommunityModal } from "@/components/modals/create-community-modal";
import { InviteModal } from "@/components/modals/invite-modal";
import { EditCommunityModal } from "@/components/modals/edit-community-modal";
import { DeleteCommunityModal } from "@/components/modals/delete-community-modal";
import { LeaveCommunityModal } from "@/components/modals/leave-community-modal";
import { JoinCommunityModal } from "@/components/modals/join-community-modal";
import { CreateChannelModal } from "@/components/modals/create-channel-modal";
import { MembersModal } from "@/components/modals/members-modal";
import { EditChannelModal } from "@/components/modals/edit-channel-modal";
import { DeleteChannelModal } from "@/components/modals/delete-channel-modal";

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
      <DeleteCommunityModal />
      <LeaveCommunityModal />
      <JoinCommunityModal />
      <CreateChannelModal />
      <MembersModal />
      <EditChannelModal />
      <DeleteChannelModal />
    </>
  );
};
