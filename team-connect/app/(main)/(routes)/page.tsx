import { initialProfile } from "@/lib/initial-profile";
import { redirectToSignIn } from "@clerk/nextjs";

import { redirect } from "next/navigation";

const MainPage = async () => {
  const profile = await initialProfile(true);

  if (!profile) {
    return redirectToSignIn();
  }

  return redirect("/community");
};

export default MainPage;
