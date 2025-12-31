import type { Metadata } from "next";
import SignInPage from "./sign-in-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Daily Quill account and continue your writing streak.",
};

export default function Page() {
  return <SignInPage />;
}