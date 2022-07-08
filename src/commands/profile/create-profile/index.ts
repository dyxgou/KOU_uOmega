import { ICommand } from "types/ICommand"
import createProfile from "./createProfile"

export default
{
  options : {
    name : "create-profile",
    description : "Create un perfil dentro de nuestro sistema de relaciones. 😍"
  },
  command : createProfile
} as ICommand
