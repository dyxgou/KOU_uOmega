import { ICommand } from "types/ICommand"
import roulette from "./roullete"

export default {
  options : {
    name : "roulette",
    description : "Juega la ruleta rusa y gana el doble de lo que apostaste o pierde todo. 😈",
    options : [{
      name : "amount",
      description : "Cantidad de dinero a apostar. ( all = Apostar todo el dinero en la billetera )",
      required : true,
      type : "STRING"
    }]
  },
  command : roulette
} as ICommand
