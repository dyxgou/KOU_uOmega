import { ICommand } from "types/ICommand"
import withMoney from "./with"

export default {
  options : {
    name : "with",
    description : "Retira tu dinero del banco",
    options : [{
      name : "amount",
      description : "Cantidad de dinero a retirar. ( all = Todo el dinero que hay en tu cuenta de banco )",
      required : true,
      type : "STRING"
    }]
  },
  command : withMoney
} as ICommand
