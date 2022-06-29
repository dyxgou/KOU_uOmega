import { ICallback } from "types/ICommand"
import { messageEmbed } from "../../../utils/embeds"

const esay : ICallback = async (interaction) =>
{
  const message = interaction.options.getString("message")

  if (!message) return

  const embed = messageEmbed({
    interaction , name : "Secreto 🤫"
  }).setDescription(message)

  interaction.reply({ content : "El mensaje ha sido enviado. 🤫" , ephemeral : true })
  return interaction.channel?.send({ embeds : [embed] })
}

export default esay
