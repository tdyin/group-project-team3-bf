import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VisaStatusHr: React.FC = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8080/emp/info/visa')
      .then((data) => {
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