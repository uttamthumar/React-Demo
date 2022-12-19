import { React, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Button, Col, Container, Row } from "react-bootstrap";
import ApiData from "./userdata/apiData";
import DemoInput from "./input/DemoInput";

function ApiDemo() {
  const [data, setData] = useState([]);
  const [isDisabled, setDisabled] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [inputData, setInputData] = useState({
    name: "",
    Job: "",
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
    getData();
  }, [toggle]);

  function getData() {
    return axios.get("https://reqres.in/api/users?page=2").then((result) => {
      console.log("api call", result);
      console.log("inputdata", inputData);
      setData(result.data.data);
      console.log("reas");
    });
  }

  function saveData() {
    return axios.post("https://reqres.in/api/users", inputData).then((resp) => {
      setToggle(!toggle);
      console.log("POST", resp.data);
      getData();
    });
  }
  function updateUser() {
    return axios
      .patch(`https:reqres.in/api/users/2/${inputData.id}`, inputData)
      .then((resp) => {
        setToggle(!toggle);
        setDisabled(true);
        console.log("PATCH Respon >>>>>>", inputData.id);
        setInputData("");
      });
  }
  function selectUser(id) {
    const user = data.filter((user) => user.id === id);
    setInputData(user[0]);
    setDisabled(false);
    console.log("user", user);
  }
  return (
    <>
      <div>
        <Container>
          <Row>
            <Col>
              {ApiData.map((item, index) => {
                return (
                  <DemoInput
                    type="text"
                    key={index.toString()}
                    value={inputData}
                    item={item}
                    onChange={(name, value) => handleInput(name, value)}
                  />
                );
              })}
              <Button
                type="button"
                onClick={() => {
                  console.log("data", data);
                  if (isDisabled) {
                    saveData();
                  } else {
                    updateUser();
                  }
                }}
              >
                {isDisabled ? "Save New User" : "Update"}
              </Button>
            </Col>
          </Row>

          <Table striped bordered hover className="mx-auto mt-5">
            <tbody border={2}>
              <tr>
                <td>id</td>
                <td>email</td>
                <td>first_name</td>
                <td>last_name</td>
                <td>avatar</td>
                <td>name</td>
                <td>job</td>
                <td>Update</td>
              </tr>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <img
                      width={50}
                      className="img-fluid img-size text-center "
                      src={item.avatar}
                      alt=""
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.Job}</td>
                  <td>
                    <Button onClick={() => selectUser(item.id)}>Update</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </>
  );
}
export default ApiDemo;
