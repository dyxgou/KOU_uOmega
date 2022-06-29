import GuildSchema from "../../../schemas/GuildSchema"
import { ICallback } from "types/ICommand"
import { serverNotFound } from "../../../utils/embeds"

const setConfession : ICallback = async (interaction) =>
{
  if (!interaction.memberPermissions?.has("ADMINISTRATOR"))
    return interaction.reply({ content : "No tienes los permisos necesarios para ejecutar éste comando." , ephemeral : true })

  const { guildId } = interaction

  if (!guildId)
    return interaction.reply({ content : "Tienes que estar en un servidor para poder usar este comando." })

  const guild = await GuildSchema.findOne({ guildId } , {
    "channels.confession" : true
  })

  if (!guild)
    return interaction.reply({ embeds : [serverNotFound({ interaction })] , ephemeral : true })

  const channel = interaction.options.getChannel("channel")

  if (channel?.type !== "GUILD_TEXT")
    return interaction.reply({ content : "No puedes establecer canales que no sean de texto para las confesiones. 😡" })

  try {
    await guild.updateOne({
      $set : {
        "channels.confession" : channel.id
      }
    })

    return interaction.reply({ content : "El canal de confesiones ha sido establecido correctamente, puedes usar el comando `/confession`, para iniciar a contarnos tus más oscuros secretos, de forma anónima, claro. 😈" })
  } catch (error) {
    return interaction.reply({ content : "Ha ocurrido un error cuando estabamos estableciendo el canal de confesiones. 😢" , ephemeral : true })
  }
}

export default setConfession
