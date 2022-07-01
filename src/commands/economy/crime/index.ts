import { ICommand } from "types/ICommand"
import crime from "./crime"

export default {
  options : {
    name : "crime",
    description : "Podrás robar un banco, sin embargo, vas a tener el riesgo d que te descubran y pierdas tu dinero."
  },
  command : crime
} as ICommand
