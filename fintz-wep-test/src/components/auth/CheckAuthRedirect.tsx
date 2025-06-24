// src/components/auth/CheckAuthRedirect.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function CheckAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.replace("/home");
    } else {
      router.replace("/signin");
    }
  }, []);

  return null;
}