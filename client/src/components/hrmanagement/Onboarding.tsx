import { useState, useEffect } from 'react';
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Pending from './onboardingsections/Pending';
import Accepted from './onboardingsections/Accepted';
import Rejected from './onboardingsections/Rejected';

const Onboarding = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    //Create tabs for Pending / Rejected / Accepted
    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider'}} >
                <Tabs value={value} onChange={handleChange} >
                    <Tab label="Pending" />
                    <Tab label="Rejected" />
                    <Tab label="Accepted" />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Pending />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Rejected />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Accepted />
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
export default Onboarding;