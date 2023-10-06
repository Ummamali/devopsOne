import React, { useState } from "react";

export default function AddContributorModal({ close, addContributor }) {
  const [nameVal, setNameVal] = useState("");
  return (
    <div className="fixed h-screen w-screen top-0 left-0">
      <div
        className="absolute w-full h-full left-0 top-0 bg-black/80"
        onClick={close}
      ></div>
      <main className="absolute w-1/3 p-4 px-8 bg-white left-1/2 -translate-x-1/2 mt-10 z-10">
        <h2 className="text-center text-xl">Add Contributor</h2>
        <div>
          <label htmlFor="name" className="block">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={nameVal}
            onChange={(e) => setNameVal(e.target.value)}
            className="block border border-gray-600 w-full py-1 px-2"
          />
        </div>
        <button
          className="bg-green-400 p-2 rounded-sm mx-auto block mt-4"
          onClick={(e) => {
            if (nameVal) {
              addContributor(nameVal);
            }
          }}
        >
          Add Contributor
        </button>
      </main>
    </div>
  );
}
