import { FormEvent } from 'react'
import Button from '@mui/material/Button'
import useMultiForm from '../../utils/useMultiForm'
import Address from './Address'
import Car from './Car'
import Contact from './Contact'
import EmeContact from './EmeContact'
import Legal from './Legal'
import ReferInfo from './ReferInfo'
import UserInfo from './UserInfo'

export default function Forms() {
  const { steps, currentStep, step, isFirst, isLast, backStep, nextStep } =
    useMultiForm([
      <UserInfo />,
      <Contact />,
      <Car />,
      <Legal />,
      <ReferInfo />,
      <EmeContact />,
      <Address />,
    ])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div>
      <div>
        <form onSubmit={onSubmit}>
          <div>
            {currentStep + 1} / {steps.length}
          </div>
          {step}
          <div></div>
          {!isFirst && (
            <Button type='button' onClick={backStep}>
              Previous
            </Button>
          )}
          <Button type='submit' onClick={nextStep}>
            {isLast ? 'Register' : 'Next'}
          </Button>
        </form>
      </div>
    </div>
  )
}
