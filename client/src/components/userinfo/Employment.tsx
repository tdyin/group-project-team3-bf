import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import axios from 'axios';
import FormControl from '@mui/material/FormControl';

type Employment = {
    title: string,
    start: string,
    end: string
}

const Employment: React.FC = () => {
    const { register, handleSubmit, formState: {errors}, watch } = useForm<Employment>();
    const [title, setTitle] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    //Disable fields until Edit button clicked
    const [disabled, setDisabled] = useState(true);

    //MAKE SURE TO EDIT THIS
    const onSubmit = async (data: Employment) => {
        try {
            console.log("Sending Registration Data to Backend: ", data);
            await axios.post('http://localhost:8080', data)
        } catch (err: any) {
            console.log(err);

        }
    }

    return (
        <FormControl onSubmit={handleSubmit(onSubmit)} sx={{display: "block", flexDirection: "column", alignItems: "center", width: "50em"}}>

                <TextField 
                    label="Visa Type" 
                    size="small"
                    variant="standard"
                    type="text"
                    id="title"
                    {...register( "title")}
                    fullWidth
                    disabled={disabled}
                    defaultValue={title}
                    style={{marginTop: "2rem"}}
                >
                    <MenuItem value="CPT">
                        CPT
                    </MenuItem>
                    <MenuItem value="EAD">
                        EAD
                    </MenuItem>
                    <MenuItem value="H1-B">
                        H1-B
                    </MenuItem>
                    <MenuItem value="OPT">
                        OPT
                    </MenuItem>
                </TextField>
                <ErrorMessage errors={errors} name="title" render={({ message }) => <p>{message}</p>} />

                <TextField 
                    label="Visa Start Date" 
                    size="small"
                    variant="standard"
                    type="date"
                    id="start"
                    {...register( "start")}
                    fullWidth
                    disabled={disabled}
                    defaultValue={start}
                    style={{marginTop: "2rem"}}
                />
                <ErrorMessage errors={errors} name="start" render={({ message }) => <p>{message}</p>} />

                <TextField 
                    label="Visa Expiration Date" 
                    size="small"
                    variant="standard"
                    type="date"
                    id="end"
                    {...register( "end")}
                    fullWidth
                    disabled={disabled}
                    defaultValue={end}
                    style={{marginTop: "2rem"}}
                />
                <ErrorMessage errors={errors} name="end" render={({ message }) => <p>{message}</p>} />


                { disabled === true ? 
                    <Button type="button" onClick={() => setDisabled(false)}>Edit</Button>
                    :
                    <>
                        <Button>Clear</Button>
                        <Button type="submit" onClick={() => setDisabled(true)}>Update</Button>
                    </>
                }
        </FormControl>
    )
}

export default Employment;