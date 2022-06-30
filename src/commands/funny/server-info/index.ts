import { ICommand } from "types/ICommand"
import serverInfo from "./server-info"

export default {
  options : {
    name : "server-info",
    description : "Podrás ver información más pertinente del servidor."
  },
  command : serverInfo
} as ICommand
