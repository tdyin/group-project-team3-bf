import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

type Props = {
  steps: string[]
  activeStep: number
  handleNext: () => void
  handleBack: () => void
}

interface IFormInput {
  personalInfo: {
    firstName: string
    lastName: string
    middleName: string
    preferredName: string
    dob: string
    ssn: string
    gender: string
    profilePic: string
  }
  address: {
    street: string
    bldgApt: string
    city: string
    state: string
    zip: string
  }
  contact: { cellPhone: string; workPhone: string }
  car: {
    ifLicese: string
    ifCar: string
    licenseNum: string
    expDate: string
    make: string
    model: string
    color: string
  }
  legal: {}
  referInfo: {
    firstName: string
    lastName: string
    middleName: string
    phone: string
    email: string
    relationship: string
  }
  emeContact: {
    firstName: string
    lastName: string
    middleName: string
    phone: string
    email: string
    relationship: string
  }
}

export default function Forms({
  steps,
  activeStep,
  handleNext,
  handleBack,
}: Props) {
  const [ifPermanent, setifPermanent] = useState('no')
  const [permanent, setPermanent] = useState('')
  const [visa, setVisa] = useState('')

  const { handleSubmit, watch, control, formState } = useForm<IFormInput>({
    defaultValues: {
      personalInfo: {
        firstName: '',
        lastName: '',
        middleName: '',
        preferredName: '',
        dob: '2000-01-01',
        ssn: '',
        gender: 'male',
      },
      address: {},
      contact: {},
      car: {
        ifLicese: 'no',
        ifCar: 'no',
        licenseNum: '',
        expDate: new Date().toISOString().slice(0, 10),
        make: '',
        model: '',
        color: '',
      },
      legal: {},
      referInfo: {},
      emeContact: {},
    },
  })

  const watchIfCar = watch('car.ifCar')
  const watchIfLicese = watch('car.ifLicese')

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log('onSubmit', {
      formState: {
        ...formState,
      },
      data,
    })
    return null
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* User Info */}
        {activeStep === 0 && (
          <Stack spacing={3}>
            <Controller
              name='personalInfo.firstName'
              control={control}
              render={({ field }) => (
                <TextField {...field} type='text' label='First Name' />
              )}
              rules={{ required: true }}
            />
            <Controller
              name='personalInfo.lastName'
              control={control}
              render={({ field }) => (
                <TextField {...field} type='text' label='Last Name' />
              )}
            />
            <Controller
              name='personalInfo.middleName'
              control={control}
              render={({ field }) => (
                <TextField {...field} type='text' label='Middle Name' />
              )}
            />
            <Controller
              name='personalInfo.preferredName'
              control={control}
              render={({ field }) => (
                <TextField {...field} type='text' label='Preferred Name' />
              )}
            />
            <Controller
              name='personalInfo.dob'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type='date'
                  label='Date of Birth'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
            <Controller
              name='personalInfo.gender'
              defaultValue='male'
              control={control}
              render={({ field }) => (
                <TextField select {...field} label={'Gender'}>
                  {[
                    { value: 'male', text: 'Male' },
                    { value: 'female', text: 'Female' },
                    {
                      value: 'I do not wish to answer.',
                      text: 'I do not wish to answer.',
                    },
                  ].map((ans) => (
                    <MenuItem key={ans.value} value={ans.value}>
                      {ans.text}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name='personalInfo.ssn'
              control={control}
              render={({ field }) => (
                <TextField {...field} type='text' label='SSN' />
              )}
            />
            <label htmlFor='pfp'>
              <span>Optional: </span>
              <input
                id='pfp'
                name='pfp'
                style={{ display: 'none' }}
                type='file'
              />
              <Button
                className='btn-choose'
                variant='outlined'
                component='span'
              >
                Upload Profile Picture
              </Button>
            </label>
          </Stack>
        )}

        {/* Address */}
        {activeStep === 1 && (
          <Stack spacing={3}>
            <Controller
              name='address.street'
              control={control}
              render={({ field }) => (
                <TextField {...field} type='text' label='Street' />
              )}
            />
            <Controller
              name='address.bldgApt'
              control={control}
              render={({ field }) => (
                <TextField {...field} type='text' label='Bldg/Apt' />
              )}
            />
            <Controller
              name='address.city'
              control={control}
              render={({ field }) => (
                <TextField {...field} type='text' label='City' />
              )}
            />
            <Controller
              name='address.state'
              control={control}
              render={({ field }) => (
                <TextField {...field} type='text' label='State' />
              )}
            />
            <Controller
              name='address.zip'
              control={control}
              render={({ field }) => (
                <TextField {...field} type='text' label='Zip Code' />
              )}
            />
          </Stack>
        )}

        {/* Contact */}
        {activeStep === 2 && (
          <Stack spacing={3}>
            <Controller
              name='contact.cellPhone'
              control={control}
              render={({ field }) => (
                <TextField {...field} type='text' label='Cell Phone' />
              )}
            />
            <Controller
              name='contact.workPhone'
              control={control}
              render={({ field }) => (
                <TextField {...field} type='text' label='Work Phone' />
              )}
            />
          </Stack>
        )}

        {/* Car */}
        {activeStep === 3 && (
          <Stack spacing={3}>
            <Typography variant='h6' gutterBottom>
              Optional
            </Typography>
            <FormControl>
              <Typography variant='body1' gutterBottom>
                Do you have a driver's license?
              </Typography>
              <Controller
                name='car.ifLicese'
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <FormControlLabel
                      value='yes'
                      control={<Radio />}
                      label='Yes'
                    />
                    <FormControlLabel
                      value='no'
                      control={<Radio />}
                      label='No'
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
            {watchIfLicese === 'yes' && (
              <>
                <TextField
                  label='License Number'
                  type='text'
                  name='licenseNum'
                />
                <TextField
                  label='Expiration Date'
                  type='date'
                  name='expDate'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <label htmlFor='btn-upload'>
                  <input
                    id='btn-upload'
                    name='btn-upload'
                    style={{ display: 'none' }}
                    type='file'
                  />
                  <Button
                    className='btn-choose'
                    variant='outlined'
                    component='span'
                  >
                    Upload driver's license
                  </Button>
                </label>
              </>
            )}
            <Typography variant='body1' gutterBottom>
              Do you have a car?
            </Typography>
            <FormControl>
              <Controller
                name='car.ifCar'
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <FormControlLabel
                      value='yes'
                      control={<Radio />}
                      label='Yes'
                    />
                    <FormControlLabel
                      value='no'
                      control={<Radio />}
                      label='No'
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
            {watchIfCar === 'yes' && (
              <>
                <TextField label='Make' type='text' name='make' />
                <TextField label='Model' type='text' name='model' />
                <TextField label='Color' type='text' name='color' />
              </>
            )}
          </Stack>
        )}

        {/* Legal */}
        {activeStep === 4 && (
          <Stack spacing={3}>
            <FormControl>
              <Typography variant='body1' gutterBottom>
                Are you a citizen or permanent resident of the U.S?
              </Typography>
              <RadioGroup
                value={ifPermanent}
                onChange={(e) => setifPermanent(e.target.value)}
              >
                <FormControlLabel value='yes' control={<Radio />} label='Yes' />
                <FormControlLabel value='no' control={<Radio />} label='No' />
              </RadioGroup>
            </FormControl>
            {ifPermanent === 'yes' ? (
              <>
                <FormControl>
                  <RadioGroup
                    value={permanent}
                    onChange={(e) => setPermanent(e.target.value)}
                  >
                    <Typography variant='body1' gutterBottom>
                      You are:
                    </Typography>
                    <FormControlLabel
                      value='Citizen'
                      control={<Radio />}
                      label='Citizen'
                    />
                    <FormControlLabel
                      value='Green Card'
                      control={<Radio />}
                      label='Green Card Holder'
                    />
                  </RadioGroup>
                </FormControl>
              </>
            ) : (
              <>
                <FormControl>
                  <Typography variant='body1' gutterBottom>
                    What is your work authorization?
                  </Typography>
                  <RadioGroup
                    value={visa}
                    onChange={(e) => setVisa(e.target.value)}
                  >
                    <FormControlLabel
                      value='H1-B'
                      control={<Radio />}
                      label='H1-B'
                    />
                    <FormControlLabel
                      value='L2'
                      control={<Radio />}
                      label='L2'
                    />
                    <FormControlLabel
                      value='F1(CPT/OPT)'
                      control={<Radio />}
                      label='F1(CPT/OPT)'
                    />
                    <FormControlLabel
                      value='H4'
                      control={<Radio />}
                      label='H4'
                    />
                    <FormControlLabel
                      value='Other'
                      control={<Radio />}
                      label='Other'
                    />
                  </RadioGroup>
                </FormControl>
                {visa === 'Other' ? (
                  <TextField
                    label='Work Authorization'
                    type='text'
                    name='visaTitle'
                  />
                ) : (
                  <></>
                )}
                <TextField
                  label='Start Date'
                  type='date'
                  name='startDate'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  label='End Date'
                  type='date'
                  name='endDate'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <label htmlFor='btn-upload'>
                  <input
                    id='btn-upload'
                    name='btn-upload'
                    style={{ display: 'none' }}
                    type='file'
                  />
                  <Button
                    className='btn-choose'
                    variant='outlined'
                    component='span'
                  >
                    Upload work authorization
                  </Button>
                </label>
              </>
            )}
          </Stack>
        )}

        {/* ReferInfo */}
        {activeStep === 5 && (
          <Stack spacing={3}>
            <Typography variant='h6' gutterBottom>
              Optional
            </Typography>
            <TextField label='First Name' type='text' name='firstName' />
            <TextField label='Last Name' type='text' name='lastName' />
            <TextField label='Middle Name' type='text' name='middleName' />
            <TextField label='Phone' type='text' name='phone' />
            <TextField label='Email' type='text' name='email' />
            <TextField label='Relationship' type='text' name='relationship' />
          </Stack>
        )}

        {/* EmeContact */}
        {activeStep === 6 && (
          <Stack spacing={3}>
            <TextField label='First Name' type='text' name='firstName' />
            <TextField label='Last Name' type='text' name='lastName' />
            <TextField label='Middle Name' type='text' name='middleName' />
            <TextField label='Phone' type='text' name='phone' />
            <TextField label='Email' type='text' name='email' />
            <TextField label='Relationship' type='text' name='relationship' />
          </Stack>
        )}

        {/* Summary */}
        {activeStep === 7 && <div>Summary</div>}
        <Box marginTop={2}>
          {activeStep !== steps.length ? (
            <Button
              variant='contained'
              onClick={handleNext}
              sx={{ mt: 1, mr: 1 }}
            >
              Continue
            </Button>
          ) : (
            <Button type='submit' variant='contained' sx={{ mt: 1, mr: 1 }}>
              Finish
            </Button>
          )}
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mt: 1, mr: 1 }}
          >
            Back
          </Button>
        </Box>
      </form>
    </Box>
  )
}
