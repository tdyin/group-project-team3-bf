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
import axios from 'axios'
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
  legal: {
    ifPermanent: string
    permanentType: string
    visaTitle: string
    startDate: string
    endDate: string
  }
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
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IFormInput>({
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
      address: {
        street: '',
        bldgApt: '',
        city: '',
        state: '',
        zip: '',
      },
      contact: {
        cellPhone: '',
        workPhone: '',
      },
      car: {
        ifLicese: 'false',
        ifCar: 'false',
        licenseNum: '',
        expDate: new Date().toISOString().slice(0, 10),
        make: '',
        model: '',
        color: '',
      },
      legal: {
        ifPermanent: 'true',
        permanentType: 'Citizen',
        visaTitle: '',
        startDate: new Date().toISOString().slice(0, 10),
        endDate: new Date().toISOString().slice(0, 10),
      },
      referInfo: {
        firstName: '',
        lastName: '',
        middleName: '',
        phone: '',
        email: '',
        relationship: '',
      },
      emeContact: {
        firstName: '',
        lastName: '',
        middleName: '',
        phone: '',
        email: '',
        relationship: '',
      },
    },
  })

  const watchIfCar = watch('car.ifCar')
  const watchIfLicese = watch('car.ifLicese')
  const watchIfPermanent = watch('legal.ifPermanent')
  const watchVisa = watch('legal.visaTitle')

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    const data = {
      formData: formData,
    }
    await axios.put('/application', data)
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
              rules={{ required: 'First name', maxLength: 3 }}
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
                      value='true'
                      control={<Radio />}
                      label='Yes'
                    />
                    <FormControlLabel
                      value='false'
                      control={<Radio />}
                      label='No'
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
            {watchIfLicese === 'true' && (
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
                      value={true}
                      control={<Radio />}
                      label='Yes'
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label='No'
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
            {watchIfCar === 'true' && (
              <>
                <Controller
                  name='car.make'
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} type='text' label='Make' />
                  )}
                />
                <Controller
                  name='car.model'
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} type='text' label='Model' />
                  )}
                />
                <Controller
                  name='car.color'
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} type='text' label='Color' />
                  )}
                />
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
              <Controller
                name='legal.ifPermanent'
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label='Yes'
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label='No'
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
            {watchIfPermanent === 'true' ? (
              <>
                <FormControl>
                  <Typography variant='body1' gutterBottom>
                    You are:
                  </Typography>
                  <Controller
                    name='legal.permanentType'
                    control={control}
                    render={({ field }) => (
                      <RadioGroup {...field}>
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
                    )}
                  />
                </FormControl>
              </>
            ) : (
              <>
                <FormControl>
                  <Typography variant='body1' gutterBottom>
                    What is your work authorization?
                  </Typography>
                  <Controller
                    name='legal.visaTitle'
                    control={control}
                    render={({ field }) => (
                      <RadioGroup {...field}>
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
                    )}
                  />
                </FormControl>
                {watchVisa === 'Other' && (
                  <Controller
                    name='legal.visaTitle'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type='text'
                        label='Work Authorization'
                      />
                    )}
                  />
                )}
                <Controller
                  name='legal.startDate'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type='date'
                      label='Start Date'
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
                <Controller
                  name='legal.endDate'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type='date'
                      label='Start Date'
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
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
            <Controller
              name='referInfo.firstName'
              control={control}
              render={({ field }) => (
                <TextField {...field} type='text' label='First Name' />
              )}
            />
            <Controller
              name='referInfo.lastName'
              control={control}
              render={({ field }) => (
                <TextField {...field} type='text' label='First Name' />
              )}
            />
            <Controller
              name='referInfo.middleName'
              control={control}
              render={({ field }) => (
                <TextField {...field} type='text' label='Last Name' />
              )}
            />
            <Controller
              name='referInfo.phone'
              control={control}
              render={({ field }) => (
                <TextField {...field} type='text' label='Phone' />
              )}
            />
            <Controller
              name='referInfo.email'
              control={control}
              render={({ field }) => (
                <TextField {...field} type='text' label='Email' />
              )}
            />
            <Controller
              name='referInfo.relationship'
              control={control}
              render={({ field }) => (
                <TextField {...field} type='text' label='Relationship' />
              )}
            />
          </Stack>
        )}

        {/* EmeContact */}
        {activeStep === 6 && (
          <Stack spacing={3}>
            <Controller
              name='emeContact.firstName'
              control={control}
              render={({ field }) => (
                <TextField {...field} type='text' label='First Name' />
              )}
            />
            <Controller
              name='emeContact.lastName'
              control={control}
              render={({ field }) => (
                <TextField {...field} type='text' label='First Name' />
              )}
            />
            <Controller
              name='emeContact.middleName'
              control={control}
              render={({ field }) => (
                <TextField {...field} type='text' label='Last Name' />
              )}
            />
            <Controller
              name='emeContact.phone'
              control={control}
              render={({ field }) => (
                <TextField {...field} type='text' label='Phone' />
              )}
            />
            <Controller
              name='emeContact.email'
              control={control}
              render={({ field }) => (
                <TextField {...field} type='text' label='Email' />
              )}
            />
            <Controller
              name='emeContact.relationship'
              control={control}
              render={({ field }) => (
                <TextField {...field} type='text' label='Relationship' />
              )}
            />
          </Stack>
        )}

        {/* Summary */}
        {activeStep === 7 && <div>Summary</div>}

        {/* Buttons */}
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
