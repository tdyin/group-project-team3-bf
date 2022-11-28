import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import Modal from '@mui/material/Modal';

type Address = {
    bldgapt: string,
    street: string,
    city: string,
    state: string,
    zip: string
}

const Address: React.FC = () => {
    const { register, handleSubmit, formState: {errors}, reset } = useForm<Address>();
    const [bldgapt, setBldgapt] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");

    //Disable fields until Edit button clicked
    const [disabled, setDisabled] = useState(true);

    //MAKE SURE TO EDIT THIS
    const onSubmit = async (data: Address) => {
        try {
            console.log("Sending Registration Data to Backend: ", data);
            await axios.put('http://localhost:8080/emp/info/address', data)
        } catch (err: any) {
            console.log(err);
        }
    }

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
            bldgapt: bldgapt,
            street: street,
            city: city,
            state: state,
            zip: zip
        });
        setOpen(false);
    }

    return (
        <FormControl onSubmit={handleSubmit(onSubmit)} sx={{display: "block", flexDirection: "column", alignItems: "center", width: "50em"}}>

                <TextField 
                    label="Building / Apartment #" 
                    size="small"
                    variant="standard"
                    type="text"
                    id="bldgapt"
                    {...register( "bldgapt", 
                        { 
                            pattern: {
                                        value: /^[a-zA-Z0-9-]$/,
                                        message: "Building / Apartment # must only contain letters and numbers. Character - is premitted"
                            }   
                        }
                        )}
                    fullWidth
                    disabled={disabled}
                    defaultValue={bldgapt}
                    style={{marginTop: "2rem"}}
                />
                <ErrorMessage errors={errors} name="bldgapt" render={({ message }) => <p>{message}</p>} />

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
                    defaultValue={bldgapt}
                    style={{marginTop: "2rem"}}
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
                    defaultValue={bldgapt}
                    style={{marginTop: "2rem"}}
                />
                <ErrorMessage errors={errors} name="city" render={({ message }) => <p>{message}</p>} />

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
                    defaultValue={bldgapt}
                    style={{marginTop: "2rem"}}
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
                                    <Typography>Are you sure you want to reset the fields?</Typography>
                                    <Button onClick={handleReset}>Reset</Button>
                                    <Button onClick={handleButtonClose}>Cancel</Button>
                                </Box>
                                
                        </Modal>
                        <Button type="submit" onClick={() => setDisabled(true)}>Update</Button>
                    </>
                }
        </FormControl>
    )
}

export default Address;