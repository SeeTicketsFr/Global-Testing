import { CalendarIcon, FileTextIcon, InputIcon } from "@radix-ui/react-icons";
import { Share2Icon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import Marquee from "@/components/magicui/marquee";
import { AnimatedBeamMultipleOutput } from "@/components/shared-components/Sidebar/AnimatedBeamMultipleOutput";
import { useTranslations } from "next-intl";

export function Grid() {
  const tHome = useTranslations('home.grid');

  const files = [
    {
      name: tHome("files.connection.title"),
      body: tHome("files.connection.description"),
    },
    {
      name: tHome("files.api.title"),
      body: tHome("files.api.description"),
    },
    {
      name: tHome("files.website.title"),
      body: tHome("files.website.description"),
    },
  ];

  const features = [
    {
      Icon: Share2Icon,
      name: tHome('features.scenarios.name'),
      description: tHome('features.scenarios.description'),
      href: "/",
      cta: tHome('features.scenarios.cta'),
      className: "col-span-3 lg:col-span-2",
      background: (
        <AnimatedBeamMultipleOutput className="absolute right-2 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
      ),
    },
    {
      Icon: InputIcon,
      name: tHome('features.variables.name'),
      description: tHome('features.variables.description'),
      href: "/",
      cta: tHome('features.variables.cta'),
      className: "col-span-3 lg:col-span-1",
      background: (
        <Command className="absolute right-10 top-10 w-[70%] origin-top translate-x-0 border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:-translate-x-10">
          <CommandInput placeholder="Import variable..." />
          <CommandList>
            <CommandEmpty>{tHome('features.variables.not_found')}</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>scenario:api_url</CommandItem>
              <CommandItem>steps[1]:user_id</CommandItem>
              <CommandItem>addition</CommandItem>
              <CommandItem>subtract</CommandItem>
              <CommandItem>...</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      ),
    },
    {
      Icon: CalendarIcon,
      name: tHome('features.cron.name'),
      description: tHome('features.cron.description'),
      className: "col-span-3 lg:col-span-1",
      href: "/",
      cta: tHome('features.cron.cta'),
      background: (
        <Calendar
          mode="single"
          selected={new Date(2022, 4, 11, 0, 0, 0)}
          className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
        />
      ),
    },
    {
      Icon: FileTextIcon,
      name: tHome('features.save.name'),
      description: tHome('features.save.description'),
      href: "/",
      cta: tHome('features.save.cta'),
      className: "col-span-3 lg:col-span-2",
      background: (
        <Marquee
          pauseOnHover
          className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
        >
          {files.map((f, idx) => (
            <figure
              key={idx}
              className={cn(
                "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
                "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
              )}
            >
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-col">
                  <figcaption className="text-sm font-medium dark:text-white ">
                    {f.name}
                  </figcaption>
                </div>
              </div>
              <blockquote className="mt-2 text-xs">{f.body}</blockquote>
            </figure>
          ))}
        </Marquee>
      ),
    },
  ];



  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}