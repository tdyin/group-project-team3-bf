import Address from './Address'
import Car from './Car'
import Contact from './Contact'
import EmeContact from './EmeContact'
import Legal from './Legal'
import ReferInfo from './ReferInfo'
import UserInfo from './UserInfo'
import Summary from './Summary'
import { Box } from '@mui/material'

type Props = {
  activeStep: number
}

export default function Forms({ activeStep }: Props) {
  return (
    <Box>
      {activeStep === 0 && <UserInfo />}
      {activeStep === 1 && <Address />}
      {activeStep === 2 && <Contact />}
      {activeStep === 3 && <Car />}
      {activeStep === 4 && <Legal />}
      {activeStep === 5 && <ReferInfo />}
      {activeStep === 6 && <EmeContact />}
      {activeStep === 7 && <Summary />}
    </Box>
  )
}
