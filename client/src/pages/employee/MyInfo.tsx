import { useState } from 'react'
import { DrawerHeader } from '../../components/nav/Navbar'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Name from '../../components/userinfo/Name';
import Address from '../../components/userinfo/Address';
import Contact from '../../components/userinfo/ContactInfo';
import Emergency from '../../components/userinfo/Emergency';
import Employment from '../../components/userinfo/Employment';
import Documents from '../../components/userinfo/Documents';

export default function MyInfo() {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    //Change tab value
    setTabValue(newValue);
  }

  return (
    <Box component='main' sx={{ flexGrow: 1, p: 4}}>
      <DrawerHeader />
      Personal Information Page

      <Tabs
        orientation="horizontal"
        variant="scrollable"
        value={tabValue}
        onChange={handleChange}
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Tab label="Personal Info" />
        <Tab label="Address" />
        <Tab label="Contact Info" />
        <Tab label="Emergency Contact Info" />
        <Tab label="Visa" />
        <Tab label="Documents" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Name />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Address />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <Contact />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <Emergency />
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        <Employment /> 
      </TabPanel>
      <TabPanel value={tabValue} index={5}>
        <Documents />
      </TabPanel>
    </Box>
  )
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
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