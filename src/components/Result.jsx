import React, { useContext } from "react";
import MyContext from "./MyContext";

function Result() {
  const data = useContext(MyContext);

  if (data === undefined) {
    return "";
  }

  return (
    <div className="mt-4 mx-4 py-3 flex flex-col align-middle justify-center">
      <h1 className="text-3xl lg:text-4xl ml-3 font-bold">
        {data.word.charAt(0).toUpperCase() + data.word.substring(1)}
        <span className="text-sm mx-2 bg-orange-500 font-bold px-3 rounded-md">
          {data.meanings[0].partOfSpeech}
        </span>
      </h1>
      <p className="my-3 ml-3 py-2 text-md">
        {data.meanings[0].definitions[0].definition}
      </p>
      <div className="flex w-full py-4 px-3 flex-col">
        <div className="synonymsw-full">
          <h1 className="text-lg font-bold mb-5">Synonyms</h1>
          <div>
            {data.meanings[0].synonyms.length === 0 ? (
              <h1 className="text-xl text-slate-100">No Antonyms found!</h1>
            ) : (
              data.meanings[0].synonyms.map((item, index) => {
                return (
                  <button
                    key={index}
                    className="py-2 px-4 m-1 rounded-md bg-gray-800"
                  >
                    {item}
                  </button>
                );
              })
            )}
          </div>
        </div>
        <div className="antonyms w-full mt-4">
          <h1 className="text-lg font-bold mb-5">Antonyms</h1>
          <div>
            {data.meanings[0].antonyms.length === 0 ? (
              <h1 className="text-xl text-slate-100">No Antonyms found!</h1>
            ) : (
              data.meanings[0].antonyms.map((item, index) => {
                return (
                  <button
                    key={index}
                    className="py-2 px-4 m-1 rounded-md bg-gray-800"
                  >
                    {item}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
