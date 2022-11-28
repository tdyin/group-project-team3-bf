import React, { useState, useEffect } from 'react';
import axios from 'axios';

// interface users {
//   username: string
// }

const VisaStatusHr: React.FC = () => {
  const [users, setUsers] = useState([])

  // function isOpt(arr: []) {
  //   const result: [] = [];
  //   for (let i = 0; i < arr.length; i++) {
  //     if(arr[i]['legal']['visaTitle'] === 'F1(CPT/OPT)') {
  //       result.push(arr[i])
  //     }
  //   }
  //   return result;
  // }

  useEffect(() => {
    axios.get('http://localhost:8080/emp/visa')
      .then((data) => {
        // const userOpt = isOpt(data.data)
        // setUsers(userOpt)
        // console.log(userOpt)
        setUsers(data.data);
      })
      .catch((err) => {
        console.log(err)
      })
  },[])



  return (
    <div>
      <div>{users.map((user, i) => {
        return (
          <div key={i}>
            <div>{user['username']}</div>
            <div></div>
          </div>
        )
      })
        }</div>
    </div>
  )
}

export default VisaStatusHr