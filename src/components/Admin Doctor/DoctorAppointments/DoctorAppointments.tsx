"use client";
import React, { useEffect, useState } from "react";
import "../../Admin Doctor/AdminDoctorDashboard/AdminDoctorDashboard.css";
import { FaSackDollar } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosPerson } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { MdOutlineDateRange } from "react-icons/md";
import Booking from "../Booking/Booking";
import AllBookingAppointmentInforamtion from "../Booking/AllBookingAppointmentInforamtion";
import toast from "react-hot-toast";
import { store } from "@/lib/store";
interface AppointmentWithDoctorAdmin {
  appointmentId: number;
  workingHourId: number;
  userId: number;
  clinicId: number;
  totalPrice: number;
  status: string;
  patientName: string;
  patientAddress: string;
  appointmentDetails: AppointmentDetailsModel[];
}
interface AppointmentDetailsModel {
  subTotalPrice: number;
  servicesId: number;
}

interface PatientInterface {
  id: number;
  Name: string;
  Image: string;
  BookingStatus: string;
  Payment: string;
  Age: number;
  Date_and_Time: string;
  Fees: number;
}
const Patients: PatientInterface[] = [
  {
    id: 1,
    Name: "Ahmed",
    Image: "/assets/Admin_Doctor/download(1).jfif",
    BookingStatus: "Pending",
    Payment: "CASH",
    Age: 31,
    Date_and_Time: "5 Oct 2024, 12:00 PM",
    Fees: 50,
  },
  {
    id: 2,
    Name: "Mohamed",
    Image: "/assets/Admin_Doctor/download(2).jfif",
    BookingStatus: "Cancelled",
    Payment: "CASH",
    Age: 31,
    Date_and_Time: "5 Oct 2024, 12:00 PM",
    Fees: 50,
  },
  {
    id: 3,
    Name: "Ammar",
    Image: "/assets/Admin_Doctor/download(3).jfif",
    BookingStatus: "Completed",
    Payment: "CASH",
    Age: 31,
    Date_and_Time: "5 Oct 2024, 12:00 PM",
    Fees: 50,
  },
  {
    id: 4,
    Name: "Rashed",
    Image: "/assets/Admin_Doctor/download(4).jfif",
    BookingStatus: "Completed",
    Payment: "CASH",
    Age: 31,
    Date_and_Time: "5 Oct 2024, 12:00 PM",
    Fees: 50,
  },
];
const todayDate = new Date();

