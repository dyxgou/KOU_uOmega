import { ICommand } from "types/ICommand"
import setMoney from "./setMoney"

export default {
  options : {
    name: "set-money",
    description: "Podrás definir los valores máximos y mínimos de cada trabajo en el servidor.",
    options : [
      {
        name : "job",
        description : "El trabajo del cual quieres definir los valores.",
        type : "STRING",
        choices : [
          {
            name : "work",
            value : "work"
          },
          {
            name : "crime",
            value : "crime"
          },
          {
            name : "fight",
            value : "fight"
          }
        ],
        required : true
      },
      {
        name : "new_amount",
        description : "El nuevo valor del máximo o mínimo del trabajo.",
        type : "NUMBER",
        minValue : 0,
        required : true
      },
      {
        name : "range",
        description : "El rango del cual quieres definir los valores.",
        type : "STRING",
        choices : [
          {
            name : "Valor mínimo",
            value : "min"
          },
          {
            name : "Valor máximo",
            value : "max"
          }
        ],
        required : true
      }
    ]
  },
  command : setMoney
} as ICommand
