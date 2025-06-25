"use client";

import { store } from "@/lib/store";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CreateAppointmentForm() {
  const [clinicID, setClinicID] = useState<number>(0);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://citypulse.runasp.net/api/ClinicStaf/GetAppointmentsByAdminId/${
            store.getState().auth.user?.id
          }`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json", // or other content types
              Authorization: `Bearer ${store.getState().auth.userToken}`, // Sending the token as a Bearer token
            },
          }
        );
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          if (Array.isArray(data.$values) && data.$values.length > 0) {
            setClinicID(data.$values[0].clinicId);
          }
        }
      } catch (e) {
        console.log("Error", e);
      }
    }
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    workingDate: "",
    startTime: "",
    endTime: "",
    waitingHours: 1,
    status: "Available",
    appointmentCount: 0,
    maxAppointments: 15,
    clinicId: 1,
  });

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value, type } = e.target;

  const isCheckbox = type === "checkbox";
  const checkedValue = isCheckbox
    ? (e.target as HTMLInputElement).checked
      ? "Available"
      : "Unavailable"
    : value;

  setFormData((prev) => ({
    ...prev,
    [name]: ["clinicId", "waitingHours", "appointmentCount", "maxAppointments"].includes(name)
      ? Number(checkedValue)
      : checkedValue,
  }));
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const todayFirst = new Date();
    todayFirst.setHours(0, 0, 0, 0);
    const now = new Date();
    const selectedWorkingDate = new Date(formData.workingDate);
    selectedWorkingDate.setHours(0, 0, 0, 0);
    if (selectedWorkingDate < todayFirst) {
      toast.error("You cannot select a past date for scheduling.");
      return;
    }

    // If working date is today, validate start time
    if (formData.workingDate >= new Date().toISOString().split("T")[0]) {
      const [hours, minutes] = formData.startTime.split(":").map(Number);
      const selectedTime = new Date(formData.workingDate);
      selectedTime.setHours(hours, minutes, 0, 0);

      if (selectedTime < now) {
        alert("Start time must be in the future.");
        return;
      }
    }

    // Inside handleSubmit:
    if (
      formData.workingDate >= new Date().toISOString().split("T")[0] &&
      formData.startTime &&
      formData.endTime
    ) {
      const [startH, startM] = formData.startTime.split(":").map(Number);
      const [endH, endM] = formData.endTime.split(":").map(Number);

      const startDate = new Date(formData.workingDate);
      const endDate = new Date(formData.workingDate);

      startDate.setHours(startH, startM, 0, 0);
      endDate.setHours(endH, endM, 0, 0);

      if (endDate <= startDate) {
        alert("End time must be after start time.");
        return;
      }

      // Optional: If workingDate is today, prevent past endTime
      if (formData.workingDate === new Date().toISOString().split("T")[0]) {
        const now = new Date();
        if (endDate < now) {
          alert("End time must be in the future.");
          return;
        }
      }
    }

    try {
      console.log(formData);
      const submissionData = {
        ...formData,
        clinicId: clinicID,
      };
      if (submissionData.clinicId < 1) {
        alert("You cannot make appointments, now!!");
      }
      console.log(submissionData);
      const response = await fetch(
        "https://citypulse.runasp.net/api/ClinicStaf/AddNewDate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.getState().auth.userToken}`, // token must be a valid JWT
          },
          body: JSON.stringify(submissionData),
        }
      );

      const data = response;
      if (response.ok) {
        alert("Appointment created successfully!");
        console.log(data);
        window.location.assign("/admin-doctor/scheduling_the_days_of_the_week");
      } else {
        alert("Failed to create appointment");
        console.error(data);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-blue-50 rounded-lg shadow-md w-[90%] mx-auto"
    >
      <div>
        <label className="block font-semibold">Working Date</label>
        <input
          type="date"
          name="workingDate"
          value={formData.workingDate}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
          min={new Date().toISOString().split("T")[0]}
        />
      </div>

      <div>
        <label className="block font-semibold">Start Time</label>
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
          min={
            formData.workingDate === new Date().toISOString().split("T")[0]
              ? new Date().toTimeString().slice(0, 5)
              : undefined
          }
        />
      </div>

      <div>
        <label className="block font-semibold">End Time</label>
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
          min={formData.startTime}
        />
      </div>

      <div>
        <label className="block font-semibold">Waiting time (in hours)</label>
        <input
          type="number"
          name="waitingHours"
          value={formData.waitingHours}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          min={0}
          step={1}
        />
      </div>

      <div>
        <label className="block font-semibold">Max Appointments</label>
        <input
          type="number"
          name="maxAppointments"
          value={formData.maxAppointments}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          min={1}
          step={1}
        />
      </div>

      <div>
        <label className="block font-semibold">Status (Available)</label>
        <input
          type="checkbox"
          name="status"
          checked={formData.status === "Available"}
          onChange={handleChange}
          className="ml-2"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
      >
        Create Appointment
      </button>
    </form>
  );
}
