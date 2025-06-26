"use client";
import React from "react";
import { HiUser } from "react-icons/hi";
import { backendURL } from "@/lib/Slices/auth/authRules";
import { IoIosCheckmark } from "react-icons/io";
import { HiX } from "react-icons/hi";
type Props = {
  index: number;
  appointmentId: number;
  workingHourId: number;
  userId: number;
  clinicId: number;
  patientName: string;
  patientImage: string;
  patientBookingTime: string;
  bookingStatus: string;
  SendFromChild: (
    updatedBookingStatus: string,
    index: number,
    appointmentId: number,
    clinicId: number
  ) => void;
  SendFromChildForSecondOnce: (appointmentId: number, clinicId: number) => void;
};

export enum BookingStatus {
  Completed = "Completed",
  Pending = "Pending",
  Cancelled = "Cancelled",
}
const Booking = (props: Props) => {
  if (props.bookingStatus === BookingStatus.Pending)
    return (
      <div
        key={props.key}
        className="flex justify-between items-center h-20 pl-10 pr-5 hover:bg-gray-100"
      >
        <div className="flex flex-row gap-x-4">
          <div>
            {props.patientImage === "" ? (
              <HiUser className="h-16 w-16 text-blue-500 rounded-full cursor-pointer shadow-blue-300 shadow-lg hover:shadow-none transition-all duration-300 ease-in-out" />
            ) : (
              <img
                className="h-16 w-16 rounded-full cursor-pointer shadow-blue-300 shadow-lg hover:shadow-none transition-all duration-300 ease-in-out"
                src={props.patientImage}
                alt={props.patientName + " Image"}
              />
            )}
          </div>
          <span className="flex flex-col gap-y-2">
            <span className="text-2xl font-bold" style={{ wordSpacing: "2px" }}>
              {props.patientName}
            </span>
            <span className="text-xl text-gray-500">
              <span className="mr-1">Booking</span>
              <span className="mr-1">on</span>
              <span>{props.patientBookingTime}</span>
            </span>
          </span>
        </div>
        {props.bookingStatus === BookingStatus.Pending ? (
          <div className="bg-transparent flex flex-row justify-between items-center text-gray-300 w-24 h-full">
            <div
              className="flex justify-center items-center rounded-full w-10 h-10 border border-gray-100 bg-red-100 text-xl hover:text-2xl hover:cursor-pointer"
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
              className="flex justify-center items-center rounded-full w-10 h-10 border border-gray-100 bg-green-100 text-3xl hover:text-4xl hover:cursor-pointer"
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
    );
  else
    return (
      <div
        key={props.key}
        className="flex justify-between items-center h-20 pl-10 pr-5 hover:bg-gray-100"
        onClick={() => {
          props.SendFromChildForSecondOnce(props.appointmentId, props.clinicId);
        }}
      >
        <div className="flex flex-row gap-x-4">
          <div>
            {props.patientImage === "" ? (
              <HiUser className="h-16 w-16 text-blue-500 rounded-full cursor-pointer shadow-blue-300 shadow-lg hover:shadow-none transition-all duration-300 ease-in-out" />
            ) : (
              <img
                className="h-16 w-16 rounded-full cursor-pointer shadow-blue-300 shadow-lg hover:shadow-none transition-all duration-300 ease-in-out"
                src={props.patientImage}
                alt={props.patientName + " Image"}
              />
            )}
          </div>
          <span className="flex flex-col gap-y-2">
            <span className="text-2xl font-bold" style={{ wordSpacing: "2px" }}>
              {props.patientName}
            </span>
            <span className="text-xl text-gray-500">
              <span className="mr-1">Booking</span>
              <span className="mr-1">on</span>
              <span>{props.patientBookingTime}</span>
            </span>
          </span>
        </div>
        {props.bookingStatus === BookingStatus.Pending ? (
          <div className="bg-transparent flex flex-row justify-between items-center text-gray-300 w-24 h-full">
            <div
              className="flex justify-center items-center rounded-full w-10 h-10 border border-gray-100 bg-red-100 text-xl hover:text-2xl hover:cursor-pointer"
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
              className="flex justify-center items-center rounded-full w-10 h-10 border border-gray-100 bg-green-100 text-3xl hover:text-4xl hover:cursor-pointer"
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
    );
};

export default Booking;
