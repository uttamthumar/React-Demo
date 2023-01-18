import React from "react";

function Input({ item, onChange, value }) {

  return (
    <div className="">
      <h1>{item.id}</h1>
      <input
        type={item.type}
        value={value[item.name] === undefined ? "" : value[item.name]}
        onChange={(e) => onChange(item.name, e.target.value)}
      />
      <br /> <br />
    </div>
  );
}

export default Input;
