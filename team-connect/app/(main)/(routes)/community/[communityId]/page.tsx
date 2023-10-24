import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface CommunityIdPageProps {
  params: {
    communityId: string;
  };
}

const CommunityIdPage = async ({ params }: CommunityIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const community = await db.community.findUnique({
    where: {
      id: params.communityId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  const initialChannel = community?.channels[0];

  if (initialChannel?.name !== "general") {
    return null;
  }

  return redirect(
    `/community/${params?.communityId}/channels/${initialChannel?.id}`
  );
};

export default CommunityIdPage;
