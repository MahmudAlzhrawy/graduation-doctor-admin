import UpdateServiceForm from "@/components/Admin Doctor/AdminDoctorShowAllServices/UpdateServiceForm/UpdateServiceForm";

// ✅ Metadata
export function generateMetadata() {
  return {
    title: "adminDoctorUpdateService",
  };
}

// ✅ Page Component
export default function UpdateServiceForAdminDoctor({ searchParams }) {
  const rawServiceId = searchParams?.serviceId;
  const serviceId = Array.isArray(rawServiceId)
    ? parseInt(rawServiceId[0])
    : parseInt(rawServiceId ?? "0");

  return <UpdateServiceForm serviceId={serviceId} />;
}
