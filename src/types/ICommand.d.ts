import { ApplicationCommandDataResolvable, CacheType, CommandInteraction } from "discord.js"

export type ICallback = (interaction : CommandInteraction<CacheType>) => any

export interface ICommand
{
  command : ICallback,
  options : ApplicationCommandDataResolvable
}

export interface IFileCommand
{
  default ?: ICommand,
}

export type CommandsMap = Map<string , ICallback>
