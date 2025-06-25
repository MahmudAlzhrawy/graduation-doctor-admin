import UpdateDateForm from "@/components/Admin Doctor/Dates/UpdateSchdulingDateForm/UpdateSchdulingDateForm";

// ✅ Metadata (بـ JS)
export function generateMetadata() {
  return {
    title: "adminDoctorUpdateDate",
  };
}

// ✅ دالة الصفحة
export default function UpdateServiceForAdminDoctor({ searchParams }) {
  const rawDateId = searchParams?.dateId;

  const dateId = Array.isArray(rawDateId)
    ? parseInt(rawDateId[0])
    : parseInt(rawDateId ?? "0");

  return <UpdateDateForm dateId={dateId} />;
}
