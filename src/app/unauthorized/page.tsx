import UnauthorizedPage from "@/components/UnauthorizedPage";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Unauthorized",
  };
};
export default function About() {
  return <UnauthorizedPage />;
}
