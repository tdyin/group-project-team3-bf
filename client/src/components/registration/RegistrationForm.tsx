import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

type User = {
    username: string,
    email: string,
    password: string,
    passMatch: string
}
const RegistrationForm: React.FC = () => {
    const { register, handleSubmit, formState: {errors}, watch } = useForm<User>({ mode: "onTouched"});
    const [email, setEmail] = useState('email@email.com');
    const { token } = useParams();
    const navigate = useNavigate();

    const onSubmit = async (data: User) => {
        try {
            console.log("Sending Registration Data to Backend: ", data);
            await axios.post(`http://localhost:8080/register/${token}`, data);
            navigate("/application");
        } catch (err: any) {
            console.log(err);

        }
    }

    useEffect(() => {
        const checkUrl = async () => {
            try {
                await axios.get(`http://localhost:8080/register/${token}`)
                .then((data: any) => {
                    setEmail(data.data);
                    console.log("Received E-mail: " , data)
                })
            } catch (err) {
                console.log("Valid URL failed: " , err);
                navigate("/forbidden")
            }
        }
        checkUrl();
    }, [])

    return (
        <Box sx={{marginTop: 9, display: "flex", flexDirection: "column", alignItems: "center"}} >
            {/**Check if user has real URL*/}
                <form onSubmit={handleSubmit(onSubmit)} style={{width: "40%", padding: "3rem", boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }}>
                <Typography variant="h3">Register an Account</Typography>
                <br/>

                <TextField
                    label="E-mail Address"
                    size="small"
                    variant="standard"
                    type="email"
                    id="email"
                    {...register( "email")}
                    autoComplete="off"
                    inputProps={{ readOnly: true }}
                    value={email}
                    fullWidth
                    style={{marginTop: "2rem"}}
                    InputLabelProps={{shrink: true}}
                    />
                <ErrorMessage errors={errors} name="email" render={({ message }) => <p>{message}</p>} />

                <TextField
                    label="Username"
                    size="small"
                    variant="standard"
                    type="text"
                    id="username"
                    {...register('username', {required: "Please enter a Username", 
                        minLength: {value: 4, message: "Username must be between 4-16 characters"}, 
                        maxLength: {value: 16, message: "Username must be between 4-16 characters"},
                        pattern: {value: /[A-Za-z0-9]/, message: "Username can only contain letters and numbers"}
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
                    {...register("password", { required: "Please enter a password", 
                    minLength: {value: 8, message: "Password must be between 8-20 characters"}, 
                    maxLength: {value: 20, message: "Password must be between 8-20 characters"},
                    pattern: {
                        value: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}/,
                        message: "Password must contain at least one Uppercase letter, one Lowercase letter, one Number, and one Special character"
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