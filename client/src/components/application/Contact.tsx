import { Stack, TextField } from '@mui/material/'

export default function Contact() {
  return (
    <Stack
      component='form'
      spacing={3}
      sx={{
        padding: '1rem',
        width: '350px',
      }}
    >
      <TextField label='Cell Phone' type='text' name='cellPhone' />
      <TextField label='Work Phone' type='text' name='workPhone' />
    </Stack>
  )
}
