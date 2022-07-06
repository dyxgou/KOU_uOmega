import { ICommand } from "types/ICommand"
import getEmotionsOptions from "../emotionCommand"
import generateCommand from "../generateCommand"

export default {
  options : getEmotionsOptions({
    commandName : "kill",
    commandDescription : "Podrás usar tu Nerf o nada, para inflar tus Kills con ésta bola de mancos. 🤑🤙",
    userDescription : "Noob al que deseas eliminar. 😎"
  }),
  command : (interaction) => generateCommand({
    interaction ,
    message : "{user} se quiere matar. 🤕",
    messageWithMention : "{user} ha matado a {mentionated}. 😰",
    category : "kill"
  })
} as ICommand
