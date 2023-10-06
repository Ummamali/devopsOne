import React, { useState } from "react";

export default function AddContributorModal({
  close,
  contributors,
  addFunding,
}) {
  const [contName, setContName] = useState("");
  const [amount, setAmount] = useState(0);
  return (
    <div className="fixed h-screen w-screen top-0 left-0">
      <div
        className="absolute w-full h-full left-0 top-0 bg-black/80"
        onClick={close}
      ></div>
      <main className="absolute w-1/3 p-4 px-8 bg-white left-1/2 -translate-x-1/2 mt-10 z-10">
        <h2 className="text-center text-xl">Add a Fund</h2>
        <div>
          <label htmlFor="selectedCont">Contributor</label>
          <select
            name="selectedCont"
            id="selectedCont"
            className="block border border-gray-700 w-full py-2"
            onChange={(e) => setContName(e.target.value)}
          >
            <option>Select Contributor</option>
            {contributors.map((c, i) => (
              <option value={c} key={c + i}>
                {c}
              </option>
            ))}
          </select>
          <div className="mb-4"></div>
          <label htmlFor="name" className="block">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="block border border-gray-600 w-full py-1 px-2"
          />
        </div>
        <button
          className="bg-green-400 p-2 rounded-sm mx-auto block mt-4"
          onClick={(e) => {
            addFunding(contName, amount);
            close();
          }}
        >
          Add Funding
        </button>
      </main>
    </div>
  );
}
