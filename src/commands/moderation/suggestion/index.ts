import { ICommand } from "types/ICommand"
import suggestion from "./suggestion"

export default {
  options : {
    name : "suggestion",
    description : "Con este comando podrás solicitar una sugerencia en cualquier servidor. 😘 ",
    type : "CHAT_INPUT",
    options : [{
      name : "suggestion",
      description : "Ésta será la sugerencia que será públicada en el servidor.",
      type : "STRING",
      required : true
    }]
  },
  command : suggestion
} as ICommand
