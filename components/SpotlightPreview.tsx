"use client"
import { cn } from "../app/lib/utils";
import { Spotlight } from "./ui/spotlight";
import Button from "./Button";

import { useRouter } from 'next/navigation'

export function SpotlightPreview() {
  const router=useRouter();
 
  return (
    <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Launch your paid <br /> community in seconds
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          Automatic member invites, subscription payments and forms. Connect
          your Discord, WhatsApp or Slack. copy.
        </p>
        <div className="flex justify-center items-center mt-5 ">
          <button onClick={()=>router.push("/dashboard")} className="px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 mx-3">
            Get started free
          </button>
          <Button/>
        </div>
      </div>
    </div>
  );
}
