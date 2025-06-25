import DoctorCommentsAdmin from "@/components/Admin Doctor/DoctorCommentsAdmin/DoctorCommentsAdmin";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "UserComments",
  };
}
export default function adminRecentOrders() {
  return <DoctorCommentsAdmin />;
}
