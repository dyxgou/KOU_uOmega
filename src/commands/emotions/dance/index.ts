import { ICommand } from "types/ICommand"
import getEmotionsOptions from "../emotionCommand"
import generateCommand from "../generateCommand"

export default {
  options : getEmotionsOptions({
    commandName : "dance",
    commandDescription : "Podrás pegarte un **EL PERREO Y LA DIGNIDAD HASTA ABAJO** con este comando. 🥵",
    userDescription : "Usuario con el que deseas bailar. 💃"
  }),
  command : (interaction) => generateCommand({
    interaction ,
    message : "{user} se está sacando los prohibidos. 😎",
    messageWithMention : "{user} y {mentionated} están bailando. Owo",
    category : "dance"
  })
} as ICommand
