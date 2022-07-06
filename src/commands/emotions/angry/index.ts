import { ICommand } from "types/ICommand"
import getEmotionsOptions from "../emotionCommand"
import generateCommand from "../generateCommand"

export default {
  options : getEmotionsOptions({
    commandName : "angry",
    commandDescription : "Podrás demostrar toda tu rabia contra alguien. 👿",
    userDescription : "Usuario con el cual quieres mostrar que estás enojado. 👿"
  }),
  command : (interaction) => generateCommand({
    interaction ,
    message : "{user} está muy enojado. 😡",
    messageWithMention : "{user} se ha enojado con {mentionated}. 😡",
    category : "angry"
  })
} as ICommand
