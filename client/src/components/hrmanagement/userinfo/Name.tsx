import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
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
    const [data, setData] = useState<User>({
        firstName: " ",
        lastName: " ",
        middleName: " ",
        preferredName: " ",
        profilePic: " ",
        email: " ",
        ssn: " ",
        dob: " ",
        gender: " " 
    });

    //GET Data
    useEffect(() => {
        const token = localStorage.getItem('token');
        const getData = async () => {
            try {
                await axios.get<User>(`${hrLink}/hiring/${userid}/userinfo/`, {headers: {'authorization': token}})
                .then((response: AxiosResponse) => {
                    console.log("Received User Info Data: " , response.data);
                    setData(response.data);
                })
            } catch (err) {
                console.log("Error Log in Nametsx: " , err);
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
                value={data?.firstName}
                style={{marginTop: "2em"}}
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="Middle Name" 
                size="small"
                variant="standard"
                type="text"
                id="middleName"
                fullWidth
                disabled
                value={data?.middleName}
                style={{marginTop: "2em"}}
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="Last Name" 
                size="small"
                variant="standard"
                type="text"
                id="lastName"
                fullWidth
                disabled
                value={data?.lastName}
                style={{marginTop: "2em"}}
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="Preferred Name" 
                size="small"
                variant="standard"
                type="text"
                id="preferredName"
                fullWidth
                disabled
                value={data?.preferredName}
                style={{marginTop: "2em"}}
                InputLabelProps={{ shrink: true }}
            />

            <Typography sx={{ marginTop: "rem" }}>Profile Picture</Typography>
            <img src={data?.profilePic} style={{height: "100px", width: "100px"}}/>
            
            <TextField
                label="E-mail Address"
                size="small"
                variant="standard"
                type="email"
                id="email"
                autoComplete="off"
                disabled
                value={data?.email}
                fullWidth
                style={{marginTop: "2em"}}
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="Social Security Number (SSN)" 
                size="small"
                variant="standard"
                type="text"
                id="ssn"
                fullWidth
                disabled
                value={data?.ssn}
                style={{marginTop: "2em"}}
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="Date of Birth" 
                size="small"
                variant="standard"
                type="date"
                id="dob"
                fullWidth
                disabled
                value={data?.dob}
                style={{marginTop: "2em"}}
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="Gender" 
                size="small"
                variant="standard"
                type="text"
                id="gender"
                fullWidth
                disabled
                value={data?.gender}
                style={{marginTop: "2em"}}
                InputLabelProps={{ shrink: true }}
            />
        </Box>
    )
}

export default Name;