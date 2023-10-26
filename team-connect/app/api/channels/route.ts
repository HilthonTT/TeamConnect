import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { name, type } = await req.json();
    const { searchParams } = new URL(req.url);

    const communityId = searchParams.get("communityId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!communityId) {
      return new NextResponse("Community ID missing", { status: 400 });
    }

    if (name === "general") {
      return new NextResponse("Name cannot be 'general'", { status: 400 });
    }

    const community = await db.community.update({
      where: {
        id: communityId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name,
            type,
          },
        },
      },
    });

    return NextResponse.json(community);
  } catch (error) {
    console.log("[CHANNEL_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
