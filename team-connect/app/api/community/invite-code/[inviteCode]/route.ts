import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { inviteCode: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.inviteCode) {
      return new NextResponse("Invite Code missing", { status: 400 });
    }

    const existingCommunity = await db.community.findFirst({
      where: {
        inviteCode: params.inviteCode,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
    });

    if (existingCommunity) {
      return NextResponse.json(existingCommunity);
    }

    const community = await db.community.update({
      where: {
        inviteCode: params.inviteCode,
      },
      data: {
        members: {
          create: [
            {
              profileId: profile.id,
            },
          ],
        },
      },
    });

    return NextResponse.json(community);
  } catch (error) {
    console.log("COMMUNITY_INVITE_CODE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
