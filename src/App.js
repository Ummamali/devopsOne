import { useState } from "react";
import AddContributorModal from "./Components/AddContributorModal";
import AddFundModal from "./Components/AddFundModal";
import List from "./Components/List";

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  const [addCont, setAddCont] = useState(false);
  const [addFund, setAddFund] = useState(false);

  const [contributors, setContributors] = useState([]);

  function addContributor(name) {
    setContributors((prev) => {
      const newContList = [...prev, name];
      return newContList;
    });
  }

  const [fundings, setFundings] = useState([]);

  function addFunding(name, amount) {
    setFundings((prev) => {
      const newFundings = [
        ...prev,
        { name, amount, id: name + getRndInteger(1, 1000) + amount },
      ];
      return newFundings;
    });
  }

  function deleteFundItem(fundId) {
    setFundings((prev) => {
      const newOne = [];
      for (const item of prev) {
        if (item.id !== fundId) {
          newOne.push(item);
        }
      }
      return newOne;
    });
  }

  return (
    <div className="max-w-[800px] mx-auto pt-10">
      {addCont && (
        <AddContributorModal
          close={() => setAddCont(false)}
          addContributor={addContributor}
        />
      )}
      {addFund && (
        <AddFundModal
          close={() => setAddFund(false)}
          contributors={contributors}
          addFunding={addFunding}
        />
      )}
      <div className="text-center">
        <h1 className="text-3xl">Contributions Manager</h1>
        <small>Manage your contributions here</small>
      </div>
      <div className="flex items-center justify-center mt-4 space-x-2 text-sm">
        <button
          className="bg-green-400 p-2 rounded-sm block"
          onClick={() => setAddCont((prev) => !prev)}
        >
          Add Contributor
        </button>
        <button
          className="bg-green-400 p-2 rounded-sm block"
          onClick={() => setAddFund((prev) => !prev)}
        >
          Add a Fund
        </button>
      </div>
      <List fundings={fundings} deleteFundItem={deleteFundItem} />
    </div>
  );
}

export default App;
