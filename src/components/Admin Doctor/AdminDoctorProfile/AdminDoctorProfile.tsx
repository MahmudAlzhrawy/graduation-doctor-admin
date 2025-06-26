"use client";
import "./AdminDoctorProfile.css";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
type Props = {};
enum toggleEditSaveButtonEnum {
  Edit = "Edit",
  Save = "Save",
}
enum toggleappointment_feeForShowOrForEditEnum {
  Edit = "Edit",
  Show = "Show",
}
enum toggleaddressForShowOrForEditEnum {
  Edit = "Edit",
  Show = "Show",
}
enum toggleaboutForShowOrForEditEnum {
  Edit = "Edit",
  Show = "Show",
}
enum togglenameForShowOrForEditEnum {
  Edit = "Edit",
  Show = "Show",
}
const AdminDoctorProfile = (props: Props) => {
  const [toggleEditSaveButton, setToggleEditSaveButton] = useState<
    toggleEditSaveButtonEnum.Edit | toggleEditSaveButtonEnum.Save
  >(toggleEditSaveButtonEnum.Edit);
  const [togglenameForShowOrForEdit, setTogglenameForShowOrForEdit] = useState<
    togglenameForShowOrForEditEnum.Edit | togglenameForShowOrForEditEnum.Show
  >(togglenameForShowOrForEditEnum.Show);
  const name_span = useRef<HTMLSpanElement>(null);
  const name_input = useRef<HTMLInputElement>(null);
  const [
    toggleappointment_feeForShowOrForEdit,
    setToggleappointment_feeForShowOrForEdit,
  ] = useState<
    | toggleappointment_feeForShowOrForEditEnum.Edit
    | toggleappointment_feeForShowOrForEditEnum.Show
  >(toggleappointment_feeForShowOrForEditEnum.Show);
  const appointment_fee_span = useRef<HTMLSpanElement>(null);
  const appointment_fee_input = useRef<HTMLInputElement>(null);
  const [toggleaddressForShowOrForEdit, setToggleaddressForShowOrForEdit] =
    useState<
      | toggleaddressForShowOrForEditEnum.Edit
      | toggleaddressForShowOrForEditEnum.Show
    >(toggleaddressForShowOrForEditEnum.Show);
  const address_span = useRef<HTMLSpanElement>(null);
  const address_input = useRef<HTMLTextAreaElement>(null);
  const [toggleaboutForShowOrForEdit, setToggleaboutForShowOrForEdit] =
    useState<
      | toggleaboutForShowOrForEditEnum.Edit
      | toggleaboutForShowOrForEditEnum.Show
    >(toggleaboutForShowOrForEditEnum.Show);
  const about_paragraph = useRef<HTMLParagraphElement>(null);
  const about_input = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (togglenameForShowOrForEdit === togglenameForShowOrForEditEnum.Edit) {
      if (name_span.current && name_input.current) {
        const text = name_span.current.textContent;
        name_input.current.value = text ? text : "";
      }
    } else if (
      togglenameForShowOrForEdit === togglenameForShowOrForEditEnum.Show
    ) {
      if (name_span.current && name_input.current) {
        const text = formik.values.name;
        name_span.current.innerText = text;
      }
    }
  }, [toggleaddressForShowOrForEdit]);
  useEffect(() => {
    if (
      toggleappointment_feeForShowOrForEdit ===
      toggleappointment_feeForShowOrForEditEnum.Edit
    ) {
      if (appointment_fee_span.current && appointment_fee_input.current) {
        const text = appointment_fee_span.current.textContent;
        appointment_fee_input.current.value = text ? text : "";
      }
    } else if (
      toggleappointment_feeForShowOrForEdit ===
      toggleappointment_feeForShowOrForEditEnum.Show
    ) {
      if (appointment_fee_span.current && appointment_fee_input.current) {
        const text = formik.values.appointment_fee.toString();
        appointment_fee_span.current.innerText = text;
      }
    }
  }, [toggleappointment_feeForShowOrForEdit]);
  useEffect(() => {
    if (
      toggleaddressForShowOrForEdit === toggleaddressForShowOrForEditEnum.Edit
    ) {
      if (address_span.current && address_input.current) {
        const text = address_span.current.textContent;
        address_input.current.value = text ? text : "";
      }
    } else if (
      toggleaddressForShowOrForEdit === toggleaddressForShowOrForEditEnum.Show
    ) {
      if (address_span.current && address_input.current) {
        const text = formik.values.address;
        address_span.current.innerText = text;
      }
    }
  }, [toggleaddressForShowOrForEdit]);
  useEffect(() => {
    if (toggleaboutForShowOrForEdit === toggleaboutForShowOrForEditEnum.Edit) {
      if (about_paragraph.current && about_input.current) {
        const text = about_paragraph.current.textContent;
        about_input.current.value = text ? text : "";
      }
    } else if (
      toggleaboutForShowOrForEdit === toggleaboutForShowOrForEditEnum.Show
    ) {
      if (about_paragraph.current && about_input.current) {
        const text = formik.values.about;
        about_paragraph.current.innerText = text;
      }
    }
  }, [toggleaddressForShowOrForEdit]);
  const formik = useFormik({
    initialValues: {
      name: "Richard James",
      specialties: [],
      years_of_experience: 4,
      about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.`,
      appointment_fee: 50,
      address: "24 main streeet",
      available: false,
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("nameU", values.name);
      formData.append("userName", values.userName);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("confirmPassword", values.confirmPassword);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("address", values.address);
    },
  });

  return (
    <div className="w-[85%] pt-12 pl-7 bg-gray-50 flex flex-col gap-y-5">
      <div className="bg-indigo-100 flex justify-center items-center rounded-md w-72 h-72">
        <img
          className="w-full h-full rounded-md"
          alt="DoctorImage"
          src={"/assets/Admin_Doctor/download (6).jfif"}
        />
      </div>
      <div className="mt-10 w-[60%] h-[530px] bg-white rounded-md font-sans pt-10 px-7">
        <h2
          className="font-bold text-black text-4xl mb-5 flex flex-row items-center"
          style={{ wordSpacing: "2px" }}
        >
          Dr.{" "}
          {togglenameForShowOrForEdit ===
          togglenameForShowOrForEditEnum.Show ? (
            <span
              ref={name_span}
              onClick={() => {
                if (toggleEditSaveButton === toggleEditSaveButtonEnum.Save) {
                  setTogglenameForShowOrForEdit(
                    togglenameForShowOrForEditEnum.Edit
                  );
                }
              }}
            >
              {formik.values.name}
            </span>
          ) : (
            <input
              ref={name_input}
              id="name"
              name="name"
              className="name_input"
              value={formik.values.name}
              onChange={formik.handleChange}
              onMouseLeave={() => {
                console.log("salem");
                if (toggleEditSaveButton === toggleEditSaveButtonEnum.Save) {
                  setTogglenameForShowOrForEdit(
                    togglenameForShowOrForEditEnum.Show
                  );
                }
              }}
            />
          )}
          <span></span>
        </h2>
        <h5 className="font-bold text-gray-500 text-sm mb-5 flex flex-row gap-x-5">
          <span style={{ wordSpacing: "0.25px" }}>
            MBBS - General physician
          </span>
          <span
            className="font-semibold border border-gray-500 rounded-xl px-2"
            style={{ wordSpacing: "0.5px" }}
          >
            4 Years
          </span>
        </h5>
        <h3
          className="font-bold text-black text-lg mb-5"
          style={{ wordSpacing: "1px" }}
        >
          About :
        </h3>
        {toggleaboutForShowOrForEdit ===
        toggleaboutForShowOrForEditEnum.Show ? (
          <p
            className="font-semibold text-gray-600 text-sm mb-10"
            ref={about_paragraph}
            onClick={() => {
              if (toggleEditSaveButton === toggleEditSaveButtonEnum.Save) {
                setToggleaboutForShowOrForEdit(
                  toggleaboutForShowOrForEditEnum.Edit
                );
              }
            }}
          >
            {formik.values.about}
          </p>
        ) : (
          <textarea
            ref={about_input}
            rows={3}
            id="about"
            name="about"
            className="about_input"
            value={formik.values.about}
            onChange={formik.handleChange}
            onMouseLeave={() => {
              console.log("salem");
              if (toggleEditSaveButton === toggleEditSaveButtonEnum.Save) {
                setToggleaboutForShowOrForEdit(
                  toggleaboutForShowOrForEditEnum.Show
                );
              }
            }}
          ></textarea>
        )}
        <h3 className="font-bold text-black text-lg mb-5 flex flex-row gap-x-2 items-center">
          <span style={{ wordSpacing: "1px" }}>Appointment fee:</span>
          <span className="flex flex-row gap-x-0.5 items-center">
            <span>$</span>
            {toggleappointment_feeForShowOrForEdit ===
            toggleappointment_feeForShowOrForEditEnum.Show ? (
              <span
                ref={appointment_fee_span}
                onClick={() => {
                  if (toggleEditSaveButton === toggleEditSaveButtonEnum.Save) {
                    setToggleappointment_feeForShowOrForEdit(
                      toggleappointment_feeForShowOrForEditEnum.Edit
                    );
                  }
                }}
              >
                {formik.values.appointment_fee}
              </span>
            ) : (
              <input
                ref={appointment_fee_input}
                type="text"
                id="appointment_fee"
                name="appointment_fee"
                className="appointment_fee_input"
                value={formik.values.appointment_fee}
                onChange={formik.handleChange}
                onMouseLeave={() => {
                  console.log("salem");
                  if (toggleEditSaveButton === toggleEditSaveButtonEnum.Save) {
                    setToggleappointment_feeForShowOrForEdit(
                      toggleappointment_feeForShowOrForEditEnum.Show
                    );
                  }
                }}
              />
            )}
          </span>
        </h3>
        <h3 className="font-bold text-black text-lg mb-5 flex flex-row gap-x-2 items-center">
          <span style={{ wordSpacing: "1px", fontWeight: "800" }}>
            Address:
          </span>
          {toggleaddressForShowOrForEdit ===
          toggleaddressForShowOrForEditEnum.Show ? (
            <span
              className="text-sm mt-0.5"
              style={{ wordSpacing: "2px" }}
              ref={address_span}
              onClick={() => {
                if (toggleEditSaveButton === toggleEditSaveButtonEnum.Save) {
                  setToggleaddressForShowOrForEdit(
                    toggleaddressForShowOrForEditEnum.Edit
                  );
                }
              }}
            >
              {formik.values.address}
            </span>
          ) : (
            <textarea
              ref={address_input}
              rows={3}
              id="address"
              name="address"
              className="address_input"
              value={formik.values.address}
              onChange={formik.handleChange}
              onMouseLeave={() => {
                console.log("salem");
                if (toggleEditSaveButton === toggleEditSaveButtonEnum.Save) {
                  setToggleaddressForShowOrForEdit(
                    toggleaddressForShowOrForEditEnum.Show
                  );
                }
              }}
            ></textarea>
          )}
        </h3>
        <span className="flex flex-row gap-x-1 items-center mb-12">
          <input
            id="availble_doctor"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm  dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            className="font-bold text-gray-700 text-md"
            htmlFor="availble_doctor"
          >
            Available
          </label>
        </span>
        <span
          onClick={(event) => {
            if (toggleEditSaveButton === toggleEditSaveButtonEnum.Edit) {
              setToggleEditSaveButton(toggleEditSaveButtonEnum.Save);
              event.currentTarget.innerText = toggleEditSaveButtonEnum.Save;
            } else {
              setToggleEditSaveButton(toggleEditSaveButtonEnum.Edit);
              event.currentTarget.innerText = toggleEditSaveButtonEnum.Edit;
            }
          }}
          className="font-border border border-gray-500 rounded-3xl px-6 py-2 text-center mb-20 cursor-pointer"
        >
          Edit
        </span>
      </div>
    </div>
  );
};

export default AdminDoctorProfile;
