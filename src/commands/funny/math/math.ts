import { ICallback } from "types/ICommand"
import * as mathJS from "mathjs"
import { messageEmbed } from "../../../utils/embeds"

const math : ICallback = async (interaction) =>
{
  const operation = interaction.options.getString("operation")

  if (!operation)
    return

  const embed = messageEmbed({ interaction , name : "| 📖 | MATH" })

  try {
    const result = mathJS.evaluate(operation)
    embed.setFields([
      { name : "| 📖 | OPERACION", value : ` > \`${operation}\`` },
      { name : "| 📖 | RESULTADO", value : ` > \`${result}\`` }
    ])
  } catch (e) {
    try {
      const result = mathJS.simplify(operation)
      embed.setFields([
        { name : "| 📖 | OPERACION", value : ` > \`${operation}\`` },
        { name : "| 📖 | RESULTADO", value : ` > \`${result}\`` }
      ])
    } catch (error) {
      console.error({ error })
      embed.setDescription(`Ha ocurrido un error cuando intentabas hacer ésta operación.`)
    }

    return interaction.reply({ embeds : [embed] })
  }
}

export default math
