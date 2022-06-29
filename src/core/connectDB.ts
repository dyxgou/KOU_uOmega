import * as mongoose from "mongoose"

const connectDB = async () =>
{
  const MONGO_URI = process.env.MONGO_URI

  if (!MONGO_URI)
  {
    console.error("MongoURI not found")
    process.exit(1)
  }

  await mongoose.connect(MONGO_URI , {
    dbName : "zOmega"
  }).then(() => console.log("| ✅ | Mongoose connected"))
    .catch(console.error)

  process.on("uncaughtException" , (error) =>
  {
    console.error({ error })
    mongoose.disconnect()
  })
}

export default connectDB
