import { ICommand } from "types/ICommand"
import rob from "./rob"

export default {
  options : {
    name : "rob",
    description : "Podrás mostrar la rata que eres, robando la cartera de alguien más. 😈",
    options : [{
      name : "user",
      required : true,
      description : "Usuario al que le vas a joder el día. 😈",
      type : "USER"
    }]
  },
  command : rob
} as ICommand
