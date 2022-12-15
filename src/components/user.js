import React, { useEffect, useState } from "react";

function User(props) {
  useEffect(() => {
    alert("count is" + props.count);
  }, [props.count]);
  const data = "hello there";

  return (
    <div>
      <h1>Count props:{props.count}</h1>
      <h1>Data props:{props.data}</h1>

      <button onClick={() => props.alert(data)}>Click me</button>
    </div>
  );
}
export default User;
