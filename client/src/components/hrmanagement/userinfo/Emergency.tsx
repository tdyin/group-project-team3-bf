import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'
import axios, { AxiosResponse } from 'axios';
import { hrLink } from '../../Link';

type Emergency = {
    firstName: string,
    lastName: string,
    middleName: string,
    phone: string,
    email: string,
    relationship: string
}

interface IUserID {
    userid: string
}

//Display Contact information
const Emergency: React.FC<IUserID> = ({userid}: any) => {
    const [data, setData] = useState<Emergency>();

    //GET Data
    useEffect(() => {
        const token = localStorage.getItem('token');
        const getData = async () => {
            try {
                await axios.get<Emergency>(`${hrLink}/hiring/${userid}/emergencycontact/`, {headers: {'authorization': token}})
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
                value={data?.firstName}
                style={{marginTop: "2rem"}}
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
                style={{marginTop: "2rem"}}
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
                style={{marginTop: "2rem"}}
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="Phone Number" 
                size="small"
                variant="standard"
                type="text"
                id="phone"
                fullWidth
                disabled
                value={data?.phone}
                style={{marginTop: "2rem"}}
                InputLabelProps={{ shrink: true }}
            />      

            <TextField 
                label="E-mail Address" 
                size="small"
                variant="standard"
                type="text"
                id="email"
                fullWidth
                disabled
                value={data?.email}
                style={{marginTop: "2rem"}}
                InputLabelProps={{ shrink: true }}
            />   

            <TextField 
                label="Relationship" 
                size="small"
                variant="standard"
                type="text"
                id="relationship"
                fullWidth
                disabled
                value={data?.relationship}
                style={{marginTop: "2rem"}}
                InputLabelProps={{ shrink: true }}
            />         
        </Box>
    )
}

export default Emergency;