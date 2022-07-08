import { Schema , Document, model } from "mongoose"
import { ILetter } from "./LetterSchema"

interface IProfile extends Document
{
  userId : string,
  coupleId : string,
  proposals : string[],
  isMarried : boolean,
  lettersRecived : Array<Schema.Types.ObjectId | ILetter>,
  lettersSent : Array<Schema.Types.ObjectId | ILetter>,
  isSpied : boolean
}

const ProfileSchema = new Schema<IProfile>({
  userId : {
    type : String,
    required : true,
    unique : true
  },
  coupleId : {
    type : String,
    default : ""
  },
  proposals : [{
    // Discord user id
    type : String
  }],
  isMarried : {
    type : Boolean,
    default : false
  },
  lettersRecived : [{
    type : Schema.Types.ObjectId,
    ref : "letters"
  }],
  lettersSent : [{
    type : Schema.Types.ObjectId,
    ref : "letters"
  }],
  isSpied : {
    type : Boolean,
    default : false
  }
} , { timestamps : true })

export default model("profiles" , ProfileSchema)
