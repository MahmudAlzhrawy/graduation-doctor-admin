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
import Swal from "sweetalert2";
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
  async function SendFromChildForSecondTime(appointmentId: number) {
    try {
      const APPOINTMENT = "Appointment";
      const firstResponse = await fetch(
        `https://citypulse.runasp.net/api/User/GetTransaction?ReferenceId=${appointmentId}&type=${APPOINTMENT}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.getState().auth.userToken}`, // Sending the token as a Bearer token
          },
        }
      );
      if (firstResponse.ok) {
        const userTransaction = await firstResponse.json();
        console.log(userTransaction);
        Swal.fire({
          title: `<strong>🧾 Transaction Details</strong>`,
          html: `
    <div style="text-align: left; font-size: 15px; line-height: 1.6;">
      <p><b>🆔 Transaction ID:</b> ${userTransaction.transactionId}</p>
      <p><b>👤 User ID:</b> ${userTransaction.userId}</p>
      <p><b>📅 Date:</b> ${new Date(
        userTransaction.transactionDate
      ).toLocaleString()}</p>
      <p><b>💵 Amount:</b> $${userTransaction.amount}</p>
      <p><b>💳 Payment Method:</b> ${userTransaction.paymentMethod}</p>
      <p><b>🔁 Type:</b> ${userTransaction.transactionType}</p>
      <p><b>📌 Status:</b> <span style="${
        userTransaction.status === "Completed"
          ? "color: green;"
          : userTransaction.status === "Pending"
          ? "color: orange;"
          : "color: red;"
      }"><b>${userTransaction.status}</b></span></p>
      <p><b>🔗 Reference ID:</b> ${userTransaction.referenceId}</p>
    </div>
  `,
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#2563EB",
          cancelButtonColor: "#d33",
          confirmButtonText: "Edit",
          cancelButtonText: "Cancel",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              Swal.fire({
                title: `<strong>✏️ Edit Transaction Status</strong>`,
                html: `
              <select id="statusDropdown" style="
                width: 100%;
                padding: 10px 12px;
                font-size: 15px;
                border: 1px solid #ccc;
                border-radius: 6px;
                background-color: #f9f9f9;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                transition: border-color 0.2s ease-in-out;
                " 
                class="swal2-input"
              >
                <option value="Completed">Completed</option>
                <option value="Refused">Refused</option>
                <option value="Pending">Pending</option>
              </select>
            `,
                preConfirm: () => {
                  const selected = (
                    document.getElementById(
                      "statusDropdown"
                    ) as HTMLSelectElement
                  )?.value;
                  if (!selected) {
                    Swal.showValidationMessage("You must choose a status");
                  }
                  return selected;
                },
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#2563EB",
                cancelButtonColor: "#d33",
                confirmButtonText: "Update",
                cancelButtonText: "Cancel",
              }).then(async (result) => {
                if (result.isConfirmed) {
                  const selectedStatus = result.value;
                  const secondResponse = await fetch(
                    `https://citypulse.runasp.net/api/User/UpdateTransactionStatus?transactionId=${userTransaction.transactionId}&newStatus=${selectedStatus}`,
                    {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${
                          store.getState().auth.userToken
                        }`, // Sending the token as a Bearer token
                      },
                    }
                  );
                  if (secondResponse.ok) {
                    const returnedValue = await secondResponse.json();
                    console.log(returnedValue);
                    Swal.fire({
                      title: "Success!",
                      text: "Transaction status updated successfully ✅",
                      icon: "success",
                      confirmButtonColor: "#2563EB",
                    });
                  } else {
                    Swal.fire({
                      title: "Failed!",
                      text: "Update failed!",
                      icon: "error",
                      confirmButtonColor: "#2563EB",
                    });
                  }
                }
              });
            } catch (e) {
              console.log(e);
            }
          }
        });
      } else {
        Swal.fire({
          title: "Failed!",
          text: "The reservation does not exist or does not belong to this clinic!",
          icon: "error",
          confirmButtonColor: "#2563EB",
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <main style={{ width: "78%" }} className="h-max mb-5">
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
            <div className="pl-5 pr-5 h-16 flex flex-row gap-x-10 justify-between items-center font-sans font-bold border-b border-gray-200 text-gray-700 text-xl">
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
                <h3>Transaction</h3>
              </div>
            </div>
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
                    transactionStatus={"salem"}
                    Payment={"CASH"}
                    Address={appointment.patientAddress}
                    Date_and_Time={"5 Oct 2024, 12:00 PM"}
                    Fees={appointment.totalPrice}
                    SendFromChild={SendFromChild}
                    SendFromChildForSecondTime={SendFromChildForSecondTime}
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
