import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const initialProfile = async (checkIntegrity = false) => {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!profile) {
    const newProfile = await db.profile.create({
      data: {
        userId: user.id,
        username: user.username || "",
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    return newProfile;
  }

  if (!checkIntegrity) {
    return profile;
  }

  let isDirty = false;

  if (profile.username !== user.username) {
    isDirty = true;
    profile.username = user.username as string;
  }

  if (profile.email !== user.emailAddresses[0].emailAddress) {
    isDirty = true;
    profile.email = user.emailAddresses[0].emailAddress;
  }

  if (profile.imageUrl !== user.imageUrl) {
    isDirty = true;
    profile.imageUrl = user.imageUrl;
  }

  if (isDirty) {
    const updatedProfile = await db.profile.update({
      where: {
        userId: user.id,
      },
      data: {
        ...profile,
      },
    });

    return updatedProfile;
  }

  return profile;
};
