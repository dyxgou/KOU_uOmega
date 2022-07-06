import { ICommand } from "types/ICommand"
import getEmotionsOptions from "../emotionCommand"
import generateCommand from "../generateCommand"

export default {
  options : getEmotionsOptions({
    commandName : "confused",
    commandDescription : "Podrás mostrar tu confusión hacía cierta cosa. 😕",
    userDescription : "Persona con la cuál te vas a confundir. 😕"
  }),
  command : (interaction) => generateCommand({
    interaction ,
    message : "{user} está confundido. 😕",
    messageWithMention : "{user} y {mentionated} están confundidos. 😟",
    category : "confused"
  })
} as ICommand
