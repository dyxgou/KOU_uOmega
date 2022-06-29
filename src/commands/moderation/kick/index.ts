import { ICommand } from "types/ICommand"
import kick from "./kick"

export default {
  options : {
    name : "kick",
    description : "Con éste comando podrás expulsar a alguien de tu servidor.",
    options : [
      {
      name : "user",
      required : true,
      description : "Usuario a kickear",
      type : "USER"
      },
      {
        name : "reason",
        required : false,
        description : "Razón por la cual es kickeado",
        type : "STRING"
      }
    ]
  },
  command : kick
} as ICommand
