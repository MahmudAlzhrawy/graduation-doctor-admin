"use client";
import React from "react";
import { backendURL } from "@/lib/Slices/auth/authRules";
import { IoIosCheckmark } from "react-icons/io";
import { HiX } from "react-icons/hi";
import { FaEdit, FaTrash } from "react-icons/fa";

type Props = {
  index: number;
  key: string;
  dateId: string;
  clinicId: number;
  dateTime: string;
  StartTime: string;
  EndTime: string;
  WaitingHours: string;
  Status: string;
  AppointmentsCount: string;
  MaxAppointments: string;
  OnUpdate: (dateId: number) => void;
  OnDelete: (dateId: number) => void;
};

/*

     <div className="pl-5 pr-5 h-16 flex flex-row gap-x-10 justify-between items-center font-sans font-bold border-b border-gray-200 text-gray-700 text-xl">
              <div className="bg-transparent w-1/4 h-full flex flex-row justify-between items-center">
                <h3>#</h3>
                <h3 className="mr-[30%] space-x-2">WorkingDate (workingDay)</h3>
              </div>
              <div className="bg-transparent w-[40%] h-full flex flex-row justify-between items-center">
                <h3>StartTime</h3>
                <h3>EndTime</h3>
                <h3 className="mr-[20%]" style={{ wordSpacing: "1.5px" }}>
                  waitingHours
                </h3>
                <h3 className="mr-[20%]" style={{ wordSpacing: "1.5px" }}>
                  Status
                </h3>
              </div>
              <div className="bg-transparent w-1/4 h-full flex flex-row justify-between items-center">
                <h3>AppointmentsCount</h3>
                <h3 className="mr-6">MaxAppointments</h3>
              </div>
            </div>
*/
const AllBookingDateInforamtion = (props: Props) => {
  return (
    <div
      key={props.key}
      className="pl-5 pr-5 flex justify-between items-center h-40 hover:bg-gray-100 font-sans font-normal  text-gray-400 text-lg border-b border-gray-100"
    >
      <div className="bg-transparent w-[25%] h-full flex flex-row gap-x-5 items-center">
        <h3>{props.index + 1}</h3>
        <h3 className="space-x-2">{props.dateTime}</h3>
      </div>
      <div className="bg-transparent w-[50%] h-full flex flex-row gap-x-10 items-center">
        <h3 className="space-x-1">{props.StartTime}</h3>
        <h3 className="space-x-1">{props.EndTime}</h3>
        <h3 className="ml-4">{props.WaitingHours}</h3>
        <h3 className="ml-16" style={{ wordSpacing: "1.5px" }}>
          {props.Status}
        </h3>
      </div>
      <div className="bg-transparent w-[25%] h-full flex flex-row justify-between items-center">
        <h3 className="ml-5">{props.AppointmentsCount}</h3>
        <h3 style={{ wordSpacing: "1.5px" }}>{props.MaxAppointments}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => props.OnUpdate(parseInt(props.dateId))}
            className="p-2 rounded-full bg-yellow-400 hover:bg-yellow-500 text-white"
            title="Update"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => props.OnDelete(parseInt(props.dateId))}
            className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllBookingDateInforamtion;
