"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { store } from "@/lib/store";
type Props = {
  dateId: number;
};
export default function UpdateDateForm(props: Props) {
  const [clinicID, setClinicID] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://citypulse.runasp.net/api/ClinicStaf/by-admin/${
            store.getState().auth.user?.id
          }`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store.getState().auth.userToken}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setClinicID(data.clinicId);
        }
      } catch (error) {
        console.log("Error", error);
      }
    }
    fetchData();
  }, []);

  // ⛔ Custom Yup validation for time logic
  const today = new Date().toISOString().split("T")[0];

  const formik = useFormik({
    initialValues: {
      workingDate: "",
      startTime: "",
      endTime: "",
      waitingHours: 1,
      status: true,
      maxAppointments: 15,
    },
    validationSchema: Yup.object().shape({
      workingDate: Yup.string()
        .required("Working date is required")
        .test("is-future", "Cannot select a past date", function (value) {
          if (!value) return false;
          const selected = new Date(value);
          const todayDate = new Date();
          todayDate.setHours(0, 0, 0, 0);
          return selected >= todayDate;
        }),
      startTime: Yup.string().required("Start time is required"),
      endTime: Yup.string()
        .required("End time is required")
        .test(
          "is-after-start",
          "End time must be after start time",
          function (value) {
            const { startTime, workingDate } = this.parent;
            if (!value || !startTime || !workingDate) return false;
            const start = new Date(`${workingDate}T${startTime}`);
            const end = new Date(`${workingDate}T${value}`);
            return end > start;
          }
        ),
      waitingHours: Yup.number()
        .min(0, "Cannot be negative")
        .required("Waiting hours required"),
      maxAppointments: Yup.number()
        .min(1, "At least 1 appointment")
        .required("Max appointments required"),
    }),
    onSubmit: async (values) => {
      const submissionData = {
        ...values,
        clinicId: clinicID,
        status: values.status ? "Available" : "Unavailable",
        appointmentCount: 0,
      };

      if (submissionData.clinicId < 1) {
        toast.error("You cannot make appointments now!");
        return;
      }

      const todayStr = new Date().toISOString().split("T")[0];
      if (submissionData.workingDate === todayStr) {
        const [sh, sm] = submissionData.startTime.split(":").map(Number);
        const now = new Date();
        const selectedStart = new Date(submissionData.workingDate);
        selectedStart.setHours(sh, sm, 0, 0);
        if (selectedStart < now) {
          toast.error("Start time must be in the future.");
          return;
        }
      }

      try {
        const res = await fetch(
          `https://citypulse.runasp.net/api/ClinicStaf/update-working-hour/${props.dateId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store.getState().auth.userToken}`,
            },
            body: JSON.stringify(submissionData),
          }
        );

        if (res.ok) {
          toast.success("Scheduling date created successfully!");
          window.location.assign("/admin-doctor/show-all-schduling-dates");
        } else {
          toast.error("Failed to create scheduling date.");
        }
      } catch (err) {
        console.error("Error submitting form:", err);
        toast.error("Something went wrong.");
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-4 p-6 bg-blue-50 rounded-lg shadow-md w-[90%] mx-auto"
    >
      <h2 className="text-xl font-semibold mb-3 text-yellow-700">
        Update Service
      </h2>
      {/* Working Date */}
      <div>
        <label className="block font-semibold">Working Date</label>
        <input
          type="date"
          name="workingDate"
          value={formik.values.workingDate}
          onChange={formik.handleChange}
          className="w-full border px-3 py-2 rounded"
          min={today}
        />
        {formik.touched.workingDate && formik.errors.workingDate && (
          <p className="text-red-600 text-sm">{formik.errors.workingDate}</p>
        )}
      </div>

      {/* Start Time */}
      <div>
        <label className="block font-semibold">Start Time</label>
        <input
          type="time"
          name="startTime"
          value={formik.values.startTime}
          onChange={formik.handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        {formik.touched.startTime && formik.errors.startTime && (
          <p className="text-red-600 text-sm">{formik.errors.startTime}</p>
        )}
      </div>

      {/* End Time */}
      <div>
        <label className="block font-semibold">End Time</label>
        <input
          type="time"
          name="endTime"
          value={formik.values.endTime}
          onChange={formik.handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        {formik.touched.endTime && formik.errors.endTime && (
          <p className="text-red-600 text-sm">{formik.errors.endTime}</p>
        )}
      </div>

      {/* Waiting Hours */}
      <div>
        <label className="block font-semibold">Waiting time (in hours)</label>
        <input
          type="number"
          name="waitingHours"
          value={formik.values.waitingHours}
          onChange={formik.handleChange}
          className="w-full border px-3 py-2 rounded"
          min={0}
        />
        {formik.touched.waitingHours && formik.errors.waitingHours && (
          <p className="text-red-600 text-sm">{formik.errors.waitingHours}</p>
        )}
      </div>

      {/* Max Appointments */}
      <div>
        <label className="block font-semibold">Max Appointments</label>
        <input
          type="number"
          name="maxAppointments"
          value={formik.values.maxAppointments}
          onChange={formik.handleChange}
          className="w-full border px-3 py-2 rounded"
          min={1}
        />
        {formik.touched.maxAppointments && formik.errors.maxAppointments && (
          <p className="text-red-600 text-sm">
            {formik.errors.maxAppointments}
          </p>
        )}
      </div>

      {/* Status */}
      <div>
        <label className="block font-semibold">Status (Available)</label>
        <input
          type="checkbox"
          name="status"
          checked={formik.values.status}
          onChange={formik.handleChange}
          className="ml-2"
        />
      </div>

      <div className="flex space-x-3 mt-4">
        <button
          type="submit"
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
        >
          Update
        </button>
        <button
          type="button"
          onClick={() => {
            window.location.assign("/admin-doctor/show-all-schduling-dates");
          }}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
