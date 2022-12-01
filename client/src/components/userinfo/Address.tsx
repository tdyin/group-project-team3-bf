import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import axios, { AxiosResponse } from 'axios';
import FormControl from '@mui/material/FormControl';
import Modal from '@mui/material/Modal';
import { link } from '../Link';

type Address = {
    bldgApt: string,
    street: string,
    city: string,
    state: string,
    zip: string
}

const Address: React.FC = () => {
    const { register, handleSubmit, formState: {errors}, reset } = useForm<Address>();
    const [bldgApt, setBldgapt] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [defaultData, setDefaultData] = useState<Address>({
        bldgApt: "",
        street: "",
        city: "",
        state: "",
        zip: ""
    });

    const [exampleState, setExampleState] = useState([]);
    
    //Disable fields until Edit button clicked
    const [disabled, setDisabled] = useState(true);

    //Edit Data
    const onSubmit = async (data: Address) => {
        const token = localStorage.getItem('token')
        try {
            setDisabled(true);
            console.log("Sending Registration Data to Backend: ", data, {headers: { 'authorization': token }});
            await axios.put(`${link}/address`, data)
        } catch (err: any) {
            console.log(err);
        }
    }

    //GET Data
    useEffect(() => {
        const token = localStorage.getItem('token');
        const getData = async () => {
            try {
                await axios.get<Address>(`${link}/address`, {headers: {'authorization': token}})
                .then((data: AxiosResponse) => {
                    setDefaultData(data.data);
                    console.log(data.data);
                    setBldgapt(data.data.bldgApt);
                    setStreet(data.data.street);
                    setCity(data.data.city);
                    setState(data.data.state);
                    setZip(data.data.zip); 
                })
            } catch (err) {
                console.log("Error Log: ", err);
            }
        }

        getData();
    }, [])
    //For Modals
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleButtonClose = () => setOpen(false);
    const handleClose = (e: any, reason: "backdropClick" | "escapeKeyDown") => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    }

    const handleReset = () => {
        reset({
            bldgApt: defaultData.bldgApt,
            street: defaultData.street,
            city: defaultData.city,
            state: defaultData.state,
            zip: defaultData.zip
        });
        setOpen(false);
        setDisabled(true);
    }

    return (
        <FormControl sx={{display: "block", flexDirection: "column", alignItems: "center", width: "50em"}}>

                <TextField 
                    label="Building / Apartment #" 
                    size="small"
                    variant="standard"
                    type="text"
                    id="bldgapt"
                    {...register( "bldgApt", 
                        { 
                            pattern: {
                                        value: /^[a-zA-Z0-9-]$/,
                                        message: "Building / Apartment # must only contain letters and numbers. Character - is premitted"
                            }   
                        }
                        )}
                    fullWidth
                    disabled={disabled}
                    value={bldgApt}
                    style={{marginTop: "2rem"}}
                    onChange={(e: any) => setBldgapt(e.target.value)}
                />
                <ErrorMessage errors={errors} name="bldgApt" render={({ message }) => <p>{message}</p>} />

                <TextField 
                    label="Street Address" 
                    size="small"
                    variant="standard"
                    type="text"
                    id="street"
                    {...register( "street", 
                        { 
                            required: "Please enter a Street Address",
                            pattern: {
                                        value: /^[a-zA-Z0-9- ]$/,
                                        message: "Street can only contain numbers, letters, space and - character"
                            }   
                        }
                        )}
                    fullWidth
                    disabled={disabled}
                    value={street}
                    style={{marginTop: "2rem"}}
                    onChange={(e:any) => setStreet(e.target.value)}
                />
                <ErrorMessage errors={errors} name="street" render={({ message }) => <p>{message}</p>} />

                <TextField 
                    label="City" 
                    size="small"
                    variant="standard"
                    type="text"
                    id="city"
                    {...register( "city", 
                        { 
                            required: "Please enter a City",
                            pattern: {
                                        value: /^[a-zA-Z]$/,
                                        message: "City can only contain letters"
                            }   
                        }
                        )}
                    fullWidth
                    disabled={disabled}
                    value={city}
                    style={{marginTop: "2rem"}}
                    onChange={(e: any) => setCity(e.target.value)}
                />
                <ErrorMessage errors={errors} name="city" render={({ message }) => <p>{message}</p>} />

                <TextField 
                    label="State" 
                    size="small"
                    variant="standard"
                    type="text"
                    id="statey"
                    {...register( "state", 
                        { 
                            required: "Please enter a State",
                            pattern: {
                                        value: /^[a-zA-Z]$/,
                                        message: "State can only contain letters"
                            }   
                        }
                        )}
                    fullWidth
                    disabled={disabled}
                    value={state}
                    style={{marginTop: "2rem"}}
                    onChange={(e: any) => setState(e.target.value)}
                />
                <ErrorMessage errors={errors} name="state" render={({ message }) => <p>{message}</p>} />

                <TextField 
                    label="Postal / Zip Code" 
                    size="small"
                    variant="standard"
                    type="text"
                    id="zip"
                    {...register( "zip", 
                        { 
                            required: "Please enter a Postal Code or a Zip Code",
                            pattern: {
                                        value: /^[a-zA-Z0-9- ]$/,
                                        message: "Postal or Zip Code can only contain letters or numbers"
                            }   
                        }
                        )}
                    fullWidth
                    disabled={disabled}
                    value={zip}
                    style={{marginTop: "2rem"}}
                    onChange={(e: any) => setZip(e.target.value)}
                />
                <ErrorMessage errors={errors} name="city" render={({ message }) => <p>{message}</p>} />

                { disabled === true ? 
                    <Button type="button" onClick={() => setDisabled(false)}>Edit</Button>
                    :
                    <>
                        <Button onClick={handleOpen}>Clear</Button>
                        <Modal 
                            open={open}
                            onClose={handleClose}
                            >
                                <Box                             
                                sx={{
                                position: 'absolute' as 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                bgcolor: 'black',
                                border: '2px solid #000',
                                boxShadow: 24,
                                pt: 2,
                                px: 4,
                                pb: 3,
                                color: 'white'
                            }}>
                                    <Typography>Are you sure you want to reset the fields and cancel editing?</Typography>
                                    <Button onClick={handleReset}>Reset</Button>
                                    <Button onClick={handleButtonClose}>Cancel</Button>
                                </Box>
                                
                        </Modal>
                        <Button type="submit" onClick={handleSubmit(onSubmit)} >Update</Button>
                    </>
                }
        </FormControl>
    )
}

export default Address;