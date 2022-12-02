import { useState, useEffect } from 'react';
import { hrLink } from '../../Link';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios, { AxiosResponse } from 'axios';
import Modal from '@mui/material/Modal'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Address from '../userinfo/Address';
import ContactInfo from '../userinfo/ContactInfo';
import Documents from '../userinfo/Documents';
import Emergency from '../userinfo/Emergency';
import Employment from '../userinfo/Employment';
import Name from '../userinfo/Name';

type Employees = {
    firstName: string,
    lastName: string,
    email: string
}[]

const Pending: React.FC = () => {
    const [data, setData] = useState<Employees>();

    useEffect(() => {
        const token = localStorage.getItem('token');

        //Obtain User Data and set to variable
        const getUsers = async () => {
            try {
                await axios.get(`${hrLink}/hiring/userinformation`, { headers: { 'authorization' : token }})
                .then ((response: AxiosResponse) => {
                    setData(response.data);
                    console.log("Received data from HR UserInfo Link: " , response.data);
                })
            } catch (err) {
                console.log("Error receiving users for Pending: ", err)
            }
        }

        getUsers();
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

    //Show table of Users. If click on View App, opens a modal with full info
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Employee</TableCell>
                        <TableCell>E-mail</TableCell>
                        <TableCell>Check Application</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {
                        data ? (data.map((user: any) => {
                            return (
                                <TableRow key={user.email} >
                                    <TableCell>{user.firstName} {user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell><Button onClick={handleOpen}>View Application</Button></TableCell>
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
                                                <ShowTabs userid={user._id} />
                                                <Button onClick={handleButtonClose}>Close</Button>
                                            </Box>    
                                    </Modal>
                                </TableRow>
                            )
                        })) : null
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

interface IUserID {
    userid: string
}

type Feedback = {
    feedback: string
}

const ShowTabs: React.FC<IUserID> = ({userid}: any) => {
    const { register, handleSubmit } = useForm<Feedback>();
    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const onSubmit = async (data: Feedback) => {
        const token = localStorage.getItem('token');

        try {
            console.log("Sending Feedback to Backend: ", data);
            await axios.post(`${hrLink}/hiring/${userid}/feedback/`, data, {headers: { 'authorization': token }});
        } catch (err: any) {
            console.log(err);

        }
    }

    return (
        <Box>   
            <Box sx={{ borderBottom: 1, borderColor: 'divider'}} >
                <Tabs value={value} onChange={handleChange} >
                    <Tab label="Employee" />
                    <Tab label="Contact" />
                    <Tab label="Address" />
                    <Tab label="Emergency Contacts" />
                    <Tab label="Visas" />
                    <Tab label="Documents" />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Name userid={userid} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ContactInfo userid={userid} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Address userid={userid} />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Emergency userid={userid} />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <Employment userid={userid} />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <Documents userid={userid} />
            </TabPanel>
            <FormControl>
                <TextField 
                    label="Feedback" 
                    type="text"
                    multiline
                    id="feedback"
                    rows={4}
                    {...register('feedback')}
                />
                <Button type="submit" onClick={handleSubmit(onSubmit)} >Send Feedback</Button>
            </FormControl>
            
        </Box>
    )
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    //Outputs the Tab information
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
            <Box display="flex" justifyContent="center" alignItems="center">
                <Typography>{children}</Typography>
            </Box>
            )}
        </div>
    );
}

export default Pending;