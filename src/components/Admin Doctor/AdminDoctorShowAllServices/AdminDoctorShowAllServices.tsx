"use client";
import { store } from "@/lib/store";
import { Service } from "@/utils/types";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

function AdminDoctorShowAllServices() {
  const [servicesWithDoctorAdminState, setServicesWithDoctorAdminState] =
    useState<Service[]>([]);
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
          const data = await firstResponse.json();
          const clinicId = data.clinicId;
          const secondResponse = await fetch(
            `https://citypulse.runasp.net/api/ClinicStaf/ShowAllMedicalServiceByClinicId?clinicid=${clinicId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json", // or other content types
                Authorization: `Bearer ${store.getState().auth.userToken}`, // Sending the token as a Bearer token
              },
            }
          );
          if (secondResponse.ok) {
            const data = await secondResponse.json();
            console.log(data);
            if (Array.isArray(data.$values) && data.$values.length > 0) {
              //
              const servicesWithDoctorAdmin: Service[] = data.$values.map(
                (service) => {
                  return {
                    id: service.id,
                    price: service.price,
                    serviceName: service.serviceName,
                    description: service.description,
                  };
                }
              );
              console.log(servicesWithDoctorAdmin);
              setServicesWithDoctorAdminState(servicesWithDoctorAdmin);
            }
          } else {
            toast.error("No services found !");
          }
        } else {
          toast.error("Error found !");
        }
      } catch (e) {
        console.log("Error", e);
      }
    }
    fetchData();
  }, []);
  function onDelete(serviceId: number) {
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
            `https://citypulse.runasp.net/api/ClinicStaf/DeleteService/${serviceId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${store.getState().auth.userToken}`, // Sending the token as a Bearer token
              },
            }
          );
          if (response.ok) {
            const filterData = servicesWithDoctorAdminState.filter(
              (service: Service) => service.id !== serviceId
            );
            setServicesWithDoctorAdminState(filterData);
            Swal.fire({
              title: "Deleted!",
              text: "Your service has been successfully deleted ✅",
              icon: "success",
              confirmButtonColor: "#2563EB",
            });
          } else {
            Swal.fire({
              title: "Failed!",
              text: "The service does not exist or does not belong to this clinic!",
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
  function onUpdate(serviceId: number) {
    window.location.assign(
      `/admin-doctor/update-service?serviceId=${serviceId}`
    );
  }
  return (
    <div
      className={"p-6 mx-auto bg-blue-50 md:w-[62%] pt-10 px-[1rem] h-max mb-5"}
    >
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold text-blue-600">Clinic Services</h1>
        <button
          onClick={() => {
            window.location.assign("/admin-doctor/create-service");
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow"
        >
          + Create Service
        </button>
      </div>

      <div className="space-y-4">
        {servicesWithDoctorAdminState.map((service: Service) => (
          <div
            key={service.id}
            className="bg-white shadow-md rounded-2xl p-4 border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {service.serviceName}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  {service.description}
                </p>
                <span className="text-sm font-medium text-blue-600">
                  Price: ${service.price}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onUpdate(service.id)}
                  className="p-2 rounded-full bg-yellow-400 hover:bg-yellow-500 text-white"
                  title="Update"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(service.id)}
                  className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDoctorShowAllServices;
