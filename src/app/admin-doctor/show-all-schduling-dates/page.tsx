import AdminDoctorDates from "@/components/Admin Doctor/AdminDoctorShowAllSchdulingDates/ShowAllSchdulingDates";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "adminDoctorShowAllSchedulingDates",
  };
}
export default function adminDoctoShowAllSchedulingDates() {
  return <AdminDoctorDates />;
}
