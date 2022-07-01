import GuildSchema from "../../../schemas/GuildSchema"
import UserSchema from "../../../schemas/UserSchema"
import { ICallback } from "types/ICommand"
import { messageEmbed, serverNotFound, userNotFound } from "../../../utils/embeds"
import randomAmount from "../../../utils/randomAmount"
import { getUserInfo } from "../../../utils/userInfo"

const fight : ICallback = async (interaction) =>
{
  const userInfo = getUserInfo(interaction)

  const user = await UserSchema.findOne(userInfo , { cash : true })
  const guild = await GuildSchema.findOne({ guildId : userInfo?.guildId } , {
    "MIN_AMOUNTS.fight" : true, "MAX_AMOUNTS.fight" : true
  })

  if (!user)
    return interaction.reply({ embeds : [userNotFound({ interaction })] , ephemeral : true })

  if (!guild)
    return interaction.reply({ embeds : [serverNotFound({ interaction })] , ephemeral : true })

  const { MIN_AMOUNTS , MAX_AMOUNTS } = guild

  const fightAmount = randomAmount({ min : MIN_AMOUNTS.crime , max : MAX_AMOUNTS.crime , job : "fight" })

  const embed = messageEmbed({ interaction , name : "| 💵 | Crime - Economy" })

  const randomUser = interaction.guild?.members.cache.random()

  if (fightAmount <= 0)
    embed.setDescription(`El mundo no estaba contigo, y por las apuestas perdiste: \`$${-fightAmount}\`. De paso te dio ${randomUser} en la getta. 😡`)
  else
    embed.setDescription(`${randomUser} no ha podido con tu poder y le has ganado con una ganancia de: \`$${fightAmount}\`💰`)

  try {
    await user.updateOne({ $inc : { cash : fightAmount } })
  } catch (error) {
    console.error(error)
    embed.setDescription("El banco convenientemente estaba cerrado y te has quedado en la puerta del banco.")
  }

  return interaction.reply({ embeds : [embed] })
}

export default fight
