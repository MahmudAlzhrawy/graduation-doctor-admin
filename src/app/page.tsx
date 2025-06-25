import Login from "@/components/Login";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "login",
  };
}
export default function LoginPage() {
  return <Login />;
}
