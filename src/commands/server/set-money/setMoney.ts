import GuildSchema from "../../../schemas/GuildSchema"
import { ICallback } from "types/ICommand"
import { messageEmbed, notAdministrator, serverNotFound } from "../../../utils/embeds"

type JOBS = "WORK" | "CRIME" | "FIGHT"
type RANGE = "max" | "min"

const setMoney : ICallback = async (interaction) =>
{
  const job = interaction.options.getString("job") as JOBS
  const newAmount = interaction.options.getNumber("new_amount")
  const range = interaction.options.getString("range") as RANGE

  const { memberPermissions } = interaction

  if (!(memberPermissions?.has("ADMINISTRATOR") || memberPermissions?.has("MANAGE_GUILD")))
  {
    return interaction.reply({ embeds : [notAdministrator({ interaction })] , ephemeral : true })
  }

  const { guildId } = interaction

  if (!guildId)
    return

  const guild = await GuildSchema.findOne({ guildId } , {
    MIN_AMOUNTS : true , MAX_AMOUNTS : true
  })

  if (!guild)
    return interaction.reply({ embeds : [serverNotFound({ interaction })] , ephemeral : true })

  const jobRange = range === "min" ? "MIN_AMOUNTS" : "MAX_AMOUNTS"

  const amountPayload = {}

  Object.defineProperty(amountPayload , `${jobRange}.${job}` , {
    value : newAmount , writable : true , enumerable : true , configurable : true
  })

  const embed = messageEmbed({ interaction , name : "| 💵 | Set Money Command" })

  try {
    await guild.updateOne({ $set : amountPayload })

    embed.setDescription(`La ganancia ${range === "min" ? "mínima" : "máxima"} en \`${job}\` ahora es de \`$${newAmount}\` pesitos. 🤩`)
  } catch (error) {
    console.error({ error })
    embed.setDescription(`Hubo un error al intentar actualizar la ganancia en \`${job}\`. 🤔`)
  }

  return interaction.reply({ embeds : [embed] })
}

export default setMoney
