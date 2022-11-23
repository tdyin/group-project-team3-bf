import React, { FormEvent } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button'
import useMultiForm from '../utils/useMultiForm'
import Address from '../components/application/Address'
import UserInfo from '../components/application/UserInfo'
import Contact from '../components/application/Contact'
import Car from '../components/application/Car'
import Legal from '../components/application/Legal'
import ReferInfo from '../components/application/ReferInfo'
import EmeContact from '../components/application/EmeContact'

export default function Application() {
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
