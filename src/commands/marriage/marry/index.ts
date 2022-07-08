import { ICommand } from "types/ICommand"
import marry from "./marry"

export default {
  options : {
    name : "marry",
    description : "Podrás perdirle matrimonio a esa persona tan especial para ti. ❤️",
    options : [
      {
      name : "user",
      type : "USER",
      description : "Usuario con el que te quieres casar. 😍",
      required : true
      },
      {
        name : "love-letter",
        description : "Un pequeño mensaje para el amor de tu vida. 🥰 ( Máximo 300 carácteres. )",
        type : "STRING",
        required : true
      }
    ]
  },
  command : marry
} as ICommand
