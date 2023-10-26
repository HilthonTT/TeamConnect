import { initialProfile } from "@/lib/initial-profile";
import { redirectToSignIn } from "@clerk/nextjs";

const MainPage = async () => {
  const profile = await initialProfile(true);

  if (!profile) {
    return redirectToSignIn();
  }

  return <div></div>;
};

export default MainPage;
