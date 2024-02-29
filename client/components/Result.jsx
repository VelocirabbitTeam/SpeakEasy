import React from "react";

const Result = ({ result }) => {
  return (
    <div className="text-white py-32 md:py-20  border rounded-xl">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="hover:text-pink-300 text-base leading-7 ">
              Total number of record
            </dt>
            <dd className="hover:text-indigo-400 order-first text-3xl font-semibold tracking-tight  sm:text-5xl">
              44 Records
            </dd>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="hover:text-pink-300 text-base leading-7 ">
              Total number of words
            </dt>
            <dd className="hover:text-indigo-400 order-first text-3xl font-semibold tracking-tight sm:text-5xl">
              1000 words
            </dd>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="hover:text-pink-300 text-base leading-7 ">
              Total days for practicing
            </dt>
            <dd className="hover:text-indigo-400 order-first text-3xl font-semibold tracking-tight  sm:text-5xl">
              100 days
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Result;
