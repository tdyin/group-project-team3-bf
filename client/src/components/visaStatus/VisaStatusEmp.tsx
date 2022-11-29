import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VisaStatusEmp: React.FC = () => {

  const [isOpt, setIsOpt] = useState(false);
  const [optReceipt, setOptReceipt] = useState('pending');
  const [optEad, setOptEad] = useState('');
  const [i983, setI983] = useState('');
  const [i20, setI20] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/profile')
      .then((data) => {
        if(data.data[0].visaTitle === 'F1(CPT/OPT)') {
          setIsOpt(true)
        }
        console.log(data.data[0], data.data[1])
      })
      .catch((err) => {
        console.log(err)
      })
  },[])



  return (
    <div>
        {isOpt === true &&<div>OPT Receipt Status:
          {optReceipt === 'pending' && <div>Waiting for HR to approve your OPT Receipt</div>}
          {optReceipt === 'approved' && <div>Please upload a copy of your OPT EAD</div>}
          {optReceipt === 'rejected' && <div>See HR's feedback: not done yet</div>}
          <button>Upload OPT Receipt</button>
        </div>}
        <br></br>

        {optReceipt === 'approved' && <div>OPT EAD Status:
          {optEad === 'pending' && <div>Waiting for HR to approve your OPT EAD</div>}
          {optEad === 'approved' && <div>“Please download and fill out the I-983 form</div>}
          {optEad === 'rejected' && <div>See HR's feedback: not done yet</div>}
          <button>Upload OPT EAD</button>
        </div>}<br></br>
        {optEad === 'approved' && <div>I983 Status:
          {i983 === 'pending' && <div>Waiting for HR to approve and sign your I-983</div>}
          {i983 === 'approved' && <div> “Please send the I-983 along with all necessary documents to your school and upload the new I-20</div>}
          {i983 === 'rejected' && <div>See HR's feedback: not done yet</div>}
          <button>Upload I983 document</button>
        </div>}<br></br>
        {i983 === 'approved' && <div>I20 Status:
          {i20 === 'pending' && <div>Waiting for HR to approve your I-20</div>}
          {i20 === 'approved' && <div>All documents have been approved</div>}
          {i20 === 'rejected' && <div>See HR's feedback: not done yet</div>}
          <button>Upload I20 document</button>
        </div>}
    </div>
  )
}

export default VisaStatusEmp