import GuildSchema from "../../../schemas/GuildSchema"
import { ICallback } from "types/ICommand"
import { messageEmbed } from "../../../utils/embeds"
import checkSuggestion, { row } from "./checkSuggestion"

const suggestion : ICallback = async (interaction) =>
{
  const suggestion = interaction.options.getString("suggestion")

  if (!suggestion)
    return

  const embed = messageEmbed({ interaction , name : "Sugerencia... 😘" })
    .setDescription(`**( <a:Ok1:967855659653685298> )** FROM : ${interaction.user}

    > **${suggestion}**

    **ESTADO** : \` PENDIENTE \``)

  const guild = await GuildSchema.findOne({ guildId : interaction.guildId || "" } , {
    "channels.suggestion" : true , _id : false
  })

  if (!guild?.channels.suggestion)
    return interaction.reply(
      { content : "No hemos encontrado un canal de sugerencias, para crear uno puedes usar el comando : `/set-suggestion`." , ephemeral : true }
    )

  const channel = interaction.guild?.channels.cache.get(guild.channels.suggestion)

  if (!channel?.isText())
    return

  const collector = await channel.send({ embeds : [embed] , components : [row] }).then(msg => {
    return msg.createMessageComponentCollector({
      componentType : "BUTTON",
      filter : (user) => user.id === interaction.user.id ,
      max : 1,
      time : 1000 * 60 * 60 * 24 * 7 // 7 Days
    })
  })

  interaction.reply({ content : "Tu sugerencia ha sido enviada." , ephemeral : true })

  collector.on("end" , async (buttonInt) =>
  {
    const int = buttonInt.first()

    if (!int?.isButton())
      return

    return checkSuggestion({ embed , int , suggestion , author : interaction.user })
  })
}

export default suggestion
