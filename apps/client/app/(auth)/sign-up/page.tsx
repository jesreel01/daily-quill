import type { Metadata } from "next";
import SignUpPage from "./sign-up-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your Daily Quill account and start your writing journey today.",
};

export default function Page() {
  return <SignUpPage />;
}