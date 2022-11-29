import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import axios, { AxiosResponse } from 'axios';
import FormControl from '@mui/material/FormControl';
import Modal from '@mui/material/Modal';
import { link } from './Link';

type Documents = {
    driverLicense: string,
    workAuth: string
}

const Documents: React.FC = () =>{
    const { register, handleSubmit, formState: {errors}, reset } = useForm<Documents>();
    const [driverLicense, setDriverLicense] = useState("");
    const [workAuth, setWorkauth] = useState("");
    const [defaultData, setDefaultData] = useState<Documents>({
        driverLicense: "",
        workAuth: ""
    })

    //Disable Fields until Edit button clicked; Document Component might not need this
    const [disabled, setDisabled] = useState(true);

    //Edit Data
    const onSubmit = async (data: Documents) => {
        try {
            setDisabled(true);
            console.log("Sending Registration Data to Backend: ", data);
            await axios.put(`${link}/document`, data)
        } catch (err: any) {
            console.log(err);

        }
    }

    //GET Data
    useEffect(() => {
        const getData = async () => {
            try {
                await axios.get<Documents>(`${link}/document`)
                .then((data: AxiosResponse) => {
                    console.log(data.data);
                    setDefaultData(data.data);
                    setDriverLicense(data.data.driverLicense);
                    setWorkauth(data.data.workAuth);
                }) 
            } catch (err) {
                console.log("Error Log: ", err);
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
            driverLicense: defaultData.driverLicense,
            workAuth: defaultData.workAuth
        });
        setOpen(false);
        setDisabled(true);
    }

    return (
        <FormControl onSubmit={handleSubmit(onSubmit)} sx={{display: "block", flexDirection: "column", alignItems: "center", width: "50em"}}>
                {/**
                 * Map Licenses and Work Auths from backend?
                 * Add Work Auth
                 * Add upload buttons to upload to AWS
                 */}
                <TextField 
                        label="Upload Files" 
                        size="small"
                        variant="standard"
                        type="file"
                        id="driverLicense"
                        {...register( "driverLicense")}
                        fullWidth
                        disabled={disabled}
                        style={{marginTop: "2rem"}}
                        onChange={(e) => setDriverLicense(e.target.value)}
                />
                <ErrorMessage errors={errors} name="driverLicense" render={({ message }) => <p>{message}</p>} />

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
                        <Button type="submit">Update</Button>
                    </>
                }
        </FormControl>
    )

}

export default Documents;