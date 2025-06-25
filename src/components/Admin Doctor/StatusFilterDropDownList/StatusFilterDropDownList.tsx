"use client";

import { useState } from "react";
import { AppointmentWithDoctorAdmin } from "../AdminDoctorDashboard/AdminDoctorDashboard";

type BookingStatusType = "Pending" | "Completed" | "Cancelled";

interface Props {
  data: AppointmentWithDoctorAdmin[];
  setFilteredAppointments: React.Dispatch<
    React.SetStateAction<AppointmentWithDoctorAdmin[]>
  >;
}

const StatusFilterDropdown: React.FC<Props> = (props: Props) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    setSelectedStatus(status);

    if (status === "All") {
      props.setFilteredAppointments(props.data);
    } else {
      const filtered = props.data.filter(
        (appointment) => appointment.status === status
      );
      props.setFilteredAppointments(filtered);
      console.log(filtered);
    }
  };

  return (
    <div className="mt-12 mb-4 font-sans">
      <label className="font-bold block text-4xl  text-black mb-4">
        Filter by Status
      </label>
      <select
        value={selectedStatus}
        onChange={handleChange}
        className="bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </select>
    </div>
  );
};

export default StatusFilterDropdown;
