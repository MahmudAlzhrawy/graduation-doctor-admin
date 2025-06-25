"use client";
import React, { useEffect, useRef, useState } from "react";
import "../../styles/AdminDoctorStyles.css";
import AdminDoctorSidebar from "../../components/Admin Doctor/AdminDoctorSidebar/AdminDoctorSidebar";
import { FiMenu } from "react-icons/fi";
import { IoSunny } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import useMediaQuery from "../../Hooks/useMediaQuery";
import { usePathname} from "next/navigation";
import { backendURL } from "@/lib/Slices/auth/authRules";
import { useSelector } from "react-redux";
interface AdminDoctorModel {
  address: string;
  email: string;
  nameU: string;
  phoneNumber: string;
  profileImage: string;
  userName: string;
}
const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const menu_btn = useRef<HTMLButtonElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const pathname = usePathname();
  function HandleCloseButton(data: boolean) {
    setShowSidebar(data);
  }
  const [adminDoctorObject, setAdminDoctorObject] = useState<AdminDoctorModel>({
    address: "",
    email: "",
    nameU: "",
    phoneNumber: "",
    profileImage: "",
    userName: "",
  });
const userId = useSelector((state: { auth: { user?: { id: string }; userToken: string } }) => state.auth.user?.id);
const userToken = useSelector((state: { auth: { user?: { id: string }; userToken: string } }) => state.auth.userToken);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://citypulse.runasp.net/api/User/GetUserById/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setAdminDoctorObject({
            address: data.address,
            email: data.email,
            nameU: data.nameU,
            phoneNumber: data.phoneNumber,
            profileImage: data.profileImage,
            userName: data.userName,
          });
          console.log(data);
        }
      } catch (e) {
        console.log("Error", e);
      }
    }
    fetchData();
  }, [userId]);

  return (
    <div
      className={
        pathname === "/admin-doctor/admin-doctor-medical-services"
          ? "w-full my-0 flex flex-row bg-blue-50 h-[950px] max-h-[4000px] overflow-auto"
          : pathname === "/admin-doctor/dashboard" ||
            pathname === "/admin-doctor"
          ? "w-full my-0 flex flex-row bg-blue-50 h-[950px] max-h-[4000px] overflow-auto"
          : pathname === "/admin-doctor/admin-doctor-appointments"
          ? "w-full my-0 flex flex-row bg-blue-50 h-[950px] max-h-[4000px] overflow-auto"
          : pathname === "/admin-doctor/reports"
          ? "w-full my-0 flex flex-row bg-blue-50 h-[950px] max-h-[4000px] overflow-auto"
          : pathname?.startsWith(
              "/admin-doctor/scheduling_the_days_of_the_week"
            )
          ? "w-full my-0 flex flex-row bg-blue-50 h-[950px]"
          : pathname?.startsWith("/admin-doctor/update-scheduling-date")
          ? "w-full my-0 flex flex-row bg-blue-50 h-[950px]"
          : "w-full my-0 flex flex-row bg-blue-50"
      }
    >
      <AdminDoctorSidebar
        isMobile={isMobile}
        showSidebar={showSidebar}
        sendData={HandleCloseButton}
      />
      {children}
      {pathname === "/admin-doctor/admin-doctor-profile" ? null : (
        <div
          style={
            pathname === "/admin-doctor/admin-doctor-appointments"
              ? { width: "10%" }
              : pathname === "/admin-doctor/show-all-schduling-dates"
              ? { width: "10%" }
              : pathname?.startsWith("/admin-doctor/update-scheduling-date")
              ? { width: "10%" }
              : pathname === "/admin-doctor/admin-doctor-reports"
              ? { width: "25%" }
              : pathname === "/admin-doctor/admin-doctor-medical-services"
              ? {
                  width: "18%",
                  height: "auto",
                  maxHeight: "3000px",
                  overflow: "auto",
                }
              : pathname === "/admin-doctor/create-service"
              ? {
                  width: "18%",
                  height: "1000px",
                }
              : pathname === "/admin-doctor/update-service"
              ? {
                  width: "18%",
                  height: "1000px",
                }
              : pathname === "/admin-doctor/admin-doctor-profile" ||
                pathname === "/admin-doctor/scheduling_the_days_of_the_week"
              ? { display: "none" }
              : {}
          }
          className="right"
        >
          {/*START TOP SECTION */}
          <div className="top">
            <button
              ref={menu_btn}
              onClick={() => {
                setShowSidebar(true);
              }}
            >
              <FiMenu className="icon" />
            </button>
            <div className="theme-toggle">
              <IoSunny className="icon active" />
              <MdDarkMode className="icon" />
            </div>
            <div className="profile">
              <div className="info">
                <p>
                  Hey, <b>{adminDoctorObject.nameU}</b>
                  <span className="text-muted space-x-0.5">Admin Doctor</span>
                </p>
              </div>
              {adminDoctorObject.profileImage !== "ProfileImage" ? (
                <div className="profile-photo bg-slate-300">
                  <img
                    src={backendURL + "/" + adminDoctorObject.profileImage}
                    alt="adminDoctorAvatar"
                    className="text-3xl text-indigo-500 rounded-full"
                  />
                </div>
              ) : (
                <div className="profile-photo bg-slate-300">
                  <IoPerson className="text-3xl text-indigo-500 rounded-full" />
                </div>
              )}
            </div>
          </div>
          {/* END TOP SECTION */}
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
