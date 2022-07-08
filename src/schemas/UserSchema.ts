import { Schema , Document , model } from "mongoose"

export interface IUser extends Document
{
  userId : string,
  guildId : string,
  cash : number,
  bank : number,
}

const UserSchema = new Schema<IUser>({
  userId : {
    type : String ,
    required : true
  },
  guildId : {
    type : String ,
    required : true
  },
  cash : {
    type : Number ,
    default : 1000
  },
  bank : {
    type : Number ,
    default : 0
  }

} , { timestamps : true })

export default model("users" , UserSchema)
