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
import { link } from '../Link'

type Contact = {
    cellPhone: string,
    workPhone: string
}

const Contact: React.FC = () => {
    const { register, handleSubmit, formState: {errors}, reset } = useForm<Contact>();
    const [cellPhone, setCell] = useState("");
    const [work, setWork] = useState("");
    const [defaultData, setDefaultData] = useState<Contact>({
        cellPhone: "",
        workPhone: ""
    })

    //Disable Fields until Edit button clicked
    const [disabled, setDisabled] = useState(true);

    //Edit Data
    const onSubmit = async (data: Contact) => {
        const token = localStorage.getItem('token');
        try {
            setDisabled(true);
            console.log("Sending Contact Info to Backend: ", data);
            await axios.put(`${link}/contact`, data, {headers: { 'authorization' : token}})
        } catch (err: any) {
            console.log(err);
        }
    }

    //GET Data
    useEffect(() => {
        const token = localStorage.getItem('token');
        const getData = async () => {
            try {
                await axios.get(`${link}/contact`, {headers: {'authorization': token}})
                .then((data: any) => {
                    setDefaultData(data.data);
                    console.log(data.data);
                    setCell(data.data.cellPhone);
                    setWork(data.data.workPhone);
                })
            } catch (err) {
                console.log("Error Log: ", err)
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
            cellPhone: defaultData.cellPhone,
            workPhone: defaultData.workPhone
        });
        setOpen(false);
        setDisabled(true);
    }

    return (
        <FormControl sx={{display: "block", flexDirection: "column", alignItems: "center", width: "50em"}}>
                <TextField 
                        label="Cell Phone Number" 
                        size="small"
                        variant="standard"
                        type="text"
                        id="cellPhone"
                        {...register( "cellPhone", 
                            { 
                                pattern: {
                                            value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                                            message: "Phone Number must only contain numbers and may use - characters"
                                }   
                            }
                            )}
                        fullWidth
                        disabled={disabled}
                        value={cellPhone}
                        style={{marginTop: "2rem"}}
                        onChange={(e) => setCell(e.target.value)}
                    />
                <ErrorMessage errors={errors} name="cellPhone" render={({ message }) => <p>{message}</p>} />

                <TextField 
                        label="Work Phone Number" 
                        size="small"
                        variant="standard"
                        type="text"
                        id="workPhone"
                        {...register( "workPhone", 
                            { 
                                pattern: {
                                            value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                                            message: "Phone Number must only contain numbers and may use - characters"
                                }   
                            }
                            )}
                        fullWidth
                        disabled={disabled}
                        value={work}
                        style={{marginTop: "2rem"}}
                        onChange={(e) => setWork(e.target.value)}
                    />
                <ErrorMessage errors={errors} name="workPhone" render={({ message }) => <p>{message}</p>} />

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

export default Contact;