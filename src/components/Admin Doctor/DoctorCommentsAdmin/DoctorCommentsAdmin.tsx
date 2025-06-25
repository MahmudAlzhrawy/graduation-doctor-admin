"use client";
import { store } from "@/lib/store";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUserCircle, FaStar, FaTrashAlt } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import Swal from "sweetalert2";


interface userRatingModel {
  ratingId: number;
  nameU: string;
  ratingValue: number;
  review: string;
  ratingDate: string;
}
// const initialComments: Comment[] = [
//   {
//     id: 1,
//     userName: "Ahmed Salah",
//     doctorName: "Dr. Mona Youssef",
//     comment: "Very professional and kind!",
//     rating: 5,
//     date: "2025-06-15",
//   },
//   {
//     id: 2,
//     userName: "Sara Adel",
//     doctorName: "Dr. Kareem Hassan",
//     comment: "The appointment was delayed, but he explained everything well.",
//     rating: 4,
//     date: "2025-06-14",
//   },
// ];

const DoctorCommentsAdmin = () => {
  const [userRatingsState, setUserRatingsState] = useState<userRatingModel[]>(
    []
  );
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
          const doctorId = data.doctorId;
          const secondResponse = await fetch(
            `https://citypulse.runasp.net/api/Clinic/AllDoctorRating /${doctorId}`,
            {
              method: "GET",
            }
          );
          if (secondResponse.ok) {
            const data = await secondResponse.json();
            const userRatings: userRatingModel[] = data.$values.map(
              (userRating) => ({
                ratingId: userRating.ratingId,
                nameU: userRating.nameU,
                ratingValue: userRating.ratingValue,
                review: userRating.review,
                ratingDate: userRating.ratingDate,
              })
            );
            if (data.$values !== null) setUserRatingsState(userRatings);
          } else {
            toast.error("No Comments found !");
          }
        } else {
          toast.error("Error found !");
        }
        // const response = await fetch(
        //   `https://citypulse.runasp.net/api/Clinic/AllDoctorRating /${
        //     store.getState().auth.user?.id
        //   }`,
        //   {
        //     method: "GET",
        //   }
        // );
        // if (response.ok) {
        // }
      } catch (e) {
        console.log("Error", e);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (ratingId: number) => {
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
            `https://citypulse.runasp.net/api/ClinicStaf/DeleteCommentById?id=${ratingId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${store.getState().auth.userToken}`, // Sending the token as a Bearer token
              },
            }
          );
          if (response.ok) {
            const filterData = userRatingsState.filter(
              (userRating) => userRating.ratingId !== ratingId
            );
            setUserRatingsState(filterData);
            Swal.fire({
              title: "Deleted!",
              text: "This comment has been successfully deleted ✅",
              icon: "success",
              confirmButtonColor: "#2563EB",
            });
          } else {
            Swal.fire({
              title: "Failed!",
              text: "The comment does not exist or does not belong to this user!",
              icon: "error",
              confirmButtonColor: "#2563EB",
            });
          }
        } catch (e) {
          console.log(e);
        }
      }
    });
  };

  return (
    <div className="p-6 bg-blue-50 w-full md:w-[55%] pt-5 px-[1rem] h-[950px] max-h-[4000px] overflow-auto mb-5">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Doctor Comments</h2>

      {userRatingsState.length === 0 && (
        <p className="text-center text-gray-500 h-[950px]">
          No comments available.
        </p>
      )}

      {userRatingsState.map((userRating: userRatingModel) => (
        <div
          key={userRating.ratingId}
          className="border-b border-gray-200 pb-4 mb-4 flex gap-4"
        >
          <FaUserCircle className="text-4xl text-blue-600 mt-1" />

          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <p className="text-lg font-semibold text-gray-800">
                {userRating.nameU} → Ahmed
              </p>

              <div className="flex items-center gap-3">
                <div className="flex items-center text-yellow-500">
                  {[...Array(userRating.ratingValue)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <button
                  onClick={() => handleDelete(userRating.ratingId)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete Comment"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>

            <p className="text-gray-600 mb-1">{userRating.review}</p>

            <div className="text-sm text-gray-400 flex items-center gap-1">
              <MdOutlineDateRange />
              {new Date(userRating.ratingDate).toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorCommentsAdmin;
