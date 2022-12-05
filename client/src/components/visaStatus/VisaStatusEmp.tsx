// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const VisaStatusEmp: React.FC = () => {

//   const [isOpt, setIsOpt] = useState(false);
//   const [optReceipt, setOptReceipt] = useState('pending');
//   const [optEad, setOptEad] = useState('');
//   const [i983, setI983] = useState('');
//   const [i20, setI20] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     axios.get('http://localhost:8080/emp/info/docStatus', {headers: {
//       'authorization': token
//     }})
//       .then((data) => {
//         console.log(data.data[0])
//         if(data.data[0].legal.visaTitle === 'F1(CPT/OPT)') {
//           setIsOpt(true)
//         }
//            setOptReceipt(data.data[0].workAuthStatus.optReceipt);
//            setOptEad(data.data[0].workAuthStatus.optEad);
//            setI983(data.data[0].workAuthStatus.i983);
//            setI20(data.data[0].workAuthStatus.i20);
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   },[])


//   function upLoadDoc(event: any) {
//     var x = event.target.id;
//     switch (x) {
//       case 'receipt':
//         console.log('receipt')
//         break;
//       case 'ead':
//         console.log('ead')
//         break;
//       case 'i983':
//         console.log('i983')
//         break;
//       case 'i20':
//         console.log('i20')
//         break;
//       default:
//         return false;
//     }
//   }

//   return (
//     <div>
//         {/* {isOpt === true && */}
//         <div>
//           <button type='button' id='receipt' onClick={upLoadDoc} disabled={optReceipt==='approved'}>Upload OPT Receipt</button>
//           <div>OPT Receipt Status:
//             {optReceipt === 'pending' && <div>Waiting for HR to approve your OPT Receipt</div>}
//             {optReceipt === 'approved' && <div>Please upload a copy of your OPT EAD</div>}
//             {optReceipt === 'rejected' && <div>See HR's feedback: not done yet</div>}
//             <br></br>
//             <button type='button' id='ead' onClick={upLoadDoc} disabled={optReceipt!=='approved' || optEad==='approved'}>Upload OPT EAD</button>
//           </div>
//         </div>
//         {/* } */}
//         <br></br>

//         {optEad !== '' &&
//         <div>OPT EAD Status:
//           {optEad === 'pending' && <div>Waiting for HR to approve your OPT EAD</div>}
//           {optEad === 'approved' && <div>“Please download and fill out the I-983 form</div>}
//           {optEad === 'rejected' && <div>See HR's feedback: not done yet</div>}
//           <br></br>
//           <button type='button' id='i983' onClick={upLoadDoc} disabled={optEad!=='approved' || i983==='approved'}>Upload I983 document</button>
//         </div>
//         }
//         <br></br>
//         {i983 !== '' && <div>I983 Status:
//           {i983 === 'pending' && <div>Waiting for HR to approve and sign your I-983</div>}
//           {i983 === 'approved' && <div> “Please send the I-983 along with all necessary documents to your school and upload the new I-20</div>}
//           {i983 === 'rejected' && <div>See HR's feedback: not done yet</div>}
//           <br></br>
//           <button type='button' id='i20' onClick={upLoadDoc} disabled={i983!=='approved' || i20==='approved'}>Upload I20 document</button>
//         </div>}<br></br>
//         {i20 !== '' && <div>I20 Status:
//           {i20 === 'pending' && <div>Waiting for HR to approve your I-20</div>}
//           {i20 === 'approved' && <div>All documents have been approved</div>}
//           {i20 === 'rejected' && <div>See HR's feedback: not done yet</div>}
//         </div>}
//         <div>Feedback from HR: </div>
//     </div>
//   )
// }

// export default VisaStatusEmp


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