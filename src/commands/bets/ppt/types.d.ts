import { ButtonInteraction, CacheType, MessageEmbed } from "discord.js"
import { IUser } from "schemas/UserSchema"

export type User = IUser & {
  _id: any;
}

export type HandOptions = "STONE" | "PAPER" | "SCISSORS"

export interface Hands
{
  challenging ?: HandOptions
  challenged ?: HandOptions
}

export type CheckWinner = {
  int : ButtonInteraction<CacheType>,
  embed : MessageEmbed,
  userChallenging : User,
  userChallenged : User,
  bet : number,
  hands : Hands
}

export type CurrentUser = keyof Hands
