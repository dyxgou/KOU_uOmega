import UserSchema from "../../../schemas/UserSchema"
import { ICallback } from "types/ICommand"
import { getMentionatedInfo, getUserInfo } from "../../../utils/userInfo"
import { messageEmbed, userNotFound } from "../../../utils/embeds"
import cashStealed from "./cashStealed"

const rob : ICallback = async (interaction) =>
{
  const userToStealInfo = getMentionatedInfo(interaction , "user")
  const userStealingInfo = getUserInfo(interaction)

  if (userToStealInfo?.userId === userStealingInfo?.userId)
    return interaction.reply({ content : "¿ Cómo planeas robarte a ti mismo ? o.O" })

  const [userToSteal , userStealing] = await Promise.all([
    UserSchema.findOne(userToStealInfo , { cash : true }),
    UserSchema.findOne(userStealingInfo , { cash : true })
  ])

  if (!userStealing)
    return interaction.reply({ embeds : [userNotFound({ interaction })] , ephemeral : true })

  if (!userToSteal)
    return interaction.reply({ content : `<@!${userToStealInfo?.userId}>, la rata de <@!${userStealing?.userId}> te quiere robar, cuando ni tienes una cuenta en el sistema de Economía 😡. Sin embargo, aprovecha para crearte una con \`/start\`. 😋` })

  const embed = messageEmbed({ interaction , name : "| 🦝 | Rob - Economy" })

  const { amount , isStealed } = cashStealed(userToSteal.cash)

  // If the user has been stealed
  if (isStealed)
  {
    embed.setDescription(`${interaction.user}, has salido como un victorioso ratero  y de paso le jodiste el día a <@!${userToStealInfo?.userId}>. 😎
    
    **BOTÍN** : \`$${amount}\``)
  }
  else if (userToSteal.cash <= 1000)
  {
    embed.setDescription(`${interaction.user}, eres la rata más rata que he visto 😡.
    ¿ Cómo le puedes robar al ángel de <@!${userToSteal.userId}>, si apenas tiene \`$${userToSteal.cash}\` ? 😢
    
    **MUTAL** : \`$${-amount}\``)
  }
  else // if the user has not been stealed
  {
    embed.setDescription(`La policía ha encontrado a la rata de <@!${userStealingInfo?.userId}> robando a <@!${userToStealInfo?.userId}> 😡.
    
    **MUTAL** : \`$${-amount}\``)
  }

  try {
    if (isStealed)
    {
      await userStealing.updateOne({ $inc : { cash : amount } })
      await userToSteal.updateOne({ $inc : { cash : -amount } })
    }
    else
    {
      await userStealing.updateOne({ $inc : { cash : -amount } })
      await userToSteal.updateOne({ $inc : { cash : amount } })
    }
  } catch (error) {
    console.error(error)
    embed.setDescription(`${interaction.user}, ha ocurrido un error al intentar robar a <@!${userToStealInfo?.userId}>. 😢`)
  }

  return interaction.reply({ embeds : [embed] })
}

export default rob
