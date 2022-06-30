import { ICallback } from "types/ICommand"
import { messageEmbed } from "../../../utils/embeds"

const serverInfo : ICallback = async (interaction) =>
{
  const { guild } = interaction

  if (!guild)
    return

  const embed = messageEmbed({ interaction , name : `| 👮 | ${guild?.name}` })
    .setThumbnail(guild?.iconURL({ dynamic : true , size : 1024 }) || "")
    .setFields([
      { name : "| ✏️ | **ID**" , value : guild?.id },
      { name : "| 🪪 | **Nombre**" , value : guild?.name },
      { name : "| 🔮 | **Fecha de Creación**" , value : guild?.createdAt.toDateString() },
      { name : "| 👑 | **Dueño del Servidor**" , value : `<@!${guild?.ownerId}>` },
      { name : "| 💬 | **Cantidad de Miembros**" , value : ` > **${guild?.memberCount}**` },
      { name : "| 📚 | **Cantidad de Canales**" , value : ` > **${guild?.channels.cache.size}**` },
      { name : "| 📝 | **Cantidad de Roles**" , value : ` > **${guild?.roles.cache.size}**` },
      { name : "| 📝 | **Cantidad de Emojis**" , value : ` > **${guild?.emojis.cache.size}**` }
    ])

  return interaction.reply({ embeds : [embed] })
}

export default serverInfo
