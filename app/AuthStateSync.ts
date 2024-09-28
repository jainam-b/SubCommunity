"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Session } from "next-auth";
import { setUserInfo, logOut } from "./slices/auth/authSlice";

export const AuthStateSync = () => {
    const { data: session }: { data: Session | null } = useSession();
    const dispatch = useDispatch();

    useEffect(() => {
        if (session?.user) {
            dispatch(setUserInfo({
                email: session.user.email ?? '',
                name: session.user.name ?? '',
                publishName: session.user.publishName ?? '',
            }));
        } else {
            dispatch(logOut());
        }
    }, [session, dispatch]);

    return null;
};