import gifEmbed from "./gifEmbed"
import { GenerateCommand } from "./types"

const USER_MENTION = "{mentionated}"
const USER = "{user}"

const generateCommand = ({ interaction , message , messageWithMention , category } : GenerateCommand) =>
{
  const mentionated = interaction.options.getUser("user")

  const { embed , error } = gifEmbed({ interaction , category , mentionated })

  if (error)
    return interaction.reply({ embeds : [embed] })

  if (mentionated)
  {
    const description = messageWithMention.replace(USER_MENTION , `<@${mentionated.id}>`).replace(USER , `<@${interaction.user.id}>`)
    embed.setDescription(description)
  }
  else
  {
    const description = message.replace(USER , `<@${interaction.user.id}>`)
    embed.setDescription(description)
  }

  return interaction.reply({ embeds : [embed] })
}

export default generateCommand
