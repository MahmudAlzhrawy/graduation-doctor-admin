import UpdateDateForm from "@/components/Admin Doctor/Dates/UpdateSchdulingDateForm/UpdateSchdulingDateForm";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "adminDoctorUpdateDate",
  };
}
type Props = {
  searchParams: {
    dateId: number;
  };
};

export default function updateServiceForAdminDoctor(props: Props) {
  return <UpdateDateForm dateId={props.searchParams.dateId} />;
}
