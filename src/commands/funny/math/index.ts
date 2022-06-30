import { ICommand } from "types/ICommand"
import math from "./math"

export default {
  options : {
    name: "math",
    description: "Con este comando podrás realizar cualquier operación matemática. ",
    options : [{
      name: "operation",
      description: "La operación que quieres realizar.",
      required : true,
      type : "STRING"
    }]
  },
  command : math
} as ICommand
