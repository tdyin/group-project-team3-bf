import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'
import axios, { AxiosResponse } from 'axios';
import { hrLink } from '../../Link';

type Documents = {
    driverLicense: string,
    workAuth: string
}

interface IUserID {
    userid: string
}

//Display Contact information
const Documents: React.FC<IUserID> = ({userid}: any) => {
    const [data, setData] = useState<Documents>();

    //GET Data
    useEffect(() => {
        const token = localStorage.getItem('token');
        const getData = async () => {
            try {
                await axios.get<Documents>(`${hrLink}/hiring/${userid}/documents/`, {headers: {'authorization': token}})
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
                label="Driver's License / Green Card" 
                size="small"
                variant="standard"
                type="file"
                id="driverLicense"
                fullWidth
                disabled
                value={data?.driverLicense}
                style={{marginTop: "2rem"}}
            />

            <TextField 
                label="Street" 
                size="small"
                variant="standard"
                type="file"
                id="street"
                fullWidth
                disabled
                value={data?.workAuth}
                style={{marginTop: "2rem"}}
            />
        </Box>
    )
}

export default Documents;