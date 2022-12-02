import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()
import User from '../models/User'
import {
  dropAllCollection,
  createDefaultDocs,
  createRandomDocs,
} from '../utils/dbUtils'

const { MONGO_URL, SALT } = process.env

async function run() {
  try {
    // Connect to DB
    if (MONGO_URL) {
      await mongoose.connect(MONGO_URL)
      console.log('Connected to DB')
    } else {
      throw new Error('.env Error')
    }

    await dropAllCollection()

    // Create a user and all collection
    const docIds = await createDefaultDocs()
    const docIds1 = await createRandomDocs()
    const docIds2 = await createRandomDocs()
    const docIds3 = await createRandomDocs()

    await User.create({
      username: 'user',
      email: 'user@mail.com',
      stage: 0,
      password: await bcrypt.hash('12345', Number(SALT)),
      address: docIds.addressId,
      car: docIds.carId,
      contact: docIds.contactId,
      emContact: [docIds.emContactId],
      legal: docIds.legalId,
      referInfo: docIds.referInfoId,
      userDocs: docIds.userDocsId,
      userInfo: docIds.userInfoId,
    })
    await User.create({
      username: 'user1',
      email: 'user1@mail.com',
      stage: 1,
      password: await bcrypt.hash('12345', Number(SALT)),
      address: docIds1.addressId,
      car: docIds1.carId,
      contact: docIds1.contactId,
      emContact: [docIds1.emContactId],
      legal: docIds1.legalId,
      referInfo: docIds1.referInfoId,
      userDocs: docIds1.userDocsId,
      userInfo: docIds1.userInfoId,
    })
    await User.create({
      username: 'user2',
      email: 'user2@mail.com',
      stage: 2,
      password: await bcrypt.hash('12345', Number(SALT)),
      address: docIds2.addressId,
      car: docIds2.carId,
      contact: docIds2.contactId,
      emContact: [docIds2.emContactId],
      legal: docIds2.legalId,
      referInfo: docIds2.referInfoId,
      userDocs: docIds2.userDocsId,
      userInfo: docIds2.userInfoId,
    })
    await User.create({
      username: 'user3',
      email: 'user3@mail.com',
      stage: 3,
      password: await bcrypt.hash('12345', Number(SALT)),
      address: docIds3.addressId,
      car: docIds3.carId,
      contact: docIds3.contactId,
      emContact: [docIds3.emContactId],
      legal: docIds3.legalId,
      referInfo: docIds3.referInfoId,
      userDocs: docIds3.userDocsId,
      userInfo: docIds3.userInfoId,
    })

    // Create a HR
    await User.create({
      username: 'admin',
      email: 'admin@mail.com',
      password: await bcrypt.hash('12345', Number(SALT)),
      isHr: true,
      stage: 3,
      address: docIds3.addressId,
      car: docIds3.carId,
      contact: docIds3.contactId,
      emContact: [docIds3.emContactId],
      legal: docIds3.legalId,
      referInfo: docIds3.referInfoId,
      userDocs: docIds3.userDocsId,
      userInfo: docIds3.userInfoId,
    })
  } catch (error) {
    console.log(error)
  } finally {
    await mongoose.connection.close()
    console.log('DB closed')
  }
}

run().catch(console.dir)
