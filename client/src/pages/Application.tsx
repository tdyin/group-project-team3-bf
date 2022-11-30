import Box from '@mui/material/Box'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import Forms from '../components/application/Forms'

export default function Application() {
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data: any) => {
    const file = data.file[0]

    const formData = new FormData()
    formData.append('file', file)

    const fileData = {
      bucket: 'bf-t3-test-bucket',
      fileName: 'test1.pdf',
    }
    // Get signed url
    await axios
      .post('/s3/upload', fileData)
      .then((res) =>
        axios.put(res.data, file, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': file.type,
          },
        })
      )
      .catch((err) => console.log(err))
  }

  const handleDownload = async () => {
    const fileData = {
      bucket: 'bf-t3-test-bucket',
      fileName: 'test.pdf',
    }

    const url = await axios.post('s3/download', fileData)

    axios.get(url.data)
  }

  return (
    <Box sx={{ padding: '1rem' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type='file' {...register('file')} />
        <input type='submit' />
      </form>
      <br />
      <button onClick={handleDownload}>Download</button>
    </Box>
  )
}
