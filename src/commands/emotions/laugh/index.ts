import { ICommand } from "types/ICommand"
import getEmotionsOptions from "../emotionCommand"
import generateCommand from "../generateCommand"

export default {
  options : getEmotionsOptions({
    commandName : "laugh",
    commandDescription : "Podrás reírte sin razón aparente como el Joker. 😜",
    userDescription : "Afortunado con el cuál pasarás un momento de risa. 😂"
  }),
  command : (interaction) => generateCommand({
    interaction ,
    message : "{user} se está riendo, quién sabe de qué. 🤣",
    messageWithMention : "{user} se están riendo {mentionated}. 🤣",
    category : "laugh"
  })
} as ICommand
