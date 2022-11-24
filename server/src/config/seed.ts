import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()
import User from '../models/User'
import { dropAllCollection, createDefaultDocs } from '../utils/dbUtils'

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

    await User.create({
      username: 'user',
      email: 'user@mail.com',
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

    // Create a HR
    await User.create({
      username: 'admin',
      email: 'admin@mail.com',
      password: await bcrypt.hash('12345', Number(SALT)),
      isHr: true,
      stage: 4,
      address: docIds.addressId,
      car: docIds.carId,
      contact: docIds.contactId,
      emContact: [docIds.emContactId],
      legal: docIds.legalId,
      referInfo: docIds.referInfoId,
      userDocs: docIds.userDocsId,
      userInfo: docIds.userInfoId,
    })
  } catch (error) {
    console.log(error)
  } finally {
    await mongoose.connection.close()
    console.log('DB closed')
  }
}

run().catch(console.dir)
