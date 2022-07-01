import { ICommand } from "types/ICommand"
import fight from "./fight"

export default {
  options : {
    name : "fight",
    description : "Puedes entrar a peleas con la cuales puedes ganar dinero o perder por las apuestas."
  },
  command : fight
} as ICommand
