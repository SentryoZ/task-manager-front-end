"use client";
import React from "react";
import Link from "next/link";

function NotFound() {
  return (
    <main className="text-center justify-center h-full flex flex-col">
      <h1 className="text-3xl">404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist. </p>
      <p>
        Please go back to the{" "}
        <Link
          href="/homepage"
          className="underline hover:text-blue-500 hover: transition duration-300 ease-in-out"
        >
          HomePage
        </Link>
      </p>
    </main>
  );
}

export default NotFound;
