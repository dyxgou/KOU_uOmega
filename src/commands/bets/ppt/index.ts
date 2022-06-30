import { ICommand } from "types/ICommand"
import paperRocksScissors from "./paperRocksScissors"

export default {
  options : {
    name : "ppt",
    description : "Apuesta jugando piedra, papel o tijera contra un compañero de tu servidor.",
    options : [
      {
        name : "user",
        description : "El usuario con el que quieres apostar. 😈",
        required : true,
        type : "USER"
      },
      {
        name : "amount",
        description : "La cantidad de dinero que quieres apostar. 😈",
        required : true,
        type : "STRING"
      }
    ]
  },
  command : paperRocksScissors
} as ICommand
