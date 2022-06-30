import { CacheType, Interaction, MessageEmbed } from "discord.js"

interface IMessageEmbed
{
  interaction : Interaction<CacheType>,
  name ?: string
}

export const messageEmbed = ({ interaction , name } : IMessageEmbed) =>
{
  const embed = new MessageEmbed({
    author : {
      iconURL : interaction.guild?.iconURL({ dynamic : true }) || "",
      name
    },
    color : "RANDOM",
    timestamp : Date.now()
  })

  return embed
}

export const serverNotFound = ({ interaction } : IMessageEmbed) =>
{
  const embed = messageEmbed({ interaction , name : "No se ha encontrado un servidor." })
    .setDescription(`El servidor no está registrado en la base de datos. D:
    Para registrarlo en el sistema de Economía u otros sistemas más, puedes realizar el comando \`/start-server\`, recuerda que debes tener permisos de administrador.  <a:Starts:827655358277091369>`)

  return embed
}

export const notAdministrator = ({ interaction } : IMessageEmbed) =>
{
  const embed = messageEmbed({ interaction , name : "ERROR" })
    .setDescription(`No tienes los permisos suficientes para realizar este comando.`)

  return embed
}

export const userNotFound = ({ interaction } : IMessageEmbed) =>
{
  const embed = messageEmbed({ interaction , name : "USER NOT FOUND" })
    .setDescription(`Parece que no tienes una cuenta en este servidor o.O. Para crear una cuenta, solo tienes que usar \`/start\`.
    ¡Y ya estarás registrado! 😳`)

  return embed
}
