import {React ,useEffect,useState} from "react";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { Button, Col, Container, Row } from "react-bootstrap";
import ApiData from "./userdata/apiData";

function ApiDemo() {
const [data,setData]=useState([])
const [inputData,setInputData]=useState({
    name:"",
    job:"",
})
useEffect(() => { 
axios.get("https://reqres.in/api/users?page=2").then ((result) => {
    console.log("api call",result)
    setData(result.data.data)
})
},[])
function selectUser(){
    console.log("Update")
}
const handleInput = (name, value) => {
    setInputData(() => {
      return {
        ...inputData,
        [name]: value,
      };
    });
  };
return(
    <>
   <div>
    <Container>
        <Row>
            <Col>
            {
            ApiData.map((item,index) => {
                return(
                     <input
                        type="text"
                         key={index.toString()}
                          value={inputData}
                          item={item}
                        onChange={(name, value) => handleInput(name, value)}
           />
                )
            } )
        
            }
        </Col>
        </Row>
    

   <Table striped bordered hover className="mx-auto mt-5" >
      <tbody border={2}>

        <tr>
          <td>id</td>
          <td>email</td>
          <td>first_name</td>
          <td>last_name</td>
          <td>avatar</td>
          <td>Update</td>
          <td>name</td>
          <td>job</td>
        </tr>
        {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.email}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td><img className="img-fluid img-size "  src={item.avatar} alt="" /></td>
              <td> <Button  onClick={() => selectUser(item.id)}>Update</Button> </td>
              </tr>
        ))
}
      </tbody>
      </Table>
      </Container>
   </div>
    </>
)
}
export default ApiDemo