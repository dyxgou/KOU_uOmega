import { ICallback } from "types/ICommand"

const say : ICallback = (interaction) =>
{
  const message = interaction.options.getString("message")

  interaction.reply({ content : "El mensaje ha sido enviado. 🤫" , ephemeral : true })
  return interaction.channel?.send({ content : message })
}

export default say
