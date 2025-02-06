import React from "react";
import { Bounce, ToastContainer } from "react-toastify";

/**
 * Provider that wraps the application and provides toast notifications.
 *
 * @param children The children of the provider
 * @returns The toast provider
 */
export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}
