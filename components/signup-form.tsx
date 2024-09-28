"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/app/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { setUserInfo } from "@/app/slices/auth/authSlice";

export default function SignupForm() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    name: "",
    publishName: ""
  });
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Check for empty fields
    if (!userDetails.email || !userDetails.password || !userDetails.name || !userDetails.publishName) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await signIn("credentials", {
        email: userDetails.email,
        name: userDetails.name,
        password: userDetails.password,
        publishName: userDetails.publishName,
        redirect: false,
      });

      if (res?.ok) {
        dispatch(setUserInfo(userDetails));
        console.log("Successfully signed up!");
        router.push("/dashboard");
      } else {
        setError(res?.error || "Failed to sign up. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred during sign-up:", error);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserDetails(prev => ({ ...prev, [id]: value }));
  };
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };


  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white">
      <h2 className="font-bold text-xl text-neutral-800">
        Welcome to SubCommunity
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2">
        Please sign up for SubCommunity to create your account and connect with others!
      </p>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
          <div className="flex">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name">Username</Label>
          <Input
            id="name"
            value={userDetails.name}
            onChange={handleInputChange}
            placeholder="johndoe"
            type="text"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            value={userDetails.email}
            onChange={handleInputChange}
            placeholder="you@example.com"
            type="email"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            value={userDetails.password}
            onChange={handleInputChange}
            placeholder="••••••••"
            type="password"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <div className="flex items-center p-2">
            <span className="font-semibold">subcommunity.app/</span>
            <Input
              id="publishName"
              value={userDetails.publishName}
              onChange={handleInputChange}
              placeholder="yourname"
              type="text"
              className="border rounded-lg bg-slate-100 focus:ring-0 placeholder-font-semibold focus:outline-none pl-1"
            />
          </div>
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn bg-white dark:to-zinc-900 to-neutral-600 block w-full text-black border border-black rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-white rounded-md h-10 font-medium shadow-input bg-white-50 border border-black"
            type="button"
            onClick={() => signIn("github")}
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800" />
            <span className="text-neutral-700 text-sm">GitHub</span>
            <BottomGradient />
          </button>
          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-white-50 border border-black"
            type="button"
            onClick={handleGoogleSignIn}
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800" />
            <span className="text-neutral-700 text-sm">Google</span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

// BottomGradient and LabelInputContainer components remain unchanged

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-black to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-black to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};