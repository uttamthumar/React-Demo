import Contex from "./Contex";
import { useState } from "react";

const ContexState = (props) => {
  const data = {
    firstName: "Uttam",
    lastName: "thumar",
  };
  const [state, setState] = useState(data);
  const update = () => {
    setTimeout(() => {
      setState({
        firstName: "sam",
        lastName: "carrt",
      });
    }, 1000);
  };
  return (
    <Contex.Provider value={{ state, update }}>
      {props.children}
    </Contex.Provider>
  );
};

export default ContexState;
