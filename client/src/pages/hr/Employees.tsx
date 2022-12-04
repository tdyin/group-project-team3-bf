import { useState, useEffect } from 'react';
import { DrawerHeader } from '../../components/nav/Navbar'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios, { AxiosResponse } from 'axios';
import { hrLink } from '../../components/Link';
import Modal from '@mui/material/Modal';
import Address from '../../components/hrmanagement/userinfo/Address';
import ContactInfo from '../../components/hrmanagement/userinfo/ContactInfo';
import Documents from '../../components/hrmanagement/userinfo/Documents';
import Emergency from '../../components/hrmanagement/userinfo/Emergency';
import Employment from '../../components/hrmanagement/userinfo/Employment';
import Name from '../../components/hrmanagement/userinfo/Name';

type Employees = {
  firstName: string,
  lastName: string,
  middleName: string,
  preferredName: string,
  ssn: string,
  workAuth: string,
  cellPhone: string,
  email: string,
  userInfo: any
}[]

export default function Employees() {
  const [data, setData] = useState<Employees>();
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Employees>();

  //Receive data of Employees
  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem('token');

      try {
        await axios.get(`${hrLink}/employees/`, { headers: { 'authorization': token}})
        .then ((response: AxiosResponse) => {
          setData(response.data);
          setFiltered(response.data);
        })
      } catch(err: any) {
        console.log("Error receiving data in Employees.tsx: ", err);
      }
    }
    getData();
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

  //For Search Bar Input
  const handleChange = (e: any) => {
    setSearch(e.target.value);

    //Filter
    const filteredData = data?.filter(user => 
      (user.userInfo.lastName.toLowerCase().includes(e.target.value.toLowerCase()) 
      || user.userInfo.middleName.toLowerCase().includes(e.target.value.toLowerCase())
      || user.userInfo.preferredName.toLowerCase().includes(e.target.value.toLowerCase()))
      )
  
    setFiltered(filteredData);
  }

  return (
    <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      HR Employees Page

      <TextField 
        variant="standard"
        size="small"
        fullWidth
        value={search}
        onChange={handleChange}
        label="Search Employees"
        />
      
      {filtered?.length === 0 ? <Typography>No results found</Typography> : <Typography>Showing {filtered?.length} results</Typography>}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name (Preferred)</TableCell>
              <TableCell>SSN</TableCell>
              <TableCell>Authorization</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>E-mail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {
                filtered ? (filtered?.map((user: any) => {
                  return (
                    <TableRow key={user.email} >
                      <TableCell><Button onClick={() => { setModalData(user._id); setOpen(true); }}>{user?.userInfo.lastName}, {user?.userInfo.firstName} {user?.userInfo.middleName} ({user?.userInfo.preferredName})</Button></TableCell>
                      <TableCell>{user?.userInfo.ssn}</TableCell>
                      <TableCell>{user?.legal.permanentType ? user?.legal.permanentType : user?.legal.visaTitle}</TableCell>
                      <TableCell>{user?.contact.cellPhone}</TableCell>
                      <TableCell>{user?.email}</TableCell>
                    </TableRow>
                  )
                })) : null }
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
    </Box>
  )
}

interface IUserID {
  userid: string
}

const ShowTabs: React.FC<IUserID> = ({userid}: any) => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
  };

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