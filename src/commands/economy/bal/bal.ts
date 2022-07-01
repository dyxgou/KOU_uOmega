import { randomInt } from "mathjs"
import UserSchema from "../../../schemas/UserSchema"
import { ICallback } from "types/ICommand"
import { messageEmbed, userNotFound } from "../../../utils/embeds"
import { getUserInfo } from "../../../utils/userInfo"

const bal : ICallback = async (interaction) =>
{
  const userInfo = getUserInfo(interaction)

  const user = await UserSchema.findOne(userInfo , { cash : true , bank : true })

  if (!user)
    return interaction.reply({ embeds : [userNotFound({ interaction })] , ephemeral : true })

  const totalMoney = user.cash + user.bank

  const embed = messageEmbed({ interaction , name : "| 💵 | Balance - Economy" })
    .setDescription(`**Nombre** : <@!${userInfo?.userId}>
    **Número de cuenta** : ||\`${randomInt(0 , 999)}\`||
    **Contraseña** : ||\`${randomInt(1000 , 9999)}\`||`)
    .setFields([
      { name : "| 🪙 | KOUINS" , value : `\`$ ${user.cash}\`` , inline : true },
      { name : "| 🏦 | BANK" , value : `\`$ ${user.bank}\`` , inline : true },
      { name : "| 💰 | TOTAL" , value : `\`$ ${totalMoney}\`` , inline : true }
    ])

  return interaction.reply({ embeds : [embed] })
}

export default bal
