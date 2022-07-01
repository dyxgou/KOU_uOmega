import { ICallback } from "types/ICommand"

const dep : ICallback = async (interaction) =>
{
  return interaction.reply("Dep is not implemented yet.")
}

export default dep
