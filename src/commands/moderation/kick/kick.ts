import { ICallback } from "types/ICommand"
import { notAdministrator } from "../../../utils/embeds"

const kick : ICallback = (interaction) =>
{
  const user = interaction.options.getUser("user")
  const reason = interaction.options.getString("reason") || "Razón no especificada."

  if (!interaction.memberPermissions?.has("KICK_MEMBERS"))
    return interaction.reply({ embeds : [notAdministrator({ interaction })] , ephemeral : true })

  if (!user)
    return

  const userToKick = interaction.guild?.members.cache.get(user.id)

  if (!userToKick?.kickable)
    return interaction.reply({
      content : `No es posible expulsar a ${userToKick}, la razón más probable es que este usuario tenga más permisos que yo.` , ephemeral : true
    })

  userToKick.kick(reason)

  return interaction.reply({ content : `El usuario ${user} ha sido expulsado correctamente.` })
}

export default kick
