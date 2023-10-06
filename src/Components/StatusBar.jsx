import React from "react";

export default function StatusBar({ contributors, funding }) {
  let statusEl = <p className="text-green-500">&#x2713; All Good</p>;
  if (contributors.status === "loading") {
    let text = "Loading Contributors";
    if (funding.status === "loading") {
      text += " and Fundings";
    }
    statusEl = <p className="text-yellow-500 animate-pulse">&#8635; {text}</p>;
  }

  if (contributors.status === "error") {
    let text = "Error Loading Contributors";
    if (funding.status === "error") {
      text += " and Fundings";
    }
    statusEl = <p className="text-red-500">{text}</p>;
  }

  return (
    <div className="bg-gray-900 px-4 py-2">
      <div className="text-xs text-center">{statusEl}</div>
    </div>
  );
}
