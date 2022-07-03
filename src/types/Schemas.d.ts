import { Types } from "mongoose"
import { IUser } from "../schemas/UserSchema"

export type User = (IUser & {
  _id: Types.ObjectId;
})
