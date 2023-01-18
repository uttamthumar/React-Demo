import React, { useEffect, useState, Suspense, lazy, useContext } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Col, Row, Button, Modal } from "react-bootstrap";
import Input from "./input/input";
import InputUserData from "./userdata/userdata";
import Contex from "./Contex";
const Container = lazy(() => import("react-bootstrap/Container"));

function Demo() {
  const a = useContext(Contex);
  console.log("a", a);
  const [userData, setUserData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(false);

  const [inputData, setInputData] = useState({
    Name: "",
    Email: "",
    Birthdate: "",
    _id: "",
    Password: "",
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
  const fetchData = async () => {
    const response = await axios.get("http://localhost:7001/todos");
    console.log("res", response.data);
    if (!response.status === 200) {
      console.log("err");
    } else {
      setUserData(response.data);
    }
  };
  useEffect(() => {
    fetchData().catch((e) => {
      console.log("err", e.message);
    });
    a.update();
  }, [toggle]);

  function saveData(e) {
    axios.post("http://localhost:7001/todos", inputData).then((resp) => {
      setToggle(!toggle);
      console.log("saveData");
    });
    setInputData("");
  }
  function deleteUser(_id) {
    axios.delete(`http://localhost:7001/todos/${_id}`).then((result) => {
      setToggle(!toggle);
      console.log("deleteuser");
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
      .put(`http://localhost:7001/todos/${inputData._id}`, inputData)
      .then((resp) => {
        setToggle(!toggle);
        setDisabled(true);
        console.log("updateUser");
      });

    setInputData("");
  }

  return (
    <>
      <div>
        <div>
          this is a {a.state.firstName} {a.state.lastName}{" "}
        </div>
        <Suspense fallback={<div>please wait container is loading ...</div>}>
          <Container>
            <Row>
              <Button variant="primary" onClick={handleShow}>
                Submit
              </Button>
              <Modal size="lg text-sm" show={show} onHide={handleClose}>
                <Col lg="12" className="p-5 border-2">
                  <Modal.Header closeButton>
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
                  <Button
                    className="my-4 "
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
              <Table
                striped
                bordered
                hover
                variant="secondary"
                className="mx-auto mt-5"
              >
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Birthdate</td>
                    <td>id</td>
                    <td>Password</td>
                    <td>Delete</td>
                    <td>update</td>
                  </tr>
                  {userData.map((item, I) => (
                    <tr key={I}>
                      <td>{item.Name}</td>
                      <td>{item.Email}</td>
                      <td>{item.Birthdate}</td>
                      <td>{item._id}</td>
                      <td>{item.Password}</td>

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
        </Suspense>
      </div>
    </>
  );
}

export default Demo;
