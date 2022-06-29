import { ICommand } from "types/ICommand"
import setSuggestion from "./setSuggestion"

export default {
  options : {
    name : "set-suggestion",
    description : "Con este comando podras establecer un canal de sugerencias. 😘",
    options : [{
      name : "channel",
      description : "Canal destinado a sugerencias.",
      type : "CHANNEL",
      required : true
    }]
  },
  command : setSuggestion
} as ICommand
