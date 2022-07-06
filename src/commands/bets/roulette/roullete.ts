import UserSchema from "../../../schemas/UserSchema"
import { ICallback } from "types/ICommand"
import { messageEmbed, userNotFound } from "../../../utils/embeds"
import checkColor, { row } from "./checkColor"
import { getUserInfo } from "../../../utils/userInfo"

const ALL_MONEY = "all"

const roulette : ICallback = async (interaction) =>
{
  const userInfo = getUserInfo(interaction)
  const amount = interaction.options.getString("amount" , true)

  const user = await UserSchema.findOne(userInfo , { cash : true })

  if (!user)
    return interaction.reply({ embeds : [userNotFound({ interaction })] , ephemeral : true })

  const amountToBet = amount === ALL_MONEY ? user.cash : parseInt(amount)

  if (amountToBet <= 0)
    return interaction.reply("No puedes apostar cantidades negativas. 😡")

  if (amountToBet > user.cash)
    return interaction.reply(`No tienes la cantidad de \`$${amountToBet}\` en la billetera para poder apostarla. 😡`)

  const embed = messageEmbed({ interaction , name : `${interaction.user.username}'s Roullete 🤑` })
    .setDescription(`Para jugar a la **Ruleta**, tienes que elegir un color, :coin: \`Rojo\` o :coin: \`Negro\`, tienes un **50% de probabilidad** de **ganar el doble de lo que has apostado** o **perderlo todo**. ¡Suerte cámarada! 😈
    
    \`APUESTA\` : \`$${amountToBet}\``)

  interaction.reply({ content : "Que inicie el juego. 😈" , ephemeral : true })

  const collector = await interaction.channel?.send({ embeds : [embed] , components : [row] }).then(msg => {
    return msg.createMessageComponentCollector({
      componentType : "BUTTON",
      filter : (int) => int.user.id === interaction.user.id,
      time : 1000 * 60 // 1 Minute
    })
  })

  collector?.once("collect" , async (int) => await checkColor({ int , user , amountToBet , embed }))
}

export default roulette
