import { ICommand } from "types/ICommand"
import pay from "./pay"

export default {
  options : {
    name : "pay",
    description : "Podrás demostrar tu humildad y pagar o regalar dinero a otros usuarios. 😋",
    options : [
      {
      name : "user",
      description : "El usuario al que quieres pagar o regalar dinero.",
      required : true,
      type : "USER"
      },
      {
        name : "amount",
        description : "La cantidad de dinero que quieres pagar o regalar.",
        required : true,
        type : "STRING"
      }
    ]
  },
  command : pay
} as ICommand
