import ProfileSchema from "../../../schemas/ProfileSchema"
import { EmbedFieldData } from "discord.js"
import { ICallback } from "types/ICommand"
import { messageEmbed, profileNotFound } from "../../../utils/embeds"

const getProposals : ICallback = async (interaction) =>
{
  const userId = interaction.user.id

  const profile = await ProfileSchema.findOne({ userId } , { proposals : true })

  if (!profile)
    return interaction.reply({ embeds : [profileNotFound({ interaction })] })

  const proposalsList : EmbedFieldData[] = profile.proposals.map((userId , index) =>
  {
    const userMention = `<@!${userId}>`

    return {
      name : `| 💌 | Top ${index + 1}°`,
      value : userMention
    }
  })

  const embed = messageEmbed({ interaction , name : "| 💌 | Proposals List" })
    .setDescription(`${interaction.user}, aquí tienes la lista de propuestas de matrimonio que tienes hasta ahora. 🤑
    
    <a:Bling:967855659477524560> **\`Propuestas en total : ${profile.proposals.length}\`** <a:Bling:967855659477524560>`)
    .setFields(proposalsList)

  return interaction.reply({ embeds : [embed] })
}

export default getProposals
