"use client";

import axios from "axios";

import { useModal } from "@/hooks/use-modal-store";
import { useOrigin } from "@/hooks/use-origin";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ActionTooltip } from "@/components/action-tooltip";

import { CheckIcon, Copy, RefreshCcw } from "lucide-react";

export const InviteModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();

  const isModalOpen = isOpen && type === "invite";
  const { community } = data;

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inviteUrl = `${origin}/invite/${community?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);

      const response = await axios.patch(
        `/api/community/${community?.id}/invite-code`
      );

      onOpen("invite", { community: response.data });
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
            Invite members to "
            {community?.name?.length && (
              <ActionTooltip label={community?.name}>
                <span>
                  {community?.name?.length > 16
                    ? `${community?.name.slice(0, 16)}...`
                    : community?.name}
                </span>
              </ActionTooltip>
            )}
            "
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Server invite link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              disabled={isLoading}
              className="bg-zinc-300/50 dark:bg-zinc-700 border-0 
              focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
              value={inviteUrl}
              readOnly
            />
            <Button
              disabled={isLoading}
              onClick={onCopy}
              size="icon"
              className="bg-transparent dark:hover:bg-zinc-700 hover:bg-zinc-300/50">
              {copied ? (
                <CheckIcon className="w-5 h-5 text-black dark:text-white" />
              ) : (
                <Copy className="w-5 h-5 text-black dark:text-white" />
              )}
            </Button>
          </div>
          <Button
            onClick={onNew}
            disabled={isLoading}
            variant="link"
            size="sm"
            className="text-xs text-zinc-500 dark:text-white mt-4">
            Generate a new link
            <RefreshCcw className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
