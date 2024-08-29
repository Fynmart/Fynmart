import React from "react";

const TableSkeleton = ({ loop }) => {
  const items = Array.from({ length: loop }, (_, i) => i);
  return (
    <div
      role="status"
      className="w-full p-2 space-y-4 border border-zinc-200 divide-y divide-zinc-200 rounded-lg shadow animate-pulse dark:divide-zinc-700 md:p-6 dark:border-zinc-700"
    >
      {items.map((index) => (
        <div
          className={`flex items-center justify-between ${
            index == 0 ? "pt-0" : "pt-4"
          }`}
          key={index}
        >
          <div>
            <div className="h-2.5 bg-zinc-300 rounded-full dark:bg-zinc-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-zinc-200 rounded-full dark:bg-zinc-700"></div>
          </div>
          <div>
            <div className="h-2.5 bg-zinc-300 rounded-full dark:bg-zinc-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-zinc-200 rounded-full dark:bg-zinc-700"></div>
          </div>
          <div>
            <div className="h-2.5 bg-zinc-300 rounded-full dark:bg-zinc-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-zinc-200 rounded-full dark:bg-zinc-700"></div>
          </div>
          <div className="h-2.5 bg-zinc-300 rounded-full dark:bg-zinc-700 w-12"></div>
        </div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default TableSkeleton;
