import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

import {
  Channel,
  Community,
  Conversation,
  Member,
  Profile,
} from "@prisma/client";

export type CommunityWithMembersWithProfiles = Community & {
  members: (Member & { profile: Profile })[];
};

export type CommunityWithMembersWithProfilesWithChannels =
  CommunityWithMembersWithProfiles & {
    channels: Channel[];
  };

export type ConversationWithProfiles = Conversation & {
  profileOne: Profile;
  profileTwo: Profile;
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};
