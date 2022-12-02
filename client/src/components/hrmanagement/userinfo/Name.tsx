import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import axios, { AxiosResponse } from 'axios';
import { hrLink } from '../../Link';

type User = {
    firstName: string,
    lastName: string,
    middleName: string,
    preferredName: string,
    profilePic: string,
    email: string,
    ssn: string,
    dob: string,
    gender: string
}

interface IUserID {
    userid: string
}

//Display Name information
const Name: React.FC<IUserID> = ({userid}: any) => {
    const [data, setData] = useState<User>();

    //GET Data
    useEffect(() => {
        const token = localStorage.getItem('token');
        const getData = async () => {
            try {
                await axios.get<User>(`${hrLink}/hiring/${userid}/userinfo/`, {headers: {'authorization': token}})
                .then((response: AxiosResponse) => {
                    console.log(response.data);
                    setData(response.data);
                })
            } catch (err) {
                console.log("Error Log: " , err);
            }
        }
        getData();
    }, [])

    return (
        <Box sx={{display: "block", flexDirection: "column", alignItems: "center", width: "50em"}}>
            <TextField 
                label="First Name" 
                size="small"
                variant="standard"
                type="text"
                id="firstName"
                fullWidth
                disabled
                value={data!.firstName}
                style={{marginTop: "2rem"}}
            />

            <TextField 
                label="Middle Name" 
                size="small"
                variant="standard"
                type="text"
                id="middleName"
                fullWidth
                disabled
                value={data!.middleName}
                style={{marginTop: "2rem"}}
            />

            <TextField 
                label="Last Name" 
                size="small"
                variant="standard"
                type="text"
                id="lastName"
                fullWidth
                disabled
                value={data!.lastName}
                style={{marginTop: "2rem"}}
            />

            <TextField 
                label="Preferred Name" 
                size="small"
                variant="standard"
                type="text"
                id="preferredName"
                fullWidth
                disabled
                value={data!.preferredName}
                style={{marginTop: "2rem"}}
            />

            <Button>
                Profile Picture
            </Button>

            <TextField
                label="E-mail Address"
                size="small"
                variant="standard"
                type="email"
                id="email"
                autoComplete="off"
                disabled
                value={data!.email}
                fullWidth
                style={{marginTop: "2rem"}}
            />

            <TextField 
                label="Social Security Number (SSN)" 
                size="small"
                variant="standard"
                type="text"
                id="ssn"
                fullWidth
                disabled
                value={data!.ssn}
                style={{marginTop: "2rem"}}
            />

            <TextField 
                label="Date of Birth" 
                size="small"
                variant="standard"
                type="date"
                id="dob"
                fullWidth
                disabled
                value={data!.dob}
                style={{marginTop: "2rem"}}
            />

            <TextField 
                label="Gender" 
                size="small"
                variant="standard"
                type="text"
                id="gender"
                fullWidth
                disabled
                value={data!.gender}
                style={{marginTop: "2rem"}}
            />
        </Box>
    )
}

export default Name;