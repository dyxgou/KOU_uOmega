import { Schema , Document , model } from "mongoose"
import { IAmounts, MAX_AMOUNTS, MIN_AMOUNTS } from "../utils/amounts"

interface IChannel
{
  confession : string,
  suggestion : string
}

interface IGuild extends Document
{
  guildId : string,
  channels : IChannel,
  MIN_AMOUNTS : IAmounts,
  MAX_AMOUNTS : IAmounts
}

const GuildSchema = new Schema<IGuild>({
  guildId : {
    type : String,
    required : true,
    unique : true
  },
  channels : {
    suggestion : String,
    confession : String
  },
  MIN_AMOUNTS : {
    work : {
      type : Number,
      default : MIN_AMOUNTS.work
    },
    crime : {
      type : Number,
      default : MIN_AMOUNTS.crime
    },
    fight : {
      type : Number,
      default : MIN_AMOUNTS.fight
    }
  },
  MAX_AMOUNTS : {
    work : {
      type : Number,
      default : MAX_AMOUNTS.work
    },
    crime : {
      type : Number,
      default : MAX_AMOUNTS.crime
    },
    fight : {
      type : Number,
      default : MAX_AMOUNTS.fight
    }
  }
})

export default model("guilds" , GuildSchema)
