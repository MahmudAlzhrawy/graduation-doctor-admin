"use client";
import React, { useEffect, useState } from "react";
import "../../Admin Doctor/AdminDoctorDashboard/AdminDoctorDashboard.css";

import { MdOutlineDateRange } from "react-icons/md";
import Swal from "sweetalert2";
import { store } from "@/lib/store";
import AllBookingDateInforamtion from "../Dates/AllBookingDatesInformation";
interface DateWithDoctorAdmin {
  id: number;
  workingDate: string;
  workingDay: string;
  startTime: string;
  endTime: string;
  waitingHours: number;
  status: string;
  appointmentCount: number;
  maxAppointments: number;
  clinicId: number;
}

const todayDate = new Date();

function AdminDoctorDates() {
  const [datesWithDoctorAdminState, setDatesWithDoctorAdminState] = useState<
    DateWithDoctorAdmin[]
  >([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const firstResponse = await fetch(
          `https://citypulse.runasp.net/api/ClinicStaf/by-admin/${
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
        if (firstResponse.ok) {
          const AllAdminDoctorInformation = await firstResponse.json();
          const secondResponse = await fetch(
            `https://citypulse.runasp.net/api/ClinicStaf/ShowAllDatesByClinicId?clinicid=${AllAdminDoctorInformation.clinicId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json", // or other content types
                Authorization: `Bearer ${store.getState().auth.userToken}`, // Sending the token as a Bearer token
              },
            }
          );
          const DatesData = await secondResponse.json();
          /*
           id: number;
  workingDate: string;
  workingDay: string;
  startTime: string;
  endTime: string;
  waitingHours: number;
  status: string;
  appointmentCount: number;
  maxAppointments: number;
          */
          const DatesWithDoctorAdmin: DateWithDoctorAdmin[] =
            DatesData.$values.map((dateDetails) => {
              return {
                id: dateDetails.id,
                workingDate: dateDetails.workingDate,
                workingDay: dateDetails.workingDay,
                startTime: dateDetails.startTime,
                endTime: dateDetails.endTime,
                waitingHours: dateDetails.waitingHours,
                status: dateDetails.status,
                appointmentCount: dateDetails.appointmentCount,
                maxAppointments: dateDetails.maxAppointments,
                clinicId: dateDetails.clinicId,
              };
            });
          console.log(DatesWithDoctorAdmin);
          setDatesWithDoctorAdminState(DatesWithDoctorAdmin);
        }
      } catch (e) {
        console.log("Error", e);
      }
    }
    fetchData();
  }, []);

  // async function SendFromChild(
  //   updatedBookingStatus: string,
  //   index: number,
  //   appointmentId: number,
  //   clinicId: number
  // ) {
  //   try {
  //     const response = await fetch(
  //       `https://citypulse.runasp.net/api/ClinicStaf/update-status`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${store.getState().auth.userToken}`, // Sending the token as a Bearer token
  //         },
  //         body: JSON.stringify({
  //           appointmentId: appointmentId,
  //           clinicId: clinicId,
  //           newStatus: updatedBookingStatus,
  //         }),
  //       }
  //     );
  //     if (!response.ok) {
  //       toast.error(
  //         "The reservation does not exist or does not belong to this doctor!"
  //       );
  //     } else {
  //      const updatedAppointmentsWithDoctorAdminState = [
  //         ...datesWithDoctorAdminState,
  //       ];

  //       updatedAppointmentsWithDoctorAdminState[index] = {
  //         ...updatedAppointmentsWithDoctorAdminState[index],
  //         status: updatedBookingStatus,
  //       };
  //      setDatesWithDoctorAdminState(updatedAppointmentsWithDoctorAdminState);

  //       toast.success(
  //         "Your reservation status has been updated successfully ✅"
  //       );
  //     }
  //   } catch (exception) {
  //     console.log(exception);
  //   }
  // }

  function OnUpdate(dateId: number) {
    window.location.assign(
      `/admin-doctor/update-scheduling-date?dateId=${dateId}`
    );
  }
  function OnDelete(dateId: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563EB",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://citypulse.runasp.net/api/ClinicStaf/delete-working-hour/${dateId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${store.getState().auth.userToken}`, // Sending the token as a Bearer token
              },
            }
          );
          if (response.ok) {
            const filterData = datesWithDoctorAdminState.filter(
              (date: DateWithDoctorAdmin) => date.id !== dateId
            );
            setDatesWithDoctorAdminState(filterData);
            Swal.fire({
              title: "Deleted!",
              text: "Your schduling date has been successfully deleted ✅",
              icon: "success",
              confirmButtonColor: "#2563EB",
            });
          } else {
            Swal.fire({
              title: "Failed!",
              text: "The schduling date does not exist or does not belong to this clinic!",
              icon: "error",
              confirmButtonColor: "#2563EB",
            });
          }
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
  return (
    <main style={{ width: "68%" }}>
      <h1
        className="font-sans font-bold text-5xl mb-5"
        style={{ wordSpacing: "1px" }}
      >
        All Dates
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
      {datesWithDoctorAdminState.length > 0 ? (
        <>
          {" "}
          {/*START BOOKING SECTION */}
          <section className="bg-white rounded-md shadow-2xl shadow-gray-500 transition-all duration-300 ease-in-out mt-10 h-max mb-5">
            <div className="pl-5 pr-5 h-16 flex flex-row gap-x-3 items-center font-sans font-bold border-b border-gray-200 text-gray-700 text-xl">
              <div className="bg-transparent w-[25%] h-full flex flex-row gap-x-5 items-center">
                <h3>#</h3>
                <h3 className="mr-[10%] space-x-2">WorkingDate (workingDay)</h3>
              </div>
              <div className="bg-transparent w-[50%] h-full flex flex-row gap-x-14 items-center">
                <h3 className="flex flex-col gap-y-1">
                  <span>Start</span>
                  <span>Time</span>
                </h3>
                <h3 className="flex flex-col gap-y-1">
                  <span>End</span>
                  <span>Time</span>
                </h3>
                <h3 className="flex flex-col gap-y-1">
                  <span>Waiting</span>
                  <span>Hours</span>
                </h3>
                <h3 className="">Status</h3>
              </div>
              <div className="bg-transparent w-[25%] h-full flex flex-row gap-x-4 items-center">
                <h3 className="flex flex-col gap-y-1">
                  <span>Appoint...</span>
                  <span>Counts</span>
                </h3>
                <h3 className="flex flex-col gap-y-1">
                  <span>Max</span>
                  <span>Appoint...</span>
                </h3>
              </div>
            </div>
            <div className="mb-10 flex flex-col gap-y-4">
              {datesWithDoctorAdminState.map(function (date, index) {
                return (
                  <AllBookingDateInforamtion
                    index={index}
                    key={date.id.toString()}
                    dateId={date.id.toString()}
                    clinicId={date.clinicId}
                    dateTime={
                      date.workingDate + " " + "(" + date.workingDay + ")"
                    }
                    StartTime={date.startTime}
                    EndTime={date.endTime}
                    WaitingHours={date.waitingHours.toString()}
                    Status={date.status}
                    AppointmentsCount={date.appointmentCount.toString()}
                    MaxAppointments={date.maxAppointments.toString()}
                    OnUpdate={OnUpdate}
                    OnDelete={OnDelete}
                  />
                );
              })}
            </div>
          </section>
          {/*END BOOKING SECTION */}
        </>
      ) : (
        <div className="bg-red-300 flex justify-center items-center font-sans font-bold text-black text-4xl h-96 space-x-4 mt-20 rounded-full border border-gray-100">
          No Dates
        </div>
      )}
    </main>
  );
}

export default AdminDoctorDates;
