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
//     </div>
//   )
// }

// export default VisaStatusEmp


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VisaStatusHr: React.FC = () => {
  const [users, setUsers] = useState([] as any[])

  useEffect(() => {
    axios.get('http://localhost:8080/emp/info/visa')
      .then((data) => {
        console.log(data.data)
        setUsers(data.data);
      })
      .catch((err) => {
        console.log(err)
      })
  },[])



  return (
    <>
      <div>{users.map((user, i) => {
        return (

          <div key={i}>
            <table>
              <tr>
                <th>Name</th>
                <th>Work Authorization</th>
                <th>Next Steps</th>
                <th>Action</th>
              </tr>
              <tr>
                <td>{user['userInfo']['firsName'] + ' ' + user['userInfo']['lastName']}</td>
                <td>
                  <tr>{user['legal']['visaTitle']}</tr>
                  <tr>{user['legal']['startDate'].substring(0, 10)}</tr>
                  <tr>Number of Days Remaining</tr>
                </td>
                <td></td>
                <td></td>
              </tr>

            </table>
          </div>
        )
      })
        }</div>
    </>
  )
}

export default VisaStatusHr