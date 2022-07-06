import { ICommand } from "types/ICommand"
import getEmotionsOptions from "../emotionCommand"
import generateCommand from "../generateCommand"

export default {
  options : getEmotionsOptions({
    commandName : "lick",
    commandDescription : "Podrás mostrar tu falta de respeto lamiendo y contagiando con esa cosa que llamas lengua. 🤣",
    userDescription : "Desafortunad@ al que vas a lamer. 🤮"
  }),
  command : (interaction) => generateCommand({
    interaction ,
    message : "{user} se está lamiendo. 😐",
    messageWithMention : "{user} está contagiando a {mentionated} con su lengua. 🤮",
    category : "lick"
  })
} as ICommand
