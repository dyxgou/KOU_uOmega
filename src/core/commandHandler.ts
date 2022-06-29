import { Client } from "discord.js"
import getCommands from "./getCommands"
import * as path from "node:path"
import { CommandsMap, IFileCommand } from "types/ICommand"

const suffix = __filename.substring(__filename.length - 3)

const commandHandler = (bot : Client , dir : string) =>
{
  const commandFolder = path.join(dir , "commands")
  const commandsDirs = getCommands(commandFolder , suffix)
  const commands : CommandsMap = new Map()

  for (const dir of commandsDirs)
  {
    const cmd : IFileCommand = require(dir)

    if (!cmd.default) continue

    const { command , options } = cmd.default

    bot.application?.commands.create(options)
    commands.set(options.name , command)
    console.log(`| 🎮 | ${options.name}`)
  }

  bot.on("interactionCreate" , async (interaction) =>
  {
    if (!interaction.isCommand()) return

    const { commandName } = interaction

    const command = commands.get(commandName)

    if (!command) return

    command(interaction)
  })
}

export default commandHandler
