import React, { useEffect, useState } from "react";
import axios from "axios";
import Input from "./input/input";
import InputUserData from "./userdata/userdata";
import Table from "react-bootstrap/Table";
import { Col, Container, Row, Button, Modal } from "react-bootstrap";

function Demo() {
  const [userData, setUserData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(false);

  const [inputData, setInputData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    _id: "",
  });
  const [isDisabled, setDisabled] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
    axios.get("http://localhost:7000/todos").then((result) => {
      setUserData(result.data);
    });
  }, [toggle]);
  function saveData(e) {
    axios.post("http://localhost:7000/todos", inputData).then((resp) => {
      setToggle(!toggle);
      console.log("res", resp);
      console.log("!isDisabled", isDisabled);
    });
    setInputData("");
  }
  function deleteUser(_id) {
    axios.delete(`http://localhost:7000/todos/${_id}`).then((result) => {
      setToggle(!toggle);
    });
  }
  function selectUser(_id) {
    const user = userData.filter((user) => user._id === _id);
    setInputData(user[0]);
    setShow(!show);
    setDisabled(false);
  }
  function updateUser() {
    axios
      .put(`http://localhost:7000/todos/${inputData._id}`, inputData)
      .then((resp) => {
        setToggle(!toggle);
        setDisabled(true);
        console.log("PATCH Respon >>>>>>", resp);
      });

    setInputData("");
  }
  return (
    <>
      <div>
        <Container>
          <Row className="rounded-pill">
            <Button variant="primary" onClick={handleShow}>
              Submit
            </Button>
            <Modal  size="lg text-sm" show={show} onHide={handleClose}>
              <Col lg="12" className="p-5 border-2">
                <Modal.Header closeButton>
                  {" "}
                  <h1> POST API Example </h1>
                </Modal.Header>

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
                <Button className="my-4 "
                    type="button"
                    onClick={() => {
                      if (isDisabled) {
                        saveData();
                      } else {
                        updateUser();
                      }
                    }}
                  >
                    {isDisabled ? "Save New User" : "Update"}
                  </Button>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>

                 
                </Modal.Footer>
              </Col>
            </Modal>
          </Row>
          <div>
            <Table striped bordered hover className="mx-auto mt-5">
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
                    <td>{item.lastName}</td>
                    <td>{item.city}</td>
                    <td>{item._id}</td>
                    <td>
                      <button onClick={() => deleteUser(item._id)}>
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          selectUser(item._id);
                        }}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Demo;
