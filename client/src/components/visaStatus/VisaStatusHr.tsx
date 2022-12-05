import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const VisaStatusHr: React.FC = () => {
  const [users, setUsers] = useState([] as any[]);
  const [currentUser, setCurrentUser] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8080/emp/info/visa', {headers: {
            'authorization': token
          }})
      .then((data) => {
        console.log(data.data)
        setUsers(data.data);
      })
      .catch((err) => {
        console.log(err)
      })
  },[])

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  function getRemainDay(user: any) {
    var date1 = new Date(user['user']['legal']['endDate']);
    var date2 = new Date();
    var Difference_In_Time = date1.getTime() - date2.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Math.floor(Difference_In_Days)
  }

  function getNextStep(user: any) {
    if (user['optReceipt'] === '') {
      return 'Waiting for user to upload next document'
    }
    if (user['i20'] === 'approved') {
      return 'User has uploaded all documents'
    } else if (user['oprReceipt'] === 'rejected' || user['optEad'] === 'rejected' || user['i983'] === 'rejected' || user['i20'] === 'rejected') {
      return 'Waiting for user to upload document again'
    } else if (user['oprReceipt'] === 'pending' || user['optEad'] === 'pending' || user['i983'] === 'pending' || user['i20'] === 'pending') {
      return 'Waiting for HR approval'
    } else {
      return 'Waiting for user to upload next document'
    }
  }

  function approveDoc(user: any) {
    let data = {}
    if (user['optReceipt'] === 'pending') {
      data = { 'optReceipt': 'approved'}
    }
    if (user['optEad'] === 'pending') {
      data = { 'optEad': 'approved'}
    }
    if (user['i983'] === 'pending') {
      data = { 'i983': 'approved'}
    }
    if (user['i20'] === 'pending') {
      data = { 'i20': 'approved'}
    }

    axios.put(`http://localhost:8080/emp/info/visa/${user['_id']}`, data)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })

  }

  function rejectDoc(user: any) {
    let data = {}
    if (user['optReceipt'] === 'pending') {
      data = { 'optReceipt': 'rejected'}
    }
    if (user['optEad'] === 'pending') {
      data = { 'optEad': 'rejected'}
    }
    if (user['i983'] === 'pending') {
      data = { 'i983': 'rejected'}
    }
    if (user['i20'] === 'pending') {
      data = { 'i20': 'rejected'}
    }

    axios.put(`http://localhost:8080/emp/info/visa/${user['_id']}`, data)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function openFeedback(user: any) {
    setCurrentUser(user['user']['_id'])
    setShowFeedback(true)
  }

  function sendNotification(user: any) {

  }

  function submitFeedback(user: any) {
    const data = { 'feedback': `${feedback}`}
    axios.put(`http://localhost:8080/emp/info/visa/${user}`, data)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    setShowFeedback(false);
  }

  function getFeedback(event: any) {
    setFeedback(event.target.value)
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Work Authorization</StyledTableCell>
              <StyledTableCell>Next Steps</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: any, i) => {
                return (
                  <StyledTableRow key={i}>
                    <StyledTableCell>{user['user']["userInfo"]['lastName']}</StyledTableCell>
                    <StyledTableCell>
                      <StyledTableRow >{user['user']['legal']['visaTitle']}</StyledTableRow>
                      <StyledTableRow >{'startDate : ' + user['user']['legal']['startDate'] + ' endDate : ' + user['user']['legal']['endDate']}</StyledTableRow>
                      <StyledTableRow >{getRemainDay(user)}</StyledTableRow>
                    </StyledTableCell>
                    <StyledTableCell>{getNextStep(user)}</StyledTableCell>
                    <StyledTableCell>
                      {getNextStep(user)==='Waiting for HR approval' && <div>
                        <button onClick={()=>approveDoc(user)}>approve</button>
                        <button onClick={()=>rejectDoc(user)}>reject</button>
                      </div>}
                      {getNextStep(user)==='Waiting for user to upload document again' && <div>
                        <button onClick={()=>openFeedback(user)}>Send Feedback</button>
                      </div>}
                      {getNextStep(user)==='Waiting for user to upload next document' && <div>
                        <button onClick={()=>sendNotification(user)}>Send Notification</button>
                      </div>}
                    </StyledTableCell>
                  </StyledTableRow>
                )
            })}

          </TableBody>
        </Table>
      </TableContainer>
          {showFeedback===true &&
                  <form>
                    <label>Send Feedback</label><br></br>
                    <input type='text' onChange={getFeedback}></input><br></br>
                    <button onClick={()=> submitFeedback(currentUser)}>send</button>
                  </form>
                }
    </>
  )
}

export default VisaStatusHr