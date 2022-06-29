import { ExcludeEnum, MessageActionRow, MessageButton } from "discord.js"
import { MessageButtonStyles } from "discord.js/typings/enums"

interface IButtonOptions
{
  id : Uppercase<string>,
  style : ExcludeEnum<typeof MessageButtonStyles, "LINK">,
  disabled ?: boolean,
  emoji ?: string,
  label ?: string,
  type ?: "BUTTON" | "ACTION_ROW" | "TEXT_INPUT" | "SELECT_MENU"
}

export const button = ({ id , style , disabled , emoji , label , type = "BUTTON" } : IButtonOptions) =>
{
  const btn = new MessageButton({
    customId : id,
    emoji,
    disabled,
    label,
    type,
    style
  })

  return btn
}

export const buttonsRow = (buttons : MessageButton[]) =>
{
  const row = new MessageActionRow({
    components : buttons
  })

  return row
}
