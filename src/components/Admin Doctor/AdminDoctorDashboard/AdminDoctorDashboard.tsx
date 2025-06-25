"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../../../components/Admin Doctor/AdminDoctorDashboard/AdminDoctorDashboard.css";
import { FaSackDollar } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosPerson } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { MdOutlineDateRange } from "react-icons/md";
import Booking, { BookingStatus } from "../Booking/Booking";
import toast from "react-hot-toast";
import StatusFilterDropdown from "../StatusFilterDropDownList/StatusFilterDropDownList";
import { store } from "@/lib/store";

export interface AppointmentWithDoctorAdmin {
  appointmentId: number;
  workingHourId: number;
  userId: number;
  clinicId: number;
  totalPrice: number;
  status: string;
  patientName: string;
  patientAddress: string;
  appointmentDetails: {
    $values: AppointmentDetailsModel[];
  };
}
interface AppointmentDetailsModel {
  subTotalPrice: number;
  servicesId: number;
}

const todayDate = new Date();

function AdminDashboard() {
  const [totalProfits, setTotalProfits] = useState<number>(0);
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
          const Appointmentsdata = await response.json();
          console.log(Appointmentsdata);
          if (
            Array.isArray(Appointmentsdata.$values) &&
            Appointmentsdata.$values.length > 0
          ) {
            const AppointmentsWithDoctorAdmin: AppointmentWithDoctorAdmin[] =
              Appointmentsdata.$values.map((appoitmentDetails:AppointmentWithDoctorAdmin) => {
                return {
                  appointmentId: appoitmentDetails.appointmentId,
                  workingHourId: appoitmentDetails.workingHourId,
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
        } else {
          toast.error("No appointments found !");
        }
      } catch (e) {
        console.log("Error", e);
      }
    }
    fetchData();
  }, []);
  const [totalAppointments, settotalAppointments] = useState<number>(0);
  const [totalPatients, settotalPatients] = useState<number>(0);
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
  function SendFromChildToDelete(appointmentId: number, clinicId: number) {
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
            `https://citypulse.runasp.net/api/ClinicStaf/DeleteAppointment?AppointmentId=${appointmentId}&clinicId=${clinicId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${store.getState().auth.userToken}`, // Sending the token as a Bearer token
              },
            }
          );
          if (response.ok) {
            const filterData = appointmentsWithDoctorAdminState.filter(
              (appointment) => appointment.appointmentId !== appointmentId
            );
            setAppointmentsWithDoctorAdminState(filterData);
            Swal.fire({
              title: "Deleted!",
              text: "Your reservation has been successfully deleted ✅",
              icon: "success",
              confirmButtonColor: "#2563EB",
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
    });
  }
  useEffect(() => {
    // const totalProfitsInterval = setInterval(() => {
    //   const increase = Math.ceil(1000 / 100);
    //   setTotalProfits((prevtotalProfits) => {
    //     const newTotalPrfoits = prevtotalProfits + increase;
    //     return newTotalPrfoits >
    //       appointmentsWithDoctorAdminState.reduce((sum, appointment) => {
    //         return sum + appointment.totalPrice;
    //       }, 0)
    //       ? appointmentsWithDoctorAdminState.reduce((sum, appointment) => {
    //           return sum + appointment.totalPrice;
    //         }, 0)
    //       : newTotalPrfoits;
    //   });
    // }, 300);
    // return () => clearInterval(totalProfitsInterval);
    setTotalProfits(
      appointmentsWithDoctorAdminState.reduce((sum, appointment) => {
        if (appointment.status === BookingStatus.Completed) {
          return sum + appointment.totalPrice;
        }
        return sum;
      }, 0)
    );
  }, [totalProfits, appointmentsWithDoctorAdminState]);
  useEffect(() => {
    const totalAppointmentsInterval = setInterval(() => {
      const increase = Math.ceil(5 / 100);
      settotalAppointments((prevtotalAppointments) => {
        const newtotalAppointments = prevtotalAppointments + increase;
        return newtotalAppointments > appointmentsWithDoctorAdminState.length
          ? appointmentsWithDoctorAdminState.length
          : newtotalAppointments;
      });
    }, 300);
    return () => clearInterval(totalAppointmentsInterval);
  }, [totalAppointments, appointmentsWithDoctorAdminState]);
  useEffect(() => {
    const totalPatientsInterval = setInterval(() => {
      const increase = Math.ceil(100 / 1000);
      settotalPatients((prevTotalPatients) => {
        const newTotalPatients = prevTotalPatients + increase;
        return newTotalPatients > appointmentsWithDoctorAdminState.length
          ? appointmentsWithDoctorAdminState.length
          : newTotalPatients;
      });
    }, 300);
    return () => clearInterval(totalPatientsInterval);
  }, [totalPatients, appointmentsWithDoctorAdminState]);
  const [filteredAppointments, setFilteredAppointments] = useState<
    AppointmentWithDoctorAdmin[]
  >(appointmentsWithDoctorAdminState);
  useEffect(() => {
    setFilteredAppointments(appointmentsWithDoctorAdminState);
  }, [appointmentsWithDoctorAdminState]);
  useEffect(() => {}, [filteredAppointments]);
  return (
    <main style={{ marginBottom: "20px", height: "max-content" }}>
      <h1 className="font-sans font-bold text-5xl">Dashboard</h1>

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
      {/* START INSIGHTS SECION */}
      <div className="insights">
        {/*START SALES SECTION*/}
        <div className="sales transition-all hover:animate-tadaing-hand hover:cursor-pointer">
          {/* <MdAnalytics className="icon" /> */}
          <div className="icon-container">
            <FaSackDollar className="icon" />
          </div>
          <div className="middle">
            <div className="left">
              {/*formating Number */}
              <h1 className="">
                {"$" + new Intl.NumberFormat().format(totalProfits)}
              </h1>
              <h3>Earnings</h3>
            </div>
          </div>
        </div>
        {/*END EXPENSES SECTION*/}
        {/*START SALES SECTION*/}
        <div className="expenses transition-all hover:animate-tadaing-hand hover:cursor-pointer">
          <div className="icon-container">
            <FaCalendarAlt className="icon" />
          </div>
          <div className="middle">
            <div className="left">
              {/*formating Number */}
              <h1>{new Intl.NumberFormat().format(totalAppointments)}</h1>
              <h3>Appointments</h3>
            </div>
          </div>
        </div>
        {/*END EXPENSES SECTION*/}
        {/*START INCOME SECTION*/}
        <div className="income transition-all hover:animate-tadaing-hand hover:cursor-pointer">
          <div className="icon-container">
            <IoIosPerson className="icon" />
          </div>
          <div className="middle">
            <div className="left">
              {/*formating Number */}
              <h1>{new Intl.NumberFormat().format(totalPatients)}</h1>
              <h3>Patients</h3>
            </div>
          </div>
        </div>
        {/*END INCOME SECTION*/}
      </div>
      {/* END INSIGHTS SECION */}
      {appointmentsWithDoctorAdminState.length > 0 ? (
        <>
          {" "}
          <StatusFilterDropdown
            data={appointmentsWithDoctorAdminState} // always pass original data
            setFilteredAppointments={setFilteredAppointments}
          />
          {/*START BOOKING SECTION */}
          <section className="bg-white rounded-md shadow-2xl shadow-gray-500 transition-all duration-300 ease-in-out mt-10">
            <h2 className="pl-5 h-16 flex flex-row gap-x-4 items-center font-sans font-bold border-b border-gray-200">
              <SlCalender className="text-indigo-500 text-xl" />
              <span
                className="text-black text-2xl"
                style={{ wordSpacing: "3px" }}
              >
                latest Booking
              </span>
            </h2>
            {filteredAppointments.length > 0 ? (
              <div className="mt-20 mb-20 flex flex-col gap-y-4">
                {filteredAppointments.map(function (appointment, index) {
                  return (
                    <Booking
                      index={index}
                      key={appointment.appointmentId.toString()}
                      appointmentId={appointment.appointmentId}
                      workingHourId={appointment.workingHourId}
                      userId={appointment.userId}
                      clinicId={appointment.clinicId}
                      patientName={appointment.patientName}
                      patientImage={""}
                      patientBookingTime={todayDate.toDateString()}
                      bookingStatus={appointment.status}
                      SendFromChild={SendFromChild}
                      SendFromChildForSecondOnce={SendFromChildToDelete}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="bg-red-300 flex justify-center items-center font-sans font-bold text-black text-4xl h-96 space-x-4 mt-20 rounded-full border border-gray-100">
                No Appointments with this filter
              </div>
            )}
            <div className="mt-20 mb-20 flex flex-col gap-y-4">
              {filteredAppointments.map(function (appointment, index) {
                return (
                  <Booking
                    index={index}
                    key={appointment.appointmentId.toString()}
                    appointmentId={appointment.appointmentId}
                    workingHourId={appointment.workingHourId}
                    userId={appointment.userId}
                    clinicId={appointment.clinicId}
                    patientName={appointment.patientName}
                    patientImage={""}
                    patientBookingTime={todayDate.toDateString()}
                    bookingStatus={appointment.status}
                    SendFromChild={SendFromChild}
                    SendFromChildForSecondOnce={SendFromChildToDelete}
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

export default AdminDashboard;
