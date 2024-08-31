"use client";
import SignupForm from "@/components/signup-form";

export default function Signup() {

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
