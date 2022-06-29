import { ICommand } from "types/ICommand"
import startServer from "./startServer"

export default {
  options: {
    name: "start-server",
    description: "Con este comando registraras tu servidor en la base de datos de KOU_zOmega. 🤑",
    default_member_permissions : "ADMINISTRATOR"
  },
  command : startServer
} as ICommand
