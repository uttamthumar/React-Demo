import React, { useEffect, useState } from "react";
import axios from "axios";
import Input from "./input/input";
import InputUserData from "./userdata/userdata";

function Demo() {
  const [userData, setUserData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [inputData, setInputData] = useState({
    firstName: "",
    lastname: "",
    city: "",
  });

  const handleInput = (name, value) => {
    setInputData(() => {
      return {
        ...inputData,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    console.log("getapi");
    axios.get("http://localhost:5000/user").then((result) => {
      setUserData(result.data.data);
    });
  }, [toggle]);
  function saveData(e) {
    e.preventDefault();

    axios.post("http://localhost:5000/user", inputData).then((resp) => {
      setToggle(!toggle);
    });
    setInputData("");
  }
  function deleteUser(id) {
    axios.delete(`http://localhost:5000/user/${id}`).then((result) => {
      setToggle(!toggle);
    });
  }

  return (
    <>
      <div>
        <div className="">
          <h1>POST API Example12 </h1>
          {InputUserData.map((item, index) => {
            return (
              <Input
                key={index.toString()}
                onChange={(name, value) => handleInput(name, value)}
                item={item}
                value={inputData}
              />
            );
          })}
          <button type="button" onClick={saveData}>
            Save New User
          </button>
        </div>
        <div>
          <table border={2} className="container">
            <tbody>
              <tr>
                <td>FirstName</td>
                <td>Lastname</td>
                <td>City</td>
                <td>id</td>
                <td>Delete</td>
              </tr>
              {userData.map((item, I) => (
                <tr key={I}>
                  <td>{item.firstName}</td>
                  <td>{item.lastname}</td>
                  <td>{item.city}</td>
                  <td>{item.id}</td>
                  <td>
                    <button onClick={() => deleteUser(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Demo;
