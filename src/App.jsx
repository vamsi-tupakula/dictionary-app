import { useRef, useState } from "react";
import "./App.css";
import Result from "./components/Result";
import MyContext from "./components/MyContext";

function App() {
  const inputRef = useRef(null);
  const [data, setData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let word = inputRef.current.value;
    if (word === "") {
      alert("Please Enter something!");
      return;
    }
    // fetch api
    let success = true;
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 404) {
          alert("Invalid Word! Please enter a valid word.");
          throw new Error("Invalid Word");
        } else {
          throw new Error("API request failed");
        }
      })
      .then((data) => {
        setData(data[0]);
      });
    // set it back to null
    inputRef.current.value = null;
  };

  return (
    <>
      <div className="py-8 px-2 rounded-xl shadow-xl bg-slate-600 text-white lg:w-2/4 w-full">
        <h1 className="flex justify-center text-3xl lg:text-5xl font-bold mt-4 mb-12 w-full">
          Dictionary App
        </h1>
        <form
          action="/"
          onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row justify-center w-full lg:pr-3"
        >
          <input
            type="text"
            className="py-3 w-full pl-5 outline-none lg:ml-5 mr-3 rounded-lg bg-transparent placeholder:text-white border border-1 border-white"
            placeholder="Type something to search...."
            ref={inputRef}
          />
          <button
            type="submit"
            className="w-full mt-3 lg:m-0 lg:w-1/4 rounded-lg bg-blue-500 hover:bg-blue-600 py-3 px-6"
          >
            SEARCH
          </button>
        </form>
        <MyContext.Provider value={data}>
          {data === null ? "" : <Result />}
        </MyContext.Provider>
      </div>
    </>
  );
}

export default App;
