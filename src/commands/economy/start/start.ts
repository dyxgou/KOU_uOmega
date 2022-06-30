import UserSchema from "../../../schemas/UserSchema"
import { ICallback } from "types/ICommand"
import { messageEmbed } from "../../../utils/embeds"
import { getUserInfo } from "../../../utils/userInfo"

const start : ICallback = async (interaction) =>
{
  const userInfo = getUserInfo(interaction)

  const embed = messageEmbed({ interaction , name : "| 💵 | ECONOMY" })
    .setDescription("Has sido registrado en el sistema de Economía exitosamente. 😳")

  try {
    await UserSchema.create(userInfo)

    return interaction.reply({ embeds : [embed] , ephemeral : true })
  } catch (error) {
    console.error({ error })
    embed.setDescription("Ha ocurrido un error al registrarte en el sistema de Economía o ya tienes una cuenta creada. 😢")
    return interaction.reply({ embeds : [embed] , ephemeral : true })
  }
}

export default start
