import { ICommand } from "types/ICommand"
import getProposals from "./getProposals"

export default {
  options : {
    name : "get-proposals",
    description : "Obtendrás una lista con todas las propuestas de matrimonio que te han dado hasta ahora."
  },
  command : getProposals
} as ICommand
