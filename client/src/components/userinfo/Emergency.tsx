import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import axios, { AxiosResponse } from 'axios';
import FormControl from '@mui/material/FormControl';
import Modal from '@mui/material/Modal';
import { link } from '../Link'

type Emergency = {
    firstName: string,
    lastName: string,
    middleName: string,
    phone: string,
    email: string,
    relationship: string
}

const Emergency: React.FC = () =>{
    const { register, handleSubmit, formState: {errors}, reset } = useForm<Emergency>();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [relationship, setRelationship] = useState("");
    const [defaultData, setDefaultData] = useState<Emergency>({
        firstName: "",
        lastName: "",
        middleName: "",
        phone: "",
        email: "",
        relationship: ""
    })

    //Disable Fields until Edit button clicked
    const [disabled, setDisabled] = useState(true);

    //MAKE SURE TO EDIT THIS
    const onSubmit = async (data: Emergency) => {
        const token = localStorage.getItem('token');

        try {
            setDisabled(true);
            console.log("Sending Registration Data to Backend: ", data, {headers: { 'authorization': token }});
            await axios.put(`${link}/emergency`, data)
        } catch (err: any) {
            console.log(err);

        }
    }

    //GET Data
    useEffect(() => {
        const token = localStorage.getItem('token');
        const getData = async () => {
            try {
                await axios.get<Emergency>(`${link}/emergency`, {headers: {'authorization': token}})
                .then((data: AxiosResponse) => {
                    setDefaultData(data.data);
                    console.log(data.data);
                    setFirstName(data.data.firstName);
                    setLastName(data.data.lastName);
                    setMiddleName(data.data.middleName);
                    setPhone(data.data.phone);
                    setEmail(data.data.email);
                    setRelationship(data.data.relationship);
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
            firstName: defaultData.firstName,
            lastName: defaultData.lastName,
            middleName: defaultData.middleName,
            email: defaultData.email,
            phone: defaultData.phone,
            relationship: defaultData.relationship
        });
        setOpen(false);
        setDisabled(true);
    }

    return (
        <FormControl sx={{display: "block", flexDirection: "column", alignItems: "center", width: "50em"}}>
            {/**TODO: Add Button that adds extra fields for multiple emergency contacts */}
            <TextField 
                label="First Name" 
                size="small"
                variant="standard"
                type="text"
                id="firstName"
                {...register( "firstName", 
                    { 
                        required: "First Name field cannot be empty",
                        pattern: {
                                    value: /^[A-Z][a-z]$/,
                                    message: "First Name must only contain letters. First letter must be capitalized."
                        }   
                    }
                    )}
                fullWidth
                disabled={disabled}
                value={firstName}
                style={{marginTop: "2rem"}}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <ErrorMessage errors={errors} name="firstName" render={({ message }) => <p>{message}</p>} />

            <TextField 
                label="Middle Name" 
                size="small"
                variant="standard"
                type="text"
                id="middleName"
                {...register( "middleName", {
                    pattern: {
                                value: /^[A-Z][a-z]$/,
                                message: "Middle Name must only contain letters. First letter must be capitalized."
                    }   
                })}
                fullWidth
                disabled={disabled}
                value={middleName}
                style={{marginTop: "2rem"}}
                onChange={(e) => setMiddleName(e.target.value)}
            />
            <ErrorMessage errors={errors} name="middleName" render={({ message }) => <p>{message}</p>} />

            <TextField 
                label="Last Name" 
                size="small"
                variant="standard"
                type="text"
                id="lastName"
                {...register( "lastName", { required: "Last Name field cannot be empty", 
                            pattern: {
                                value: /^[A-Z][a-z]$/,
                                message: "Last Name must only contain letters. First letter must be capitalized."
                            }    
                        }
                    )}
                fullWidth
                disabled={disabled}
                value={lastName}
                style={{marginTop: "2rem"}}
                onChange={(e) => setLastName(e.target.value)}
            />
            <ErrorMessage errors={errors} name="lastName" render={({ message }) => <p>{message}</p>} />

            <TextField
                label="E-mail Address"
                size="small"
                variant="standard"
                type="email"
                id="email"
                {...register( "email", {
                    required: "Please enter an E-mail",
                    pattern: {
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "E-mail must be in xxx@yyy.zzz format"
                            }
                })}
                autoComplete="off"
                disabled={disabled}
                value={email}
                fullWidth
                style={{marginTop: "2rem"}}
                onChange={(e) => setEmail(e.target.value)}
            />
            <ErrorMessage errors={errors} name="email" render={({ message }) => <p>{message}</p>} />

            <TextField 
                    label="Phone Number" 
                    size="small"
                    variant="standard"
                    type="text"
                    id="phone"
                    {...register( "phone", 
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
                    value={phone}
                    style={{marginTop: "2rem"}}
                    onChange={(e) => setPhone(e.target.value)}
                />
            <ErrorMessage errors={errors} name="phone" render={({ message }) => <p>{message}</p>} />

            <TextField 
                label="Relationship" 
                size="small"
                variant="standard"
                type="text"
                id="relationship"
                {...register( "relationship", {
                    required: "Please enter your relationship",
                    pattern: {
                        value: /^[A-Za-z]$/,
                        message: "Relationship must only contain letters"
                    }
                })}
                fullWidth
                disabled={disabled}
                value={relationship}
                style={{marginTop: "2rem"}}
                onChange={(e) => setRelationship(e.target.value)}
            />
            <ErrorMessage errors={errors} name="relationship" render={({ message }) => <p>{message}</p>} />

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

export default Emergency;