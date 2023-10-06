import React from "react";

export default function List({ fundings, deleteFundItem }) {
  return (
    <div className="bg-gray-200 py-4 px-6 mt-4 shadow-sm">
      <h2 className="text-center text-2xl mb-3">Your Fundings</h2>
      <div>
        {fundings.map((f, i) => (
          <div
            key={f.id}
            className="flex justify-between items-center px-8 py-3 bg-gray-100 border border-gray-300"
          >
            <p>{f.name}</p>
            <div className="flex">
              <p>{f.amount}</p>
              <button
                className="bg-red-500 text-white px-2 py-1 ml-4 text-sm"
                onClick={(e) => deleteFundItem(f.id)}
              >
                delete
              </button>
            </div>
          </div>
        ))}
        {fundings.length === 0 ? (
          <p className="text-center italic text-sm">No Fundings Yet</p>
        ) : null}
      </div>
    </div>
  );
}
