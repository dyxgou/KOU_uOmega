import { ICommand } from "types/ICommand"
import getEmotionsOptions from "../emotionCommand"
import generateCommand from "../generateCommand"

export default {
  options : getEmotionsOptions({
    commandName : "hug",
    commandDescription : "Podrás demostrar tu amor y que eres tremendo Simp con este comando. 😳",
    userDescription : "Usuario al que deseas abrazar. 😋"
  }),
  command : (interaction) => generateCommand({
    interaction ,
    message : "{user} quiere un abrazo. 💞",
    messageWithMention : "{user} está abrazando a {mentionated}. Owo",
    category : "hug"
  })
} as ICommand
