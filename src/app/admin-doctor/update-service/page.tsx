import UpdateServiceForm from "@/components/Admin Doctor/AdminDoctorShowAllServices/UpdateServiceForm/UpdateServiceForm";
import { Service } from "@/utils/types";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "adminDoctorUpdateService",
  };
}
type Props = {
  searchParams: {
    serviceId: number;
  };
};

export default function updateServiceForAdminDoctor(props: Props) {
  return <UpdateServiceForm serviceId={props.searchParams.serviceId} />;
}
