import { ICommand } from "types/ICommand"
import getEmotionsOptions from "../emotionCommand"
import generateCommand from "../generateCommand"

export default {
  options : getEmotionsOptions({
    commandName : "pat",
    commandDescription : "Mostrarás lo Simp que eres de una manera más disimulada. 🤗",
    userDescription : "Persona a la cual quieres acariciar. 😋"
  }),
  command : (interaction) => generateCommand({
    interaction ,
    message : "{user} quiere una acaricia. 😋",
    messageWithMention : "{user} está acariciando a {mentionated}. 😋",
    category : "kiss"
  })
} as ICommand
