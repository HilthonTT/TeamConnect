import { NavigationNavbar } from "@/components/navigation/navigation-navbar";
import { NavigationSideBar } from "@/components/navigation/navigation-sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex w-full h-[60px]">
        <NavigationNavbar />
      </div>
      <div className="flex flex-1">
        <div className="hidden md:flex h-full w-[72px] z-30">
          <NavigationSideBar />
        </div>
        <main className="md:pl-[72px] h-full">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
