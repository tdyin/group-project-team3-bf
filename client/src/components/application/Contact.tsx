import { Stack, TextField } from '@mui/material/'

export default function Contact() {
  return (
    <Stack component='form' spacing={3}>
      <TextField label='Cell Phone' type='text' name='cellPhone' />
      <TextField label='Work Phone' type='text' name='workPhone' />
    </Stack>
  )
}
