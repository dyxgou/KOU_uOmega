import { ButtonInteraction, CacheType, MessageEmbed , Collection } from "discord.js"
import { button , buttonsRow } from "../../../utils/button"
import betAmount from "./betAmount"
import { User } from "../../../types/Schemas"

type CheckColors = {
  int : Collection<string, ButtonInteraction<CacheType>>,
  amountToBet : number,
  user : User,
  embed : MessageEmbed
}

const checkColor = async ({ int , amountToBet , user , embed } : CheckColors) =>
{
  const interaction = int.first()

  if (!interaction)
    return

  const colorID = interaction.customId

  const { amount , isWinner } = betAmount(amountToBet)

  if (isWinner)
  {
    embed.setDescription(`**¡EN HORA BUENA!**
    Has acertado con 🪙 \`${colorID.toLowerCase()}\` y has ganado \`$${amount}\`.`)
  }
  else
  {
    embed.setDescription(`¡El 🪙 \`${colorID.toLowerCase()}\` no era!
    **Has perdido : \`$${amount}\`**`)
  }

  try {
    await user.updateOne({ $inc : { cash : amount } })
  } catch (error) {
    console.error(error)
    embed.setDescription("Ops... Saliste del casino y un ladrón te robó lo que ganaste. 😢")
  }

  return interaction.reply({ embeds : [embed] })
}

const buttons = [
  button({ id : "RED" , label : "Rojo" , style : "DANGER" , emoji : "🪙" }),
  button({ id : "BLACK" , label : "Negro" , style : "SECONDARY" , emoji : "🪙" })
]

export const row = buttonsRow(buttons)
export default checkColor
