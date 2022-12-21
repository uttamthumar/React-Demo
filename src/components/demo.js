import React, { useEffect, useState } from "react";
import axios from "axios";

function Use() {
  const [data, setData] = useState([]);

  useEffect(() => { 
    axios.get("http://localhost:7000/todos/").then((result) => {
      console.log(" setUserId1", result);
      setData(result.data);
   
    });
  }, []);
  // function deleteUser(id) {
  //   axios.delete(`http://localhost:5000/user/${id}`).then((result) => {
  //     setToggle(!toggle);
  //   });
  // }
  // function selectUser(id) {
  //   let user = data.filter((user) => user.id === id);
  //   console.log("userid", user[0]);
  //   setFirstName(user[0].firstName);
  //   setLastName(user[0].lastname);
  //   setCity(user[0].city);
  //   setUserId(user[0].id);
  //   console.log("user[0].id", user[0].id);
  // }

  // function updateUser() {
  //   axios
  //     .patch(`http://localhost:5000/user/${userId}`, { data })
  //     .then((resp) => {
  //       setToggle(!toggle);
  //       console.log("inputData", firstname, lastname, city);
  //     });
  // }

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
              <td>{item.lastName}</td>
              <td>{item.city}</td>
              <td>{item._id}</td>
              <td>
                <button >Delete</button>
              </td>
              <td>
                <button >Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <div>
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
    </div> */}
    </div>
  );
}
export default Use;
