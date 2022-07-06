import { ICommand } from "types/ICommand"
import getEmotionsOptions from "../emotionCommand"
import generateCommand from "../generateCommand"

export default {
  options : getEmotionsOptions({
    commandName : "slap",
    commandDescription : "Podrás darle dar una cachetada de una forma totalmente pácifica y amistosa. 🤑🤙",
    userDescription : "Desafortunado al cual le vas a tumbar los dientes. 🤕🤕"
  }),
  command : (interaction) => generateCommand({
    interaction ,
    message : "{user}, ya deje de ser tan métido, tan lambón, marika. 😡",
    messageWithMention : "{user} le ha quitado la muelera a {mentionated}. 😎",
    category : "slap"
  })
} as ICommand
