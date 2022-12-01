import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { useState } from 'react'
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
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant='h4' align='center' marginBottom={3}>
        Onboarding Application
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Steps steps={steps} activeStep={activeStep} />
          </Grid>
          <Grid item xs={6}>
            <Forms activeStep={activeStep} />
          </Grid>
          <Grid item xs={3}>
            {activeStep !== steps.length && (
              <Box marginLeft={2}>
                <Button
                  variant='contained'
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
                </Button>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}
