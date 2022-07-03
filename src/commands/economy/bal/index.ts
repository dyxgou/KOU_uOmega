import { ICommand } from "types/ICommand"
import bal from "./bal"

export default {
  options : {
    name : "bal",
    description : "Con éste comando podrás ver tu saldo tanto en tu billetera como en el banco.",
    options : [{
      name : "user",
      type : "USER",
      required : false,
      description : "Mención de la persona a la cual le quieres chismear su dinero. 😈"
    }]
  },
  command : bal
} as ICommand
