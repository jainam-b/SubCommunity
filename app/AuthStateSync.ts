"use client"
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./slices/auth/authSlice";

export const AuthStateSync = () => {
    const { data: session } = useSession();
    const dispatch = useDispatch();
  
    useEffect(() => {
      if (session) {
        dispatch(login(session.user)); // Log in the user
      } else {
        dispatch(logout()); // Log out the user
      }
    }, [session, dispatch]);
  
    return null; // This component doesn't need to render anything
  };