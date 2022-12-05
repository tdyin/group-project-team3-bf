import { Box, Stepper, Step, StepLabel } from '@mui/material'

type Props = {
  steps: string[]
  activeStep: number
}

export default function Steps({ steps, activeStep }: Props) {
  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}
