import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Forms from '../components/application/Forms'
import Steps from '../components/application/Steps'

const steps = [
  'Personal Information',
  'Address',
  'Contact',
  'Car',
  'Legal Status',
  'Reference Information',
  'Emergency Contact',
  'File Summary',
]

export default function Application() {
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep((prevState) => prevState + 1)
  }

  const handleBack = () => {
    setActiveStep((prevState) => prevState - 1)
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant='h4' align='center' marginBottom={3}>
        Onboarding Application
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Steps steps={steps} activeStep={activeStep} />
          </Grid>
          <Grid item xs={8}>
            <Forms
              steps={steps}
              activeStep={activeStep}
              handleNext={handleNext}
              handleBack={handleBack}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}
