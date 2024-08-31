"use client";
import SignupForm from "@/components/signup-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function () {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-center items-center flex-col h-screen">
        <div className="flex justify-center">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
