import UserSchema from "../../../schemas/UserSchema"
import { ICallback } from "types/ICommand"
import { messageEmbed, userNotFound } from "../../../utils/embeds"
import { getMentionatedInfo, getUserInfo } from "../../../utils/userInfo"

const ALL_MONEY = "all"

const pay : ICallback = async (interaction) =>
{
  const userInfo = getUserInfo(interaction)
  const mentionatedInfo = getMentionatedInfo(interaction , "user")
  const amount = interaction.options.getString("amount" , true)

  const [userPaying , userToPay] = await Promise.all([
    UserSchema.findOne(userInfo),
    UserSchema.findOne(mentionatedInfo)
  ])

  if (!userPaying)
    return interaction.reply({ embeds : [userNotFound({ interaction })] , ephemeral : true })

  if (!userToPay)
    return interaction.reply({ content : `<@!${mentionatedInfo?.userId}> no está registrado en el sistema de Economía, puedes decirle que para poder registrarse puede usar \`/start\`. 😍` })

  const amountToPay = amount === ALL_MONEY ? userPaying.cash : parseInt(amount)

  if (amountToPay <= 0)
    return interaction.reply({ content : "No puedes pagar una cantidad menor o igual a 0." })

  if (amountToPay > userPaying.cash)
    return interaction.reply({ content : `No tienes actualmente \`$${amountToPay}\` en la **billetera** para pagar a <@!${mentionatedInfo?.userId}>. 😡` })

  const embed = messageEmbed({ interaction , name : `| 💵 | Pay - Economy` })
    .setDescription(`Le has pagado \`$${amount}\` a <@!${userToPay.userId}>. 😍`)

  try {
    await userPaying.updateOne({ $inc : { cash : -amountToPay } })
    await userToPay.updateOne({ $inc : { cash : amountToPay } })
  } catch (error) {
    console.error(error)
    embed.setDescription(`Hubo un error al intentar pagar a <@!${userToPay.userId}>. 😢`)
  }

  return interaction.reply({ embeds : [embed] })
}

export default pay
