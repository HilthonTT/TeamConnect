"use client";

import { Shield } from "lucide-react";

import { useRouter } from "next/navigation";
import { NavigationSearch } from "@/components/navigation/navigation-search";

export const NavigationNavbar = () => {
  const router = useRouter();

  const loadHomePage = () => {
    router.push("/");
  };

  return (
    <div className="flex h-full text-zinc-400 w-full dark:bg-[#0d0d0d] bg-[#E3E5E8] py-3">
      <div className="flex items-center justify-start">
        <div className="h-[72px] w-[72px] text-zinc-400 flex justify-center items-center">
          <Shield
            onClick={loadHomePage}
            className="h-12 w-12 hover:text-indigo-400 
              dark:hover:text-indigo-500 hover:cursor-pointer transition 
            text-zinc-600 dark:text-zinc-200"
          />
        </div>
      </div>
      <div className="ml-auto mr-auto">
        <NavigationSearch data={[]} />
      </div>
    </div>
  );
};
