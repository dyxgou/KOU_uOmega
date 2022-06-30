import { ICommand } from "types/ICommand"
import start from "./start"

export default {
  options : {
    name  : "start",
    description : "Con éste comando podrás registrarte en el sistema de Economía. 😳"
  },
  command : start
} as ICommand
