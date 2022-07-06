import { ICommand } from "types/ICommand"
import getEmotionsOptions from "../emotionCommand"
import generateCommand from "../generateCommand"

export default {
  options : getEmotionsOptions({
    commandName : "punch",
    commandDescription : "Podrás partirte la getta con otra persona con este comando. 😡",
    userDescription : "Persona con la cual te darás en la getta. 😡"
  }),
  command : (interaction) => generateCommand({
    interaction ,
    message : "{user} tiene ganas de ganarse un problema. 😡",
    messageWithMention : "{user} se fue a darle en la madre a {mentionated}. 😡",
    category : "punch"
  })
} as ICommand
