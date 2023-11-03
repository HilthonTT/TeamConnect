import { v4 as uuidv4 } from "uuid";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { CommunityWithMembersWithProfiles } from "@/types";

const COMMUNITY_BATCH = 25;

export async function GET(req: Request) {
  try {
    const profile = await currentProfile();

    const { searchParams } = new URL(req.url);

    const cursor = searchParams.get("cursor");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let communities: CommunityWithMembersWithProfiles[] = [];

    if (cursor) {
      communities = await db.community.findMany({
        take: COMMUNITY_BATCH,
        cursor: {
          id: cursor,
        },
        include: {
          members: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          members: {
            _count: "asc",
          },
        },
      });
    } else {
      communities = await db.community.findMany({
        take: COMMUNITY_BATCH,
        include: {
          members: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          members: {
            _count: "asc",
          },
        },
      });
    }

    let nextCursor = null;

    if (communities?.length === COMMUNITY_BATCH) {
      nextCursor = communities[COMMUNITY_BATCH - 1].id;
    }

    return NextResponse.json({
      items: communities,
      nextCursor,
    });
  } catch (error) {
    console.log("[COMMUNITY_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const community = await db.community.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [
            {
              name: "general",
              profileId: profile.id,
            },
          ],
        },
        members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    });

    return NextResponse.json(community);
  } catch (error) {
    console.log("[COMMUNITY_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
