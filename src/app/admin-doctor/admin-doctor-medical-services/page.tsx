import AdminDoctorShowAllServices from "@/components/Admin Doctor/AdminDoctorShowAllServices/AdminDoctorShowAllServices";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "adminDoctorShowAllServices",
  };
}
export default function showAllServiceForAdminDoctor() {
  return <AdminDoctorShowAllServices />;
}
