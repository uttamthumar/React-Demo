import { React, useState } from "react";

function Preste() {
  const [count, setCount] = useState(1);
  //   let resp = Math.floor(Math.random() * 10);
  function updateCounter() {
    // setCount((pre) => {
    //   console.log("prevstate", pre);
    //   return resp;
    // });
    for (let i = 0; i < 3; i++) {
      setCount((pre) => {
        return pre + 1;
      });
    }
  } 
  return (
    <>
      <div>
        <h1>{count}</h1>
        <button onClick={updateCounter}>Click </button>
      </div>
    </>
  );
}
export default Preste;
