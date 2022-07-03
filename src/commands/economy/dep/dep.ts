import UserSchema from "../../../schemas/UserSchema"
import { ICallback } from "types/ICommand"
import { messageEmbed, userNotFound } from "../../../utils/embeds"
import { getUserInfo } from "../../../utils/userInfo"

const ALL_MONEY = "all"

const dep : ICallback = async (interaction) =>
{
  const userInfo = getUserInfo(interaction)
  const amount = interaction.options.getString("amount" , true)

  const user = await UserSchema.findOne(userInfo , {
    cash : true
  })

  if (!user)
    return interaction.reply({ embeds : [userNotFound({ interaction })] , ephemeral : true })

  const amountToDep = amount === ALL_MONEY ? user.cash : parseInt(amount)

  const embed = messageEmbed({ interaction , name : "| 💵 | Deposit - Economy" })

  try {
    await user.updateOne({
      $inc : {
        cash : -Math.floor(amountToDep),
        bank : Math.floor(amountToDep)
      }
    })

    embed.setDescription(`💰 Has depositado \`$${amountToDep}\` en tu cuenta. 💰`)
  } catch (error) {
    console.error(error)
    embed.setDescription(`El banco estaba cerrado, va a tocar esperar `)
  }

  return interaction.reply({ embeds : [embed] })
}

export default dep
