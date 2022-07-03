import UserSchema from "../../../schemas/UserSchema"
import { ICallback } from "types/ICommand"
import { messageEmbed, userNotFound } from "../../../utils/embeds"
import { getUserInfo } from "../../../utils/userInfo"

const ALL_MONEY = "all"

const withMoney : ICallback = async (interaction) =>
{
  const userInfo = getUserInfo(interaction)
  const amount = interaction.options.getString("amount" , true)
  const user = await UserSchema.findOne(userInfo , { bank : true })

  if (!user)
    return interaction.reply({ embeds : [userNotFound({ interaction })] , ephemeral : true })

  if (user.bank <= 0)
    return interaction.reply({ content : "No puedes retirar cantidades negativas del banco." })

  const amountToWith = amount === ALL_MONEY ? user.bank : parseInt(amount)

  if (amountToWith > user.bank)
    return interaction.reply({ content : "No puedes retirar más dinero del que tienes en el banco." })

  const embed = messageEmbed({ interaction , name : "| 💵 | Withdraw - Economy " })

  try {
    await user.updateOne({
      $inc : {
        bank : -Math.floor(amountToWith) ,
        cash : Math.floor(amountToWith)
      }
    })

    embed.setDescription(`💰 Has retirado \`$${amountToWith}\` del banco. 💰`)
  } catch (error) {
    console.error(error)
    embed.setDescription(`💰 Cuando fuiste a retirar tu dinero, ocurrió un fallo en la Matrix y terminaste en tu casa magicamente. 💰`)
  }

  return interaction.reply({ embeds : [embed] })
}

export default withMoney
