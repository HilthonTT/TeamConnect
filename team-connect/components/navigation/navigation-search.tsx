"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface NavigationSearchProps {
  data: {
    label: string;
    type: "profile" | "community";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

export const NavigationSearch = ({ data }: NavigationSearchProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();
  const params = useParams();

  const onClick = ({
    id,
    type,
  }: {
    id: string;
    type: "profile" | "community";
  }) => {
    setOpen(false);

    if (type === "community") {
      return router.push(`/community/${id}`);
    }

    if (type === "profile") {
      return router.push(`/chat/${id}`);
    }
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="bg-[#cac4c4] text-zinc-900 dark:bg-[#333333] dark:text-zinc-300 md:w-[500px] w-[350px]">
          Search for people by name or email...
          <kbd
            className="pointer-events-none inline-flex h-5 select-none items-center 
            gap-1 rounded border bg-muted px-1.5 font-mono text-[10px]
            font-medium text-muted-foreground ml-auto">
            <span className="text-xs">CTRL</span>K
          </kbd>
          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 md:w-[500px] w-[350px]">
        <Command>
          <CommandInput placeholder="Search for people by name or email..." />
          <CommandEmpty>No Results Found</CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data?.length) {
              return null;
            }
            return (
              <CommandGroup key={label} heading={label}>
                {data?.map(({ id, icon, name }) => {
                  return (
                    <CommandItem
                      key={id}
                      onSelect={() => onClick({ id, type })}>
                      {icon} <span>{name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </Command>
      </PopoverContent>
    </Popover>
  );
};
