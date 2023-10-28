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
