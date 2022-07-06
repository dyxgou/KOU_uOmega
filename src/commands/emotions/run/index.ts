import { ICommand } from "types/ICommand"
import getEmotionsOptions from "../emotionCommand"
import generateCommand from "../generateCommand"

export default {
  options : getEmotionsOptions({
    commandName : "run",
    commandDescription : "Podrás correr de tod@s tus acosador@s con este comando. 😏",
    userDescription : "Persona de la cual quiere escapar. 🧐🤙"
  }),
  command : (interaction) => generateCommand({
    interaction ,
    message : "{user} está escapando, quién sabe de qué. 🧐🤙",
    messageWithMention : "{user} está escapando porque {mentionated} lo mando matar. 😰",
    category : "punch"
  })
} as ICommand
