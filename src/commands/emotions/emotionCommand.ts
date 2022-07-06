import { GetOptions, Options } from "./types"

const getEmotionsOptions = ({ commandName , commandDescription , userDescription } : GetOptions) : Options =>
{
  return {
    name : commandName,
    description : commandDescription,
    options : [{
      name : "user",
      description : userDescription,
      type : "USER",
      required : false
    }]
  }
}

export default getEmotionsOptions
