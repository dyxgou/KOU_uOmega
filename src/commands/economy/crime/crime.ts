import GuildSchema from "../../../schemas/GuildSchema"
import UserSchema from "../../../schemas/UserSchema"
import { ICallback } from "types/ICommand"
import { messageEmbed, serverNotFound, userNotFound } from "../../../utils/embeds"
import randomAmount from "../../../utils/randomAmount"
import { getUserInfo } from "../../../utils/userInfo"

const crime : ICallback = async (interaction) =>
{
  const userInfo = getUserInfo(interaction)

  const user = await UserSchema.findOne(userInfo , { cash : true })
  const guild = await GuildSchema.findOne({ guildId : userInfo?.guildId } , {
    "MIN_AMOUNTS.crime" : true, "MAX_AMOUNTS.crime" : true
  })

  if (!user)
    return interaction.reply({ embeds : [userNotFound({ interaction })] , ephemeral : true })

  if (!guild)
    return interaction.reply({ embeds : [serverNotFound({ interaction })] , ephemeral : true })

  const { MIN_AMOUNTS , MAX_AMOUNTS } = guild

  const crimeAmount = randomAmount({ min : MIN_AMOUNTS.crime , max : MAX_AMOUNTS.crime , job : "crime" })

  const embed = messageEmbed({ interaction , name : "| 💵 | Crime - Economy" })

  if (crimeAmount <= 0)
    embed.setDescription(`💰 Cuando ibas a salir del banco, la policía te encontro con las manos en la masa y te llevaste una multa de \`$${-crimeAmount}\`. 💰`)
  else
    embed.setDescription(`💰 Robaste el Banco con éxito con un botín de \`$${crimeAmount}\` y la policía no te pudo encontrar puesto que el trafico estaba peor que transmilenio de Bogotá en hora Pico. 💰`)

  try {
    await user.updateOne({ $inc : { cash : crimeAmount } })
  } catch (error) {
    console.error(error)
    embed.setDescription("El banco convenientemente estaba cerrado y te has quedado en la puerta del banco.")
  }

  return interaction.reply({ embeds : [embed] })
}

export default crime
