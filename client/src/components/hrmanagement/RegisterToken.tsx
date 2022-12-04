import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { link, hrLink } from '../Link'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link'
import axios, { AxiosResponse } from 'axios';

type Email = {
    email: string,
    name: string
}

type Hiring = {
    email: string,
    name: string,
    token: string,
    status: boolean
}[]

//Send E-mail with JWT Token to enable register link
const RegisterToken: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Email>();

    const [data, setData] = useState<Hiring>();
    const [status, setStatus] = useState("Unregistered");

    useEffect(() => {
        const token = localStorage.getItem('token');
        const getData = async () => {
            try {
            await axios.get(`${hrLink}/hiring`, {headers: { 'authorization': token }})
            .then ((data: AxiosResponse) => {
                console.log(data);
                setData(data.data);
            })
            } catch (err) {
            console.log("Error Log: " , err)
            }
        }

        getData();
    }, [])

    const onSubmit = async (data: Email) => {
        console.log("Sending Register Link to ", data);
        try {
            await axios.post(`${hrLink}/hiring/confirmation`, data)
            .then((response: AxiosResponse) => {
                const { token } = response.data;
                localStorage.setItem('token', token)
            })
        } catch (err: any) {
            console.log(err);
        }
    }

    return (
        <Box>
            <FormControl>
                <TextField
                    label="E-mail"
                    size="small"
                    variant="standard"
                    type="email"
                    id="email"
                    {...register ("email")}
                    />
                    <ErrorMessage errors={errors} name="email" render={({ message }) => <p>{message}</p>} />

                <TextField
                    label="Candidate First Name"
                    size="small"
                    variant="standard"
                    type="text"
                    id="name"
                    {...register ("name")}
                    />
                    <ErrorMessage errors={errors} name="name" render={({ message }) => <p>{message}</p>} />
                <Button type="submit" onClick={handleSubmit(onSubmit)}>Send E-mail</Button>
            </FormControl>

            {/**Table for previous registration links */}
            <Typography variant="h4" sx={{marginTop: "4rem"}}>History</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>E-mail</TableCell>
                            <TableCell>Employee Name</TableCell>
                            <TableCell>Registration Link</TableCell>
                            <TableCell>Registered?</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        data ? (data.map((user: any) => {
                            return (
                                <TableRow key={user.email} >
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.firstName} {user.lastName}</TableCell>
                                    <TableCell style={{whiteSpace: 'normal', wordBreak: 'break-word'}}><Link href={`/register/${user.token}`}>{user.token}</Link></TableCell>
                                    <TableCell>{String(user.status)}</TableCell>
                                </TableRow>
                            )
                        })) : null
                    }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default RegisterToken;