import { ICommand } from "types/ICommand"
import getEmotionsOptions from "../emotionCommand"
import generateCommand from "../generateCommand"

export default {
  options : getEmotionsOptions({
    commandName : "bored",
    commandDescription : "Mostraras tus masivas cantidades de tiempo libre y aburrimiento. 😎",
    userDescription : "Usuario con el cual quieres . 👿"
  }),
  command : (interaction) => generateCommand({
    interaction ,
    message : "{user} está aburrido. 😴",
    messageWithMention : "{user} y {mentionated} están aburridos. 😟",
    category : "bored"
  })
} as ICommand
