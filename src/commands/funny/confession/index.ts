import { ICommand } from "types/ICommand"
import confession from "./confession"

export default {
  options : {
    name : "confession",
    description : "Con éste comando podrás hacer confesiones de tus secretos más intimos. 😈",
    type : "CHAT_INPUT",
    options : [{
      name : "confession",
      description : "Ésta será la confesión que será públicada en el canal de confesiones.",
      type : "STRING",
      required : true
    }]
  },
  command : confession
} as ICommand
