"use client"

import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  return (
    <div>
      {JSON.stringify(session.data?.user)}
      <button onClick={()=>signOut()} >Logout</button>
    </div>
  );
}
