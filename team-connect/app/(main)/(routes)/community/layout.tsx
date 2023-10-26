import { CommunitySidebar } from "@/components/community/community-sidebar";

const CommunityLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex">
      <div className="hidden md:flex h-full w-60 z-20 flex-col">
        <CommunitySidebar />
      </div>
      <main className="h-full w-full">{children}</main>
    </div>
  );
};

export default CommunityLayout;
