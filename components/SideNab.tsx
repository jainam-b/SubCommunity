"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/app/lib/utils";
import { useSession } from "next-auth/react";

import DesignContent from "./Dashboard/DesignContent";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";
export function SidebarDemo() {
  const { publishName } = useSelector((state: RootState) => state.auth);
  const handlePreviewClick = () => {
    if (publishName) {
      window.open(`https://sub-community.vercel.app/${publishName}`, '_blank');
    } else {
      console.error('Publish name is not available');
      // You might want to show an error message to the user here
    }
  };

  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("Design");
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Design",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Connections",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700  h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Pricing",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700  h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Users",
      href: "#",
      icon: <IconSettings className="text-neutral-700 h-5 w-5 flex-shrink-0" />,
    },
  ];

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 d w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-y-auto scrollbar-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default link behavior
                    setActiveTab(link.label); // Update the active tab state
                  }}
                />
              ))}
            </div>
          </div>
          <div>
            <div>
              <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-lg mb-4 w-4/5 border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white  transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50" onClick={handlePreviewClick}>
                Preview
              </button>
            </div>
            <SidebarLink
              link={{
                label: session?.user?.name || "User",
                href: "#",
                icon: (
                  <Image
                    src={session?.user?.image || ""}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      {/* Data is showing based on tabs  */}
      <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white flex flex-col gap-2 flex-1 w-full h-full">
          {activeTab === "Design" && <DesignContent />}
          {activeTab === "Connections" && <ConnectionsContent />}
          {activeTab === "Pricing" && <PricingContent />}
          {activeTab === "Users" && <Users />}
        </div>
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        // initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black  whitespace-pre"
      >
        SubCommunity
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black  rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// const DesignContent = () => <div>Design Content</div>;
const ConnectionsContent = () => <div>Connections Content</div>;
const PricingContent = () => <div>Pricing Content</div>;
const Users = () => <div>Analytics Content</div>;

export const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full"></div>
    </div>
  );
};
