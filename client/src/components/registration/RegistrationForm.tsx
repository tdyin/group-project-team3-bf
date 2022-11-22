import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import useMultiForm from './useMultiForm';
import Button from '@mui/material/Button'
import Address from './Address';
import NameInfo from './NameInfo';
import User from './User';

type FormData = {
    username: string,
    password: string,
    confirmPass: string,
    email: string
}
const defaultData: FormData = {
    username: "",
    password: "",
    confirmPass: "",
    email: ""
}

const RegistrationForm = () => {
    const [data, setData] = useState(defaultData)

    const { steps, currentStep, step, isFirst, isLast, backStep, nextStep } = useMultiForm([<User />, <NameInfo />, <Address />]);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        nextStep();
    }
    //TODO: Update Styles

    return (

    )

    /*
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    {currentStep + 1} / {steps.length}
                </div>
                {step}
                <div>
                </div>
                {!isFirst && (
                <Button type="button" onClick={backStep}>Previous</Button>
                    ) }
                <Button type="submit" onClick={nextStep}>{isLast ? "Register" : "Next"}</Button>
            </form>
        </div>
    ) */

}

export default RegistrationForm