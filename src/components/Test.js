import { useEffect ,useState } from "react";
import axios from "axios";

//   const [userData, setUserData] = useState([]);
//   useEffect ( () => {
//     axios.get("http://localhost:7000/todos").then((resp) => {
//       setUserData(resp.data);
//     });
//   }, [userData]);
// };
// export default fetchData;



const Featchdata = (url) => {
    const [data, setData] = useState([]);
useEffect (() => {
    axios.get(url).then((resp) => {
        setData(resp.data)
        console.log(resp.data)
    });
},[url])
return [data]
}

export default Featchdata ;