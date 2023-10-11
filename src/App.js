import { useEffect, useState } from "react";
import AddContributorModal from "./Components/AddContributorModal";
import AddFundModal from "./Components/AddFundModal";
import List from "./Components/List";
import { backend } from "./config";
import StatusBar from "./Components/StatusBar";
import Mountains from "./imgs/mountains.svg";

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  const [addCont, setAddCont] = useState(false);
  const [addFund, setAddFund] = useState(false);

  const [contributors, setContributors] = useState({
    status: "loading",
    data: [],
  });

  // This effect contacts the backend and gets all contributors
  useEffect(() => {
    async function getContributors() {
      const res = await fetch(backend.routes.allContributors);
      const resObj = await res.json();
      if (resObj.status === 200) {
        setContributors({ status: "good", data: resObj.ans });
      } else {
        setContributors((prev) => ({ ...prev, status: "Error" }));
      }
    }
    getContributors();
  }, []);

  async function addContributor(name) {
    const res = await fetch(backend.routes.addContributor + `?name=${name}`);
    const resObj = await res.json();
    console.log(resObj);
    if (resObj.acknowledged) {
      setContributors((prev) => {
        const newCont = {
          status: "good",
          data: [...prev.data, { _id: resObj.indertedId, name: name }],
        };
        return newCont;
      });
      setAddCont(false);
    }
  }

  const [fundings, setFundings] = useState({ status: "good", data: [] });

  function addFunding(name, amount) {
    setFundings((prev) => {
      const newFundings = {
        status: "good",
        data: [
          ...prev.data,
          { name, amount, id: name + getRndInteger(1, 1000) + amount },
        ],
      };

      return newFundings;
    });
  }

  function deleteFundItem(fundId) {
    setFundings((prev) => {
      const newOne = [];
      for (const item of prev.data) {
        if (item.id !== fundId) {
          newOne.push(item);
        }
      }
      return { status: "good", data: newOne };
    });
  }

  return (
    <main>
      <StatusBar contributors={contributors} funding={fundings} />
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
          <img src={Mountains} className="w-36 block mx-auto mb-4"></img>
          <h1 className="text-3xl">Contributions Manager</h1>
          <small>Manage your contributions here</small>
        </div>
        <div className="flex items-center justify-center mt-4 space-x-2 text-sm">
          <button
            className="bg-green-500 p-2 rounded-sm block disabled:opacity-50"
            onClick={() => setAddCont((prev) => !prev)}
            disabled={contributors.status === "loading"}
          >
            Add Contributor
          </button>
          <button
            className="bg-green-500 p-2 rounded-sm block disabled:opacity-50"
            onClick={() => setAddFund((prev) => !prev)}
            disabled={contributors.status === "loading"}
          >
            Add a Fund
          </button>
        </div>
        <List fundings={fundings} deleteFundItem={deleteFundItem} />
      </div>
    </main>
  );
}

export default App;
