import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 ml-2.5">Loading...</p>
    </div>
  );
}
