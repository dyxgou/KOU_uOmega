import GuildSchema from "../../../schemas/GuildSchema"
import { ICallback } from "types/ICommand"
import { messageEmbed } from "../../../utils/embeds"

const confession : ICallback = async (interaction) =>
{
  const confession = interaction.options.getString("confession")

  const embed = messageEmbed({ interaction , name : "🤫  Secretito..." })
    .setDescription(` > **${confession}**`)
    .setFooter({ text : "🙀" })

  const guild = await GuildSchema.findOne({ guildId : interaction.guildId || "" } , {
    "channels.confession" : true , _id : false
  })

  if (!guild?.channels.confession)
    return interaction.reply({ content : "En este servidor no ha sido establecido un canal para hacer confesiones. Para estblecer uno, puedes usar el comando : `/set-confession`." , ephemeral : true })

  const channel = interaction.guild?.channels.cache.get(guild.channels.confession)

  if (!channel?.isText())
    return

  interaction.reply({ content : "Tu confesión ha sido enviada. 🤫" , ephemeral : true })
  return channel.send({ embeds : [embed] }).then(msg => msg.react("🙀"))
}

export default confession
