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

type User = {
    firstName: string,
    lastName: string,
    middleName: string,
    preferredName: string,
    profilePicture: string,
    email: string,
    ssn: string,
    dob: string,
    gender: string
}
//Display Name information
const Name: React.FC = () => {
    const { register, handleSubmit, formState: {errors}, reset } = useForm<User>();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [preferredName, setPreferredName] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [email, setEmail] = useState("");
    const [ssn, setSSN] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");

    //Disable editing form until Edit button is clicked
    const [disabled, setDisabled] = useState(true);

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
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            preferredName: preferredName,
            email: email,
            ssn: ssn,
            dob: dob,
            gender: gender
        });
        setOpen(false);
    }

    const onSubmit = async (data: User) => {
        try {
            console.log("Sending Registration Data to Backend: ", data);
            await axios.put('http://localhost:8080/emp/info/userinfo', data)
        } catch (err: any) {
            console.log(err);

        }
    }

    return (
        <FormControl onSubmit={handleSubmit(onSubmit)} sx={{display: "block", flexDirection: "column", alignItems: "center", width: "50em"}}>
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
                defaultValue={firstName}
                style={{marginTop: "2rem"}}
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
                defaultValue={middleName}
                style={{marginTop: "2rem"}}
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
                defaultValue={lastName}
                style={{marginTop: "2rem"}}
            />
            <ErrorMessage errors={errors} name="lastName" render={({ message }) => <p>{message}</p>} />

            <TextField 
                label="Preferred Name" 
                size="small"
                variant="standard"
                type="text"
                id="preferredName"
                {...register( "preferredName", {
                    pattern: {
                                value: /^[A-Z][a-z]$/,
                                message: "Name must only contain letters. First letter must be capitalized."
                    }   
                })}
                fullWidth
                disabled={disabled}
                defaultValue={preferredName}
                style={{marginTop: "2rem"}}
            />
            <ErrorMessage errors={errors} name="preferredName" render={({ message }) => <p>{message}</p>} />

            <Button>
                Profile Picture
            </Button>

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
                defaultValue={email}
                fullWidth
                style={{marginTop: "2rem"}}
            />
            <ErrorMessage errors={errors} name="email" render={({ message }) => <p>{message}</p>} />

            <TextField 
                label="Social Security Number (SSN)" 
                size="small"
                variant="standard"
                type="text"
                id="ssn"
                {...register( "ssn", {
                    pattern: {
                                value: /^(?!0{3})(?!6{3})[0-8]\d{2}-(?!0{2})\d{2}-(?!0{4})\d{4}$/,
                                message: "SSN must only contain numbers in XXX-XX-XXXX format"
                    }   
                })}
                fullWidth
                disabled={disabled}
                defaultValue={ssn}
                style={{marginTop: "2rem"}}
            />
            <ErrorMessage errors={errors} name="ssn" render={({ message }) => <p>{message}</p>} />

            <TextField 
                label="Date of Birth" 
                size="small"
                variant="standard"
                type="date"
                id="dob"
                {...register( "dob")}
                fullWidth
                disabled={disabled}
                defaultValue={dob}
                style={{marginTop: "2rem"}}
            />
            <ErrorMessage errors={errors} name="dob" render={({ message }) => <p>{message}</p>} />

            <TextField 
                label="Gender" 
                size="small"
                variant="standard"
                type="text"
                id="gender"
                {...register( "gender")}
                fullWidth
                disabled={disabled}
                defaultValue={gender}
                style={{marginTop: "2rem"}}
            >
                <MenuItem value="Male">
                    Male
                </MenuItem>
                <MenuItem value="Female">
                    Female
                </MenuItem>
                <MenuItem value="I do not wish to answer.">
                    Prefer not to say
                </MenuItem>
            </TextField>
            <ErrorMessage errors={errors} name="gender" render={({ message }) => <p>{message}</p>} />

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

export default Name;