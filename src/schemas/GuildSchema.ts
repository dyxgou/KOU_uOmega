import { Schema , Document , model } from "mongoose"

interface IChannel
{
  confession : string,
  suggestion : string
}

interface IGuild extends Document
{
  guildId : string,
  channels : IChannel
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
  }
})

export default model("guilds" , GuildSchema)
