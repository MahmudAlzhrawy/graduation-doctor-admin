"use client";
import React, { useRef } from "react";
import "../../../components/Admin Doctor/AdminDoctorSidebar/AdminDoctorSidebar.css";
import { IoClose } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { FaNotesMedical } from "react-icons/fa";
import { BsFillFileMedicalFill } from "react-icons/bs";
import { GoReport } from "react-icons/go";
import { MdOutlineLogout } from "react-icons/md";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/Slices/auth/authSlice";
type Props = {
  isMobile: boolean;
  showSidebar: boolean;
  sendData: (data: boolean) => void;
};

function AdminSidebar(props: Props) {
  const close_btn = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const dispatchStore = useDispatch();
  return (
    <aside
      style={
        props.isMobile
          ? props.showSidebar
            ? { display: "block" }
            : { display: "none" }
          : {}
      }
      className={
        pathname === "/admin-doctor/admin-doctor-profile"
          ? "md:w-[10%] xl:w-[20%] bg-white"
          : pathname === "/admin-doctor/dashboard" ||
            pathname === "/admin-doctor"
          ? "md:w-[10%] xl:w-[20%] bg-blue-50"
          : pathname === "/admin-doctor/admin-doctor-medical-services"
          ? "w-[35%] md:w-[20%] bg-white max-h-[1000px]"
          : "w-[35%] md:w-[20%] bg-white"
      }
    >
      <div
        className="top"
        style={
          pathname === "/admin-doctor/dashboard" || pathname === "/admin-doctor"
            ? { backgroundColor: "#EFF6FF" }
            : {}
        }
      >
        <div className="logo" onClick={() => router.push("/admin-doctor")}>
          <img
            className="bg-transparent"
            src={"/Images/services-provider-logo.jpg"}
            alt={"logoImage"}
          />
          <h2 className="font-sans font-extrabold text-lg">
            ASSUI<span className="text-red-400">5DAMAT</span>
          </h2>
        </div>
        <div
          className="close"
          ref={close_btn}
          onClick={() => {
            if (props.showSidebar && props.isMobile) {
              props.sendData(false);
            }
          }}
        >
          <IoClose className="icon" />
        </div>
      </div>
      <div
        className="sidebar"
        style={
          pathname === "/admin-doctor/dashboard" || pathname === "/admin-doctor"
            ? { backgroundColor: "#EFF6FF" }
            : {}
        }
      >
        <Link
          href="/admin-doctor/dashboard"
          onClick={(e) => {
            if (!e.currentTarget.classList.contains("active")) {
              e.currentTarget.classList.add("active");
              if (e.currentTarget.parentElement) {
                for (
                  let i = 0;
                  i < e.currentTarget.parentElement.children.length;
                  i++
                ) {
                  if (
                    e.currentTarget.parentElement.children[i].textContent ===
                    e.currentTarget.textContent
                  ) {
                    continue;
                  }
                  if (
                    e.currentTarget.parentElement.children[
                      i
                    ].classList.contains("active")
                  ) {
                    e.currentTarget.parentElement.children[i].classList.remove(
                      "active"
                    );
                  }
                }
              }
            }
            router.push("/admin-doctor/dashboard");
          }}
          className={
            pathname === "/admin-doctor" ||
            pathname === "/admin-doctor/dashboard"
              ? "active Link"
              : "Link"
          }
        >
          <MdDashboard className={"icon text-2xl"} />
          <h3>Dashboard</h3>
        </Link>
        <Link
          href="/admin-doctor/admin-doctor-appointments"
          onClick={(e) => {
            if (!e.currentTarget.classList.contains("active")) {
              e.currentTarget.classList.add("active");
              if (e.currentTarget.parentElement) {
                for (
                  let i = 0;
                  i < e.currentTarget.parentElement.children.length;
                  i++
                ) {
                  if (
                    e.currentTarget.parentElement.children[i].textContent ===
                    e.currentTarget.textContent
                  ) {
                    continue;
                  }
                  if (
                    e.currentTarget.parentElement.children[
                      i
                    ].classList.contains("active")
                  ) {
                    e.currentTarget.parentElement.children[i].classList.remove(
                      "active"
                    );
                  }
                }
              }
            }
            router.push("/admin-doctor/admin-doctor-appointments");
          }}
          className={
            pathname === "/admin-doctor/admin-doctor-appointments"
              ? "active Link"
              : "Link"
          }
        >
          <BsFillFileMedicalFill className={"icon text-2xl"} />
          <h3>Appointments</h3>
        </Link>
        <Link
          href="/admin-doctor/admin-doctor-medical-services"
          onClick={(e) => {
            if (!e.currentTarget.classList.contains("active")) {
              e.currentTarget.classList.add("active");
              if (e.currentTarget.parentElement) {
                for (
                  let i = 0;
                  i < e.currentTarget.parentElement.children.length;
                  i++
                ) {
                  if (
                    e.currentTarget.parentElement.children[i].textContent ===
                    e.currentTarget.textContent
                  ) {
                    continue;
                  }
                  if (
                    e.currentTarget.parentElement.children[
                      i
                    ].classList.contains("active")
                  ) {
                    e.currentTarget.parentElement.children[i].classList.remove(
                      "active"
                    );
                  }
                }
              }
            }
            router.push("/admin-doctor/admin-doctor-medical-services");
          }}
          className={
            pathname === "/admin-doctor/admin-doctor-medical-services"
              ? "active Link"
              : "Link"
          }
        >
          <FaNotesMedical className={"icon text-2xl"} />
          <h3 className="space-x-1">Medical Services</h3>
        </Link>
        <Link
          href="/admin-doctor/scheduling_the_days_of_the_week"
          onClick={(e) => {
            if (!e.currentTarget.classList.contains("active")) {
              e.currentTarget.classList.add("active");
              if (e.currentTarget.parentElement) {
                for (
                  let i = 0;
                  i < e.currentTarget.parentElement.children.length;
                  i++
                ) {
                  if (
                    e.currentTarget.parentElement.children[i].textContent ===
                    e.currentTarget.textContent
                  ) {
                    continue;
                  }
                  if (
                    e.currentTarget.parentElement.children[
                      i
                    ].classList.contains("active")
                  ) {
                    e.currentTarget.parentElement.children[i].classList.remove(
                      "active"
                    );
                  }
                }
              }
            }
            router.push("/admin-doctor/scheduling_the_days_of_the_week");
          }}
          className={
            pathname === "/admin-doctor/scheduling_the_days_of_the_week"
              ? "active Link"
              : "Link"
          }
        >
          <BsFillFileMedicalFill className={"icon text-2xl"} />
          <h3>Scheduling the days of the week</h3>
        </Link>
        <Link
          href="/admin-doctor/show-all-schduling-dates"
          onClick={(e) => {
            if (!e.currentTarget.classList.contains("active")) {
              e.currentTarget.classList.add("active");
              if (e.currentTarget.parentElement) {
                for (
                  let i = 0;
                  i < e.currentTarget.parentElement.children.length;
                  i++
                ) {
                  if (
                    e.currentTarget.parentElement.children[i].textContent ===
                    e.currentTarget.textContent
                  ) {
                    continue;
                  }
                  if (
                    e.currentTarget.parentElement.children[
                      i
                    ].classList.contains("active")
                  ) {
                    e.currentTarget.parentElement.children[i].classList.remove(
                      "active"
                    );
                  }
                }
              }
            }
            router.push("/admin-doctor/show-all-schduling-dates");
          }}
          className={
            pathname === "/admin-doctor/show-all-schduling-dates"
              ? "active Link"
              : "Link"
          }
        >
          <BsFillFileMedicalFill className={"icon text-2xl"} />
          <h3>ِAll Scheduling Dates</h3>
        </Link>
        <Link
          href="/admin-doctor/admin-doctor-reports"
          onClick={(e) => {
            if (!e.currentTarget.classList.contains("active")) {
              e.currentTarget.classList.add("active");
              if (e.currentTarget.parentElement) {
                for (
                  let i = 0;
                  i < e.currentTarget.parentElement.children.length;
                  i++
                ) {
                  if (
                    e.currentTarget.parentElement.children[i].textContent ===
                    e.currentTarget.textContent
                  ) {
                    continue;
                  }
                  if (
                    e.currentTarget.parentElement.children[
                      i
                    ].classList.contains("active")
                  ) {
                    e.currentTarget.parentElement.children[i].classList.remove(
                      "active"
                    );
                  }
                }
              }
            }
            router.push("/admin-doctor/admin-doctor-reports");
          }}
          className={
            pathname === "/admin-doctor/admin-doctor-reports"
              ? "active Link"
              : "Link"
          }
        >
          <GoReport className={"icon text-2xl"} />
          <h3>Reports</h3>
        </Link>
        {/* <Link
          href="/admin-doctor/admin-doctor-profile"
          onClick={(e) => {
            if (!e.currentTarget.classList.contains("active")) {
              e.currentTarget.classList.add("active");
              if (e.currentTarget.parentElement) {
                for (
                  let i = 0;
                  i < e.currentTarget.parentElement.children.length;
                  i++
                ) {
                  if (
                    e.currentTarget.parentElement.children[i].textContent ===
                    e.currentTarget.textContent
                  ) {
                    continue;
                  }
                  if (
                    e.currentTarget.parentElement.children[
                      i
                    ].classList.contains("active")
                  ) {
                    e.currentTarget.parentElement.children[i].classList.remove(
                      "active"
                    );
                  }
                }
              }
            }
            router.push("/admin-doctor/admin-doctor-profile");
          }}
          className={
            pathname === "/admin-doctor/admin-doctor-profile"
              ? "active Link"
              : "Link"
          }
        >
          <IoPersonSharp className={"icon text-2xl"} />
          <h3>Profile</h3>
        </Link> */}
        <div
          className="Link"
          onClick={() => {
            dispatchStore(logout());
            location.assign("/");
          }}
        >
          <MdOutlineLogout className={"icon text-2xl"} />
          <h3>Logout</h3>
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;
