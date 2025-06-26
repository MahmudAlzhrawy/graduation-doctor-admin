// components/UpdateServiceForm.tsx
"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { store } from "@/lib/store";
import toast from "react-hot-toast";

type Props = {
  serviceId: number;
};

export default function UpdateServiceForm({ serviceId }: Props) {
  const formik = useFormik({
    initialValues: {
      id: 0,
      price: "",
      clinicId: 1,
      serviceName: "",
      description: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      price: Yup.number().min(1).required(),
      clinicId: Yup.number().required(),
      serviceName: Yup.string().required(),
      description: Yup.string().required(),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
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
            `https://citypulse.runasp.net/api/ClinicStaf/UpdateService/${serviceId}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json", // or other content types
                Authorization: `Bearer ${store.getState().auth.userToken}`, // Sending the token as a Bearer token
              },
              body: JSON.stringify({
                price: values.price,
                clinicId: clinicId,
                serviceName: values.serviceName,
                description: values.description,
              }),
            }
          );
          if (secondResponse.ok) {
            //const message = secondResponse;
            toast.success("Updated successfully");
            window.location.assign(
              "/admin-doctor/admin-doctor-medical-services"
            );
          } else {
            toast.error("Faild to update the service !");
          }
        } else {
          toast.error("Error found !");
        }
      } catch (e) {
        console.log("Error", e);
      }
      resetForm();
      window.location.assign("/admin-doctor/admin-doctor-medical-services");
    },
  });
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
              debugger;
              const updatedService = data.$values.find(
                (service) => Number(service.id) === Number(serviceId)
              );
              console.log(updatedService);
              if (updatedService) {
                formik.setValues({
                  id: serviceId,
                  price: updatedService.price,
                  clinicId: clinicId,
                  serviceName: updatedService.serviceName,
                  description: updatedService.description,
                });
              }
            }
          } else {
            toast.error("Error found !");
          }
        } else {
          toast.error("Error found !");
        }
      } catch (e) {
        console.log("Error", e);
      }
    }
    fetchData();
  }, [serviceId]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="border mb-6 p-6 mx-auto shadow-xl rounded-xl bg-blue-50 md:w-[62%] pt-10 px-[1rem] max-h-[1000px]"
    >
      <h2 className="text-xl font-semibold mb-3 text-yellow-700">
        Update Service
      </h2>

      <div className="mb-2">
        <input
          name="serviceName"
          placeholder="Service Name"
          value={formik.values.serviceName}
          onChange={formik.handleChange}
          className="w-full p-2 rounded border"
        />
        {formik.errors.serviceName && (
          <p className="text-red-500 text-sm">{formik.errors.serviceName}</p>
        )}
      </div>

      <div className="mb-2">
        <textarea
          name="description"
          placeholder="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          className="w-full p-2 rounded border"
        />
        {formik.errors.description && (
          <p className="text-red-500 text-sm">{formik.errors.description}</p>
        )}
      </div>

      <div className="mb-2">
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formik.values.price}
          onChange={formik.handleChange}
          className="w-full p-2 rounded border"
          step={100}
        />
        {formik.errors.price && (
          <p className="text-red-500 text-sm">{formik.errors.price}</p>
        )}
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
            window.location.assign(
              "/admin-doctor/admin-doctor-medical-services"
            );
          }}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
