import AdminDoctorProfile from "@/components/Admin Doctor/AdminDoctorProfile/AdminDoctorProfile";
import { Metadata } from "next";
import imageFile from "/assets/Admin_Doctor/download(4).jfif";
import { ApiError } from "next/dist/server/api-utils";
export function generateMetadata(): Metadata {
  return {
    title: "adminDoctorProfile",
  };
}
export default async function adminDoctorProfile() {
  return <AdminDoctorProfile />;
}
