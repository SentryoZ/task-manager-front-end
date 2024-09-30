"use client";
import React from "react";
import { useState } from "react";
import DayView from "./dayview";
import WeekView from "./weekview";
import MonthView from "./monthview";
import AddTask from "./addtask";

export default function Page() {
  const [activeTab, setActiveTab] = useState("Day");

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="mb-4">
        <h1 className="text-2xl font-bold ">Calendar</h1>
      </div>

      <div className="flex-grow overflow-hidden border rounded-xl flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold">Today</h2>
            <p className="text-sm text-gray-500">
              {new Date().toLocaleDateString()}
            </p>
          </div>
          <div>
            <div className="flex border rounded-md overflow-hidden">
              <button
                onClick={() => setActiveTab("Day")}
                className={`px-4 py-2 focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-600 ${
                  activeTab === "Day" ? "bg-gray-200 dark:bg-gray-600" : ""
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setActiveTab("Week")}
                className={`px-4 py-2 focus:outline-none hover:bg-gray-200 border-l dark:hover:bg-gray-600 ${
                  activeTab === "Week" ? "bg-gray-200 dark:bg-gray-600" : ""
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setActiveTab("Month")}
                className={`px-4 py-2 focus:outline-none hover:bg-gray-200 border-l dark:hover:bg-gray-600 ${
                  activeTab === "Month" ? "bg-gray-200 dark:bg-gray-600" : ""
                }`}
              >
                Month
              </button>
            </div>
          </div>
          <AddTask />
        </div>
        <div className="flex-grow flex overflow-hidden p-4">
          <div className="w-full">
            {activeTab === "Day" && <DayView />}
            {activeTab === "Week" && <WeekView />}
            {activeTab === "Month" && <MonthView />}
          </div>
        </div>
      </div>
    </div>
  );
}
