"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/signin");
    }
  }, []);

  return (
    <div>
      <h1>Bem-vindo!</h1>
    </div>
  );
}