import { randomInt } from "mathjs"
import { messageEmbed } from "../../utils/embeds"
import * as gifs from "./gifs.json"
import { GifEmbed } from "./types"

const gifEmbed = ({ interaction , category , mentionated } : GifEmbed) =>
{
  const gif = gifs[category][randomInt(0 , gifs[category].length - 1)]

  const embed = messageEmbed({ interaction })

  if (mentionated?.id === interaction.user.id)
  {
    embed.setDescription("**¿ Qué haces mencionandote a ti mismo ?** 😎")
    return {
      error : true,
      embed
    }
  }

  embed.setImage(gif)

  return {
    error : false,
    embed
  }
}

export default gifEmbed
