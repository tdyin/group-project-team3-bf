import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'
import axios, { AxiosResponse } from 'axios';
import { hrLink } from '../../Link';

type Phone = {
    cellPhone: string,
    workPhone: string
}

interface IUserID {
    userid: string
}

//Display Contact information
const ContactInfo: React.FC<IUserID> = ({userid}: any) => {
    const [data, setData] = useState<Phone>();

    //GET Data
    useEffect(() => {
        const token = localStorage.getItem('token');
        const getData = async () => {
            try {
                await axios.get<Phone>(`${hrLink}/hiring/${userid}/contact/`, {headers: {'authorization': token}})
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
                label="Building / Apartment #" 
                size="small"
                variant="standard"
                type="text"
                id="bldgApt"
                fullWidth
                disabled
                value={data!.cellPhone}
                style={{marginTop: "2rem"}}
            />

            <TextField 
                label="Street" 
                size="small"
                variant="standard"
                type="text"
                id="street"
                fullWidth
                disabled
                value={data!.workPhone}
                style={{marginTop: "2rem"}}
            />
        </Box>
    )
}

export default ContactInfo;