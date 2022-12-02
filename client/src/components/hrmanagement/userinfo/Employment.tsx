import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'
import axios, { AxiosResponse } from 'axios';
import { hrLink } from '../../Link';

type Employment = {
    visaTitle: string,
    startDate: string,
    endDate: string
}

interface IUserID {
    userid: string
}

//Display Contact information
const Employment: React.FC<IUserID> = ({userid}: any) => {
    const [data, setData] = useState<Employment>();

    //GET Data
    useEffect(() => {
        const token = localStorage.getItem('token');
        const getData = async () => {
            try {
                await axios.get<Employment>(`${hrLink}/hiring/${userid}/employment/`, {headers: {'authorization': token}})
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
                label="Visa Title" 
                size="small"
                variant="standard"
                type="text"
                id="visaTitle"
                fullWidth
                disabled
                value={data!.visaTitle}
                style={{marginTop: "2rem"}}
            />

            <TextField 
                label="startDate" 
                size="small"
                variant="standard"
                type="text"
                id="startDate"
                fullWidth
                disabled
                value={data!.startDate}
                style={{marginTop: "2rem"}}
            />

            <TextField 
                label="End Date" 
                size="small"
                variant="standard"
                type="text"
                id="endDate"
                fullWidth
                disabled
                value={data!.endDate}
                style={{marginTop: "2rem"}}
            />
        </Box>
    )
}

export default Employment;