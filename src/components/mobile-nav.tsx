"use client";

import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

import { Button, buttonVariants } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { ThemeToggle } from "./theme-toggle";

export function MobileDropdown() {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 hamburger space-x-2 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Icons.menu className={cn("h-6 w-6", isOpen && "open")} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-40 mt-2 h-[calc(100vh-4rem)] w-screen bg-background animate-none rounded-none border-none transition-transform md:hidden">
        <div className="border-t pt-4 flex items-center gap-1">
          <RouterLink
            to={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({
                size: "sm",
                variant: "ghost",
              })
            )}
          >
            <Icons.gitHub className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </RouterLink>
          <ThemeToggle />
        </div>
      </PopoverContent>
    </Popover>
  );
}
