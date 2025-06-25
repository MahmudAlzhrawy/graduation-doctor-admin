import CreateServiceForm from "@/components/Admin Doctor/AdminDoctorShowAllServices/CreateServiceForm/CreateServiceForm";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "adminDoctorCreateService",
  };
}
export default function createServiceForAdminDoctor() {
  return <CreateServiceForm />;
}
