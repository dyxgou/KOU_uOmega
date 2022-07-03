import { ICommand } from "types/ICommand"
import dep from "./dep"

export default {
  options : {
    name : "dep",
    description : "Podrás depositar el dinero que tienes en tu billetera en el banco para que no te roben. 😈",
    options : [{
      name : "amount",
      type : "STRING",
      required : true,
      description : "Cantidad que deseas depositar ( all = Todo el dinero que hay en tu billetera )"
    }]
  },
  command : dep
} as ICommand
