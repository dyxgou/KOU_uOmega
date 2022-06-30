import { ICallback } from "types/ICommand"
import { messageEmbed, notAdministrator } from "../../../utils/embeds"
const ms = require("ms")

const ban : ICallback = (interaction) =>
{
  const user = interaction.options.getUser("user")
  const reason = interaction.options.getString("reason") || "Razón no especificada."
  const time = interaction.options.getString("time")

  const { memberPermissions } = interaction

  if (!(memberPermissions?.has("ADMINISTRATOR") || memberPermissions?.has("BAN_MEMBERS")))
  {
    return interaction.reply({ embeds : [notAdministrator({ interaction })] , ephemeral : true })
  }

  if (!user)
    return

  const userToBan = interaction.guild?.members.cache.get(user.id)

  if (!userToBan?.bannable)
  {
    return interaction.reply({
      content : `No es posible banear a ${user}, la razón más probable es que tenga más permisos que yo. 😢` , ephemeral : true
    })
  }

  const ONE_DAY = 86400000

  const embed = messageEmbed({ interaction , name : "| 👮 |  Ban Command " })

  try {
    const days = time ? ms(time) / ONE_DAY : undefined

    embed.setDescription(`El usuario ${userToBan} ha sido baneado por ${interaction.user}.
    **Razón** : \`${reason}\`
    ${time && `**Tiempo** : \`${time}\``}`)

    userToBan.ban({ reason , days })
  } catch (error) {
    console.error(error)
    embed.setDescription(`Ha ocurrido un error cuando intentamos banear a ${userToBan}.`)
  }

  return interaction.reply({ embeds : [embed] , ephemeral : true })
}

export default ban
