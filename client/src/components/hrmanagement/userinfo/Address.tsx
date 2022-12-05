import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'
import axios, { AxiosResponse } from 'axios';
import { hrLink } from '../../Link';

type Address = {
    bldgApt: string,
    street: string,
    city: string,
    state: string,
    zip: string
}

interface IUserID {
    userid: string
}

//Display Address information
const Address: React.FC<IUserID> = ({userid}: any) => {
    const [data, setData] = useState<Address>();

    //GET Data
    useEffect(() => {
        const token = localStorage.getItem('token');
        const getData = async () => {
            try {
                await axios.get<Address>(`${hrLink}/hiring/${userid}/address/`, {headers: {'authorization': token}})
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
                value={data?.bldgApt}
                style={{marginTop: "2rem"}}
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="Street" 
                size="small"
                variant="standard"
                type="text"
                id="street"
                fullWidth
                disabled
                value={data?.street}
                style={{marginTop: "2rem"}}
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="City" 
                size="small"
                variant="standard"
                type="text"
                id="city"
                fullWidth
                disabled
                value={data?.city}
                style={{marginTop: "2rem"}}
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="State" 
                size="small"
                variant="standard"
                type="text"
                id="state"
                fullWidth
                disabled
                value={data?.state}
                style={{marginTop: "2rem"}}
                InputLabelProps={{ shrink: true }}
            />

            <TextField
                label="Postal / Zip Code"
                size="small"
                variant="standard"
                type="text"
                id="zip"
                autoComplete="off"
                disabled
                value={data?.zip}
                fullWidth
                style={{marginTop: "2rem"}}
                InputLabelProps={{ shrink: true }}
            />
        </Box>
    )
}

export default Address;