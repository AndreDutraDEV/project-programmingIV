"use client";
import React, { useState } from "react";
import { loginUseCase } from "@/services/authService";
import { useRouter } from "next/navigation";
import SignInForm from "@/components/auth/SignInForm";

export default function SignInFormContainer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = await loginUseCase.execute(email, password);
      localStorage.setItem("token", token);
      router.push("/home");
    } catch {
      alert("Email ou senha inválidos.");
    }
  };

  return (
    <SignInForm
      email={email}
      password={password}
      showPassword={showPassword}
      onEmailChange={(e) => setEmail(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
      onToggleShowPassword={() => setShowPassword((prev) => !prev)}
      onSubmit={handleSubmit}
    />
  );
}