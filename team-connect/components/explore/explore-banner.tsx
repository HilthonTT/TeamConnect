"use client";

import * as z from "zod";
import qs from "query-string";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

const formSchema = z.object({
  keywords: z.string().min(1, {
    message: "Search keywords are required.",
  }),
});

export const ExploreBanner = () => {
  const router = useRouter();
  const pathName = usePathname();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keywords: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const url = qs.stringifyUrl({
      url: pathName || "",
      query: {
        keywords: values.keywords,
      },
    });

    form.reset();
    router.push(url);
  };

  return (
    <div className="relative h-64 overflow-hidden">
      <img
        className="w-full h-full object-cover"
        src="/images/banner.jpg"
        alt="Banner Image"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold w-full">
        <div className="relative w-80">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="pr-10 bg-white text-black w-full border-none"
                        placeholder="Explore Communities"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <button type="submit" disabled={isLoading}>
                  <Search
                    size={24}
                    className="text-black dark:text-zinc-500 cursor-pointer"
                  />
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
