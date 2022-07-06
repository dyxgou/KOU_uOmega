import { button, buttonsRow } from "../../../utils/button"
import { CheckWinner, CurrentUser, HandOptions } from "./types"

const HANDS_WINNERS =
{
  STONE : "SCISSORS",
  PAPER : "STONE",
  SCISSORS : "PAPER"
}

const checkWinner = async ({ int , embed , bet , userChallenged , userChallenging , hands } : CheckWinner) =>
{
  const userId = int.user.id
  const handOption = int.customId as HandOptions
  const currentUser : CurrentUser = userId === userChallenging.userId ? "challenging" : "challenged"

  hands[currentUser] = handOption
  int.channel?.send(`${int.user} ya ha elegido. 😈`)

  const { challenged , challenging } = hands

  if (!challenged || !challenging)
    return

  try {
    if (challenged === challenging)
    {
      embed.setDescription(`<@!${userChallenging.userId}> **vs** <@!${userChallenged.userId}>
      
      Ha sido un empate. 🤑`)
    }
    else if (HANDS_WINNERS[challenging] === challenged)
    {
      embed.setDescription(`| 🏆 |**WINNER** <@!${userChallenging.userId}>
      
      El retador <@!${userChallenging.userId}>, se mantiene invicto con una victoria más y ha ganado \`$${bet}\`. 🎉`)
      await userChallenging.updateOne({ $inc : { cash : bet } })
      await userChallenged.updateOne({ $inc : { cash : -bet } })
    }
    else
    {
      embed.setDescription(`| 🏆 |**WINNER** <@!${userChallenged.userId}>
      
      <@!${userChallenged.userId}> ha venido para acabarle la racha a <@!${userChallenging.userId}> y con esto se lleva un premio de \`$${bet}\`. 🎉`)
      await userChallenged.updateOne({ $inc : { cash : bet } })
      await userChallenging.updateOne({ $inc : { cash : -bet } })
    }
  } catch (err) {
    console.error({ err })

    embed.setDescription(`Ha llegado un Uracán y hizo que ustedes no pudieran terminar la partida. 😫`)
  }

  return int.reply({ embeds : [embed] })
}

const buttons = [
  button({ style : "PRIMARY" , emoji : "🪨" , label : "Piedra" , id : "STONE" }),
  button({ style : "PRIMARY" , emoji : "📃" , label : "Papel" , id : "PAPER" }),
  button({ style : "PRIMARY" , emoji : "✂️" , label : "Tijera" , id : "SCISSORS" })
]

export const optionsRow = buttonsRow(buttons)
export default checkWinner
