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

type Contact = {
    cell: string,
    work: string
}

const Contact: React.FC = () => {
    const { register, handleSubmit, formState: {errors}, watch } = useForm<Contact>();
    const [cell, setCell] = useState("");
    const [work, setWork] = useState("");

    //Disable Fields until Edit button clicked
    const [disabled, setDisabled] = useState(true);

    //MAKE SURE TO EDIT THIS
    const onSubmit = async (data: Contact) => {
        try {
            console.log("Sending Registration Data to Backend: ", data);
            await axios.post('http://localhost:8080', data)
        } catch (err: any) {
            console.log(err);

        }
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
                            <Button>Clear</Button>
                            <Button type="submit" onClick={() => setDisabled(true)}>Update</Button>
                        </>
                    }
        </FormControl>
    )
    
}

export default Contact;