import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import Modal from '@mui/material/Modal';

type Contact = {
    cell: string,
    work: string
}

const Contact: React.FC = () => {
    const { register, handleSubmit, formState: {errors}, reset } = useForm<Contact>();
    const [cell, setCell] = useState("");
    const [work, setWork] = useState("");

    //Disable Fields until Edit button clicked
    const [disabled, setDisabled] = useState(true);

    //MAKE SURE TO EDIT THIS
    const onSubmit = async (data: Contact) => {
        try {
            console.log("Sending Registration Data to Backend: ", data);
            await axios.put('http://localhost:8080/emp/info/contact', data)
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
            cell: cell,
            work: work
        });
        setOpen(false);
    }

    return (
        <FormControl onSubmit={handleSubmit(onSubmit)} sx={{display: "block", flexDirection: "column", alignItems: "center", width: "50em"}}>
                <TextField 
                        label="Cell Phone Number" 
                        size="small"
                        variant="standard"
                        type="text"
                        id="cell"
                        {...register( "cell", 
                            { 
                                required: "Please input a Phone number",
                                pattern: {
                                            value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                                            message: "Phone Number must only contain numbers and may use - characters"
                                }   
                            }
                            )}
                        fullWidth
                        disabled={disabled}
                        defaultValue={cell}
                        style={{marginTop: "2rem"}}
                    />
                <ErrorMessage errors={errors} name="cell" render={({ message }) => <p>{message}</p>} />

                <TextField 
                        label="Work Phone Number" 
                        size="small"
                        variant="standard"
                        type="text"
                        id="work"
                        {...register( "work", 
                            { 
                                pattern: {
                                            value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                                            message: "Phone Number must only contain numbers and may use - characters"
                                }   
                            }
                            )}
                        fullWidth
                        disabled={disabled}
                        defaultValue={work}
                        style={{marginTop: "2rem"}}
                    />
                <ErrorMessage errors={errors} name="work" render={({ message }) => <p>{message}</p>} />

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

export default Contact;