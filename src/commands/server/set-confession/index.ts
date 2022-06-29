import { ICommand } from "types/ICommand"
import setConfession from "./setConfession"

export default {
  options : {
    name : "set-confession",
    description : "Con este comando podras establecer un canal de confesiones. 😈",
    options : [{
      name : "channel",
      description : "Canal destinado a confesiones.",
      type : "CHANNEL",
      required : true
    }]
  },
  command : setConfession
} as ICommand
