import AdminDoctorAppointments from "@/components/Admin Doctor/DoctorAppointments/DoctorAppointments";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "adminDoctorAppointments",
  };
}
export default function adminDashboard() {
  return <AdminDoctorAppointments />;
}