function AdminDoctorAppointments() {
  const [
    appointmentsWithDoctorAdminState,
    setAppointmentsWithDoctorAdminState,
  ] = useState<AppointmentWithDoctorAdmin[]>([]);
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
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          const AppointmentsWithDoctorAdmin: AppointmentWithDoctorAdmin[] =
            data.$values.map((appoitmentDetails) => {
              return {
                appointmentId: appoitmentDetails.appointmentId,
                workingHourId: appoitmentDetails.appointmentId,
                userId: appoitmentDetails.userId,
                clinicId: appoitmentDetails.clinicId,
                totalPrice: appoitmentDetails.totalPrice,
                status: appoitmentDetails.status,
                patientName: appoitmentDetails.patientName,
                patientAddress: appoitmentDetails.patientAddress,
                appointmentDetails:
                  appoitmentDetails.appointmentDetails.$values.map(
                    (appointment) => {
                      return {
                        subTotalPrice: appointment.subTotalPrice,
                        servicesId: appointment.servicesId,
                      };
                    }
                  ),
              };
            });
          console.log(AppointmentsWithDoctorAdmin);
          setAppointmentsWithDoctorAdminState(AppointmentsWithDoctorAdmin);
        }
      } catch (e) {
        console.log("Error", e);
      }
    }
    fetchData();
  }, []);

  async function SendFromChild(
    updatedBookingStatus: string,
    index: number,
    appointmentId: number,
    clinicId: number
  ) {
    try {
      const response = await fetch(
        `https://citypulse.runasp.net/api/ClinicStaf/update-status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.getState().auth.userToken}`, // Sending the token as a Bearer token
          },
          body: JSON.stringify({
            appointmentId: appointmentId,
            clinicId: clinicId,
            newStatus: updatedBookingStatus,
          }),
        }
      );
      if (!response.ok) {
        toast.error(
          "The reservation does not exist or does not belong to this doctor!"
        );
      } else {
        const updatedAppointmentsWithDoctorAdminState = [
          ...appointmentsWithDoctorAdminState,
        ];
        updatedAppointmentsWithDoctorAdminState[index] = {
          ...updatedAppointmentsWithDoctorAdminState[index],
          status: updatedBookingStatus,
        };
        setAppointmentsWithDoctorAdminState(
          updatedAppointmentsWithDoctorAdminState
        );
        toast.success(
          "Your reservation status has been updated successfully ✅"
        );
      }
    } catch (exception) {
      console.log(exception);
    }
  }

  return (
    <main style={{ width: "68%" }} className="h-max mb-5">
      <h1
        className="font-sans font-bold text-5xl mb-5"
        style={{ wordSpacing: "1px" }}
      >
        All Appointments
      </h1>

      <div className="date">
        <span>
          {(todayDate.getMonth() + 1).toString().length === 1
            ? "0" + (todayDate.getMonth() + 1).toString()
            : (todayDate.getMonth() + 1).toString()}
        </span>
        <span>/</span>
        <span>
          {todayDate.getDate().toString().length === 1
            ? "0" + todayDate.getDate().toString()
            : todayDate.getDate().toString()}
        </span>
        <span>/</span>
        <span>{todayDate.getFullYear()}</span>
        <MdOutlineDateRange className="ml-4 font-sans text-2xl" />
      </div>
      {appointmentsWithDoctorAdminState.length > 0 ? (
        <>
          {" "}
          {/*START BOOKING SECTION */}
          <section className="bg-white rounded-md shadow-2xl shadow-gray-500 transition-all duration-300 ease-in-out mt-10">
            <h2 className="pl-5 pr-5 h-16 flex flex-row gap-x-10 justify-between items-center font-sans font-bold border-b border-gray-200 text-gray-700 text-xl">
              <div className="bg-transparent w-1/4 h-full flex flex-row justify-between items-center">
                <h3>#</h3>
                <h3 className="mr-[30%]">Patient</h3>
              </div>
              <div className="bg-transparent w-[40%] h-full flex flex-row justify-between items-center">
                <h3>Payment</h3>
                <h3>Address</h3>
                <h3 className="mr-[20%]" style={{ wordSpacing: "1.5px" }}>
                  Date & Time
                </h3>
              </div>
              <div className="bg-transparent w-1/4 h-full flex flex-row justify-between items-center">
                <h3>Fees</h3>
                <h3 className="mr-6">Action</h3>
              </div>
            </h2>
            <div className="mb-10 flex flex-col gap-y-4">
              {appointmentsWithDoctorAdminState.map(function (
                appointment,
                index
              ) {
                return (
                  <AllBookingAppointmentInforamtion
                    index={index}
                    key={appointment.appointmentId.toString()}
                    appointmentId={appointment.appointmentId}
                    userId={appointment.userId}
                    clinicId={appointment.clinicId}
                    patientName={appointment.patientName}
                    patientImage={""}
                    patientBookingTime={todayDate.toDateString()}
                    bookingStatus={appointment.status}
                    Payment={"CASH"}
                    Address={appointment.patientAddress}
                    Date_and_Time={"5 Oct 2024, 12:00 PM"}
                    Fees={appointment.totalPrice}
                    SendFromChild={SendFromChild}
                  />
                );
              })}
            </div>
          </section>
          {/*END BOOKING SECTION */}
        </>
      ) : (
        <div className="bg-red-300 flex justify-center items-center font-sans font-bold text-black text-4xl h-96 space-x-4 mt-20 rounded-full border border-gray-100">
          No Appointments
        </div>
      )}
    </main>
  );
}

export default AdminDoctorAppointments;
