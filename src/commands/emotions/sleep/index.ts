import { ICommand } from "types/ICommand"
import getEmotionsOptions from "../emotionCommand"
import generateCommand from "../generateCommand"

export default {
  options : getEmotionsOptions({
    commandName : "sleep",
    commandDescription : "Podrás hecharte una siestica o dormirte con alguien. 7u7 . _.XD",
    userDescription : "Persona con la cual quieres echar una siestica. 😴"
  }),
  command : (interaction) => generateCommand({
    interaction ,
    message : "{user}, se hechó a dormir. 😴",
    messageWithMention : "{user} y {mentionated} se fueron a mimir. 🤭",
    category : "sleep"
  })
} as ICommand
