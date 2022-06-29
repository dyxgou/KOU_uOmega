import { ICommand } from "types/ICommand"
import say from "./say"

export default {
  options : {
    name : "say",
    description : "El bot dirá un mensaje tuyo, manteniendote anónimo.",
    type : "CHAT_INPUT",
    options : [{
      name : "message",
      description : "Mensaje a enviar.",
      required : true,
      type : "STRING"
    }]
  },
  command : say
} as ICommand
