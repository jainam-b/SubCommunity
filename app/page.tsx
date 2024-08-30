import Image from "next/image";
import {SpotlightPreview} from "../components/SpotlightPreview"
import { FloatingNavDemo } from "@/components/Navbar";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth"
import { signIn } from "next-auth/react";
async function getUser() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  return session;
}
export default async function Home() {

  const session = await getUser();
  return (
    <div>
      <FloatingNavDemo/>
      <div className="mt-5">

      <SpotlightPreview  />
      </div>
       
    </div>
  );
}
