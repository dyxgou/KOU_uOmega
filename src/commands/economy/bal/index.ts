import { ICommand } from "types/ICommand"
import bal from "./bal"

export default {
  options : {
    name : "bal",
    description : "Con éste comando podrás ver tu saldo tanto en tu billetera como en el banco."
  },
  command : bal
} as ICommand
