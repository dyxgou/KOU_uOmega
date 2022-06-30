import { ButtonInteraction, CacheType, MessageEmbed, User } from "discord.js"
import { button, buttonsRow } from "../../../utils/button"

type SggStatus = "ACCEPT" | "REJECT" | "PENDING"

interface ICheckSuggestion
{
  embed : MessageEmbed,
  int : ButtonInteraction<CacheType>,
  suggestion : string,
  author : User
}

const checkSuggestion = ({ embed , int , suggestion , author } : ICheckSuggestion) =>
{
  if (!(int.memberPermissions?.has("ADMINISTRATOR") || int.memberPermissions?.has("MANAGE_GUILD")))
    return int.reply({ content : "No tienes los permisos suficientes para usar este comando..." , ephemeral : true })

  if (int.user.id === author.id)
    return int.reply({ content : "No puedes aceptar tu propia sugerencia..." , ephemeral : true })

  const suggestionStatus = int.customId as SggStatus

  if (suggestionStatus === "ACCEPT")
  {
    embed.setDescription(`**( <a:Ok1:967855659653685298> )** FROM : ${author}
    ${suggestion}
    **ESTADO** : \` ACEPTADA \`
    **By** : ${int.user}`)
  }
  else if (suggestionStatus === "PENDING")
  {
    embed.setDescription(`**( <a:Ok1:967855659653685298> )** FROM : ${author}
    ${suggestion}
    **ESTADO** : \` PENDIENTE \`
    **By** : ${int.user}`)
  }
  else if (suggestionStatus === "REJECT")
  {
    embed.setDescription(`**( <a:Ok1:967855659653685298> )** FROM : ${author}
    ${suggestion}
    **ESTADO** : \` RECHAZADA \`
    **By** : ${int.user}`)
  }

  return int.reply({ embeds : [embed] })
}

const buttons = [
  button({
    id : "ACCEPT", style : "SUCCESS", emoji : "✅", label : "Aceptar sugerencia"
  }),
  button({
    id : "PENDING" , style : "PRIMARY" , emoji : "⏱️" , label : "Posponer sugerencia"
  }),
  button({
    id : "REJECT" , style : "DANGER" , emoji : "❌" , label : "Rechazar sugerencia"
  })
]

export const row = buttonsRow(buttons)
export default checkSuggestion
