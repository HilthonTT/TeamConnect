import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ChatProfileIdPageProps {
  params: {
    profileId: string;
  };
}

const ChatProfileIdPage = async ({ params }: ChatProfileIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const conversation = await getOrCreateConversation(
    profile?.id,
    params.profileId
  );

  if (!conversation) {
    return redirect("/chat");
  }

  const { profileOne, profileTwo } = conversation;

  const otherProfile = profileOne.id === profile?.id ? profileTwo : profileOne;

  return <div>Chat Profile Id Page - {otherProfile.username}</div>;
};

export default ChatProfileIdPage;
