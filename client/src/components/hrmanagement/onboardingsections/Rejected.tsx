import { useState, useEffect } from 'react';
import { hrLink } from '../../Link';
import Box from '@mui/material/Box';
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

const Rejected: React.FC = () => {
    const [data, setData] = useState<Employees>();

    useEffect(() => {
        const token = localStorage.getItem('token');

        //Obtain User Data and set to variable
        const getUsers = async () => {
            try {
                await axios.get(`${hrLink}/hiring/rejected`, { headers: { 'authorization' : token }})
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
    const [modalData, setModalData] = useState(" ");
    const [open, setOpen] = useState(false);
    const handleButtonClose = () => setOpen(false);
    const handleClose = (e: any, reason: "backdropClick" | "escapeKeyDown") => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    }

    //Show table of Users. If click on View App, opens a modal with full info
    return (
        <>
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
                                        <TableCell><Button onClick={() => {
                                            setModalData(user._id);
                                            setOpen(true);}
                                        }>View Application</Button></TableCell>
                                        
                                    </TableRow>
                                )
                            })) : null
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
            open={open}
            onClose={handleClose}
            sx={{overflow: "scroll"}}
            >
                <Box                             
                    sx={{
                    position: 'absolute' as 'absolute',
                    top: '60%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'white',
                    border: '2px solid #000',
                    boxShadow: 24,
                    pt: 2,
                    px: 4,
                    pb: 3,
                    color: 'black',
                    marginTop: "2.3rem"
                }}>
                    <ShowTabs userid={modalData} />
                    <Button onClick={handleButtonClose} style={{float: "right"}}>Close</Button>
                </Box>    
            </Modal>
        </>
    )
}

interface IUserID {
    userid: string
}

type Feedback = {
    feedback: string
}

const ShowTabs: React.FC<IUserID> = ({userid}: any) => {
    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [data, setData] = useState<Feedback>({
        feedback: " "
    });

    useEffect(() => {
        const getFeedback = async () => {
            const token = localStorage.getItem('token');

            try {
                console.log("Receiving Feedback: ", );
                await axios.get(`${hrLink}/hiring/${userid}/feedback/`, {headers: { 'authorization': token }})
                .then((response: AxiosResponse) => {
                    setData(response.data);
                })
            } catch (err: any) {
                console.log(err);
    
            }
        }

        getFeedback();
    }, [])

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
            <TextField 
                label="Feedback" 
                multiline
                value={data?.feedback}
                disabled
                sx={{marginTop: "2rem"}}
                />
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

export default Rejected;