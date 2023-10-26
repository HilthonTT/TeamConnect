"use client";

import axios from "axios";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { ActionTooltip } from "@/components/action-tooltip";

export const LeaveCommunityModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "leaveCommunity";
  const { community } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.patch(`/api/community/${community?.id}/leave`);

      onClose();
      router.refresh();
      router.push("/community");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-[#2b2b2b] text-black dark:text-white p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-[23px] text-center font-bold">
            Leave community
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500 dark:text-zinc-200">
            Are you sure you want to leave <br />
            {community?.name?.length && (
              <ActionTooltip label={community?.name}>
                <span className="font-semibold text-rose-500">
                  {community?.name?.length > 16
                    ? `${community?.name.slice(0, 16)}...`
                    : community?.name}
                </span>
              </ActionTooltip>
            )}{" "}
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 dark:bg-[#333333] px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={onClick} variant="primary">
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
