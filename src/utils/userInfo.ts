import { CacheType, CommandInteraction } from "discord.js"

export const getUserInfo = (interaction : CommandInteraction<CacheType>) =>
{
  const { user , guildId } = interaction

  if (!guildId || !user.id)
    return undefined

  return {
    userId : user.id ,
    guildId
  }
}

export const getMentionatedInfo = (interaction : CommandInteraction<CacheType> , userName : string) =>
{
  const user = interaction.options.getUser(userName)
  const { guildId } = interaction

  if (!user || !guildId)
    return undefined

  return {
    userId : user.id ,
    guildId
  }
}
