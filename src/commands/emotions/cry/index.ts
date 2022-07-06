import { ICommand } from "types/ICommand"
import getEmotionsOptions from "../emotionCommand"
import generateCommand from "../generateCommand"

export default {
  options : getEmotionsOptions({
    commandName : "cry",
    commandDescription : "Mostraras tu tristeza y falta de cariño con este comando. 😎 😭",
    userDescription : "Usuario con el que deseas llorar. 😢"
  }),
  command : (interaction) => generateCommand({
    interaction ,
    message : "{user} está llorando. 😢",
    messageWithMention : "{user} y {mentionated} están llorando. 😟",
    category : "cry"
  })
} as ICommand
