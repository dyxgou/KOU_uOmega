import GuildSchema from "../../../schemas/GuildSchema"
import { ICallback } from "types/ICommand"
import { serverNotFound } from "../../../utils/embeds"

const setSuggestion : ICallback = async (interaction) =>
{
  if (!interaction.memberPermissions?.has("ADMINISTRATOR"))
    return interaction.reply({ content : "No tienes los permisos necesarios para ejecutar éste comando." , ephemeral : true })

  const { guildId } = interaction

  if (!guildId)
    return interaction.reply({ content : "Tienes que estar en un servidor para poder usar este comando." })

  const guild = await GuildSchema.findOne({ guildId } , {
    "channels.suggestion" : true
  })

  if (!guild)
    return interaction.reply({ embeds : [serverNotFound({ interaction })] , ephemeral : true })

  const channel = interaction.options.getChannel("channel")

  if (channel?.type !== "GUILD_TEXT")
    return interaction.reply({ content : "No puedes establecer canales que no sean de texto para las sugerencias. 😡" })

  try {
    await guild.updateOne({
      $set : {
        "channels.suggestion" : channel.id
      }
    })

    return interaction.reply({ content : "El canal de sugerencias ha sido establecido correctamente, puedes usar el comando `/suggestion`, para hacer proponer las sugerencias que consideres perminentes para el servidor. 🤩" })
  } catch (error) {
    return interaction.reply({ content : "Ha ocurrido un error cuando estabamos estableciendo el canal de confesiones. 😢" , ephemeral : true })
  }
}

export default setSuggestion
