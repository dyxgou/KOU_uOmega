import { ICallback } from "types/ICommand"
import { messageEmbed } from "../../../utils/embeds"

const avatar : ICallback = (interaction) =>
{
  const user = interaction.options.getUser("user" , false) || interaction.user

  const embed = messageEmbed({
    interaction , name : `Avatar de ${user.username}`
  }).setImage(user.displayAvatarURL({ dynamic : true , size : 1024 }))

  return interaction.reply({ embeds : [embed] })
}

export default avatar
