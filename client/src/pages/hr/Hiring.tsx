import { useEffect, useState } from 'react';
import Box from '@mui/material/Box'
import { DrawerHeader } from '../../components/nav/Navbar'
import RegisterToken from '../../components/hrmanagement/RegisterToken';
import Onboarding from '../../components/hrmanagement/Onboarding';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography'

export default function Hiring() {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
  };

  return (
    <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      HR Hiring Page

      <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Registration" />
          <Tab label="Onboarding" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} >
        <RegisterToken />
      </TabPanel>
      <TabPanel value={value} index={1} >
        <Onboarding />
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