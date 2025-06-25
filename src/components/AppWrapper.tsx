"use client";

import { Toaster } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect } from "react";
export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const auth = useSelector((state: any) => state.auth);
  const isLoading = auth === undefined;
  useEffect(() => {
    if (!isLoading) {
      if (auth !== undefined) {
        if (pathname !== "/" && !auth.userToken) {
          router.push("/");
        } else if (
          pathname === "/" &&
          auth?.userToken &&
          auth?.user?.roles === "ClinicStaff"
        ) {
          router.push("/admin-doctor");
        } else if (
          pathname.startsWith("/admin-doctor") &&
          auth?.userToken &&
          auth?.user?.roles !== "ClinicStaff"
        ) {
          router.push("/");
        }
      }
    }
  }, [isLoading, auth]);
  return (
    <>
      <Toaster position="bottom-center" />
      {children}
    </>
  );
}
