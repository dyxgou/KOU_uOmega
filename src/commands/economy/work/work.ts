import GuildSchema from "../../../schemas/GuildSchema"
import UserSchema from "../../../schemas/UserSchema"
import { ICallback } from "types/ICommand"
import { messageEmbed, serverNotFound, userNotFound } from "../../../utils/embeds"
import randomAmount from "../../../utils/randomAmount"
import { getUserInfo } from "../../../utils/userInfo"

const work : ICallback = async (interaction) =>
{
  const userInfo = getUserInfo(interaction)

  const [user , guild] = await Promise.all([
    UserSchema.findOne(userInfo , { cash : true }),
    GuildSchema.findOne({ guildId : userInfo?.guildId } , {
      "MIN_AMOUNTS.work" : true , "MAX_AMOUNTS.work" : true
    })
  ])

  if (!guild)
    return interaction.reply({ embeds : [serverNotFound({ interaction })] , ephemeral : true })

  if (!user)
    return interaction.reply({ embeds : [userNotFound({ interaction })] , ephemeral : true })

  const amount = randomAmount({ min : guild.MIN_AMOUNTS.work , max : guild.MAX_AMOUNTS.work , job : "work" })

  const randomUser = interaction.guild?.members.cache.random()

  const embed = messageEmbed({ interaction , name : "| 💵 | WORK - ECONOMY" })
    .setDescription(`💰 Le has ganado un pvp a ${randomUser}, y has obtenido una ganancia de \`$${amount}\` que estaban convenientemente escondidas en su bolcillo. 💰`)

  try {
    await user.updateOne({ $inc : { cash : amount } })
  } catch (error) {
    console.error({ error })
    embed.setDescription(`Cuando ibas a salir a trabajar te percataste de que estaba lloviendo, así que tendrás que esperar a que escampe. 😅`)
  }

  return interaction.reply({ embeds : [embed] })
}

export default work
