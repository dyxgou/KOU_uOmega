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

export const getMentionatedInfo = (interaction : CommandInteraction<CacheType> , optionUserTag : string) =>
{
  const user = interaction.options.getUser(optionUserTag)
  const { guildId } = interaction

  if (!user || !guildId)
    return undefined

  return {
    userId : user.id ,
    guildId
  }
}
