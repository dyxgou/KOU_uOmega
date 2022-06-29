import { ICommand } from "types/ICommand"
import esay from "./esay"

export default {
  options : {
    name : "esay",
    description : "Con este comando podrás mandar un mensaje de forma anónima en un mensaje bonito.",
    options : [{
      name : "message",
      description : "Mensaje a enviar",
      required : true,
      type : "STRING"
    }]
  },
  command : esay
} as ICommand
