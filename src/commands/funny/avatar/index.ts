import { ICommand } from "types/ICommand"
import avatar from "./avatar"

export default {
  options : {
    name : "avatar",
    description : "Con este comando podrás ver tu avatar o el de otra persona.",
    type : "CHAT_INPUT",
    options : [{
      name : "user",
      type : "USER",
      description : "Usuario a ver su avatar",
      required : false
    }]
  },
  command : avatar
} as ICommand
