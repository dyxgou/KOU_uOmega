import { ICommand } from "types/ICommand"
import ban from "./ban"

export default {
  options : {
    name : "ban",
    description : "Con este comando podrás banear a un usuario en especifico de tu servidor.",
    options : [
      {
        name : "user",
        description : "Usuario a banear.",
        type : "USER",
        required : true
      },
      {
        name : "reason",
        description : "Razón por la cual será baneado este usuario.",
        type : "STRING",
        required : false
      },
      {
        name : "time",
        description : "Tiempo por el cual será baneado éste usuario.",
        type : "STRING",
        required : false
      }
    ]
  },
  command : ban
} as ICommand
