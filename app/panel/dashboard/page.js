"use client";
import React from "react";
import { ChevronRight, icons } from "lucide-react";

const Dashboard = () => {
  const data = [
    {
      header: "Business Analytics",
      items: [
        {
          title: "Total Sale",
          icon: "BarChart",
          value: 93,
        },
        {
          title: "Total Stores",
          icon: "Store",
          value: 93,
        },
        {
          title: "Total Products",
          icon: "Store",
          value: 93,
        },
        {
          title: "Total Customers",
          icon: "Store",
          value: 93,
        },
        {
          title: "Pending",
          icon: "ClipboardList",
          value: 85,
        },
        {
          title: "Confirmed",
          icon: "Timer",
          value: 53,
        },
        {
          title: "Packaging",
          icon: "Timer",
          value: 53,
        },
        {
          title: "Out for Delivery",
          icon: "Timer",
          value: 53,
        },
        {
          title: "Delivered",
          icon: "ClipboardList",
          value: 85,
        },
        {
          title: "Canceled",
          icon: "Timer",
          value: 53,
        },
        {
          title: "Returned",
          icon: "Timer",
          value: 53,
        },
        {
          title: "Failed To Delivery",
          icon: "Timer",
          value: 53,
        },
      ],
    },
  ];
  return (
    <div className="px-5 py-3 w-full ">
      <h1 className="font-extrabold">Welcome Admin</h1>
      <p className="font-light">
        Monitor your business analytics and statistics.
      </p>
      {data.map((item, index) => (
        <div className="rounded-md mt-3" key={index}>
          <h1 className="mb-2">{item.header}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {item.items.map((dataInner, innerIndex) => {
              const LucideIcon = icons[dataInner.icon];
              return (
                <div className="w-full border p-4 rounded-xl" key={innerIndex}>
                  <div className="flex justify-between">
                    <div>
                      <h1 className="text-sm">{dataInner.title}</h1>
                      <h1 className="text-2xl font-bold">{dataInner.value}</h1>
                      <p className="text-[11px]">Since last updated</p>
                    </div>
                    <LucideIcon />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
