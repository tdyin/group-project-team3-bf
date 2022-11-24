import mongoose, { ObjectId } from 'mongoose'

import Address from '../models/Address'
import Car from '../models/Car'
import Contact from '../models/Contact'
import EmContact from '../models/EmContact'
import Legal from '../models/Legal'
import ReferInfo from '../models/ReferInfo'
import UserDocs from '../models/UserDocs'
import UserInfo from '../models/UserInfo'
import User from '../models/User'

type DocIds = {
  addressId: ObjectId
  carId: ObjectId
  contactId: ObjectId
  emContactId: ObjectId
  legalId: ObjectId
  referInfoId: ObjectId
  userDocsId: ObjectId
  userInfoId: ObjectId
}

export async function dropAllCollection() {
  return await Promise.all([
    Address.collection.drop(),
    Car.collection.drop(),
    Contact.collection.drop(),
    EmContact.collection.drop(),
    Legal.collection.drop(),
    ReferInfo.collection.drop(),
    UserDocs.collection.drop(),
    UserInfo.collection.drop(),
    User.collection.drop(),
  ])
}

export async function createDefaultDocs(): Promise<DocIds> {
  const address = new Address({
    street: '',
    bldgApt: '',
    city: '',
    state: '',
    zip: '',
  })
  const car = new Car({
    make: '',
    model: '',
    color: '',
    licenseNum: '',
    expDate: new Date(),
  })
  const contact = new Contact({
    cellPhone: '',
    workPhone: '',
  })
  const emContact = new EmContact({
    firstName: '',
    lastName: '',
    middleName: '',
    phone: '',
    email: '',
    relationship: '',
  })
  const legal = new Legal({
    permanent: false,
    permanentType: '',
    visaTitle: '',
    startDate: new Date(),
    endDate: new Date(),
  })
  const referInfo = new ReferInfo({
    firstName: '',
    lastName: '',
    middleName: '',
    phone: '',
    email: '',
    relationship: '',
  })
  const userDocs = new UserDocs({ driverlicense: '', workAuth: '' })
  const userInfo = new UserInfo({
    firsName: '',
    lastName: '',
    middleName: '',
    preferredName: '',
    ssn: '0',
    dob: new Date(),
    gender: '',
  })

  await Promise.all([
    await address.save(),
    await car.save(),
    await contact.save(),
    await emContact.save(),
    await legal.save(),
    await referInfo.save(),
    await userDocs.save(),
    await userInfo.save(),
  ])

  return {
    addressId: address._id,
    carId: car._id,
    contactId: contact._id,
    emContactId: emContact._id,
    legalId: legal._id,
    referInfoId: referInfo._id,
    userDocsId: userDocs._id,
    userInfoId: userInfo._id,
  }
}
