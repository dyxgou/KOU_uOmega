import { Schema , Document, model } from "mongoose"

export interface ILetter extends Document
{
  userSending : string,
  userReceiving : string,
  content : string,
  status : "LIKED" | "DISLIKED" | "UNREAD",
}

const LetterSchema = new Schema<ILetter>({
  userSending : {
    type : String ,
    required : true,
    ref : "users"
  },
  userReceiving : {
    type : String ,
    required : true,
    ref : "users"
  },
  content : {
    type : String ,
    trim : true,
    required : true
  },
  status : {
    type : String ,
    enum : ["LIKED" , "DISLIKED" , "UNREAD"],
    default : "UNREAD"
  }
} , { timestamps : true })

export default model("letters" , LetterSchema)
