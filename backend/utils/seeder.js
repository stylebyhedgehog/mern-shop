import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import Product from "../models/productModel";
import User from "../models/userModel";

dotenv.config()

mongoose.connect(process.env.MONGO_URI)

const importData = async () => {
  try {
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)

    process.exit()
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Product.deleteMany()
    await User.deleteMany()

    process.exit()
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
