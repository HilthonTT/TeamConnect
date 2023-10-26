import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";

const Community = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  return <div></div>;
};

export default Community;
