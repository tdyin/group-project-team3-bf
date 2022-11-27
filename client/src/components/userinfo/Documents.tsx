import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import axios from 'axios';
import FormControl from '@mui/material/FormControl';

type Documents = {
    license: string,
    workauth: string
}

const Documents: React.FC = () =>{
    const { register, handleSubmit, formState: {errors}, watch } = useForm<Documents>();
    const [license, setLicense] = useState("");
    const [workauth, setWorkauth] = useState("");

    //Disable Fields until Edit button clicked; Document Component might not need this
    const [disabled, setDisabled] = useState(true);

    //MAKE SURE TO EDIT THIS
    const onSubmit = async (data: Documents) => {
        try {
            console.log("Sending Registration Data to Backend: ", data);
            await axios.post('http://localhost:8080', data)
        } catch (err: any) {
            console.log(err);

        }
    }

    return (
        <FormControl onSubmit={handleSubmit(onSubmit)} sx={{display: "block", flexDirection: "column", alignItems: "center", width: "50em"}}>
                {/**
                 * Map Licenses and Work Auths from backend?
                 * Add upload buttons to upload to AWS
                 */}
                <TextField 
                        label="Upload Files" 
                        size="small"
                        variant="standard"
                        type="file"
                        id="license"
                        {...register( "license")}
                        fullWidth
                        disabled={disabled}
                        style={{marginTop: "2rem"}}
                />
                <ErrorMessage errors={errors} name="license" render={({ message }) => <p>{message}</p>} />

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

export default Documents;