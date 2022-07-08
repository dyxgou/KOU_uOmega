import ProfileSchema from "../../../schemas/ProfileSchema"
import LetterSchema from "../../../schemas/LetterSchema"
import { ICallback } from "types/ICommand"
import { messageEmbed, profileNotFound } from "../../../utils/embeds"
import { getMentionatedInfo, getUserInfo } from "../../../utils/userInfo"

const marry : ICallback = async (interaction) =>
{
  const userInfo = getUserInfo(interaction)
  const mentionatedInfo = getMentionatedInfo(interaction , "user")
  const letterContent = interaction.options.getString("love-letter" , true)

  const embed = messageEmbed({ interaction , name : "| 💌 | Marry - Dates" })

  if (letterContent.length >= 300)
  {
    embed.setDescription(`Ésta es una carta muy bonita 😋, sin embargo, es algo larga, recuerda que el máximo de caracteres para tu carta ha de ser de \`300 carácteres.\`
      
    \`💌 Tu carta 💌\` 
    ${letterContent.slice(250)} ...`)

    return interaction.reply({ embeds : [embed] , ephemeral : true })
  }

  if (userInfo?.userId === mentionatedInfo?.userId)
    return interaction.reply("No puedes casarte contigo mismo. 😒")

  const [userMarrying , userToMarry] = await Promise.all([
    ProfileSchema.findOne({ userId : userInfo?.userId } , { isMarried : true , coupleId : true }),
    ProfileSchema.findOne({ userId : mentionatedInfo?.userId } , { isMarried : true , coupleId : true })
  ])

  if (!userMarrying)
    return interaction.reply({ embeds : [profileNotFound({ interaction })] , ephemeral : true })

  if (!userToMarry)
  {
    return interaction.reply({
      content : `Ohh, así que te gusta <@!${mentionatedInfo?.userId}> 😳, pero el/ella no tiene un perfil creado. D;

      Puedes decirle que con el comando \`/create-profile\` podrá crearse un perfil de citas. 😘`,
      ephemeral : true
    })
  }

  if (userMarrying.coupleId === userToMarry.userId)
    return interaction.reply("Ustedes ya están casados. 😒")

  if (userMarrying.isMarried)
    return interaction.reply(`Mirenl@ tan bonit@ tratando de ser infiel. LE RECORDAMOS QUE ESTÁ CASADO CON <@!${userMarrying.coupleId}>. 😡`)

  if (userToMarry.isMarried)
    return interaction.reply(`No sea irrespetuos@ que <@!${userToMarry.userId}> está casad@ con <@!${userToMarry.coupleId}>. 😡`)

  try {
    const letter = await LetterSchema.create(
      { content : letterContent , userSending : userInfo?.userId , userReceiving : mentionatedInfo?.userId }
    )

    await userMarrying.updateOne({
      $push : { lettersSent : letter._id }
    })

    await userToMarry.updateOne({
      $push : {
        lettersRecived : letter._id,
        proposals : userInfo?.userId
      }
    })

    embed.setDescription("💌 Tu propuesta de **amor ha sido enviada éxitosamente adjunto a tu carta**, solo falta esperar a que el/ella te acepte. 💌")
  } catch (error) {
    console.error(error)
    embed.setDescription("Ha ocurrido un error cuando intentaste mandar tu propuesta de matrimonio. 😢")
  }

  return interaction.reply({ embeds : [embed] })
}

export default marry
