import React from "react";

const Result = ({result}) => {
  return (
    <div class="text-white py-32 md:py-20  border rounded-xl">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <dl class="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          <div class="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt class="hover:text-pink-300 text-base leading-7 ">Total number of record</dt>
            <dd class="hover:text-indigo-400 order-first text-3xl font-semibold tracking-tight  sm:text-5xl">
              44 Records
            </dd>
          </div>
          <div class="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt class="hover:text-pink-300 text-base leading-7 ">Total number of words</dt>
            <dd class="hover:text-indigo-400 order-first text-3xl font-semibold tracking-tight sm:text-5xl">
              1000 words
            </dd>
          </div>
          <div class="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt class="hover:text-pink-300 text-base leading-7 ">Total days for practicing</dt>
            <dd class="hover:text-indigo-400 order-first text-3xl font-semibold tracking-tight  sm:text-5xl">
              100 days
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Result;
