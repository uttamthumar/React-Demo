import React, { useEffect, useState } from "react";
import axios from "axios";

function Use() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/user").then((result) => {
      console.log("<<<<<",result)
      // result.json().then((res) => {
      //   console.log(res);
        setData(result.data);
      // });
    });
  }, []);

  console.log("hellooo");

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
          <tr key={item.id}>
            <td>{item.firstName}</td>
            <td>{item.lastname}</td>
            <td>{item.city}</td>
            <td>{item.Id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}
export default Use;
