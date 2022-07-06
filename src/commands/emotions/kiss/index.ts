import { ICommand } from "types/ICommand"
import getEmotionsOptions from "../emotionCommand"
import generateCommand from "../generateCommand"

export default {
  options : getEmotionsOptions({
    commandName : "kiss",
    commandDescription : "Le mostrarás lo Simp que eres a esa persona que tanto quieres. 🤗",
    userDescription : "Usuario al que deseas besar. 😳"
  }),
  command : (interaction) => generateCommand({
    interaction ,
    message : "{user} quiere un beso. 737",
    messageWithMention : "{user} le ha dado un beso a {mentionated}. 😳",
    category : "kiss"
  })
} as ICommand
