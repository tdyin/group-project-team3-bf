import { FormEvent, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import useMultiForm from './useMultiForm';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Address from './Address';
import NameInfo from './NameInfo';
import User from './User';
import axios from 'axios';

const RegistrationForm = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [matchPass, setMatchPass] = useState("");

    const userRef: any = useRef();
    const emailRef: any = useRef();

    //const { steps, currentStep, step, isFirst, isLast, backStep, nextStep } = useMultiForm([<User />, <NameInfo />, <Address />]);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        //nextStep();

        try {
            await axios.post('', JSON.stringify({username, password, email}))
        } catch (err: any) {
            
        }
    }


    //TODO: Update Styles
    return (
        <>
            <form onSubmit={onSubmit}>
                <TextField
                    label="E-mail Address"
                    size="small"
                    variant="standard"
                    type="text"
                    id="email"
                    ref={emailRef}
                    autoComplete="off"
                    onChange={ (e) => {setEmail(e.target.value)}}
                    required
                    />
                <TextField
                    label="Username"
                    size="small"
                    variant="standard"
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={ (e) => {setUsername(e.target.value)}}
                    required
                    />
                
                <TextField
                    label="Password"
                    size="small"
                    variant="standard"
                    type="password"
                    id="password"
                    onChange={ (e) => {setPassword(e.target.value)}}
                    required
                    />
                <TextField
                    label="Confirm Password"
                    size="small"
                    variant="standard"
                    type="password"
                    id="confirmPass"
                    onChange={ (e) => {setMatchPass(e.target.value)}}
                    required 
                    />
                
                <Button disabled={!username || !email || !password || !matchPass ? true : false}>Register</Button>
            </form>
        </>
    )

    /*
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    {currentStep + 1} / {steps.length}
                </div>
                {step}
                <div>
                </div>
                {!isFirst && (
                <Button type="button" onClick={backStep}>Previous</Button>
                    ) }
                <Button type="submit" onClick={nextStep}>{isLast ? "Register" : "Next"}</Button>
            </form>
        </div>
    ) */

}

export default RegistrationForm