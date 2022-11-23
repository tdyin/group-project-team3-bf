import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';

type User = {
    username: string,
    email: string,
    password: string,
    passMatch: string
}
const RegistrationForm: React.FC = () => {
    const { register, handleSubmit, formState: {errors}, watch } = useForm<User>();
    const [email, setEmail] = useState('email@email.com');

    const onSubmit = async (data: User) => {
        try {
            console.log("Sending Registration Data to Backend: ", data);
            await axios.post('http://localhost:8080', data)
        } catch (err: any) {
            console.log(err);

        }
    }

    useEffect(() => {
        axios.get('http://localhost:8080/register')
        .then((data: any) => {
            setEmail(data.email);
        })
    }, [])

    return (
        <Box sx={{marginTop: 9, display: "flex", flexDirection: "column", alignItems: "center"}} >
            <form onSubmit={handleSubmit(onSubmit)} style={{maxWidth: "20%", padding: "3rem", boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }}>
                <Typography variant="h3">Register an Account</Typography>
                <br/>
                
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
                    disabled
                    defaultValue={email}
                    fullWidth
                    style={{marginTop: "2rem"}}
                    />
                <ErrorMessage errors={errors} name="email" render={({ message }) => <p>{message}</p>} />
                
                <TextField
                    label="Username"
                    size="small"
                    variant="standard"
                    type="text"
                    id="username"
                    {...register('username', {required: "Please enter a Username", minLength: 4, maxLength: 16, 
                        pattern: {value: /^[a-zA-z0-9-_]$/, message: "Username must only contains letters and numbers"}
                    })
                    }
                    autoComplete="off"
                    required
                    fullWidth
                    style={{marginTop: "2rem"}}
                    />
                <ErrorMessage errors={errors} name="username" as="p"/>

                <TextField
                    label="Password"
                    size="small"
                    variant="standard"
                    type="password"
                    id="password"
                    required
                    fullWidth
                    style={{marginTop: "2rem"}}
                    {...register("password", { required: "Please enter a password", minLength: 8, maxLength: 20,
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*)(+=._-]).$/, 
                            message: "Password must contain at least one Lowercase, Uppercase, Number, and Special Character"
                        }
                })}
                    />
                <ErrorMessage errors={errors} name="password" render={({ message }) => <p>{message}</p>} />

                <TextField
                    label="Confirm Password"
                    size="small"
                    variant="standard"
                    type="password"
                    id="passMatch"
                    required 
                    fullWidth
                    style={{marginTop: "2rem"}}
                    {...register("passMatch", {required: "Please confirm your password", validate: (value: string) => {
                        if(watch('password') !== value) {
                            return "Your Passwords do not match"
                        }
                        }})}
                    />
                <ErrorMessage errors={errors} name="passMatch" as="p"/>
                
                <Button type="submit" fullWidth style={{marginTop: "2rem"}}>Register</Button>
            </form>
        </Box>
    )

}

export default RegistrationForm