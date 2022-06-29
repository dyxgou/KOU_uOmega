import commandHandler from "./core/commandHandler"
import { Client , Intents } from "discord.js"
import connectDB from "./core/connectDB"
import "dotenv/config"

const bot = new Client({
  intents : [
    Intents.FLAGS.GUILDS
  ]
})

bot.once("ready" , async () =>
{
  console.log(`| 🌉 | Bot is ready as ${bot.user?.username}`)

  await connectDB()
  commandHandler(bot , __dirname)
})

bot.login(process.env.TOKEN)
