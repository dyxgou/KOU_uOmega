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
    .setDescription(`Para jugar a la **Ruleta**, tienes que elegir entre el color **🪙 Rojo** o el color **🪙 Negro** y tendrás un 50% de probabilidad de ganar el doble de la cantidad que apostaste o perderlo todo. 😈
    
    *Tienes un minuto para elegir, o la apuesta será cancelada.*`)

  const collector = await interaction.channel?.send({ embeds : [embed] , components : [row] }).then(msg => {
    return msg.createMessageComponentCollector({
      componentType : "BUTTON",
      filter : (int) => int.user.id !== interaction.user.id,
      time : 1000 * 60 // 1 Minute
    })
  })

  collector?.on("end" , async (int) => await checkColor({ int , amountToBet , embed , user }))
}

export default roulette
