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
        filter : (int) => int.user.id !== interaction.user.id || !int.memberPermissions?.has("MANAGE_GUILD")
      })
    })

    interaction.reply({ content : "Tu sugerencia ha sido enviada." , ephemeral : true })

    collector.once("collect" , async (int) =>
    {
      if (!int?.isButton())
        return

      return checkSuggestion({ embed , int , suggestion , author : interaction.user })
    })
}

export default suggestion
