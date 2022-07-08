import ProfileSchema from "../../../schemas/ProfileSchema"
import { ICallback } from "types/ICommand"
import { messageEmbed } from "../../../utils/embeds"

const createProfile : ICallback = async (interaction) =>
{
  const userId = interaction.user.id

  const embed = messageEmbed({ interaction , name : "| 💌 | Create Profile - Dates" })

  try {
    await ProfileSchema.create({ userId })

    embed.setDescription(`${interaction.user}, tu perfil ha sido creado correctamente. 🎉`)
  } catch (error) {
    console.error(error)
    embed.setDescription(`${interaction.user}, ha ocurrido un error al crear tu perfil. 😔`)
  }

  return interaction.reply({ embeds : [embed] })
}

export default createProfile
