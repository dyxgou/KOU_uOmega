import { ICommand } from "types/ICommand"
import getEmotionsOptions from "../emotionCommand"
import generateCommand from "../generateCommand"

export default {
  options : getEmotionsOptions({
    commandName : "drunk",
    commandDescription : "Podrás ser el/la estúpid@ de la mesa con este comando. 🥴",
    userDescription : "El sinvergüenza con el cual te quieres emborrachar. 🥴"
  }),
  command : (interaction) => generateCommand({
    interaction ,
    message : "{user} se está pegando una borrachera. 🥴",
    messageWithMention : "La bola de sinvergüenzas de {user} y {mentionated} se pusieron a tomar. 😡 || 🥴 ||",
    category : "drunk"
  })
} as ICommand
