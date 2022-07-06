import { ICommand } from "types/ICommand"
import getEmotionsOptions from "../emotionCommand"
import generateCommand from "../generateCommand"

export default {
  options : getEmotionsOptions({
    commandName : "happy",
    commandDescription : "Podrás demostrar que no estás mamado de este govierno con una sonrisa al frente. 🤩",
    userDescription : "Usuario al que le deseas sonreír. 😊"
  }),
  command : (interaction) => generateCommand({
    interaction ,
    message : "{user} está muy contento. 🤩",
    messageWithMention : "{user} le ha sonreído a {mentionated}. 🤩",
    category : "happy"
  })
} as ICommand
