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
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

type User = {
    firstName: string,
    lastName: string,
    middleName: string,
    preferredName: string,
    profilePic: string,
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
    const [profilePic, setProfilePic] = useState(" ");
    const [email, setEmail] = useState("");
    const [ssn, setSSN] = useState("");
    const [dob, setDob] = useState(" ");
    const [gender, setGender] = useState(" ");

    const [defaultData, setDefaultData] = useState<User>({
        firstName: "",
        lastName: "",
        middleName: "",
        preferredName: "",
        profilePic: "",
        email: "",
        ssn: "",
        dob: "",
        gender: ""
    })

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
            firstName: defaultData.firstName,
            lastName: defaultData.lastName,
            middleName: defaultData.middleName,
            preferredName: defaultData.preferredName,
            profilePic: defaultData.profilePic,
            email: defaultData.email,
            ssn: defaultData.ssn,
            dob: defaultData.dob,
            gender: defaultData.gender
        });
        setOpen(false);
        setDisabled(true);
    }

    const onSubmit = async (data: User) => {
        const token = localStorage.getItem('token');
        data.gender = gender;
        try {
            setDisabled(true);
            console.log("Sending Registration Data to Backend: ", data);
            await axios.put(`${link}/userinfo`, data, {headers: { 'authorization': token }})
        } catch (err: any) {
            console.log(err);

        }
    }

    //GET Data
    useEffect(() => {
        const token = localStorage.getItem('token');
        const getData = async () => {
            try {
                await axios.get<User>(`${link}/userinfo`, {headers: {'authorization': token}})
                .then((data: AxiosResponse) => {
                    console.log(data.data);
                    setDefaultData(data.data);
                    setFirstName(data.data.firstName);
                    setLastName(data.data.lastName);
                    setMiddleName(data.data.middleName);
                    setPreferredName(data.data.preferredName);
                    setEmail(data.data.email);
                    setProfilePic(data.data.profilePic);
                    setSSN(data.data.ssn);
                    setDob(data.data.dob);
                    setGender(data.data.gender);
                })
            } catch (err) {
                console.log("Error Log: " , err);
            }
        }
        getData();
    }, [])

    return (
        <FormControl sx={{display: "block", flexDirection: "column", alignItems: "center", width: "50em"}}>
            <TextField 
                label="First Name" 
                size="small"
                variant="standard"
                type="text"
                id="firstName"
                {...register( "firstName", 
                    { 
                        pattern: {
                                    value: /[A-Z][a-z]/,
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
                                value: /[A-Z][a-z]/,
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
                {...register( "lastName", {  
                            pattern: {
                                value: /[A-Z][a-z]/,
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
                label="Preferred Name" 
                size="small"
                variant="standard"
                type="text"
                id="preferredName"
                {...register( "preferredName", {
                    pattern: {
                                value: /[A-Z][a-z]/,
                                message: "Name must only contain letters. First letter must be capitalized."
                    }   
                })}
                fullWidth
                disabled={disabled}
                value={preferredName}
                style={{marginTop: "2rem"}}
                onChange={(e) => setPreferredName(e.target.value)}
            />
            <ErrorMessage errors={errors} name="preferredName" render={({ message }) => <p>{message}</p>} />

            
            <img src={profilePic} style={{height: "100px", width: "100px", marginTop: "2rem"}}/>

            <TextField 
                label="Upload New Photo"
                size="small"
                variant="standard"
                type="file"
                id="profilePic"
                {...register("profilePic")}
                fullWidth
                disabled={disabled}
                style={{marginTop: "2rem"}}
                InputLabelProps={{shrink: true}}
                />

            <TextField
                label="E-mail Address"
                size="small"
                variant="standard"
                type="email"
                id="email"
                {...register( "email", {
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
                value={ssn}
                style={{marginTop: "2rem"}}
                onChange={(e) => setSSN(e.target.value)}
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
                value={dob}
                style={{marginTop: "2rem"}}
                onChange={(e) => setDob(e.target.value)}
            />
            <ErrorMessage errors={errors} name="dob" render={({ message }) => <p>{message}</p>} />

            <Typography sx={{marginTop: "2rem", fontSize: "10px"}}>Gender</Typography>
            <Select
                label="Gender" 
                size="small"
                variant="standard"
                id="gender"
                fullWidth
                disabled={disabled}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
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
            </Select>

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

export default Name;