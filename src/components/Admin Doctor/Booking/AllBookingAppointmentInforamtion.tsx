"use client";
import React from "react";
import { HiUser } from "react-icons/hi";
import { backendURL } from "@/lib/Slices/auth/authRules";
import { IoIosCheckmark } from "react-icons/io";
import { HiX } from "react-icons/hi";
type Props = {
  index: number;
  key: string;
  appointmentId: number;
  userId: number;
  clinicId: number;
  patientImage: string;
  patientName: string;
  patientBookingTime: string;
  bookingStatus: string;
  Payment: string;
  Address: string;
  Date_and_Time: string;
  Fees: number;
  SendFromChild: (
    updatedBookingStatus: string,
    index: number,
    appointmentId: number,
    clinicId: number
  ) => void;
};
enum BookingStatus {
  Completed = "Completed",
  Pending = "Pending",
  Cancelled = "Cancelled",
}
/*

 <h2 className="pl-5 pr-5 h-16 flex flex-row gap-x-10 justify-between items-center font-sans font-bold border-b border-gray-200 text-gray-700 text-xl">
          <div className="bg-rose-300 w-1/4 h-full flex flex-row justify-between items-center">
            <h3>#</h3>
            <h3 className="mr-[30%]">Patient</h3>
          </div>
          <div className="bg-blue-300 w-[40%] h-full flex flex-row justify-between items-center">
            <h3>Payment</h3>
            <h3>Age</h3>
            <h3 className="mr-[20%]" style={{ wordSpacing: "1.5px" }}>
              Date & Time
            </h3>
          </div>
          <div className="bg-gray-300 w-1/4 h-full flex flex-row justify-between items-center">
            <h3>Fees</h3>
            <h3>Action</h3>
          </div>
        </h2>
*/
const AllBookingAppointmentInforamtion = (props: Props) => {
  return (
    <div
      key={props.key}
      className="pl-5 pr-5 flex justify-between items-center h-40 hover:bg-gray-100 font-sans font-normal  text-gray-400 text-lg border-b border-gray-100"
    >
      <div className="bg-transparent w-1/4 h-full flex flex-row gap-x-[45%] items-center">
        <h3>{props.index + 1}</h3>
        <h3 className="flex flex-row gap-x-2">
          {props.patientImage === "" ? (
            <HiUser className="h-16 w-16 text-blue-500 rounded-full cursor-pointer shadow-blue-300 shadow-lg hover:shadow-none transition-all duration-300 ease-in-out" />
          ) : (
            <img
              className="h-16 w-16 rounded-full cursor-pointer shadow-blue-300 shadow-lg hover:shadow-none transition-all duration-300 ease-in-out"
              src={props.patientImage}
              alt={props.patientName + " Image"}
            />
          )}
          <span
            className="h-16 flex justify-center items-center"
            style={{ wordSpacing: "2px" }}
          >
            {props.patientName}
          </span>
        </h3>
      </div>
      <div className="bg-transparent w-[40%] h-full flex flex-row justify-between items-center">
        <h3 className="flex justify-center items-center">
          <span className="w-20 h-10 rounded-3xl border border-gray-400 flex justify-center items-center">
            {props.Payment}
          </span>
        </h3>
        <h3 className="mr-1">{props.Address}</h3>
        <h3 className="mr-[10%]" style={{ wordSpacing: "1.5px" }}>
          {props.Date_and_Time}
        </h3>
      </div>
      <div className="bg-transparent w-1/4 h-full flex flex-row justify-between items-center">
        <h3 style={{ wordSpacing: "1.5px" }}>${props.Fees.toString()}</h3>
        {props.bookingStatus === BookingStatus.Pending ? (
          <div className="bg-transparent flex flex-row justify-between items-center text-red-200 w-24 h-full">
            <div
              className="flex justify-center items-center rounded-full w-10 h-10 border border-gray-50 bg-red-100 text-xl hover:text-2xl hover:cursor-pointer"
              onClick={() => {
                props.SendFromChild(
                  BookingStatus.Cancelled,
                  props.index,
                  props.appointmentId,
                  props.clinicId
                );
              }}
            >
              <HiX />
            </div>
            <div
              className="flex justify-center items-center rounded-full w-10 h-10 border border-green-300 bg-green-100 text-green-400 text-3xl hover:text-4xl hover:cursor-pointer"
              onClick={() => {
                props.SendFromChild(
                  BookingStatus.Completed,
                  props.index,
                  props.appointmentId,
                  props.clinicId
                );
              }}
            >
              <IoIosCheckmark />
            </div>
          </div>
        ) : (
          <span
            className="font-sans font-semibold text-xl"
            style={
              props.bookingStatus === BookingStatus.Completed
                ? { color: "#1cea4c" }
                : props.bookingStatus === BookingStatus.Cancelled
                ? { color: "#ef0909" }
                : {}
            }
          >
            {props.bookingStatus}
          </span>
        )}
      </div>
    </div>
  );
};

export default AllBookingAppointmentInforamtion;
