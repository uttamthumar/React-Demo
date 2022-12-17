import React, { useEffect, useState } from "react";
import axios from "axios";

function Use() {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [userId, setUserId] = useState("");
  useEffect(() => { 
    axios.get("http://localhost:5000/user").then((result) => {
      console.log(" setUserId1", result.data.data[0].id);
      setData(result.data.data);
      setFirstName(result.data.data[0].firstName);
      setLastName(result.data.data[0].lastname);
      setCity(result.data.data[0].city);
      setUserId(result.data.data[0].id);
    });
  }, [toggle]);
  function deleteUser(id) {
    axios.delete(`http://localhost:5000/user/${id}`).then((result) => {
      setToggle(!toggle);
    });
  }
  function selectUser(id) {
    let user = data.filter((user) => user.id === id);
    console.log("userid", user[0]);
    setFirstName(user[0].firstName);
    setLastName(user[0].lastname);
    setCity(user[0].city);
    setUserId(user[0].id);
    console.log("user[0].id", user[0].id);
  }

  function updateUser() {
    axios
      .patch(`http://localhost:5000/user/${userId}`, { data })
      .then((resp) => {
        setToggle(!toggle);
        console.log("inputData", firstname, lastname, city);
      });
  }

  return (
    <div>
      <table border={2}>
        <tbody>
          <tr>
            <td>FirstName</td>
            <td>Lastname</td>
            <td>City</td>
            <td>id</td>
          </tr>

          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.firstName}</td>
              <td>{item.lastname}</td>
              <td>{item.city}</td>
              <td>{item.id}</td>
              <td>
                <button onClick={() => deleteUser(item.id)}>Delete</button>
              </td>
              <td>
                <button onClick={() => selectUser(item.id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <input
          type="text"
          value={firstname}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <input
          type="text"
          value={lastname}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <input
          type="text"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <button onClick={updateUser}>Update User</button>
      </div>
    </div>
  );
}
export default Use;
