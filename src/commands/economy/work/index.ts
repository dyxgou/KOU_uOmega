import { ICommand } from "types/ICommand"
import work from "./work"

export default {
  options : {
    name : "work",
    description : "Con este comando puedes ganar dinero de forma legal en el sistema de Economía. 💰"
  },
  command : work
} as ICommand
