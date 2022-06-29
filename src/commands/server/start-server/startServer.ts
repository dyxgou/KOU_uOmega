import GuildSchema from "../../../schemas/GuildSchema"
import { ICallback } from "types/ICommand"
import { messageEmbed, notAdministrator } from "../../../utils/embeds"

const startServer : ICallback = async (interaction) =>
{
  if (!interaction.memberPermissions?.has("ADMINISTRATOR"))
    return interaction.reply({ embeds : [notAdministrator({ interaction })] , ephemeral : true })

  const { guildId } = interaction

  const embed = messageEmbed({ interaction , name : "Registrando servidor..." })

  try {
    await GuildSchema.create({ guildId })
    embed.setDescription("El servidor ha sido registrado correctamente. 🤑")
    return interaction.reply({ embeds : [embed] })
  } catch (error) {
    console.error(error)
    embed.setDescription("Ha ocurrido un fallo cuando intentamos registrar el servidor. 😢")
    return interaction.reply({ embeds : [embed] })
  }
}

export default startServer
