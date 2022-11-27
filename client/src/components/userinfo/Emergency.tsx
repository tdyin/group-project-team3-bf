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

type Emergency = {
    firstName: string,
    lastName: string,
    middleName: string,
    phone: string,
    email: string,
    relationship: string
}

const Emergency: React.FC = () =>{
    const { register, handleSubmit, formState: {errors}, watch } = useForm<Emergency>();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [relationship, setRelationship] = useState("");

    //Disable Fields until Edit button clicked
    const [disabled, setDisabled] = useState(true);

    //MAKE SURE TO EDIT THIS
    const onSubmit = async (data: Emergency) => {
        try {
            console.log("Sending Registration Data to Backend: ", data);
            await axios.post('http://localhost:8080', data)
        } catch (err: any) {
            console.log(err);

        }
    }

    return (
        <FormControl onSubmit={handleSubmit(onSubmit)} sx={{display: "block", flexDirection: "column", alignItems: "center", width: "50em"}}>
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
                    defaultValue={phone}
                    style={{marginTop: "2rem"}}
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
                defaultValue={relationship}
                style={{marginTop: "2rem"}}
            />
            <ErrorMessage errors={errors} name="relationship" render={({ message }) => <p>{message}</p>} />

            { disabled === true ? 
                    <Button type="button" onClick={() => setDisabled(false)}>Edit</Button>
                    :
                    <>
                        <Button>Clear</Button>
                        <Button type="submit" onClick={() => setDisabled(true)}>Update</Button>
                    </>
                }
        </FormControl>

    )
}

export default Emergency;