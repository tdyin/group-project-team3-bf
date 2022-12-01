import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import axios, { AxiosResponse } from 'axios';
import FormControl from '@mui/material/FormControl';
import Modal from '@mui/material/Modal';
import { link } from '../Link';

type Employment = {
    visaTitle: string,
    startDate: string,
    endDate: string
}

const Employment: React.FC = () => {
    const { register, handleSubmit, formState: {errors}, reset } = useForm<Employment>();
    const [visaTitle, setTitle] = useState("");
    const [startDate, setStart] = useState("");
    const [endDate, setEnd] = useState("");
    const [defaultData, setDefaultData] = useState<Employment>({
        visaTitle: "",
        startDate: "",
        endDate: ""
    })
    //Disable fields until Edit button clicked
    const [disabled, setDisabled] = useState(true);

    //Send Data
    const onSubmit = async (data: Employment) => {
        const token = localStorage.getItem('token');

        try {
            setDisabled(true);
            console.log("Sending Registration Data to Backend: ", data, {headers: { 'authorization': token }});
            await axios.put(`${link}/legal`, data)
        } catch (err: any) {
            console.log(err);
        }
    }

    //GET Data
    useEffect(() => {
        const token = localStorage.getItem('token');
        const getData = async () => {
            try {
                await axios.get<Employment>(`${link}/legal`, {headers: {'authorization': token}})
                .then ((data: AxiosResponse) => {
                    console.log(data.data);
                    setDefaultData(data.data);
                    setTitle(data.data.visaTitle);
                    setStart(data.data.startDate);
                    setEnd(data.data.endDate);
                })
            } catch (err) {
                console.log("Error Log: ", err)
            }
        }
        getData();
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

    const handleReset = () => {
        reset({
            visaTitle: defaultData.visaTitle,
            startDate: defaultData.startDate,
            endDate: defaultData.endDate
        });
        setOpen(false);
        setDisabled(true);
    }

    return (
        <FormControl sx={{display: "block", flexDirection: "column", alignItems: "center", width: "50em"}}>

                <TextField 
                    label="Visa Type" 
                    size="small"
                    variant="standard"
                    type="text"
                    id="visaTitle"
                    {...register( "visaTitle")}
                    fullWidth
                    disabled={disabled}
                    value={visaTitle}
                    style={{marginTop: "2rem"}}
                    onChange={(e) => setTitle(e.target.value)}
                >
                    <MenuItem value="H1-B">
                        H1-B
                    </MenuItem>
                    <MenuItem value="L2">
                        L2
                    </MenuItem>
                    <MenuItem value="F1(CPT/OPT)">
                        F1 (CPT / OPT)
                    </MenuItem>
                    <MenuItem value="H4">
                        H4
                    </MenuItem>
                </TextField>
                <ErrorMessage errors={errors} name="visaTitle" render={({ message }) => <p>{message}</p>} />

                <TextField 
                    label="Visa Start Date" 
                    size="small"
                    variant="standard"
                    type="date"
                    id="startDate"
                    {...register( "startDate")}
                    fullWidth
                    disabled={disabled}
                    value={startDate}
                    style={{marginTop: "2rem"}}
                    onChange={(e) => setStart(e.target.value)}
                />
                <ErrorMessage errors={errors} name="startDate" render={({ message }) => <p>{message}</p>} />

                <TextField 
                    label="Visa Expiration Date" 
                    size="small"
                    variant="standard"
                    type="date"
                    id="endDate"
                    {...register( "endDate")}
                    fullWidth
                    disabled={disabled}
                    value={endDate}
                    style={{marginTop: "2rem"}}
                    onChange={(e) => setEnd(e.target.value)}
                />
                <ErrorMessage errors={errors} name="endDate" render={({ message }) => <p>{message}</p>} />


                { disabled === true ? 
                    <Button type="button" onClick={() => setDisabled(false)}>Edit</Button>
                    :
                    <>
                        <Button onClick={handleOpen}>Clear</Button>
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
                                    <Typography>Are you sure you want to reset the fields and cancel editing?</Typography>
                                    <Button onClick={handleReset}>Reset</Button>
                                    <Button onClick={handleButtonClose}>Cancel</Button>
                                </Box>
                                
                        </Modal>
                        <Button type="submit" onClick={handleSubmit(onSubmit)} >Update</Button>
                    </>
                }
        </FormControl>
    )
}

export default Employment;