import AdminDoctorDashboard from "@/components/Admin Doctor/AdminDoctorDashboard/AdminDoctorDashboard";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "adminDoctorDashboard",
  };
}
export default function adminDashboard() {
  return <AdminDoctorDashboard />;
}
