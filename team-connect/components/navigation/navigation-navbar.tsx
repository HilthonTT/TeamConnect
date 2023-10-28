import { Shield } from "lucide-react";

import { NavigationSearch } from "@/components/navigation/navigation-search";
import { MobileSidebarToggle } from "@/components/mobile-sidebar-toggle";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

import { redirectToSignIn } from "@clerk/nextjs";
import { MobileSidebarRightToggle } from "@/components/mobile-sidebar-right-toggle";
import { ConversationWithProfiles } from "@/types";

export const NavigationNavbar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const communities = await db.community.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  const conversations = await db.conversation.findMany({
    where: {
      OR: [{ profileOneId: profile?.id }, { profileTwoId: profile.id }],
    },
    include: {
      profileOne: {},
      profileTwo: {},
    },
  });

  const getOtherProfile = (conversation: ConversationWithProfiles) => {
    const otherProfile =
      conversation.profileOne.id === profile?.id
        ? conversation.profileTwo
        : conversation.profileOne;

    return otherProfile;
  };

  const conversationData = conversations?.map((conversation) => {
    const otherProfile = getOtherProfile(conversation);
    return {
      id: otherProfile.id,
      name: otherProfile.username,
      icon: otherProfile.imageUrl,
    };
  });

  return (
    <div className="flex h-full text-zinc-400 w-full dark:bg-[#0d0d0d] bg-[#E3E5E8] py-3">
      <div className="flex items-center justify-start">
        <div className="h-[72px] w-[72px] text-zinc-400 flex justify-center items-center">
          <a href="/" className="hidden md:block">
            <Shield
              className="h-12 w-12 hover:text-indigo-400 
              dark:hover:text-indigo-500 hover:cursor-pointer transition 
            text-zinc-600 dark:text-zinc-200"
            />
          </a>
          <MobileSidebarToggle
            communities={communities}
            conversations={conversations}
            profile={profile}
          />
        </div>
      </div>
      <div className="ml-auto mr-auto">
        <NavigationSearch
          data={[
            {
              label: "Communities",
              type: "community",
              data: communities?.map((community) => ({
                id: community.id,
                name: community.name,
                icon: community.imageUrl,
              })),
            },
            {
              label: "Conversations",
              type: "conversation",
              data: conversationData || [],
            },
          ]}
        />
      </div>
      <div className="flex items-center justify-end">
        <MobileSidebarRightToggle
          communities={communities}
          conversations={conversations}
          profile={profile}
        />
      </div>
    </div>
  );
};
