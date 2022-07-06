import { ApplicationCommandDataResolvable, CacheType, CommandInteraction, User } from "discord.js"
import * as gifs from "./gifs.json"

export type Categories = keyof typeof gifs

export type GifEmbed = {
  interaction : CommandInteraction<CacheType>,
  category : Categories,
  mentionated : User | null
}

export type GetOptions = {
  commandName : Categories,
  commandDescription : string,
  userDescription : string
}

export type Options = ApplicationCommandDataResolvable

export type GenerateCommand = {
  interaction : CommandInteraction<CacheType>,
  message : string,
  messageWithMention : string,
  category : Categories
}
