import AdminDoctorProfile from "@/components/Admin Doctor/AdminDoctorProfile/AdminDoctorProfile";
import { Metadata } from "next";
export function generateMetadata(): Metadata {
  return {
    title: "adminDoctorProfile",
  };
}
export default async function adminDoctorProfile() {
  return <AdminDoctorProfile />;
}
