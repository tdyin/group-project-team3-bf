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
  const [users, setUsers] = useState([] as any[])

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
    var date1 = new Date(user['legal']['endDate']);
    var date2 = new Date();
    var Difference_In_Time = date1.getTime() - date2.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Math.floor(Difference_In_Days)
  }

  function getNextStep(user: any) {
    if (user['workAuthStatus']['optReceipt'] === '') {
      return 'Waiting for user to upload next document'
    } else if (user['workAuthStatus']['optReceipt'] === 'pending') {
      return "Waiting for HR approval"
    } else if (user['workAuthStatus']['optReceipt'] === 'rejected') {
      return 'Waiting for user to upload optReceipt again'
    } else if (user['workAuthStatus']['optReceipt'] === 'approved' && user['workAuthStatus']['optEad'] === '') {
      return 'Waiting for user to upload next document'
    } else if (user['workAuthStatus']['optEad'] === 'pending') {
      return "Waiting for HR approval"
    } else if (user['workAuthStatus']['optEad'] === 'rejected') {
      return 'Waiting for user to upload optEad again'
    } else if (user['workAuthStatus']['optEad'] === 'approved' && user['workAuthStatus']['i983'] === '') {
      return 'Waiting for user to upload next document'
    } else if (user['workAuthStatus']['i983'] === 'pending') {
      return "Waiting for HR approval"
    } else if (user['workAuthStatus']['i983'] === 'rejected') {
      return 'Waiting for user to upload i983 again'
    } else if (user['workAuthStatus']['i983'] === 'approved' && user['workAuthStatus']['i20'] === '') {
      return 'Waiting for user to upload next document'
    } else if (user['workAuthStatus']['i20'] === 'pending') {
      return "Waiting for HR approval"
    } else if (user['workAuthStatus']['i20'] === 'rejected') {
      return 'Waiting for user to upload i20 again'
    } else {
      return 'User has uploaded all documents'
    }
  }

  function approveDoc(user: any) {

  }

  function rejectDoc(user: any) {

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
                    <StyledTableCell>{user['userInfo']['firstName'] + ' ' + user['userInfo']['lastName']}</StyledTableCell>
                    <StyledTableCell>
                      <StyledTableRow >{user['legal']['visaTitle']}</StyledTableRow>
                      <StyledTableRow >{'startDate : ' + user['legal']['startDate'] + ' endDate : ' + user['legal']['endDate']}</StyledTableRow>
                      <StyledTableRow >{getRemainDay(user)}</StyledTableRow>
                    </StyledTableCell>
                    <StyledTableCell>{getNextStep(user)}</StyledTableCell>
                    <StyledTableCell>
                      <button onClick={()=> approveDoc(user)}>Approve</button>
                      <button onClick={()=> rejectDoc(user)}>Reject</button>
                    </StyledTableCell>
                  </StyledTableRow>
                )
            })}

          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default VisaStatusHr